
export default function addSword(scene, sword, skeleton) {
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

    // Find right hand bone - try multiple naming conventions
    const rightHand = findBone(scene, skeleton, ["mixamorig:RightHand", "RightHand", "right_hand", "R_Hand"]);
    
    if (rightHand && specificChild) {
        attachSwordToBone(specificChild, rightHand);
        console.log("✓ Sword attached to:", rightHand.name);
    } else {
        console.error("Failed to attach sword - bone or mesh not found", {
            rightHand: rightHand?.name,
            specificChild: specificChild?.name
        });
    }
    
    return specificChild;
}

function findBone(scene, skeleton, boneNames) {
    // First try to find in skeleton directly
    if (skeleton) {
        for (let boneName of boneNames) {
            const bone = skeleton.bones.find(b => b.name === boneName);
            if (bone) {
                console.log("Found bone in skeleton:", boneName);
                return bone;
            }
        }
    }
    
    // Fallback to searching all meshes
    for (let boneName of boneNames) {
        const found = findAllMeshesByName(scene.meshes, boneName)[0];
        if (found) {
            console.log("Found bone in scene meshes:", boneName);
            return found;
        }
    }
    
    // Debug: log available bones
    if (skeleton) {
        console.log("Available bones:", skeleton.bones.map(b => b.name).slice(0, 20));
    }
    
    return null;
}

function findAllMeshesByName(meshes, name) {
    let foundMeshes = [];
    meshes.forEach(mesh => {
        if (mesh.name === name) {
            foundMeshes.push(mesh);
        }
        if (mesh.getChildren) {
            foundMeshes = foundMeshes.concat(findAllMeshesByName(mesh.getChildren(), name));
        }
    });
    return foundMeshes;
}

function attachSwordToBone(sword, rightHand) {
    // Adjusted for racalvin model scale (3.7)
    // Scale values are relative to character scale, so we compensate
    let position = new BABYLON.Vector3(0, 7, 2.7);  // Adjusted for 3.7 character scale
    let scaling = new BABYLON.Vector3(135, 135, 135);  // Adjusted from 500 for 3.7 scale
    let rotation = BABYLON.Quaternion.FromEulerAngles(
        degreesToRadians(0),    // 0 degrees in radians
        degreesToRadians(100),  // 100 degrees in radians
        degreesToRadians(180)   // 180 degrees in radians
    );
    attachToBone(sword, rightHand, position, scaling, rotation);
}


const degreesToRadians = (degrees) => degrees * Math.PI / 180;

function attachToBone(mesh, bone, position, scaling, rotation) {
    if (bone) {
        mesh.parent = bone;
        mesh.position = position; // Adjust position relative to the bone as needed
        mesh.scaling = scaling;
        mesh.rotationQuaternion = rotation;
    } else {
        console.error("Bone not found");
    }
}
