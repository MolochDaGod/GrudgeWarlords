
export function setupAnim(scene, skeleton) {
    let anim = {};
    
    console.log("All animations:", scene.animationGroups.map(ag => ag.name));
    
    // Map racalvin sword_shield animations
    anim.BreathingIdle = scene.animationGroups.find(ag => ag.name.includes("sword and shield idle"));
    anim.Running = scene.animationGroups.find(ag => ag.name.includes("sword and shield run"));
    anim.Jump = scene.animationGroups.find(ag => ag.name.includes("sword and shield jump"));
    anim.Roll = scene.animationGroups.find(ag => ag.name.includes("sword and shield slash (3)"));
    anim.SelfCast = scene.animationGroups.find(ag => ag.name.includes("sword and shield attack"));
    anim.Combo = scene.animationGroups.find(ag => ag.name.includes("sword and shield slash (2)"));
    anim.Attack = scene.animationGroups.find(ag => ag.name.includes("sword and shield slash")) && !anim.Combo;

    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    return anim;
}