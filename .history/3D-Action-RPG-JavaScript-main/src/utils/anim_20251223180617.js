
export function setupAnim(scene, skeleton) {
    let anim = {};
    
    // Create placeholder matching Babylon.js AnimationGroup interface
    const createPlaceholder = (name, from = 0, to = 100) => ({
        name: name,
        isPlaying: false,
        from: from,
        to: to,
        start: function(loop, speed, fromFrame, toFrame, stopCurrent) {
            this.isPlaying = true;
            return this;
        },
        stop: function() {
            this.isPlaying = false;
            return this;
        },
        play: function(loop) {
            this.isPlaying = true;
            return this;
        },
        reset: function() {
            this.isPlaying = false;
            return this;
        },
        pause: function() {
            this.isPlaying = false;
            return this;
        }
    });

    // Try to get existing animations from scene if available (for HumanBaseMesh model)
    if (scene.getAnimationGroupByName("BreathingIdle")) {
        anim.BreathingIdle = scene.getAnimationGroupByName("BreathingIdle");
        anim.Running = scene.getAnimationGroupByName("RunningSprint");
        anim.Jump = scene.getAnimationGroupByName("Jump");
        anim.Roll = scene.getAnimationGroupByName("SprintingForwardRollInPlace");
        anim.SelfCast = scene.getAnimationGroupByName('Standing 2H Magic Area Attack 02');
        anim.Combo = scene.getAnimationGroupByName('OneHandClubCombo');
        anim.Attack = scene.getAnimationGroupByName('Sword And Shield Attack');
    } else {
        // Create placeholders for racalvin model (animations will be loaded later)
        anim.BreathingIdle = createPlaceholder("BreathingIdle", 0, 100);
        anim.Running = createPlaceholder("Running", 0, 30);
        anim.Jump = createPlaceholder("Jump", 0, 50);
        anim.Roll = createPlaceholder("Roll", 0, 40);
        anim.SelfCast = createPlaceholder("SelfCast", 0, 60);
        anim.Combo = createPlaceholder("Combo", 0, 80);
        anim.Attack = createPlaceholder("Attack", 0, 40);
    }

    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    return anim;
}