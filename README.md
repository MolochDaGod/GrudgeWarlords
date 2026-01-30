# 🎮 Grudge Warlords - Generative Island RPG

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=YOUR_GITHUB_URL)

A 3D Action RPG built with Babylon.js featuring **7 playable character races**, procedural generation, skill trees, and a comprehensive level editor.

## ✨ NEW: Character Selection System

🎭 **7 Playable Races**: Barbarian, Dwarf, Elf, Human, Orc, Undead, and Racalvin  
🖼️ **3D Character Preview**: Real-time rotating preview with animations  
🎨 **Color Customization**: Skin, hair, and armor options  
⚡ **Smart Animations**: Auto-detects Mixamo merged/separate animations  
💾 **Persistent Storage**: Your selection is automatically saved

See `CHARACTER-SYSTEM-GUIDE.md` and `QUICKSTART-CHARACTER-SYSTEM.md` for details!

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Modern web browser (Chrome, Firefox, Edge)

### Installation & Running

1. **Install dependencies** (already done):
```bash
npm install
```

2. **Start all servers** (easiest method):
```bash
# Windows
START-SERVERS.bat

# Or manually with npm
npm run dev
```

3. **Access the applications**:
- **Hub**: http://localhost:8080 (landing page)
- **Game**: http://localhost:3001 (Character Selection loads by default!)
- **Skill Tree Editor**: http://localhost:5050

## 📂 Project Structure

```
GrudgeWarlords/
├── 3D-Action-RPG-JavaScript-main/     # Main game (YOUR WORKING COPY)
│   ├── src/                            # Game source code
│   ├── assets/                         # 3D models, textures, sounds
│   ├── lib/                            # Babylon.js libraries
│   ├── Skill-Tree-Maker-main/         # Skill tree editor
│   └── index.html                      # Game entry point
│
├── reference-3D-Action-RPG/           # Reference repository (READ-ONLY)
│   └── (same structure)                # Use for comparison
│
├── server-game.js                      # Game server (port 3001)
├── server-editor.js                    # Editor server (port 5050)
├── server.js                           # Hub server (port 8080)
└── START-SERVERS.bat                   # Easy startup script
```

## 🎯 Available Game Scenes

Access different scenes by adding `?scene=<name>` to the game URL:

- **Character Select**: http://localhost:3001/?scene=characterSelect (DEFAULT)
- **Outdoor**: http://localhost:3001/?scene=outdoor
- **Indoor**: http://localhost:3001/?scene=indoor
- **Inn**: http://localhost:3001/?scene=inn
- **Town**: http://localhost:3001/?scene=town
- **Builder**: http://localhost:3001/?scene=builder (Level Editor)
- **Underground**: http://localhost:3001/?scene=underground

### Debug Mode
Add `&debug=true` to enable Babylon.js Inspector:
```
http://localhost:3001/?scene=outdoor&debug=true
```

## 🛠️ Development

### No Build Required!
This project uses vanilla JavaScript ES6 modules. Changes are instant:
1. Edit files in `3D-Action-RPG-JavaScript-main/`
2. Save
3. Refresh browser
4. See changes immediately!

### Key Directories

**Game Core**:
- `src/scene/` - Scene management and implementations
- `src/character/` - Player and NPC controllers
- `src/utils/` - Utilities and helpers
- `src/GLOBALS.js` - Global configuration

**Procedural Generation**:
- `src/scene/gen/procedural/` - Generation systems
- `src/scene/gen/procedural/grid/` - Grid-based generation
- `src/scene/gen/procedural/wfc/` - Wave Function Collapse

**Assets**:
- `assets/models/` - 3D models (.glb files)
- `assets/textures/` - Images and materials
- `assets/sounds/` - Audio files

## 📚 Learning Resources

### Documentation Files
- **CHARACTER-SYSTEM-GUIDE.md** - Complete character system documentation (NEW!)
- **QUICKSTART-CHARACTER-SYSTEM.md** - Quick start for character system (NEW!)
- **DEVELOPMENT-GUIDE.md** - Comprehensive development guide
- **PROJECT-STRUCTURE.md** - Detailed file structure and learning path
- **MIXAMO-CHARACTER-GUIDE.md** - Working with Mixamo animations
- **ANIMATION-SYSTEM-REFERENCE.md** - Animation system reference
- **README.md** - This file

### Reference Repository
The `reference-3D-Action-RPG/` folder contains the original source:
- Compare your changes
- Learn implementation patterns
- Find examples
- Understand best practices

**Important**: Edit files in `3D-Action-RPG-JavaScript-main/`, use `reference-3D-Action-RPG/` for comparison only!

## 🎨 Features

### Game Features
- ✅ **7 playable character races** (NEW!)
- ✅ **Dynamic character selection UI** (NEW!)
- ✅ **3D character preview & customization** (NEW!)
- ✅ 3D third-person action RPG
- ✅ Multiple scenes/levels
- ✅ Physics-based character controller
- ✅ Enemy AI with combat
- ✅ Mobile touch controls
- ✅ Gamepad support
- ✅ Procedural generation
- ✅ Level builder mode
- ✅ Mixamo animation support

### Editor Features
- ✅ Visual skill tree editor
- ✅ Node-based connections
- ✅ Export/Import functionality
- ✅ Custom skill icons
- ✅ Drag-and-drop interface

## 🔧 Technology Stack

- **Babylon.js** - 3D game engine
- **Havok Physics** - Physics simulation
- **Express.js** - Web servers
- **Vue.js** - Skill tree editor UI
- **WebGL/WebGPU** - Rendering

## 🎯 Next Steps for Grudge Island

1. **Study procedural generation** in `src/scene/gen/procedural/`
2. **Understand grid system** for island layout
3. **Review builder mode** for editing capabilities
4. **Plan skill tree integration** with game mechanics
5. **Design generative island** architecture

## 💡 Tips

- **Instant Changes**: No build step - just edit and refresh!
- **Debug Mode**: Use `?debug=true` for Babylon.js Inspector
- **Console Logs**: Check browser console for detailed info
- **Mobile Testing**: Game supports touch controls
- **Performance**: Monitor FPS in debug mode

## 🐛 Troubleshooting

**Port already in use?**
- Change PORT in server files or kill existing processes

**Assets not loading?**
- Check browser console for 404 errors
- Verify file paths are correct

**Physics not working?**
- Ensure HavokPhysics library is loaded
- Check console for physics errors

**Scene not found?**
- Verify scene name in `src/scene/SceneManager.js`
- Check URL parameter spelling

## 📖 Additional Resources

- [Babylon.js Documentation](https://doc.babylonjs.com/)
- [Babylon.js Playground](https://playground.babylonjs.com/)
- [Havok Physics](https://www.havok.com/)

## 🤝 Contributing

This is a learning and development project. Feel free to:
- Experiment with code
- Add new features
- Create new scenes
- Improve existing systems

---

**Ready to start?** Run `START-SERVERS.bat` and open http://localhost:8080!

