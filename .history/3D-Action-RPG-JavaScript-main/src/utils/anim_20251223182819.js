
export function setupAnim(scene, skeleton) {
    let anim = {};
    
    // Debug: Log all available animation groups
    console.log("Available animations:", scene.animationGroups.map(ag => ag.name));
    
    // Map racalvin animations to game animation names (using exact GLB animation group names)
    anim.BreathingIdle = scene.getAnimationGroupByName("Armature|standing idle|BaseLayer") || scene.getAnimationGroupByName("BreathingIdle");
    anim.Running = scene.getAnimationGroupByName("Armature|Standing Run Forward|BaseLayer") || scene.getAnimationGroupByName("RunningSprint");
    anim.Jump = scene.getAnimationGroupByName("Armature|Standing Jump|BaseLayer") || scene.getAnimationGroupByName("Jump");
    anim.Roll = scene.getAnimationGroupByName("Armature|capoeira|BaseLayer") || scene.getAnimationGroupByName("SprintingForwardRollInPlace");
    anim.SelfCast = scene.getAnimationGroupByName("Armature|Standing React Death Backward|BaseLayer") || scene.getAnimationGroupByName('Standing 2H Magic Area Attack 02');
    anim.Combo = scene.getAnimationGroupByName("Armature|sword and shield slash (2)|BaseLayer") || scene.getAnimationGroupByName('OneHandClubCombo');
    anim.Attack = scene.getAnimationGroupByName("Armature|sword and shield attack|BaseLayer") || scene.getAnimationGroupByName('Sword And Shield Attack');

    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    return anim;
}