
export function setupAnim(scene, skeleton) {
    let anim = {};
    
    // Map racalvin animations to game animation names
    anim.BreathingIdle = scene.getAnimationGroupByName("standing idle") || scene.getAnimationGroupByName("BreathingIdle");
    anim.Running = scene.getAnimationGroupByName("Standing Run Forward") || scene.getAnimationGroupByName("RunningSprint");
    anim.Jump = scene.getAnimationGroupByName("Standing Jump") || scene.getAnimationGroupByName("Jump");
    anim.Roll = scene.getAnimationGroupByName("Standing Run Forward") || scene.getAnimationGroupByName("SprintingForwardRollInPlace"); // Using run as placeholder
    anim.SelfCast = scene.getAnimationGroupByName("sword and shield attack") || scene.getAnimationGroupByName('Standing 2H Magic Area Attack 02');
    anim.Combo = scene.getAnimationGroupByName("sword and shield slash") || scene.getAnimationGroupByName('OneHandClubCombo');
    anim.Attack = scene.getAnimationGroupByName("sword and shield attack") || scene.getAnimationGroupByName('Sword And Shield Attack');

    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    return anim;
}