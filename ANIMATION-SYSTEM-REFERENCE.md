# 🎬 Animation System - Complete Reference

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ANIMATION SYSTEM FLOW                     │
└─────────────────────────────────────────────────────────────┘

1. CHARACTER LOADING (hero.js)
   ├── Load character model (.glb)
   ├── Load animation files (.glb)
   └── Extract skeleton & meshes

2. ANIMATION SETUP (anim.js)
   ├── Find animation groups by name
   ├── Map to game action names
   └── Configure blending & speed

3. INPUT HANDLING (movement.js)
   ├── Capture keyboard/mouse/gamepad
   ├── Update inputMap{}
   └── Trigger animations based on input

4. ANIMATION PLAYBACK
   ├── Stop current animation
   ├── Start new animation
   └── Blend between animations
```

## 🗂️ File Structure

### Core Files (3 files to modify)

```
src/
├── character/
│   └── hero.js              ← Load character & animations
├── utils/
│   └── anim.js              ← Map animation names
└── movement.js              ← Input handling & triggers
```

## 📝 Detailed File Breakdown

### 1. hero.js - Character & Animation Loading

**Location**: `src/character/hero.js`

**Purpose**: Loads the 3D model and all animation files

**Key Sections**:
```javascript
// Line 1-3: Load character model
const result = await BABYLON.SceneLoader.ImportMeshAsync(
    null, 
    "./assets/characters/racalvin/",  // ← Character folder
    "racalvin.glb",                    // ← Model file
    scene
);

// Line 6-12: Load animation files
await BABYLON.SceneLoader.ImportMeshAsync(
    null, 
    "./assets/characters/racalvin/animations/sword_shield/",  // ← Animation folder
    "sword and shield idle.glb",                               // ← Animation file
    scene
);
// ... repeat for each animation

// Line 14-18: Setup character
let hero = result.meshes[0];
character.addChild(hero);
hero.scaling.scaleInPlace(1);    // ← Adjust size
hero.position.y = 0;             // ← Adjust height

// Line 20-22: Get skeleton
var skeleton = result.skeletons[0];
var rootBone = skeleton.bones[0];

// Line 34: Return for use in scenes
return { hero: hero, skeleton: skeleton };
```

**What to change for new character**:
- Line 3: Character folder path
- Line 4: Character model filename
- Lines 6-12: Animation folder paths and filenames
- Line 17: Scale value
- Line 18: Y position

---

### 2. anim.js - Animation Name Mapping

**Location**: `src/utils/anim.js`

**Purpose**: Maps animation file names to game action names

**Key Sections**:
```javascript
export function setupAnim(scene, skeleton) {
    let anim = {};
    
    // Line 5: Debug - see all loaded animations
    console.log("All animations:", scene.animationGroups.map(ag => ag.name));
    
    // Lines 8-14: Map animations to game actions
    anim.BreathingIdle = scene.animationGroups.find(ag => ag.name.includes("idle"));
    anim.Running = scene.animationGroups.find(ag => ag.name.includes("run"));
    anim.Jump = scene.animationGroups.find(ag => ag.name.includes("jump"));
    anim.Roll = scene.animationGroups.find(ag => ag.name.includes("slash (3)"));
    anim.SelfCast = scene.animationGroups.find(ag => ag.name.includes("attack"));
    anim.Combo = scene.animationGroups.find(ag => ag.name.includes("slash (2)"));
    anim.Attack = scene.animationGroups.find(ag => ag.name.includes("slash"));
    
    // Lines 16-18: Animation blending settings
    scene.animationPropertiesOverride = new BABYLON.AnimationPropertiesOverride();
    scene.animationPropertiesOverride.enableBlending = true;
    scene.animationPropertiesOverride.blendingSpeed = 0.15;  // ← Blend speed
    
    return anim;
}
```

**Animation Object Structure**:
```javascript
anim = {
    BreathingIdle: AnimationGroup,  // ← Default idle
    Running: AnimationGroup,        // ← Movement
    Jump: AnimationGroup,           // ← Jump action
    Roll: AnimationGroup,           // ← Dodge/roll
    SelfCast: AnimationGroup,       // ← Magic/special
    Combo: AnimationGroup,          // ← Combo attack
    Attack: AnimationGroup          // ← Basic attack
}
```

**What to change for new animations**:
- Lines 8-14: Update `.includes("...")` to match your animation names
- Line 18: Adjust blend speed (0.05 = slow, 0.3 = fast)

---

### 3. movement.js - Input & Animation Triggers

**Location**: `src/movement.js`

**Purpose**: Handles all input and triggers animations

**Key Sections**:

#### Input Capture (Lines 4-15)
```javascript
inputMap = {};  // Tracks which keys are pressed
scene.actionManager = new BABYLON.ActionManager(scene);

// Keydown
scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyDownTrigger, 
        function (evt) {
            var key = evt.sourceEvent.key;
            inputMap[key.toLowerCase()] = true;
        }
    )
);

