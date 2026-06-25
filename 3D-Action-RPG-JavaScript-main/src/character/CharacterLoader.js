/**
 * CharacterLoader.js
 * Dynamic character loading system supporting multiple character types
 * Compatible with Mixamo animations and merged animation GLB files
 */

export class CharacterLoader {
    constructor() {
        this.characterDatabase = null;
        this.currentCharacter = null;
    }

    /**
     * Load character database from JSON
     */
    async loadCharacterDatabase() {
        if (this.characterDatabase) return this.characterDatabase;
        
        try {
            const response = await fetch('./assets/characters/characters.json');
            this.characterDatabase = await response.json();
            console.log('✅ Character database loaded:', Object.keys(this.characterDatabase.characters).length, 'characters');
            return this.characterDatabase;
        } catch (error) {
            console.error('❌ Failed to load character database:', error);
            throw error;
        }
    }

    /**
     * Get character data by ID
     */
    getCharacterData(characterId) {
        if (!this.characterDatabase) {
            throw new Error('Character database not loaded. Call loadCharacterDatabase() first.');
        }
        
        const character = this.characterDatabase.characters[characterId];
        if (!character) {
            throw new Error(`Character '${characterId}' not found in database.`);
        }
        
        return character;
    }

    /**
     * Get all available characters
     */
    getAllCharacters() {
        if (!this.characterDatabase) {
            throw new Error('Character database not loaded. Call loadCharacterDatabase() first.');
        }
        return this.characterDatabase.characters;
    }

    /**
     * Load character model with animations
     * Supports both merged animation files and separate animation files (like racalvin)
     */
    async loadCharacterModel(scene, character, characterId) {
        console.log(`🎮 Loading character: ${characterId}`);
        
        // Get character data
        const charData = this.getCharacterData(characterId);
        this.currentCharacter = charData;
        
        // Build paths - support full URLs for Vietnam / Nexus era (grudge6.grudge-studio.com)
        let modelUrl = charData.modelFile;
        let modelPath = '';
        let modelFileName = '';
        if (modelUrl && modelUrl.startsWith('http')) {
          // full URL for grudge6 Vietnam assets etc.
          const lastSlash = modelUrl.lastIndexOf('/');
          modelPath = modelUrl.substring(0, lastSlash + 1);
          modelFileName = modelUrl.substring(lastSlash + 1);
        } else {
          const basePath = `./assets/characters/${charData.folder}/`;
          modelPath = charData.subfolder ? `${basePath}${charData.subfolder}/` : basePath;
          modelFileName = charData.modelFile;
        }
        
        console.log(`📁 Loading from: ${modelPath}${modelFileName} (Nexus/Vietnam support)`);
        
        // Load main character model
        const result = await BABYLON.SceneLoader.ImportMeshAsync(
            null, 
            modelPath,
            modelFileName, 
            scene
        );
        
        console.log(`✅ Character model loaded:`, result.meshes.length, 'meshes');
        
        // Load animations based on character type
        if (charData.useSeparateAnimations) {
            // Racalvin-style: separate animation files
            await this.loadSeparateAnimations(scene, modelPath, charData.animations);
        } else if (charData.animationFile) {
            // New characters: merged animation file
            await this.loadMergedAnimations(scene, modelPath, charData.animationFile);
        }
        
        // Setup character mesh
        let hero = result.meshes[0];
        character.addChild(hero);
        
        // Apply scaling
        hero.scaling.scaleInPlace(charData.scale || 1.0);
        hero.position.y = charData.positionY || 0;
        
        // Get skeleton
        var skeleton = result.skeletons[0];
        if (skeleton) {
            var rootBone = skeleton.bones[0];
            rootBone.animations = [];
            
            // Lock root bone position and rotation
            scene.onBeforeRenderObservable.add(() => {
                rootBone.position = BABYLON.Vector3.Zero();
                rootBone.rotationQuaternion = BABYLON.Quaternion.Identity();
            });
        }
        
        // Setup mesh materials
        result.meshes[0].getChildren()[0].getChildren().forEach(mesh => {
            mesh.cameraCollide = false;
            if (mesh.material) {
                mesh.material.transparencyMode = BABYLON.Material.MATERIAL_OPAQUE;
            }
        });
        
        console.log(`✅ Character '${charData.displayName}' loaded successfully!`);
        console.log(`📊 Stats:`, charData.stats);
        
        return { hero: hero, skeleton: skeleton, data: charData };
    }

