export async function loadHeroModel(scene, character) {
	// Load racalvin character
	const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);
	
	// Load sword & shield animations
	await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield idle.glb", scene);
	await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield run.glb", scene);
	await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield jump.glb", scene);
	await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield slash.glb", scene);
	await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield attack.glb", scene);
	await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield slash (2).glb", scene);
	await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield slash (3).glb", scene);

	let hero = result.meshes[0];
	character.addChild(hero);

	hero.scaling.scaleInPlace(1);
	hero.position.y = 0;

	var skeleton = result.skeletons[0];
	var rootBone = skeleton.bones[0];
	rootBone.animations = [];

	scene.onBeforeRenderObservable.add(() => {
		rootBone.position = BABYLON.Vector3.Zero();
		rootBone.rotationQuaternion = BABYLON.Quaternion.Identity();
	});

	result.meshes[0].getChildren()[0].getChildren().forEach(mesh => {
		mesh.cameraCollide = false;
		if (mesh.material) mesh.material.transparencyMode = BABYLON.Material.MATERIAL_OPAQUE;
	});
	
	return { hero: hero, skeleton: skeleton };
}
