
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

    // Fix for Attack - find slash but not slash (2) or (3)
    const slashAnims = scene.animationGroups.filter(ag => ag.name.includes("sword and shield slash"));
    anim.Attack = slashAnims.find(ag => !ag.name.includes("(2)") && !ag.name.includes("(3)"));

    // Log which animations were found
    console.log("Loaded animations:", {
        BreathingIdle: !!anim.BreathingIdle,
        Running: !!anim.Running,
        Jump: !!anim.Jump,
        Roll: !!anim.Roll,
        SelfCast: !!anim.SelfCast,
        Combo: !!anim.Combo,
        Attack: !!anim.Attack
    });

    // Create dummy animations for missing ones to prevent errors
    const createDummyAnim = (name) => {
        return {
            name: name,
            isPlaying: false,
            start: () => console.warn(`Animation ${name} not loaded`),
            stop: () => {},
            play: () => console.warn(`Animation ${name} not loaded`),
            from: 0,
            to: 0
        };
    };

    if (!anim.BreathingIdle) anim.BreathingIdle = createDummyAnim('BreathingIdle');
    if (!anim.Running) anim.Running = createDummyAnim('Running');
    if (!anim.Jump) anim.Jump = createDummyAnim('Jump');
    if (!anim.Roll) anim.Roll = createDummyAnim('Roll');
    if (!anim.SelfCast) anim.SelfCast = createDummyAnim('SelfCast');
    if (!anim.Combo) anim.Combo = createDummyAnim('Combo');
    if (!anim.Attack) anim.Attack = createDummyAnim('Attack');

    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;

    return anim;
}