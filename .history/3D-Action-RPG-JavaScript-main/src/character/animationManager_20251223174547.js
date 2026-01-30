// Animation Manager for Racalvin Character
// Handles weapon-based animation switching

export class AnimationManager {
    constructor(scene, skeleton) {
        this.scene = scene;
        this.skeleton = skeleton;
        this.currentWeaponType = 'unarmed'; // default
        this.animations = {
            base: {},
            melee_axe: {},
            sword_shield: {},
            magic: {},
            greatsword: {},
            unarmed: {}
        };
        this.loadedAnimations = {};
        this.currentAnimation = null;
    }

    /**
     * Load animation from GLB file
     * @param {string} category - Animation category (base, melee_axe, etc.)
     * @param {string} animName - Name of animation
     * @param {string} fileName - GLB file name
     */
    async loadAnimation(category, animName, fileName) {
        const path = `./assets/characters/racalvin/animations/${category}/`;
        try {
            const result = await BABYLON.SceneLoader.ImportAnimationsAsync(
                path,
                fileName,
                this.scene,
                false,
                BABYLON.SceneLoaderAnimationGroupLoadingMode.Clean
            );
            
            if (result.animationGroups && result.animationGroups.length > 0) {
                const animGroup = result.animationGroups[0];
                animGroup.stop();
                this.animations[category][animName] = animGroup;
                this.loadedAnimations[`${category}.${animName}`] = animGroup;
                console.log(`✓ Loaded animation: ${category}/${animName}`);
                return animGroup;
            }
        } catch (error) {
            console.error(`Failed to load animation: ${category}/${fileName}`, error);
        }
        return null;
    }

    /**
     * Load all essential animations
     */
    async loadEssentialAnimations() {
        console.log('Loading essential animations...');
        
        // Base animations (always available)
        await this.loadAnimation('base', 'idle', 'standing idle.glb');
        await this.loadAnimation('base', 'idle2', 'standing idle 02.glb');
        await this.loadAnimation('base', 'walk', 'Standing Walk Forward.glb');
        await this.loadAnimation('base', 'walkBack', 'Standing Walk Back.glb');
        await this.loadAnimation('base', 'run', 'Standing Run Forward.glb');
        await this.loadAnimation('base', 'runBack', 'Standing Run Back.glb');
        await this.loadAnimation('base', 'jump', 'Standing Jump.glb');
        await this.loadAnimation('base', 'death', 'Standing React Death Backward.glb');
        
        console.log('Essential animations loaded.');
    }

