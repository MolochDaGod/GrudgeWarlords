export async function loadHeroModel(scene, character) {
	// TEMPORARY: Using HumanBaseMesh because racalvin.glb doesn't have embedded animations
	// TODO: Merge racalvin animations into single GLB file
	const result = await BABYLON.SceneLoader.ImportMeshAsync(null, "./assets/characters/human_basemesh/", "HumanBaseMesh_WithEquips.glb", scene);

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
