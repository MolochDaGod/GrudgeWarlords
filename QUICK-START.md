# 🚀 Quick Start Guide - Grudge Warlords

## What You Have Now

✅ **Working 3D Action RPG Game**
- Character movement (W/A/S/D)
- Combat system (attacks, combos)
- Multiple scenes (outdoor, town, inn, etc.)
- UI system with icons
- Animation system

## 🎮 How to Run

### 1. Start the Server
```bash
cd 3D-Action-RPG-JavaScript-main
npm start
```

### 2. Open in Browser
```
http://localhost:3001/?scene=outdoor
```

### 3. Play!
- **W/A/S/D** - Move
- **Space** - Roll/Dodge
- **V** - Jump
- **5** - Attack
- **4** - Combo
- **C** - Magic Cast
- **F** - Sprint Toggle
- **Mouse** - Click to attack

---

## 📁 Project Structure

```
GrudgeWarlords/
├── 3D-Action-RPG-JavaScript-main/     ← Main game
│   ├── src/
│   │   ├── character/hero.js          ← Character loading
│   │   ├── utils/anim.js              ← Animation setup
│   │   ├── movement.js                ← Controls & input
│   │   └── scene/                     ← Game scenes
│   ├── assets/
│   │   ├── characters/racalvin/       ← Current character
│   │   └── icons/                     ← UI icons
│   └── index.html                     ← Entry point
│
├── MIXAMO-CHARACTER-GUIDE.md          ← How to add new characters
├── ANIMATION-SYSTEM-REFERENCE.md      ← Animation system docs
├── TROUBLESHOOTING.md                 ← Fix common issues
└── QUICK-START.md                     ← This file
```

---

## 🎯 What You Can Do Now

### 1. **Play the Game**
- Explore different scenes
- Test combat mechanics
- Try all the controls

### 2. **Change Character** (Easy!)
- Follow `MIXAMO-CHARACTER-GUIDE.md`
- Download from Mixamo
- Replace 3 file paths
- Done!

### 3. **Customize Controls**
- Edit `src/movement.js`
- Change hotkeys
- Add new actions

### 4. **Add New Scenes**
- Check `src/scene/` folder
- Copy existing scene
- Modify as needed

---

## 🔧 Recent Fixes Applied

### ✅ Animation System
- Added safety checks for missing animations
- Added console logging for debugging
- Created dummy animations to prevent crashes

### ✅ Favicon
- Added favicon links to index.html
- Fixed 404 error

### ✅ Documentation
- Created comprehensive guides
- Added troubleshooting steps
- Documented animation system

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `MIXAMO-CHARACTER-GUIDE.md` | Step-by-step guide to replace character with Mixamo models |
| `ANIMATION-SYSTEM-REFERENCE.md` | Complete technical reference for animation system |
| `TROUBLESHOOTING.md` | Common issues and solutions |
| `QUICK-START.md` | This file - getting started |

---

## 🎨 Current Character: Racalvin

**Location**: `assets/characters/racalvin/`

**Animations**:
- Idle (Breathing)
- Running
- Jump
- Roll/Dodge
- Attack
- Combo (3 variations)
- Magic Cast

**To Replace**: See `MIXAMO-CHARACTER-GUIDE.md`

---

## 🌐 Available Scenes

Access via URL parameter: `?scene=NAME`

- `outdoor` - Main outdoor environment
- `town` - Town scene
- `inn` - Indoor inn
- `indoor` - Generic indoor
- `builder` - Scene builder/editor
- `underground` - Underground area

**Example**: `http://localhost:3001/?scene=town`

---

## 🐛 Known Issues

### Browser Extension Warning
```
evmAsk.js:15 Uncaught TypeError: Cannot redefine property: ethereum
```
- **Impact**: None - game works fine
- **Cause**: Crypto wallet extension (MetaMask, etc.)
- **Fix**: Ignore or disable extension

### Animation Loading
- Check browser console for animation names
- Verify paths in `hero.js` match your files
- See `TROUBLESHOOTING.md` for details

---

## 💡 Pro Tips

1. **Always check console** (F12) for errors
2. **Use debug mode**: `?debug=true` in URL
3. **Test incrementally** - small changes, test often
4. **Keep backups** - save working versions
5. **Read the docs** - they have all the answers!

---

## 🎓 Learning Path

### Beginner
1. ✅ Run the game
2. ✅ Understand controls
3. ✅ Explore scenes
4. Read `MIXAMO-CHARACTER-GUIDE.md`

### Intermediate
1. Replace character with Mixamo model
2. Customize controls/hotkeys
3. Modify existing scenes
4. Add new animations

### Advanced
1. Create new scenes
2. Add new game mechanics
3. Customize combat system
4. Build new features

---

## 🔗 Useful Links

- **Mixamo**: https://www.mixamo.com (Free characters & animations)
- **Babylon.js Docs**: https://doc.babylonjs.com
- **FBX to GLB Converter**: https://products.aspose.app/3d/conversion/fbx-to-glb

---

## 🆘 Need Help?

1. **Check Console** (F12) - errors show here
2. **Read `TROUBLESHOOTING.md`** - common issues
3. **Check Documentation** - detailed guides
4. **Test in Debug Mode** - `?debug=true`

---

## ✨ Next Steps

### Immediate
- [ ] Test all controls
- [ ] Explore all scenes
- [ ] Check console for errors

### Short Term
- [ ] Download a Mixamo character
- [ ] Follow character replacement guide
- [ ] Customize one hotkey

### Long Term
- [ ] Create custom scene
- [ ] Add new game mechanics
- [ ] Build unique features

---

**Ready to build your game?** Start with the basics, then level up! 🎮

**Questions?** Check the documentation files - they're comprehensive and easy to follow!

