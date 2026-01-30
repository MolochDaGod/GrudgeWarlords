# 🎭 Character Selection & Customization System Guide

## Overview

The **Grudge Warlords Character System** is a comprehensive, dynamic character loading and customization system that allows players to choose from multiple races and customize their appearance before entering the game.

## 🌟 Features

### ✨ What's Included

- **6 Playable Races**: Barbarian, Dwarf, Elf, Human, Orc, and Undead
- **Original Hero**: Racalvin (backward compatible)
- **3D Character Preview**: Interactive character viewer with auto-rotation
- **Character Customization**: Skin, hair, and armor color options
- **Animation Preview**: Test attack animations before starting
- **Persistent Selection**: Saves your choice to localStorage
- **Dynamic Loading**: Seamlessly switches between any character
- **Smart Animation Mapping**: Auto-detects Mixamo merged or separate animation files
- **Fully Integrated**: Works with existing game systems

## 🚀 Getting Started

### Launch Character Selection

1. **Start the game** normally or visit: `http://localhost:3001/`
2. **Automatic**: Character selection screen loads by default
3. **Direct URL**: `http://localhost:3001/?scene=characterSelect`

### Select Your Character

1. **Browse Characters**: Click on any character card at the bottom
2. **View Stats**: See HP, Strength, Dexterity, Intelligence, and Vitality
3. **Read Description**: Learn about each character's backstory
4. **Rotate View**: Drag to rotate the 3D preview
5. **Zoom**: Scroll to zoom in/out

### Customize Appearance

- **Skin Color**: Click "Change" to cycle through skin tones
- **Hair Color**: Click "Change" to cycle through hair colors
- **Armor Color**: Click "Change" to cycle through armor colors

### Preview Animations

- Click **"Preview Attack"** to see your character's attack animation
- Character returns to idle after the preview

### Start Playing

- Click **"START GAME"** to begin your adventure!
- Your selection is saved automatically

## 📁 File Structure

```
src/
├── character/
│   ├── CharacterLoader.js          ← Main character loading system
│   └── hero.js                     ← Legacy loader (backward compatible)
├── utils/
│   ├── animMapper.js               ← Enhanced animation mapping
│   └── anim.js                     ← Animation system (updated)
├── scene/
    └── scenes/
        └── characterSelect.js      ← Character selection UI scene

assets/
└── characters/
    ├── characters.json             ← Character database config
    ├── barbarian/
    │   └── biped/
    │       ├── Character_output.glb
    │       └── Meshy_Merged_Animations.glb
    ├── dwarf/
    ├── elf/
    ├── human/
    ├── orc/
    ├── undead/
    └── racalvin/                   ← Original character
```

## 🎮 Character Database

### Configuration (`characters.json`)

Each character is defined with:

```json
{
  "id": "barbarian",
  "name": "Barbarian",
  "displayName": "Barbarian Warrior",
  "description": "A fierce warrior from the frozen north...",
  "race": "Human",
  "class": "Warrior",
  "folder": "barbarian",
  "subfolder": "biped",
  "modelFile": "Character_output.glb",
  "animationFile": "Meshy_Merged_Animations.glb",
  "scale": 1.0,
  "positionY": 0,
  "stats": {
    "health": 150,
    "strength": 18,
    "dexterity": 12,
    "intelligence": 8,
    "vitality": 16,
    "speed": 1.0
  },
  "colors": {
    "skin": ["#d4a574", "#c89968", "#a87854"],
    "hair": ["#3d2817", "#6b4423", "#8b6f47"],
    "armor": ["#8b0000", "#4a1c1c", "#2d1b1b"]
  }
}
```

## 🔧 Adding New Characters

### Option 1: Using Merged Animations (Recommended)

1. **Prepare Your Character**:
   - Download character from Mixamo with T-Pose
   - Download animations (idle, run, jump, attack, etc.)
   - Merge animations into character using Blender or online tools
   - Export as GLB

2. **Add to Project**:
```
assets/characters/your_character/
├── biped/
    ├── Character_output.glb
    └── Meshy_Merged_Animations.glb
```