// Keyup
scene.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        BABYLON.ActionManager.OnKeyUpTrigger, 
        function (evt) {
            var key = evt.sourceEvent.key;
            inputMap[key.toLowerCase()] = false;
        }
    )
);
```

#### Animation Triggers

**Movement (W/A/S/D)**:
```javascript
// Line 287-300: Forward movement
if (inputMap["w"] || inputMap["ArrowUp"]) {
    moveDirection.addInPlace(forward);
    hero.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(forwardAngle, 3.14, 0);
    
    if (!anim.Roll.isPlaying && !anim.Attack.isPlaying && !anim.Combo.isPlaying) {
        // Stop other animations
        for (let key in anim) {
            if (anim.hasOwnProperty(key) && anim[key].isPlaying) {
                if (key !== 'Running') anim[key].stop();
            }
        }
        // Start running animation
        anim.Running.start(true, 1.1, anim.Running.from, anim.Running.to, false);
        //                  ↑    ↑
        //                loop  speed
    }
}
```

**Roll (Space)**:
```javascript
// Line 490-496
if (inputMap[" "]) {
    anim.BreathingIdle.stop();
    anim.Running.stop();
    anim.Roll.start(false, 2.0, anim.Roll.from, anim.Roll.to, true);
    //              ↑      ↑
    //           no loop  speed
}
```

**Jump (V)**:
```javascript
// Line 499-505
if (inputMap["v"]) {
    anim.Jump.start(false, 1.0, anim.Jump.from + 30, anim.Jump.to - 40, false);
    //              ↑      ↑     ↑                   ↑
    //           no loop speed  start frame         end frame
}
```

**Attack (5 or Mouse)**:
```javascript
// Line 462-475
if (inputMap["5"] || thirdAttack) {
    anim.BreathingIdle.stop();
    anim.Running.stop();
    
    if (!anim.Roll.isPlaying && !anim.Running.isPlaying) {
        // Stop all except Attack
        for (let key in anim) {
            if (anim.hasOwnProperty(key) && anim[key].isPlaying) {
                if (key !== 'Attack') anim[key].stop();
            }
        }
        anim.Attack.start(false, 1.3, anim.Attack.from, anim.Attack.to - 20, true);
    }
}
```

**Combo (4)**:
```javascript
// Line 431-457
if (inputMap["4"] || mouseIsActive && !thirdAttack) {
    anim.BreathingIdle.stop();
    anim.Running.stop();
    
    if (!anim.Roll.isPlaying && !anim.Running.isPlaying) {
        if (combo === 1) {
            combo += 1;
        }
        if (combo === 2) {
            anim.Combo.start(false, 1.6, combo2length, anim.Combo.to - 65, true);
        }
        if (combo === 3) {
            anim.Combo.start(false, 1.6, anim.Combo.from + 25, combo1length, true);
            combo = 0;
        }
    }
}
```

---

## 🎮 Animation Start() Parameters

```javascript
animationGroup.start(loop, speed, from, to, stopCurrent)
```

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `loop` | boolean | Loop animation? | `true` for idle/run, `false` for attacks |
| `speed` | number | Playback speed | `1.0` = normal, `2.0` = 2x speed |
| `from` | number | Start frame | `anim.Attack.from` or custom frame |
| `to` | number | End frame | `anim.Attack.to` or custom frame |
| `stopCurrent` | boolean | Stop other animations? | Usually `true` |

---

## 🔑 Complete Hotkey Reference

| Key | Action | Animation | File Location |
|-----|--------|-----------|---------------|
| W/↑ | Move Forward | Running | movement.js:287 |
| S/↓ | Move Backward | Running | movement.js:309 |
| A/← | Strafe Left | Running | movement.js:321 |
| D/→ | Strafe Right | Running | movement.js:343 |
| Space | Roll/Dodge | Roll | movement.js:490 |
| V | Jump | Jump | movement.js:499 |
| 4 | Combo Attack | Combo | movement.js:431 |
| 5 | Heavy Attack | Attack | movement.js:462 |
| C | Magic Cast | SelfCast | movement.js:477 |
| F | Toggle Sprint | - | movement.js:218 |
| Mouse Click | Attack | Attack/Combo | movement.js:431 |

---

## 💡 Quick Modification Examples

### Change Attack Key from "5" to "E"
```javascript
// In movement.js, line 462
if (inputMap["e"]) {  // Changed from "5"
    anim.Attack.start(false, 1.3, anim.Attack.from, anim.Attack.to - 20, true);
}
```

### Add New Animation on Key "6"
```javascript
// In movement.js, add after line 505
if (inputMap["6"]) {
    anim.YourNewAnimation.start(false, 1.0, anim.YourNewAnimation.from, anim.YourNewAnimation.to, true);
}
```

### Make Running Faster
```javascript
// In movement.js, line 299
anim.Running.start(true, 1.5, anim.Running.from, anim.Running.to, false);
//                       ↑ Changed from 1.1 to 1.5
```

---

## 🎯 Summary

**To add a new Mixamo character**:
1. ✅ Update `hero.js` - model and animation file paths
2. ✅ Update `anim.js` - animation name mappings
3. ✅ (Optional) Update `movement.js` - only if changing hotkeys

**That's it!** The system handles the rest automatically.

