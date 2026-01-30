export async function loadHeroModel(scene, character) {
	// Load racalvin with its own skeleton
	const racalvinResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);
	
	// Load HumanBaseMesh to get animation data
	const humanResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/human_basemesh/", "HumanBaseMesh_WithEquips.glb", scene);
	
	// Use racalvin mesh and skeleton
	let hero = racalvinResult.meshes[0];
	var skeleton = racalvinResult.skeletons[0];
	
	character.addChild(hero);
	hero.scaling.scaleInPlace(1);
	hero.position.y = 0;

	// Clone animation groups from HumanBaseMesh to racalvin skeleton
	const humanSkeleton = humanResult.skeletons[0];
	const animationGroups = scene.animationGroups.slice(); // Copy array
	
	animationGroups.forEach(animGroup => {
		// Check if this animation belongs to HumanBaseMesh
		const isHumanAnim = animGroup.targetedAnimations.some(ta => 
			ta.target && ta.target._skeleton === humanSkeleton
		);
		
		if (isHumanAnim) {
			// Clone and retarget to racalvin bones
			const clonedGroup = animGroup.clone(animGroup.name + "_racalvin", (oldTarget) => {
				// Find matching bone by name in racalvin skeleton
				if (oldTarget && oldTarget.name) {
					const matchingBone = skeleton.bones.find(b => b.name === oldTarget.name);
					return matchingBone || oldTarget;
				}
				return oldTarget;
			});
		}
	});

	// Hide HumanBaseMesh meshes
	humanResult.meshes.forEach(mesh => mesh.setEnabled(false));

	var rootBone = skeleton.bones[0];
	rootBone.animations = [];

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
