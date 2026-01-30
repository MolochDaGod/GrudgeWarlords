export async function loadHeroModel(scene, character) {
	// Load HumanBaseMesh for skeleton and animations
	const humanResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/human_basemesh/", "HumanBaseMesh_WithEquips.glb", scene);
	
	// Load racalvin for visual mesh only
	const racalvinResult = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);
	
	// Use HumanBaseMesh skeleton (has working animations)
	var skeleton = humanResult.skeletons[0];
	
	// Get racalvin mesh and bind it to HumanBaseMesh skeleton
	let racalvinMesh = racalvinResult.meshes[0];
	let racalvinBody = racalvinMesh.getChildren()[0];
	
	// Bind racalvin's mesh to HumanBaseMesh skeleton
	racalvinBody.skeleton = skeleton;
	
	// Scale and position racalvin
	racalvinMesh.scaling.scaleInPlace(1);
	racalvinMesh.position.y = 0;
	
	character.addChild(racalvinMesh);
	
	// Hide HumanBaseMesh visual (keep skeleton active)
	humanResult.meshes.forEach(mesh => mesh.setEnabled(false));

	var rootBone = skeleton.bones[0];
	rootBone.animations = [];

	scene.onBeforeRenderObservable.add(() => {
		rootBone.position = BABYLON.Vector3.Zero();
		rootBone.rotationQuaternion = BABYLON.Quaternion.Identity();
	});

	racalvinBody.getChildren().forEach(mesh => {
		mesh.cameraCollide = false;
		if (mesh.material) mesh.material.transparencyMode = BABYLON.Material.MATERIAL_OPAQUE;
	});
	
	return { hero: racalvinMesh, skeleton: skeleton };
}
