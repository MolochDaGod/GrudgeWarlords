
export function setupAnim(scene, skeleton) {
    let anim = {};
    
    // For racalvin model, create empty placeholder animations to prevent errors
    // The new AnimationManager system will handle actual animations
    const createPlaceholder = (name) => ({
        name: name,
        isPlaying: false,
        play: () => {},
        stop: () => {},
        reset: () => {}
    });

    // Create placeholders for backward compatibility
    anim.BreathingIdle = createPlaceholder("BreathingIdle");
    anim.Running = createPlaceholder("Running");
    anim.Jump = createPlaceholder("Jump");
    anim.Roll = createPlaceholder("Roll");
    anim.SelfCast = createPlaceholder("SelfCast");
    anim.Combo = createPlaceholder("Combo");
    anim.Attack = createPlaceholder("Attack");

    // Try to get existing animations from scene if available (for old models)
    if (scene.getAnimationGroupByName("BreathingIdle")) {
        anim.BreathingIdle = scene.getAnimationGroupByName("BreathingIdle");
        anim.Running = scene.getAnimationGroupByName("RunningSprint");
        anim.Jump = scene.getAnimationGroupByName("Jump");
        anim.Roll = scene.getAnimationGroupByName("SprintingForwardRollInPlace");
        anim.SelfCast = scene.getAnimationGroupByName('Standing 2H Magic Area Attack 02');
        anim.Combo = scene.getAnimationGroupByName('OneHandClubCombo');
        anim.Attack = scene.getAnimationGroupByName('Sword And Shield Attack');
    }

    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    return anim;
}