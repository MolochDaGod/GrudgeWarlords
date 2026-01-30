
export default function addSword(scene, sword) {
    let childMeshes = sword.getChildMeshes();

    // To find a specific child by name
    let specificChild = childMeshes.find(mesh => mesh.name === "mesh");
    if (specificChild && specificChild.material && specificChild.material instanceof BABYLON.PBRMaterial) {
        specificChild.material._albedoColor = new BABYLON.Color3(2.7, 2.7, 2.7);
        specificChild.material.metallic = 1;
        specificChild.material.roughness = 1;
    } else if (specificChild) {
        console.warn("Sword material is not a PBRMaterial or is not assigned");
    }

    // Find right hand bone
    const rightHand = findBone(scene, "mixamorig:RightHand");
    
    if (rightHand && specificChild) {
        attachSwordToBone(specificChild, rightHand);
    } else {
        console.error("Failed to attach sword - bone or mesh not found");
    }
    
    return specificChild;
}

function findBone(scene, boneName) {
    for (const mesh of scene.meshes) {
        if (mesh.skeleton) {
            const bone = mesh.skeleton.bones.find(b => b.name === boneName);
            if (bone) return bone;
        }
    }
    return null;
}

function attachSwordToBone(sword, rightHand) {
    // Original HumanBaseMesh values
    let position = new BABYLON.Vector3(0, 26, 10);
    let scaling = new BABYLON.Vector3(500, 500, 500);
    let rotation = BABYLON.Quaternion.FromEulerAngles(
        degreesToRadians(0),
        degreesToRadians(100),
        degreesToRadians(180)
    );
    attachToBone(sword, rightHand, position, scaling, rotation);
}


const degreesToRadians = (degrees) => degrees * Math.PI / 180;

function attachToBone(mesh, bone, position, scaling, rotation) {
    if (bone) {
        mesh.parent = bone;
        mesh.position = position;
        mesh.scaling = scaling;
        mesh.rotationQuaternion = rotation;
    } else {
        console.error("Bone not found");
    }
}