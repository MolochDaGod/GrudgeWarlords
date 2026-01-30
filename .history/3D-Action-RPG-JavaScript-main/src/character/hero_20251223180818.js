export async function loadHeroModel(scene, character) {
	// Load HumanBaseMesh character model with all animations
	const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/human_basemesh/", "HumanBaseMesh_WithEquips.glb", scene);

	let hero = result.meshes[0];
	character.addChild(hero);

	// Original working scale
	hero.scaling.scaleInPlace(1);
	hero.position.y = 0;

	// Convert -90 degrees to radians
	var degrees = -90;
	var radians = degrees * (Math.PI / 180);

	var skeleton = result.skeletons[0];

	// Assuming the root bone is the first bone
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
	
	// Use old animation system for now - new AnimationManager available for future
	// character.animManager can be initialized later when we add racalvin-specific animations
	
	return { hero: hero, skeleton: skeleton };
}
