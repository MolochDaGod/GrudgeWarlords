# Grudge Warlords - Project Structure & Learning Guide

## 📂 Complete Directory Structure

### Working vs Reference Repositories

```
GrudgeWarlords/
│
├── 3D-Action-RPG-JavaScript-main/     ← YOUR WORKING COPY (edit here)
│   └── (full game structure)
│
└── reference-3D-Action-RPG/           ← REFERENCE ONLY (compare here)
    └── (original repository)
```

**Important**: 
- Edit files in `3D-Action-RPG-JavaScript-main/`
- Use `reference-3D-Action-RPG/` for comparison and learning
- Both have identical structure for easy comparison

## 🎮 Game Structure (3D-Action-RPG-JavaScript-main/)

### Core Files
```
├── index.html              # Main HTML entry point
├── game.js                 # Game initialization & entry
└── src/
    └── GLOBALS.js          # Global variables & configuration
```

### Scene System
```
src/scene/
├── SceneManager.js         # Scene loading & switching logic
├── scenes/                 # Individual scene implementations
│   ├── outdoor.js          # Open world scene
│   ├── indoor.js           # Interior scene
│   ├── inn.js              # Tavern scene
│   ├── town.js             # Village scene
│   ├── builder.js          # Level editor mode
│   ├── underground.js      # Cave system
│   └── roomGI.js           # Global Illumination demo
│
└── gen/                    # Generation systems
    └── procedural/         # Procedural generation
        ├── grid/           # Grid-based generation
        │   ├── constants.js
        │   └── gridManager.js
        └── wfc/            # Wave Function Collapse
```

### Character System
```
src/character/
├── CharacterController.js  # Player movement & input
├── damagePopup.js          # Damage number display
├── healthBar.js            # HP bar rendering
└── animation/              # Animation controllers
```

### Utilities & Helpers
```
src/utils/
├── assetLoader.js          # Load 3D models & textures
├── physics.js              # Havok physics setup
├── camera.js               # Camera controllers
├── lighting.js             # Light setup
└── settings/               # Configuration
    └── builderSettings.js
```

### Assets
```
assets/
├── models/                 # 3D models (.glb files)
│   ├── characters/
│   ├── environment/
│   └── props/
├── textures/               # Images & materials
├── sounds/                 # Audio files
└── assets.json             # Asset manifest
```

### Libraries
```
lib/
├── babylon.js              # Core Babylon.js engine
├── babylon.gui.min.js      # UI system
├── babylonjs.loaders.min.js # Model loaders
├── HavokPhysics_umd.js     # Physics engine
├── babylon.terrainMaterial.js
└── babylon.inspector.bundle.js # Debug tools
```

## 🌳 Skill Tree Editor (Skill-Tree-Maker-main/)

```
Skill-Tree-Maker-main/
├── index.html              # Editor entry point
├── src/
│   └── app/                # Vue.js application
│       ├── components/     # UI components
│       └── config/         # Editor configuration
└── img/
    ├── skill/              # Skill icons
    └── background/         # UI backgrounds
```

## 🔍 Key Files to Study for Learning

### 1. Understanding Game Initialization
**Start here**: `game.js` → `src/scene/SceneManager.js`

<augment_code_snippet path="3D-Action-RPG-JavaScript-main/game.js" mode="EXCERPT">
````javascript
import SceneManager from './src/scene/SceneManager.js';
window.addEventListener('DOMContentLoaded', async function () {
    SCENE_MANAGER = new SceneManager('renderCanvas');
    await SCENE_MANAGER.start();
});
````
</augment_code_snippet>

### 2. Scene Creation Pattern
**Study**: `src/scene/scenes/outdoor.js`
- Shows how to create a complete scene
- Physics setup
- Character loading
- Environment creation

### 3. Character Movement
**Study**: `src/character/CharacterController.js`
- Input handling
- Physics-based movement
- Animation control

### 4. Procedural Generation
**Study**: `src/scene/gen/procedural/`
- Grid-based generation
- Wave Function Collapse
- Dynamic content creation

## 🎯 How to Add New Content

### Adding a New Scene

1. **Create scene file**: `src/scene/scenes/myScene.js`
```javascript
export async function createMyScene(engine) {
    const scene = new BABYLON.Scene(engine);
    // Your scene setup here
    return scene;
}
```

2. **Register in SceneManager**: Edit `src/scene/SceneManager.js`
```javascript
import { createMyScene } from './scenes/myScene.js';
// Add to scene map
```

3. **Access**: `http://localhost:3001/?scene=myScene`

### Adding 3D Models

1. Place `.glb` file in `assets/models/`
2. Load in scene:
```javascript
const model = await BABYLON.SceneLoader.ImportMeshAsync(
    "", 
    "assets/models/", 
    "mymodel.glb", 
    scene
);
```

### Adding Character Abilities

1. Edit `src/character/CharacterController.js`
2. Add input handling
3. Add animation triggers
4. Add physics interactions

## 📊 Comparison Workflow

### When Learning a Feature:

1. **Find in Reference**: `reference-3D-Action-RPG/src/...`
2. **Compare with Working**: `3D-Action-RPG-JavaScript-main/src/...`
3. **Test Changes**: Edit working copy, refresh browser
4. **No Build Needed**: Changes are instant!

### Example: Learning Physics

```bash
# Compare these files:
reference-3D-Action-RPG/src/utils/physics.js
3D-Action-RPG-JavaScript-main/src/utils/physics.js

# Make changes to working copy
# Refresh browser to see results
```

## 🛠️ Development Workflow

### Daily Development

1. **Start Servers**: Run `START-SERVERS.bat`
2. **Open Hub**: http://localhost:8080
3. **Edit Code**: Make changes in `3D-Action-RPG-JavaScript-main/`
4. **Test**: Refresh browser (no build needed!)
5. **Compare**: Check `reference-3D-Action-RPG/` if stuck

### File Organization Tips

- **Keep reference clean**: Don't edit `reference-3D-Action-RPG/`
- **Work in main**: All edits in `3D-Action-RPG-JavaScript-main/`
- **Use version control**: Git commit your changes
- **Document changes**: Note what you modified

## 🎓 Learning Path

### Beginner
1. Study `game.js` - understand initialization
2. Explore `src/GLOBALS.js` - see configuration
3. Read `src/scene/SceneManager.js` - scene loading
4. Try modifying a simple scene like `inn.js`

### Intermediate
1. Study character controller
2. Learn physics integration
3. Understand asset loading
4. Modify existing scenes

### Advanced
1. Procedural generation systems
2. Custom shaders
3. Performance optimization
4. New scene creation

## 🔗 Integration Points for Grudge Island

### Key Systems to Integrate:

1. **Procedural Generation** (`src/scene/gen/procedural/`)
   - Grid system for island layout
   - WFC for structure generation

2. **Scene Management** (`src/scene/SceneManager.js`)
   - Dynamic scene loading
   - Seamless transitions

3. **Character System** (`src/character/`)
   - Player controller
   - Combat mechanics

4. **Skill Tree** (Skill-Tree-Maker-main/)
   - Character progression
   - Ability unlocks

## 📝 Notes

- All JavaScript is ES6 modules
- No transpilation needed
- Changes are instant (just refresh)
- Use browser DevTools for debugging
- Babylon.js Inspector available with `?debug=true`

