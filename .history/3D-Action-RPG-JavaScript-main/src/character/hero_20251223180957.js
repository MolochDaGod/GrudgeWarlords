export async function loadHeroModel(scene, character) {
	// Load racalvin visual model
	const racalvinResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);
	
	// Load HumanBaseMesh animations only (don't add meshes to scene)
	const animResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/human_basemesh/", "HumanBaseMesh_WithEquips.glb", scene);
	
	// Use racalvin mesh
	let hero = racalvinResult.meshes[0];
	character.addChild(hero);

	// Scale racalvin to match HumanBaseMesh proportions
	hero.scaling.scaleInPlace(3.7);
	hero.position.y = -11;

	var skeleton = racalvinResult.skeletons[0];

	// Transfer animations from HumanBaseMesh to racalvin skeleton
	const animSkeleton = animResult.skeletons[0];
	
	// Get all animation groups from HumanBaseMesh
	const animationGroups = scene.animationGroups.filter(ag => 
		ag.targetedAnimations.some(ta => ta.target && ta.target.skeleton === animSkeleton)
	);
	
	// Retarget animations to racalvin skeleton
	animationGroups.forEach(animGroup => {
		animGroup.targetedAnimations.forEach(targetedAnim => {
			// Find matching bone in racalvin skeleton
			if (targetedAnim.target && targetedAnim.target.name) {
				const boneName = targetedAnim.target.name;
				const racalvinBone = skeleton.bones.find(b => b.name === boneName);
				if (racalvinBone) {
					targetedAnim.target = racalvinBone;
				}
			}
		});
	});

	// Hide HumanBaseMesh meshes (keep only animations)
	animResult.meshes.forEach(mesh => mesh.setEnabled(false));

	var rootBone = skeleton.bones[0];
	rootBone.animations = [];

	// Override the root bone's position updates
	scene.onBeforeRenderObservable.add(() => {
		rootBone.position = BABYLON.Vector3.Zero();
		rootBone.rotationQuaternion = BABYLON.Quaternion.Identity();
	});

	racalvinResult.meshes[0].getChildren()[0].getChildren().forEach(mesh => {
		mesh.cameraCollide = false;
		if (mesh.material) mesh.material.transparencyMode = BABYLON.Material.MATERIAL_OPAQUE;
	});
	
	return { hero: hero, skeleton: skeleton };
}