    /**
     * Load weapon-specific animations
     */
    async loadWeaponAnimations(weaponType) {
        console.log(`Loading ${weaponType} animations...`);
        
        switch(weaponType) {
            case 'melee_axe':
                await this.loadAnimation('melee_axe', 'attack1', 'standing melee attack horizontal.glb');
                await this.loadAnimation('melee_axe', 'attack2', 'standing melee attack downward.glb');
                await this.loadAnimation('melee_axe', 'attack3', 'standing melee attack backhand.glb');
                await this.loadAnimation('melee_axe', 'combo1', 'standing melee combo attack ver. 1.glb');
                await this.loadAnimation('melee_axe', 'combo2', 'standing melee combo attack ver. 2.glb');
                await this.loadAnimation('melee_axe', 'combo3', 'standing melee combo attack ver. 3.glb');
                await this.loadAnimation('melee_axe', 'jumpAttack', 'standing melee run jump attack.glb');
                break;
                
            case 'sword_shield':
                await this.loadAnimation('sword_shield', 'idle', 'sword and shield idle.glb');
                await this.loadAnimation('sword_shield', 'walk', 'sword and shield walk.glb');
                await this.loadAnimation('sword_shield', 'run', 'sword and shield run.glb');
                await this.loadAnimation('sword_shield', 'slash1', 'sword and shield slash.glb');
                await this.loadAnimation('sword_shield', 'slash2', 'sword and shield slash (2).glb');
                await this.loadAnimation('sword_shield', 'slash3', 'sword and shield slash (3).glb');
                await this.loadAnimation('sword_shield', 'attack1', 'sword and shield attack.glb');
                await this.loadAnimation('sword_shield', 'attack2', 'sword and shield attack (2).glb');
                await this.loadAnimation('sword_shield', 'block', 'sword and shield block.glb');
                await this.loadAnimation('sword_shield', 'blockIdle', 'sword and shield block idle.glb');
                await this.loadAnimation('sword_shield', 'draw', 'draw sword 1.glb');
                await this.loadAnimation('sword_shield', 'sheath', 'sheath sword 1.glb');
                break;
                
            case 'magic':
                await this.loadAnimation('magic', 'cast1H_1', 'Standing 1H Magic Attack 01.glb');
                await this.loadAnimation('magic', 'cast1H_2', 'Standing 1H Magic Attack 02.glb');
                await this.loadAnimation('magic', 'cast1H_3', 'Standing 1H Magic Attack 03.glb');
                await this.loadAnimation('magic', 'castSpell1H', 'standing 1H cast spell 01.glb');
                await this.loadAnimation('magic', 'cast2H', 'Standing 2H Cast Spell 01.glb');
                await this.loadAnimation('magic', 'attack2H_1', 'Standing 2H Magic Attack 01.glb');
                await this.loadAnimation('magic', 'attack2H_2', 'Standing 2H Magic Attack 02.glb');
                await this.loadAnimation('magic', 'areaAttack1', 'Standing 2H Magic Area Attack 01.glb');
                await this.loadAnimation('magic', 'areaAttack2', 'Standing 2H Magic Area Attack 02.glb');
                break;
                
            case 'greatsword':
                await this.loadAnimation('greatsword', 'idle', 'great sword idle.glb');
                await this.loadAnimation('greatsword', 'walk', 'great sword walk.glb');
                await this.loadAnimation('greatsword', 'run', 'great sword run.glb');
                await this.loadAnimation('greatsword', 'slash1', 'great sword slash.glb');
                await this.loadAnimation('greatsword', 'slash2', 'great sword slash (2).glb');
                await this.loadAnimation('greatsword', 'slash3', 'great sword slash (3).glb');
                await this.loadAnimation('greatsword', 'attack', 'great sword attack.glb');
                await this.loadAnimation('greatsword', 'jumpAttack', 'great sword jump attack.glb');
                await this.loadAnimation('greatsword', 'spinAttack', 'great sword high spin attack.glb');
                await this.loadAnimation('greatsword', 'slideAttack', 'great sword slide attack.glb');
                await this.loadAnimation('greatsword', 'block', 'great sword blocking.glb');
                await this.loadAnimation('greatsword', 'draw', 'draw a great sword 1.glb');
                break;
                
            case 'unarmed':
                await this.loadAnimation('unarmed', 'stance1', 'ginga forward.glb');
                await this.loadAnimation('unarmed', 'stance2', 'ginga backward.glb');
                await this.loadAnimation('unarmed', 'kick1', 'armada.glb');
                await this.loadAnimation('unarmed', 'kick2', 'martelo 2.glb');
                await this.loadAnimation('unarmed', 'kick3', 'meia lua de compasso.glb');
                await this.loadAnimation('unarmed', 'dodge', 'esquiva 1.glb');
                await this.loadAnimation('unarmed', 'sweep', 'rasteira 1.glb');
                await this.loadAnimation('unarmed', 'combo', 'capoeira.glb');
                break;
        }
        
        console.log(`${weaponType} animations loaded.`);
    }

    /**
     * Switch current weapon type
     */
    async switchWeaponType(weaponType) {
        if (this.currentWeaponType === weaponType) return;
        
        console.log(`Switching to ${weaponType} mode...`);
        this.currentWeaponType = weaponType;
        
        // Load weapon animations if not already loaded
        if (Object.keys(this.animations[weaponType]).length === 0) {
            await this.loadWeaponAnimations(weaponType);
        }
        
        // Switch to appropriate idle animation
        this.playAnimation('idle');
    }

    /**
     * Play animation by name
     * @param {string} animName - Animation name within current weapon type
     * @param {boolean} loop - Whether to loop the animation
     * @param {number} speed - Animation speed multiplier
     */
    playAnimation(animName, loop = true, speed = 1.0) {
        // Stop current animation
        if (this.currentAnimation) {
            this.currentAnimation.stop();
        }
        
        // Try to get animation from current weapon type
        let animGroup = this.animations[this.currentWeaponType][animName];
        
        // Fallback to base animations if not found
        if (!animGroup) {
            animGroup = this.animations.base[animName];
        }
        
        if (animGroup) {
            animGroup.loopAnimation = loop;
            animGroup.speedRatio = speed;
            animGroup.start(loop);
            this.currentAnimation = animGroup;
            return animGroup;
        } else {
            console.warn(`Animation not found: ${animName} for ${this.currentWeaponType}`);
            return null;
        }
    }

    /**
     * Play one-shot animation then return to idle
     */
    playOneShotAnimation(animName, returnToIdle = true, speed = 1.0) {
        const animGroup = this.playAnimation(animName, false, speed);
        
        if (animGroup && returnToIdle) {
            animGroup.onAnimationGroupEndObservable.addOnce(() => {
                this.playAnimation('idle');
            });
        }
        
        return animGroup;
    }

    /**
     * Get available animations for current weapon type
     */
    getAvailableAnimations() {
        return {
            base: Object.keys(this.animations.base),
            current: Object.keys(this.animations[this.currentWeaponType])
        };
    }
}

export default AnimationManager;
