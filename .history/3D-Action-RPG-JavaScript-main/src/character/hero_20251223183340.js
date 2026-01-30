export async function loadHeroModel(scene, character) {
	let result, hero, skeleton;
	
	try {
		console.log("Loading racalvin character... - hero.js:3");
		// Load racalvin character model
		result = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);
		console.log("✓ Racalvin loaded - hero.js:6");

		// Load racalvin's base animations
		console.log("Loading animations... - hero.js:9");
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
		console.log("✓ All animations loaded - hero.js:22");

		hero = result.meshes[0];
		skeleton = result.skeletons[0];
		character.addChild(hero);
	} catch(error) {
		console.error("Error loading racalvin: - hero.js:27", error);
		throw error;
	}

	// Scale racalvin
	hero.scaling.scaleInPlace(1.0);
	hero.position.y = 0;

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