    /**
     * Load separate animation files (Racalvin-style)
     */
    async loadSeparateAnimations(scene, basePath, animations) {
        console.log('📦 Loading separate animation files...');
        
        const animPromises = [];
        for (const [key, filename] of Object.entries(animations)) {
            console.log(`  Loading: ${filename}`);
            animPromises.push(
                BABYLON.SceneLoader.ImportMeshAsync(null, basePath, filename, scene)
            );
        }
        
        await Promise.all(animPromises);
        console.log(`✅ Loaded ${animPromises.length} separate animation files`);
    }

    /**
     * Load merged animation file (new character style)
     */
    async loadMergedAnimations(scene, basePath, animationFile) {
        console.log(`📦 Loading merged animations: ${animationFile}`);
        
        const result = await BABYLON.SceneLoader.ImportMeshAsync(
            null, 
            basePath, 
            animationFile, 
            scene
        );
        
        console.log(`✅ Merged animations loaded: ${result.animationGroups?.length || 0} animations`);
        
        // Log all available animations
        if (result.animationGroups && result.animationGroups.length > 0) {
            console.log('📋 Available animations:');
            result.animationGroups.forEach((ag, idx) => {
                console.log(`  ${idx + 1}. ${ag.name}`);
            });
        }
        
        return result;
    }

    /**
     * Apply color customization to character
     */
    applyCharacterColors(hero, colorOptions) {
        const { skinColor, hairColor, armorColor } = colorOptions;
        
        // Get all child meshes
        hero.getChildren()[0].getChildren().forEach(mesh => {
            if (!mesh.material) return;
            
            const meshName = mesh.name.toLowerCase();
            
            // Apply colors based on mesh name
            if (meshName.includes('skin') || meshName.includes('body')) {
                mesh.material.albedoColor = BABYLON.Color3.FromHexString(skinColor);
            } else if (meshName.includes('hair')) {
                mesh.material.albedoColor = BABYLON.Color3.FromHexString(hairColor);
            } else if (meshName.includes('armor') || meshName.includes('cloth')) {
                mesh.material.albedoColor = BABYLON.Color3.FromHexString(armorColor);
            }
        });
        
        console.log('🎨 Applied character colors:', colorOptions);
    }

    /**
     * Get current character data
     */
    getCurrentCharacter() {
        return this.currentCharacter;
    }

    /**
     * Get default character ID
     */
    getDefaultCharacterId() {
        return this.characterDatabase?.defaultCharacter || 'human';
    }

    /**
     * Save character selection to localStorage
     */
    saveCharacterSelection(characterId, customization = {}) {
        const data = {
            characterId: characterId,
            customization: customization,
            savedAt: Date.now()
        };
        localStorage.setItem('grudgewarlords_character', JSON.stringify(data));
        console.log('💾 Character selection saved:', characterId);
    }

    /**
     * Load character selection from localStorage
     */
    loadCharacterSelection() {
        try {
            const data = localStorage.getItem('grudgewarlords_character');
            if (data) {
                const parsed = JSON.parse(data);
                console.log('📂 Character selection loaded:', parsed.characterId);
                return parsed;
            }
        } catch (error) {
            console.warn('⚠️ Failed to load character selection:', error);
        }
        return null;
    }

    /**
     * Get character selection (from storage or default)
     */
    getSelectedCharacterId() {
        const saved = this.loadCharacterSelection();
        if (saved && saved.characterId) {
            return saved.characterId;
        }
        return this.getDefaultCharacterId();
    }
}

// Create singleton instance
export const characterLoader = new CharacterLoader();

// Helper function for backward compatibility with existing code
export async function loadHeroModel(scene, character, characterId = null) {
    // Initialize character loader
    await characterLoader.loadCharacterDatabase();
    
    // Determine which character to load
    const charId = characterId || characterLoader.getSelectedCharacterId();
    
    // Load the character
    const result = await characterLoader.loadCharacterModel(scene, character, charId);
    
    return result;
}
