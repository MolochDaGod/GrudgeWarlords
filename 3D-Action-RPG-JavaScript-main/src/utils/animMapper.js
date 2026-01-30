/**
 * animMapper.js
 * Enhanced animation mapping system
 * Supports both separate animation files (Racalvin) and merged animation files (new characters)
 */

/**
 * Animation name patterns for merged animation files
 * These patterns help identify animations from Mixamo merged files
 */
const ANIMATION_PATTERNS = {
    BreathingIdle: [
        'idle',
        'breathing',
        'standing',
        'sword and shield idle',
        'Armature|mixamo.com|Layer0'  // Common Mixamo pattern for first animation
    ],
    Running: [
        'run',
        'running',
        'jog',
        'sword and shield run'
    ],
    Jump: [
        'jump',
        'jumping',
        'sword and shield jump'
    ],
    Roll: [
        'roll',
        'dodge',
        'evade',
        'slash (3)',
        'sword and shield slash (3)'
    ],
    SelfCast: [
        'cast',
        'spell',
        'magic',
        'attack',
        'sword and shield attack'
    ],
    Combo: [
        'combo',
        'slash (2)',
        'sword and shield slash (2)',
        'attack_2'
    ],
    Attack: [
        'slash',
        'attack_1',
        'sword and shield slash',
        'swing'
    ]
};

/**
 * Setup animation system
 * Automatically detects animation naming conventions and maps them
 */
export function setupAnim(scene, skeleton) {
    let anim = {};

    console.log("🎬 Setting up animation system...");
    console.log("📋 All loaded animation groups:", scene.animationGroups.map(ag => ag.name));

    // Check if we have animations at all
    if (!scene.animationGroups || scene.animationGroups.length === 0) {
        console.warn("⚠️ No animation groups found! Creating dummy animations.");
        return createAllDummyAnimations();
    }

    // Auto-detect animation naming convention
    const firstAnim = scene.animationGroups[0].name;
    const isMixamoMerged = firstAnim.includes('mixamo') || firstAnim.includes('Armature');
    
    console.log(`🔍 Animation format detected: ${isMixamoMerged ? 'Mixamo Merged' : 'Standard'}`);

    // Map animations using pattern matching
    for (const [animKey, patterns] of Object.entries(ANIMATION_PATTERNS)) {
        anim[animKey] = findAnimationByPatterns(scene.animationGroups, patterns, animKey);
    }

    // Special case: Attack animation (avoid matching slash (2) or (3))
    if (!anim.Attack || anim.Attack.name.includes('(2)') || anim.Attack.name.includes('(3)')) {
        const slashAnims = scene.animationGroups.filter(ag => 
            (ag.name.toLowerCase().includes('slash') || ag.name.toLowerCase().includes('attack'))
        );
        anim.Attack = slashAnims.find(ag => 
            !ag.name.includes('(2)') && !ag.name.includes('(3)') && ag !== anim.Combo && ag !== anim.Roll
        ) || anim.Attack;
    }

    // Log which animations were found
    console.log("✅ Animation mapping results:");
    const mappingResults = {};
    for (const [key, value] of Object.entries(anim)) {
        const found = !!value && value.name !== 'DUMMY';
        mappingResults[key] = found ? `✅ ${value.name}` : '❌ Not found';
        console.log(`  ${key}: ${mappingResults[key]}`);
    }

    // Create dummy animations for missing ones
    for (const [key, value] of Object.entries(anim)) {
        if (!value || !value.name || value.name === 'DUMMY') {
            console.warn(`⚠️ Creating dummy animation for: ${key}`);
            anim[key] = createDummyAnim(key);
        }
    }

    // Setup animation blending
    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    console.log("🎬 Animation system ready!");

    return anim;
}

/**
 * Find animation by pattern matching
 */
function findAnimationByPatterns(animationGroups, patterns, animKey) {
    for (const pattern of patterns) {
        const found = animationGroups.find(ag => 
            ag.name.toLowerCase().includes(pattern.toLowerCase())
        );
        
        if (found) {
            console.log(`  ✅ ${animKey}: Found '${found.name}' (pattern: '${pattern}')`);
            return found;
        }
    }
    
    console.warn(`  ⚠️ ${animKey}: No match found`);
    return null;
}

/**
 * Create dummy animation placeholder
 */
function createDummyAnim(name) {
    return {
        name: `DUMMY_${name}`,
        isPlaying: false,
        start: function() { 
            console.warn(`⚠️ Animation ${name} not loaded - using dummy`);
            return this;
        },
        stop: function() { return this; },
        play: function() { 
            console.warn(`⚠️ Animation ${name} not loaded - using dummy`);
            return this;
        },
        reset: function() { return this; },
        pause: function() { return this; },
        from: 0,
        to: 0
    };
}

/**
 * Create all dummy animations (fallback)
 */
function createAllDummyAnimations() {
    const animKeys = ['BreathingIdle', 'Running', 'Jump', 'Roll', 'SelfCast', 'Combo', 'Attack'];
    const anim = {};
    
    for (const key of animKeys) {
        anim[key] = createDummyAnim(key);
    }
    
    return anim;
}

/**
 * Animation state manager for better control
 */
export class AnimationController {
    constructor(animationSet) {
        this.animations = animationSet;
        this.currentAnimation = null;
        this.previousAnimation = null;
    }

    /**
     * Play animation with automatic previous animation stop
     */
    play(animName, loop = false, speed = 1.0, fromFrame = null, toFrame = null) {
        const anim = this.animations[animName];
        
        if (!anim) {
            console.warn(`Animation '${animName}' not found`);
            return false;
        }

        // Stop previous animation
        if (this.currentAnimation && this.currentAnimation !== anim) {
            this.currentAnimation.stop();
        }

        // Start new animation
        const from = fromFrame !== null ? fromFrame : anim.from;
        const to = toFrame !== null ? toFrame : anim.to;
        
        anim.start(loop, speed, from, to, false);
        
        this.previousAnimation = this.currentAnimation;
        this.currentAnimation = anim;

        return true;
    }

    /**
     * Stop current animation
     */
    stop() {
        if (this.currentAnimation) {
            this.currentAnimation.stop();
            this.previousAnimation = this.currentAnimation;
            this.currentAnimation = null;
        }
    }

    /**
     * Stop all animations
     */
    stopAll() {
        for (const anim of Object.values(this.animations)) {
            if (anim.isPlaying) {
                anim.stop();
            }
        }
        this.currentAnimation = null;
    }

    /**
     * Check if specific animation is playing
     */
    isPlaying(animName) {
        const anim = this.animations[animName];
        return anim && anim.isPlaying;
    }

    /**
     * Get current playing animation name
     */
    getCurrentAnimationName() {
        if (!this.currentAnimation) return null;
        
        for (const [name, anim] of Object.entries(this.animations)) {
            if (anim === this.currentAnimation) {
                return name;
            }
        }
        
        return null;
    }
}

/**
 * Export for backward compatibility
 */
export default setupAnim;
