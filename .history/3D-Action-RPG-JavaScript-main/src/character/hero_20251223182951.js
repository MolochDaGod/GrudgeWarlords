export async function loadHeroModel(scene, character) {
	try {
		console.log("Loading racalvin character...");
		// Load racalvin character model
		const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);
		console.log("✓ Racalvin loaded");

		// Load racalvin's base animations
		console.log("Loading animations...");
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/base/", "standing idle.glb", scene);
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/base/", "Standing Run Forward.glb", scene);
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/base/", "Standing Jump.glb", scene);
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/base/", "Standing React Death Backward.glb", scene);
		
		// Load sword & shield animations  
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield attack.glb", scene);
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield slash.glb", scene);
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/sword_shield/", "sword and shield slash (2).glb", scene);
		
		// Load unarmed for roll animation
		await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/animations/unarmed/", "capoeira.glb", scene);
		console.log("✓ All animations loaded");

		let hero = result.meshes[0];
		character.addChild(hero);
	} catch(error) {
		console.error("Error loading racalvin:", error);
		throw error;
	}

	// Scale racalvin
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
