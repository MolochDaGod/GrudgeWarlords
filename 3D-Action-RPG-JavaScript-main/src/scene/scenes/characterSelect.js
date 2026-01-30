/**
 * characterSelect.js
 * Character selection screen with 3D preview and customization
 */

import { characterLoader } from '../../character/CharacterLoader.js';
import { setupAnim } from '../../utils/animMapper.js';

export async function createCharacterSelectScene(engine) {
    console.log('🎮 Creating Character Selection Scene...');
    
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.1, 0.1, 0.15);
    
    // Load character database
    await characterLoader.loadCharacterDatabase();
    const characters = characterLoader.getAllCharacters();
    
    // Setup camera for character preview
    const camera = new BABYLON.ArcRotateCamera(
        "characterSelectCamera",
        Math.PI / 2,
        Math.PI / 2.5,
        5,
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    camera.lowerRadiusLimit = 3;
    camera.upperRadiusLimit = 10;
    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = Math.PI / 2;
    camera.attachControl(engine.getRenderingCanvas(), true);
    
    // Lighting for character preview
    const hemi = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 1, 0), scene);
    hemi.intensity = 0.6;
    
    const dirLight = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
    dirLight.position = new BABYLON.Vector3(20, 40, 20);
    dirLight.intensity = 0.8;
    
    // Create ground/platform
    const ground = BABYLON.MeshBuilder.CreateDisc("ground", { radius: 3 }, scene);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = 0;
    const groundMat = new BABYLON.StandardMaterial("groundMat", scene);
    groundMat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.25);
    groundMat.specularColor = new BABYLON.Color3(0.1, 0.1, 0.1);
    ground.material = groundMat;
    
    // Character state
    let currentCharacterId = characterLoader.getSelectedCharacterId();
    let currentCharacterMesh = null;
    let currentAnimations = null;
    let currentSkeleton = null;
    let autoRotate = true;
    let currentColorIndices = { skin: 0, hair: 0, armor: 0 };
    
    // UI Container
    const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
    
    // Create UI panels
    createCharacterSelectionUI();
    createCustomizationUI();
    createActionButtons();
    
    // Load initial character
    await loadCharacterPreview(currentCharacterId);
    
    // Auto-rotate camera
    scene.registerBeforeRender(() => {
        if (autoRotate && currentCharacterMesh) {
            currentCharacterMesh.rotation.y += 0.005;
        }
    });
    
    /**
     * Create character selection UI
     */
    function createCharacterSelectionUI() {
        // Title
        const title = new BABYLON.GUI.TextBlock("title", "SELECT YOUR HERO");
        title.color = "#f5ca56";
        title.fontSize = 48;
        title.fontWeight = "bold";
        title.top = "-45%";
        title.outlineWidth = 2;
        title.outlineColor = "#000000";
        advancedTexture.addControl(title);
        
        // Character grid container
        const panel = new BABYLON.GUI.StackPanel("characterPanel");
        panel.width = "90%";
        panel.top = "40%";
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        panel.isVertical = false;
        advancedTexture.addControl(panel);
        
        // Create character cards
        const characterArray = Object.values(characters);
        const cardWidth = Math.min(140, 800 / characterArray.length);
        
        for (const char of characterArray) {
            const card = createCharacterCard(char, cardWidth);
            panel.addControl(card);
        }
    }
    
    /**
     * Create individual character card
     */
    function createCharacterCard(char, width) {
        const container = new BABYLON.GUI.Rectangle(`card_${char.id}`);
        container.width = `${width}px`;
        container.height = `${width * 1.5}px`;
        container.thickness = 3;
        container.cornerRadius = 10;
        container.color = char.id === currentCharacterId ? "#f5ca56" : "#444444";
        container.background = "rgba(20, 20, 25, 0.9)";
        container.paddingTop = "10px";
        container.paddingBottom = "10px";
        
        const stack = new BABYLON.GUI.StackPanel();
        stack.isVertical = true;
        container.addControl(stack);
        
        // Character name
        const name = new BABYLON.GUI.TextBlock("", char.name);
        name.color = "#ffffff";
        name.fontSize = 16;
        name.fontWeight = "bold";
        name.height = "25px";
        stack.addControl(name);
        
        // Character class
        const classText = new BABYLON.GUI.TextBlock("", char.class);
        classText.color = "#aaaaaa";
        classText.fontSize = 12;
        classText.height = "20px";
        stack.addControl(classText);
        
        // Stats
        const stats = new BABYLON.GUI.TextBlock("", 
            `HP: ${char.stats.health}\n` +
            `STR: ${char.stats.strength} DEX: ${char.stats.dexterity}\n` +
            `INT: ${char.stats.intelligence} VIT: ${char.stats.vitality}`
        );
        stats.color = "#cccccc";
        stats.fontSize = 11;
        stats.height = "55px";
        stats.textWrapping = true;
        stack.addControl(stats);
        
        // Description
        const desc = new BABYLON.GUI.TextBlock("", char.description);
        desc.color = "#999999";
        desc.fontSize = 10;
        desc.height = "60px";
        desc.textWrapping = true;
        stack.addControl(desc);
        
        // Click handler
        container.onPointerClickObservable.add(async () => {
            if (currentCharacterId !== char.id) {
                currentCharacterId = char.id;
                await loadCharacterPreview(char.id);
                updateCardHighlights();
            }
        });
        
        // Hover effect
        container.onPointerEnterObservable.add(() => {
            if (currentCharacterId !== char.id) {
                container.color = "#f5ca56";
                container.alpha = 0.8;
            }
        });
        
        container.onPointerOutObservable.add(() => {
            if (currentCharacterId !== char.id) {
                container.color = "#444444";
                container.alpha = 1;
            }
        });
        
        return container;
    }
    
    /**
     * Update card highlights
     */
    function updateCardHighlights() {
        advancedTexture.getControlsByType("Rectangle").forEach(control => {
            if (control.name.startsWith("card_")) {
                const cardId = control.name.replace("card_", "");
                control.color = cardId === currentCharacterId ? "#f5ca56" : "#444444";
            }
        });
    }
    
    /**
     * Create customization panel
     */
    function createCustomizationUI() {
        const panel = new BABYLON.GUI.StackPanel("customPanel");
        panel.width = "300px";
        panel.top = "-25%";
        panel.left = "-35%";
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        panel.isVertical = true;
        panel.spacing = 10;
        advancedTexture.addControl(panel);
        
        // Customization title
        const title = new BABYLON.GUI.TextBlock("", "CUSTOMIZE");
        title.color = "#f5ca56";
        title.fontSize = 20;
        title.fontWeight = "bold";
        title.height = "30px";
        panel.addControl(title);
        
        // Color selectors
        createColorSelector(panel, "Skin Color", "skin");
        createColorSelector(panel, "Hair Color", "hair");
        createColorSelector(panel, "Armor Color", "armor");
    }
    
    /**
     * Create color selector button
     */
    function createColorSelector(parent, label, colorType) {
        const container = new BABYLON.GUI.Rectangle();
        container.height = "40px";
        container.thickness = 0;
        
        const stack = new BABYLON.GUI.StackPanel();
        stack.isVertical = false;
        container.addControl(stack);
        
        const labelText = new BABYLON.GUI.TextBlock("", label);
        labelText.color = "#ffffff";
        labelText.fontSize = 14;
        labelText.width = "120px";
        labelText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        stack.addControl(labelText);
        
        const button = BABYLON.GUI.Button.CreateSimpleButton("", "Change");
        button.width = "80px";
        button.height = "30px";
        button.color = "#ffffff";
        button.background = "#4682b4";
        button.cornerRadius = 5;
        
        button.onPointerClickObservable.add(() => {
            cycleColor(colorType);
        });
        
        stack.addControl(button);
        parent.addControl(container);
    }
    
    /**
     * Create action buttons
     */
    function createActionButtons() {
        const panel = new BABYLON.GUI.StackPanel("actionPanel");
        panel.width = "400px";
        panel.top = "45%";
        panel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        panel.isVertical = false;
        panel.spacing = 20;
        advancedTexture.addControl(panel);
        
        // Play Animation button
        const animButton = BABYLON.GUI.Button.CreateSimpleButton("animBtn", "Preview Attack");
        animButton.width = "150px";
        animButton.height = "50px";
        animButton.color = "#ffffff";
        animButton.background = "#8b0000";
        animButton.cornerRadius = 10;
        animButton.fontSize = 16;
        
        animButton.onPointerClickObservable.add(() => {
            playPreviewAnimation();
        });
        
        panel.addControl(animButton);
        
        // Start Game button
        const startButton = BABYLON.GUI.Button.CreateSimpleButton("startBtn", "START GAME");
        startButton.width = "180px";
        startButton.height = "50px";
        startButton.color = "#ffffff";
        startButton.background = "#2e8b57";
        startButton.cornerRadius = 10;
        startButton.fontSize = 18;
        startButton.fontWeight = "bold";
        
        startButton.onPointerClickObservable.add(() => {
            startGame();
        });
        
        panel.addControl(startButton);
    }
    
    /**
     * Load character preview
     */
    async function loadCharacterPreview(characterId) {
        console.log(`🎭 Loading preview for: ${characterId}`);
        
        // Remove old character
        if (currentCharacterMesh) {
            currentCharacterMesh.dispose();
            currentCharacterMesh = null;
        }
        
        try {
            // Create character container
            const characterRoot = new BABYLON.TransformNode("characterRoot", scene);
            characterRoot.position = new BABYLON.Vector3(0, 0, 0);
            
            // Load character
            const result = await characterLoader.loadCharacterModel(scene, characterRoot, characterId);
            
            currentCharacterMesh = result.hero;
            currentSkeleton = result.skeleton;
            
            // Setup animations
            currentAnimations = setupAnim(scene, currentSkeleton);
            
            // Start idle animation
            if (currentAnimations.BreathingIdle) {
                currentAnimations.BreathingIdle.start(true, 1.0);
            }
            
            // Reset color indices
            currentColorIndices = { skin: 0, hair: 0, armor: 0 };
            
            console.log(`✅ Character preview loaded: ${characterId}`);
        } catch (error) {
            console.error(`❌ Failed to load character preview:`, error);
        }
    }
    
    /**
     * Cycle through color options
     */
    function cycleColor(colorType) {
        const charData = characterLoader.getCharacterData(currentCharacterId);
        const colors = charData.colors[colorType];
        
        if (!colors || colors.length === 0) return;
        
        currentColorIndices[colorType] = (currentColorIndices[colorType] + 1) % colors.length;
        
        // Apply color (simplified - you can enhance this)
        console.log(`🎨 ${colorType} color changed to:`, colors[currentColorIndices[colorType]]);
    }
    
    /**
     * Play preview animation
     */
    function playPreviewAnimation() {
        if (!currentAnimations) return;
        
        autoRotate = false;
        
        // Stop all
        for (const anim of Object.values(currentAnimations)) {
            if (anim.isPlaying) anim.stop();
        }
        
        // Play attack animation
        if (currentAnimations.Attack) {
            currentAnimations.Attack.start(false, 1.3, 
                currentAnimations.Attack.from, 
                currentAnimations.Attack.to, 
                false
            );
            
            // Return to idle after animation
            setTimeout(() => {
                if (currentAnimations.BreathingIdle) {
                    currentAnimations.BreathingIdle.start(true, 1.0);
                }
                autoRotate = true;
            }, 2000);
        }
    }
    
    /**
     * Start the game
     */
    function startGame() {
        console.log(`🎮 Starting game with character: ${currentCharacterId}`);
        
        // Save selection
        characterLoader.saveCharacterSelection(currentCharacterId, {
            colors: currentColorIndices
        });
        
        // Navigate to game scene (you can customize this)
        if (SCENE_MANAGER) {
            SCENE_MANAGER.loadScene('outdoor');
        } else {
            console.log('✅ Character selected! Reload to play.');
            window.location.href = '?scene=outdoor';
        }
    }
    
    return scene;
}
