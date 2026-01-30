
export function setupAnim(scene, skeleton) {
    let anim = {};
    
    // Get animations from HumanBaseMesh model
    anim.BreathingIdle = scene.getAnimationGroupByName("BreathingIdle");
    anim.Running = scene.getAnimationGroupByName("RunningSprint");
    anim.Jump = scene.getAnimationGroupByName("Jump");
    anim.Roll = scene.getAnimationGroupByName("SprintingForwardRollInPlace");
    anim.SelfCast = scene.getAnimationGroupByName('Standing 2H Magic Area Attack 02');
    anim.Combo = scene.getAnimationGroupByName('OneHandClubCombo');
    anim.Attack = scene.getAnimationGroupByName('Sword And Shield Attack');

    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    return anim;
}