3. **Add to Database** (`characters.json`):
```json
"your_character": {
  "id": "your_character",
  "name": "Your Character",
  "displayName": "Your Amazing Character",
  "description": "Description here...",
  "folder": "your_character",
  "subfolder": "biped",
  "modelFile": "Character_output.glb",
  "animationFile": "Meshy_Merged_Animations.glb",
  "scale": 1.0,
  "stats": { /* your stats */ },
  "colors": { /* your colors */ }
}
```

4. **Test**: Visit `?scene=characterSelect`

### Option 2: Using Separate Animations (Racalvin Style)

1. **Prepare Files**:
```
assets/characters/your_character/
└── animations/
    ├── idle.glb
    ├── run.glb
    ├── jump.glb
    ├── attack.glb
    └── ...
```

2. **Configure**:
```json
"your_character": {
  "id": "your_character",
  "folder": "your_character",
  "subfolder": "animations",
  "modelFile": "character.glb",
  "useSeparateAnimations": true,
  "animations": {
    "idle": "idle.glb",
    "run": "run.glb",
    "jump": "jump.glb",
    "attack": "attack.glb",
    // etc...
  }
}
```

## 💻 Using the Character System in Code

### Load Character Dynamically

```javascript
import { characterLoader } from './src/character/CharacterLoader.js';

// Initialize
await characterLoader.loadCharacterDatabase();

// Load specific character
const result = await characterLoader.loadCharacterModel(scene, parentNode, 'barbarian');

const hero = result.hero;
const skeleton = result.skeleton;
const data = result.data; // Character stats, colors, etc.
```

### Get Character Info

```javascript
// Get all available characters
const allCharacters = characterLoader.getAllCharacters();

// Get specific character data
const barbarianData = characterLoader.getCharacterData('barbarian');

console.log(barbarianData.stats.health); // 150
console.log(barbarianData.class); // "Warrior"
```

### Save/Load Selection

```javascript
// Save character selection
characterLoader.saveCharacterSelection('orc', {
  colors: { skin: 0, hair: 1, armor: 2 }
});

// Load saved selection
const saved = characterLoader.loadCharacterSelection();
console.log(saved.characterId); // 'orc'

// Get selected character ID
const selectedId = characterLoader.getSelectedCharacterId();
```

### Apply Colors

```javascript
characterLoader.applyCharacterColors(hero, {
  skinColor: '#d4a574',
  hairColor: '#3d2817',
  armorColor: '#4682b4'
});
```

## 🎬 Animation System

### Auto-Detection

The system automatically detects and maps animations:

```javascript
import { setupAnim } from './src/utils/animMapper.js';

const animations = setupAnim(scene, skeleton);

// Use animations
animations.BreathingIdle.start(true, 1.0);
animations.Running.start(true, 1.1);
animations.Attack.start(false, 1.3);
```

### Supported Animation Names

The mapper recognizes these patterns:
- **Idle**: 'idle', 'breathing', 'standing'
- **Run**: 'run', 'running', 'jog'
- **Jump**: 'jump', 'jumping'
- **Roll**: 'roll', 'dodge', 'evade'
- **Attack**: 'slash', 'attack', 'swing'
- **Combo**: 'combo', 'attack_2'
- **Cast**: 'cast', 'spell', 'magic'

### Animation Controller

For better control:

```javascript
import { AnimationController } from './src/utils/animMapper.js';

const controller = new AnimationController(animations);

// Play animation
controller.play('Attack', false, 1.3);

// Stop current
controller.stop();

// Stop all
controller.stopAll();

// Check if playing
if (controller.isPlaying('Running')) {
  console.log('Character is running!');
}
```

## 🎨 Customization

### Character Stats

Each character has unique stats:
- **Health**: Hit points
- **Strength**: Physical damage
- **Dexterity**: Speed and agility  
- **Intelligence**: Magic power
- **Vitality**: Defense
- **Speed**: Movement multiplier

### Color Customization

Colors are defined per character:
```json
"colors": {
  "skin": ["#d4a574", "#c89968", "#a87854"],
  "hair": ["#3d2817", "#6b4423"],
  "armor": ["#8b0000", "#4a1c1c"]
}
```

Each array contains hex color codes. Players cycle through options.

