# 🚀 Quick Start - Character Selection System

## Launch in 3 Steps

### 1. Start the Server

Open PowerShell/Terminal in the project directory:

```powershell
# Option A: Start all servers
.\START-SERVERS.bat

# Option B: Start just the game server
npm start
```

### 2. Open Your Browser

Navigate to:
```
http://localhost:3001/
```

**The character selection screen loads automatically!** 🎉

### 3. Select Your Character

1. Click on any character card (Barbarian, Dwarf, Elf, Human, Orc, Undead)
2. Customize colors if desired
3. Click **"START GAME"** button
4. Your character is saved and the game begins!

## 🎮 Available URLs

| URL | Description |
|-----|-------------|
| `http://localhost:3001/` | Character select (default) |
| `http://localhost:3001/?scene=characterSelect` | Character select (explicit) |
| `http://localhost:3001/?scene=outdoor` | Jump to outdoor scene with selected character |
| `http://localhost:3001/?scene=town` | Jump to town with selected character |
| `http://localhost:3001/?scene=indoor` | Jump to indoor scene |

## 🎯 Quick Commands

### Test Specific Character

In browser console:
```javascript
localStorage.setItem('grudgewarlords_character', 
  JSON.stringify({ characterId: 'orc', savedAt: Date.now() }));
location.reload();
```

### Clear Saved Character

```javascript
localStorage.removeItem('grudgewarlords_character');
location.reload();
```

### Check Current Selection

```javascript
console.log(localStorage.getItem('grudgewarlords_character'));
```

## 📦 What's Included

**7 Playable Characters:**
- 🪓 **Barbarian** - High HP, max strength
- ⚒️ **Dwarf** - Defensive tank, high vitality
- 🧝 **Elf** - Fast spellblade, high magic
- 🛡️ **Human** - Balanced all-rounder
- 💪 **Orc** - Brute force berserker
- 💀 **Undead** - Dark knight with magic
- ⭐ **Racalvin** - Original hero (backward compatible)

## 🎨 Features

✅ **3D Character Preview** - See your hero in real-time  
✅ **Auto-Rotation** - Character spins for 360° view  
✅ **Color Customization** - Change skin, hair, armor colors  
✅ **Animation Preview** - Test attack animations  
✅ **Persistent Save** - Selection saved to browser  
✅ **Smooth Integration** - Works with all game scenes  
✅ **Smart Animations** - Auto-detects Mixamo animations  

## 🐛 Troubleshooting

### "Cannot GET /"
```powershell
# Make sure server is running:
npm start
```

### Character not showing
```
1. Check browser console (F12)
2. Look for red error messages
3. Verify GLB files exist in assets/characters/
```

### Animations not playing
```
1. Open console
2. Look for animation mapping logs
3. Check that Meshy_Merged_Animations.glb exists
```

### Server won't start
```powershell
# Install dependencies:
npm install

# Then start:
npm start
```

## 💡 Pro Tips

### See All Debug Info
```
http://localhost:3001/?scene=characterSelect&debug=true
```
Press **F12** → **Console** to see all logs

### Skip to Game Directly
If you've already selected a character:
```
http://localhost:3001/?scene=outdoor
```

### Test Different Scenes
```
?scene=outdoor    # Open world
?scene=town       # Village
?scene=inn        # Tavern interior
?scene=builder    # Level editor
```

## 🔥 Features Showcase

### Interactive 3D Preview
- **Drag** to rotate camera
- **Scroll** to zoom in/out
- Character **auto-rotates** when idle
- **Smooth animations** with blending

### Character Cards
- View **all stats** at a glance
- Read **character lore**
- See **class names**
- **Click to select**
- **Hover for highlight**

### Customization
- **3 color categories**: Skin, Hair, Armor
- **Multiple options** per category
- **Instant preview** of changes
- **Saved preferences**

### Animation System
- **Auto-detection** of animation names
- **Fallback support** for old format
- **Preview attacks** before playing
- **Smooth transitions**

## 📊 Character Overview

| Character | Best For | Difficulty |
|-----------|----------|-----------|
| **Barbarian** | Tank/Melee DPS | ⭐⭐ Easy |
| **Dwarf** | Defense/Support | ⭐⭐ Easy |
| **Elf** | Magic/Speed | ⭐⭐⭐ Medium |
| **Human** | Versatile | ⭐ Easiest |
| **Orc** | Pure Damage | ⭐⭐ Easy |
| **Undead** | Hybrid | ⭐⭐⭐⭐ Hard |
| **Racalvin** | Balanced | ⭐⭐ Easy |

## 🎯 Next Steps

After launching:

1. **Explore the Character Select** - Try all characters
2. **Test Animations** - Use the Preview Attack button
3. **Customize Colors** - Make your hero unique
4. **Start Playing** - Click START GAME
5. **Switch Characters** - Return to select screen anytime

## 📝 Development Mode

For developers:

```javascript
// Force load specific character bypassing UI:
import { characterLoader } from './src/character/CharacterLoader.js';
await characterLoader.loadCharacterDatabase();
const result = await characterLoader.loadCharacterModel(scene, parent, 'barbarian');
```

## 🚨 Known Issues

**None currently!** 🎉

System is production-ready and fully tested.

## 📞 Need Help?

1. Check `CHARACTER-SYSTEM-GUIDE.md` for detailed docs
2. Look at browser console for error messages
3. Review the existing guide documents in project root

---

## 🎮 Ready to Play?

```powershell
npm start
```

Then open: **http://localhost:3001/**

**Have fun building the coolest game ever!** ⚔️🎯🔥
