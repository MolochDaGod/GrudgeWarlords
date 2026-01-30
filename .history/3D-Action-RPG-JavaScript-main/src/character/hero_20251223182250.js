export async function loadHeroModel(scene, character) {
	// Load racalvin character model (Mixamo rig - same as HumanBaseMesh)
	const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);

	let hero = result.meshes[0];
	character.addChild(hero);

	// Scale racalvin to be similar size to original character
	hero.scaling.scaleInPlace(0.01);  // Racalvin may need different scale
	hero.position.y = 0;

	var skeleton = result.skeletons[0];

	var rootBone = skeleton.bones[0];
	rootBone.animations = [];

	// Override the root bone's position updates
	scene.onBeforeRenderObservable.add(() => {
		rootBone.position = BABYLON.Vector3.Zero();  // Negate root motion
		rootBone.rotationQuaternion = BABYLON.Quaternion.Identity();  // Optional: Negate root rotation
	});

	result.meshes[0].getChildren()[0].getChildren().forEach(mesh => {
		mesh.cameraCollide = false;
		if (mesh.material) mesh.material.transparencyMode = BABYLON.Material.MATERIAL_OPAQUE;
	});
	
	return { hero: hero, skeleton: skeleton };
}