## 🔗 Integration with Game Scenes

### Using Selected Character in Game

```javascript
// In your game scene (e.g., outdoor.js):
import { loadHeroModel } from '../character/hero.js';

// This now automatically loads the selected character!
const { hero, skeleton } = await loadHeroModel(scene, characterRoot);
```

The system automatically:
1. Checks localStorage for saved character
2. Loads that character if found
3. Falls back to default if none selected
4. Applies saved customizations

### Scene URLs

- **Character Select**: `/?scene=characterSelect`
- **Outdoor (with selection)**: `/?scene=outdoor`
- **Specific Character**: Select in character screen, then navigate

## 🐛 Troubleshooting

### Character Not Loading

1. **Check console** for error messages
2. **Verify file paths** in `characters.json`
3. **Check GLB files** exist in correct folders
4. **Test with racalvin** first (known working)

### Animations Not Playing

1. **Check animation names** in console logs
2. **Verify GLB contains animations**
3. **Use enhanced mapper** patterns
4. **Check Mixamo export settings**:
   - Format: FBX for Unity → Convert to GLB
   - With Skin for character model
   - Without Skin for animations

### Colors Not Changing

1. **Check mesh names** (must contain 'skin', 'hair', 'armor', etc.)
2. **Verify materials exist**
3. **Enable customization** in character screen

### Character Too Big/Small

Adjust `scale` in `characters.json`:
```json
"scale": 0.85  // Smaller
"scale": 1.1   // Bigger
```

### Character Floating/Underground

Adjust `positionY`:
```json
"positionY": 0.5  // Higher
"positionY": -0.5 // Lower
```

## 📊 Character Stats Comparison

| Race | HP | STR | DEX | INT | VIT | Speed | Class |
|------|----|----|----|----|-------|-------|-------|
| **Barbarian** | 150 | 18 | 12 | 8 | 16 | 1.0 | Warrior |
| **Dwarf** | 140 | 16 | 10 | 12 | 18 | 0.9 | Defender |
| **Elf** | 100 | 12 | 16 | 16 | 10 | 1.15 | Spellblade |
| **Human** | 120 | 14 | 14 | 14 | 14 | 1.05 | Knight |
| **Orc** | 160 | 20 | 10 | 6 | 16 | 0.95 | Berserker |
| **Undead** | 110 | 15 | 11 | 14 | 12 | 1.0 | Death Knight |
| **Racalvin** | 130 | 15 | 15 | 15 | 15 | 1.1 | Hero |

## 🎉 Best Practices

### For Players
- ✅ Test animations before starting
- ✅ Try different color combinations
- ✅ Read character descriptions
- ✅ Choose based on playstyle

### For Developers
- ✅ Use merged animation files when possible
- ✅ Follow naming conventions
- ✅ Test each character thoroughly
- ✅ Provide color options
- ✅ Balance character stats
- ✅ Write clear descriptions

## 🔮 Future Enhancements

Potential additions:
- [ ] Equipment preview
- [ ] Skill tree preview
- [ ] Voice selection
- [ ] Gender variants
- [ ] Unlock system
- [ ] Character creation
- [ ] More customization options

## 💡 Tips & Tricks

### Quick Testing
```
?scene=characterSelect&debug=true
```
Enables debug mode for inspector access.

### Skip Character Selection
```
?scene=outdoor
```
Loads game with last selected character.

### Force Specific Character (Dev Mode)
```javascript
// In console:
localStorage.setItem('grudgewarlords_character', 
  JSON.stringify({ characterId: 'orc', savedAt: Date.now() })
);
```

## 📚 Additional Resources

- **Mixamo**: https://www.mixamo.com - Free character animations
- **Babylon.js Docs**: https://doc.babylonjs.com - Engine documentation
- **GLB Converter**: https://products.aspose.app/3d/conversion/fbx-to-glb

## 🤝 Contributing

To add new characters:
1. Follow file structure guidelines
2. Test thoroughly
3. Update `characters.json`
4. Document any special requirements
5. Submit with character preview screenshots

---

**Enjoy Your Adventure! ⚔️**

Built with ❤️ for Grudge Warlords
