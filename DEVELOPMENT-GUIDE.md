# Grudge Warlords - Development Guide

## 🎯 Project Overview

This project combines a 3D Action RPG built with Babylon.js and a Skill Tree Editor to create a generative island game experience.

## 📁 Project Structure

```
GrudgeWarlords/
├── 3D-Action-RPG-JavaScript-main/    # Main game (working copy)
│   ├── assets/                        # 3D models, textures, sounds
│   ├── lib/                           # Babylon.js libraries
│   ├── src/                           # Game source code
│   │   ├── scene/                     # Scene management
│   │   ├── character/                 # Player & NPC logic
│   │   ├── utils/                     # Utilities
│   │   └── GLOBALS.js                 # Global variables
│   ├── index.html                     # Main entry point
│   └── game.js                        # Game initialization
│
├── reference-3D-Action-RPG/          # Reference repository (read-only)
│   └── (same structure as above)     # Use for comparison & learning
│
├── Skill-Tree-Maker-main/            # Skill tree editor
│   ├── src/                           # Editor source
│   ├── img/                           # UI assets
│   └── index.html                     # Editor entry
│
├── server-game.js                     # Game server (port 3001)
├── server-editor.js                   # Editor server (port 5050)
├── server.js                          # Hub server (port 8080)
└── package.json                       # Dependencies
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Servers

**Option A: Start all servers**
```bash
npm run dev
```

**Option B: Start individually**
```bash
# Terminal 1 - Game Server
npm run game

# Terminal 2 - Editor Server
npm run editor

# Terminal 3 - Hub Server
npm start
```

### 3. Access the Applications

- **Hub**: http://localhost:8080 (landing page with all links)
- **Game**: http://localhost:3001
- **Editor**: http://localhost:5050

## 🎮 Game Features & Scenes

### Available Scenes
Access different scenes by adding `?scene=<name>` to the URL:

- **Outdoor**: `http://localhost:3001/?scene=outdoor` - Open world environment
- **Indoor**: `http://localhost:3001/?scene=indoor` - Interior spaces
- **Inn**: `http://localhost:3001/?scene=inn` - Tavern scene
- **Town**: `http://localhost:3001/?scene=town` - Village area
- **Builder**: `http://localhost:3001/?scene=builder` - Level editor mode
- **Underground**: `http://localhost:3001/?scene=underground` - Cave system

### Debug Mode
Add `&debug=true` to any URL to enable the Babylon.js inspector:
```
http://localhost:3001/?scene=outdoor&debug=true
```

## 📚 Key Files to Study

### Game Core
- `game.js` - Entry point, initializes SceneManager
- `src/scene/SceneManager.js` - Handles scene switching and loading
- `src/GLOBALS.js` - Global configuration and variables

### Character System
- `src/character/` - Player movement, combat, animations
- `src/character/damagePopup.js` - Damage number display

### Scene Examples
- `src/scene/scenes/outdoor.js` - Outdoor scene implementation
- `src/scene/scenes/builder.js` - Builder mode
- `src/scene/scenes/roomGI.js` - Global Illumination example

### Procedural Generation
- `src/scene/gen/procedural/` - Procedural content generation
- `src/scene/gen/procedural/grid/` - Grid-based generation

## 🛠️ How to Add/Edit Content

### Adding a New Scene

1. Create scene file in `src/scene/scenes/yourscene.js`
2. Register in `src/scene/SceneManager.js`
3. Access via `?scene=yourscene`

### Adding 3D Models

1. Place `.glb` files in `assets/`
2. Update `assets/assets.json` if needed
3. Load in scene using Babylon.js loaders

### Modifying Character Behavior

1. Edit files in `src/character/`
2. Changes are live - just refresh browser
3. No build step required!

## 🔧 Technology Stack

- **Babylon.js** - 3D engine
- **Havok Physics** - Physics simulation
- **Express.js** - Web servers
- **Vue.js** - Skill tree editor UI
- **WebGL/WebGPU** - Rendering

## 📖 Learning Resources

### Compare with Reference
The `reference-3D-Action-RPG/` folder contains the original repository.
Use it to:
- Compare your changes
- Learn best practices
- Find implementation examples
- Understand file organization

### Key Concepts to Learn
1. **Scene Management** - How scenes load and switch
2. **Physics Integration** - Havok physics setup
3. **Character Controller** - Movement and combat
4. **Asset Loading** - Models, textures, sounds
5. **Procedural Generation** - Dynamic content creation

## 🎯 Next Steps for Grudge Island Integration

1. Study the procedural generation in `src/scene/gen/procedural/`
2. Understand the grid system in `src/scene/gen/procedural/grid/`
3. Review the builder mode for level editing capabilities
4. Plan integration of skill tree system with game mechanics
5. Design the generative island architecture

## 💡 Development Tips

- **No Build Required**: This is vanilla JavaScript - changes are instant
- **Use Debug Mode**: Inspector helps understand scene structure
- **Check Console**: Babylon.js provides detailed logging
- **Mobile Testing**: Game supports touch controls
- **Performance**: Monitor FPS in debug mode

## 🐛 Troubleshooting

- **Port in use**: Change PORT in server files
- **Assets not loading**: Check file paths in browser console
- **Physics issues**: Ensure Havok library is loaded
- **Scene not found**: Verify scene name in SceneManager.js

