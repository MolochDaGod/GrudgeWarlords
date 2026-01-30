# 🎮 Grudge Warlords - Quick Reference

## 🚀 Start Development

```bash
# Windows - Double click this file:
START-SERVERS.bat

# Or run manually:
npm run dev
```

## 🌐 URLs

| Service | URL | Purpose |
|---------|-----|---------|
| **Hub** | http://localhost:8080 | Landing page with all links |
| **Game** | http://localhost:3001 | 3D Action RPG |
| **Editor** | http://localhost:5050 | Skill Tree Editor |

## 🎯 Game Scenes

| Scene | URL | Description |
|-------|-----|-------------|
| Outdoor | http://localhost:3001/?scene=outdoor | Open world |
| Indoor | http://localhost:3001/?scene=indoor | Interior spaces |
| Inn | http://localhost:3001/?scene=inn | Tavern |
| Town | http://localhost:3001/?scene=town | Village |
| Builder | http://localhost:3001/?scene=builder | **Level Editor** |
| Underground | http://localhost:3001/?scene=underground | Caves |

**Debug Mode**: Add `&debug=true` to any URL

## 📁 Where to Edit

### ✅ Edit Here (Working Copy)
```
3D-Action-RPG-JavaScript-main/
├── src/              ← Edit game code here
├── assets/           ← Add models/textures here
└── index.html        ← Main entry point
```

### 📖 Reference Only (Don't Edit)
```
reference-3D-Action-RPG/
└── (use for comparison and learning)
```

## 🔑 Key Files

| File | Purpose |
|------|---------|
| `game.js` | Game initialization |
| `src/GLOBALS.js` | Global configuration |
| `src/scene/SceneManager.js` | Scene loading/switching |
| `src/scene/scenes/*.js` | Individual scenes |
| `src/character/CharacterController.js` | Player movement |
| `src/scene/gen/procedural/` | Procedural generation |

## 🛠️ Common Tasks

### Add a New Scene
1. Create `src/scene/scenes/myScene.js`
2. Register in `src/scene/SceneManager.js`
3. Access via `?scene=myScene`

### Add a 3D Model
1. Place `.glb` in `assets/models/`
2. Load in scene:
```javascript
const model = await BABYLON.SceneLoader.ImportMeshAsync(
    "", "assets/models/", "mymodel.glb", scene
);
```

### Modify Character
1. Edit `src/character/CharacterController.js`
2. Save file
3. Refresh browser (no build needed!)

## 🎓 Learning Path

### Day 1: Basics
- [ ] Run `START-SERVERS.bat`
- [ ] Open http://localhost:8080
- [ ] Try all game scenes
- [ ] Enable debug mode (`&debug=true`)
- [ ] Read `game.js` and `src/GLOBALS.js`

### Day 2: Scenes
- [ ] Study `src/scene/SceneManager.js`
- [ ] Compare scenes in `src/scene/scenes/`
- [ ] Try modifying `inn.js` (simple scene)
- [ ] Create a custom scene

### Day 3: Character
- [ ] Study `src/character/CharacterController.js`
- [ ] Understand physics integration
- [ ] Modify movement speed
- [ ] Add custom animations

### Day 4: Procedural Generation
- [ ] Explore `src/scene/gen/procedural/`
- [ ] Understand grid system
- [ ] Study Wave Function Collapse
- [ ] Plan island generation

## 🔍 Debugging

### Browser Console
- Press `F12` to open DevTools
- Check Console tab for errors
- Use Network tab for asset loading issues

### Babylon.js Inspector
- Add `&debug=true` to URL
- Explore scene hierarchy
- Inspect meshes and materials
- Monitor performance

## 📊 Project Comparison

### Working vs Reference

```bash
# Compare files side-by-side:
3D-Action-RPG-JavaScript-main/src/scene/SceneManager.js
reference-3D-Action-RPG/src/scene/SceneManager.js
```

**Workflow**:
1. Find feature in reference
2. Compare with working copy
3. Make changes in working copy
4. Test in browser

## 🎯 Grudge Island Integration Points

### 1. Procedural Generation
- Location: `src/scene/gen/procedural/`
- Use for: Island layout, structure generation

### 2. Scene Management
- Location: `src/scene/SceneManager.js`
- Use for: Dynamic scene loading, transitions

### 3. Character System
- Location: `src/character/`
- Use for: Player controller, combat

### 4. Skill Tree
- Location: `3D-Action-RPG-JavaScript-main/Skill-Tree-Maker-main/`
- Use for: Character progression, abilities

## 💡 Pro Tips

✅ **No Build Step** - Changes are instant, just refresh!
✅ **Use Debug Mode** - Inspector is your friend
✅ **Check Console** - Babylon.js logs everything
✅ **Compare with Reference** - Learn from original code
✅ **Test on Mobile** - Touch controls included

## 🐛 Quick Fixes

**Port in use?**
```bash
# Kill processes on ports
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Assets not loading?**
- Check file paths (case-sensitive!)
- Look for 404s in Network tab
- Verify file exists in `assets/`

**Physics broken?**
- Check HavokPhysics library loaded
- Look for physics errors in console
- Verify scene has physics enabled

## 📚 Documentation

- **README.md** - Main documentation
- **DEVELOPMENT-GUIDE.md** - Comprehensive guide
- **PROJECT-STRUCTURE.md** - File structure details
- **QUICK-REFERENCE.md** - This file

## 🎮 Controls

### Keyboard
- **WASD** - Move
- **Space** - Jump
- **Mouse** - Look around
- **Click** - Attack

### Mobile
- **Left Joystick** - Move
- **Right Joystick** - Look
- **Buttons** - Actions

---

**Need help?** Check the documentation files or compare with `reference-3D-Action-RPG/`

