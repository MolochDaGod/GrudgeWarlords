export async function loadHeroModel(scene, character) {
	// Load Racalvin character model with HumanBaseMesh animations
	const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/racalvin/", "racalvin.glb", scene);

	let hero = result.meshes[0];
	character.addChild(hero);

	// Adjust scaling for racalvin model - test different values if needed
	hero.scaling.scaleInPlace(3.7);  // Using same scale as HumanBaseMesh for consistency
	hero.position.y = -11;

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
	
	// Initialize Animation Manager for Racalvin
	const animManager = new AnimationManager(scene, skeleton);
	await animManager.loadEssentialAnimations();
	
	// Set default weapon type to unarmed
	await animManager.switchWeaponType('unarmed');
	
	// Store animation manager in character for global access
	character.animManager = animManager;
	
	// result.meshes[1].material.backFaceCulling = true;
	// result.meshes[1].flipNormal = groundMat;
	// result.meshes[1].flipNormal.isEnabled = true;
	// await loadArmor(scene, skeleton, character);
	return { hero: hero, skeleton: skeleton, animManager: animManager };
}
