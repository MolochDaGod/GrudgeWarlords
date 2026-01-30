export async function loadHeroModel(scene, character) {
	// Load HumanBaseMesh first to get working animations and skeleton
	const humanResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/human_basemesh/", "HumanBaseMesh_WithEquips.glb", scene);
	
	// Load racalvin for visual appearance only
	const racalvinResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);
	
	// Use HumanBaseMesh as base (has working animations)
	let hero = humanResult.meshes[0];
	character.addChild(hero);

	hero.scaling.scaleInPlace(1);
	hero.position.y = 0;

	var skeleton = humanResult.skeletons[0];

	// Swap textures/materials from racalvin to HumanBaseMesh
	const racalvinMeshes = racalvinResult.meshes[0].getChildren()[0].getChildren();
	const humanMeshes = humanResult.meshes[0].getChildren()[0].getChildren();
	
	racalvinMeshes.forEach((racMesh, index) => {
		if (racMesh.material && humanMeshes[index]) {
			// Copy racalvin's material to HumanBaseMesh
			humanMeshes[index].material = racMesh.material.clone(`racalvin_material_${index}`);
		}
	});

	// Hide racalvin meshes (only needed materials)
	racalvinResult.meshes.forEach(mesh => mesh.dispose());

	var rootBone = skeleton.bones[0];
	rootBone.animations = [];

	scene.onBeforeRenderObservable.add(() => {
		rootBone.position = BABYLON.Vector3.Zero();
		rootBone.rotationQuaternion = BABYLON.Quaternion.Identity();
	});

	humanResult.meshes[0].getChildren()[0].getChildren().forEach(mesh => {
		mesh.cameraCollide = false;
		if (mesh.material) mesh.material.transparencyMode = BABYLON.Material.MATERIAL_OPAQUE;
	});
	
	return { hero: hero, skeleton: skeleton };
}
