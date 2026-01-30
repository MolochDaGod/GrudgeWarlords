# Racalvin Character Implementation - Testing Guide

## Quick Test Checklist

### 1. Start the Development Server
```bash
cd C:\Users\nugye\Documents\GrudgeWarlords\3D-Action-RPG-JavaScript-main
npm start
```

### 2. Open the Game
Navigate to: `http://localhost:3001/?scene=outdoor`

### 3. Visual Checks
- [ ] Racalvin character model loads (not HumanBaseMesh)
- [ ] Character is visible and properly scaled
- [ ] Character responds to movement controls
- [ ] Camera follows character correctly

### 4. Console Tests

Open browser console (F12) and run these commands:

```javascript
// Check if animation manager loaded
console.log(PLAYER.animManager);

// List available animations
console.log(PLAYER.animManager.getAvailableAnimations());

// Test playing an animation
PLAYER.animManager.playAnimation('walk');
PLAYER.animManager.playAnimation('run');
PLAYER.animManager.playAnimation('idle');

// Test weapon type switching
await PLAYER.animManager.switchWeaponType('sword_shield');
PLAYER.animManager.playAnimation('slash1');

await PLAYER.animManager.switchWeaponType('greatsword');
PLAYER.animManager.playAnimation('slash1');

await PLAYER.animManager.switchWeaponType('magic');
PLAYER.animManager.playAnimation('cast1H_1');

await PLAYER.animManager.switchWeaponType('unarmed');
PLAYER.animManager.playAnimation('kick1');

// Return to base
await PLAYER.animManager.switchWeaponType('unarmed');
PLAYER.animManager.playAnimation('idle');
```

### 5. Expected Results

✅ **Success Indicators:**
- Racalvin model visible
- Animations play smoothly
- No console errors
- Character movement works
- Camera follows properly

❌ **Potential Issues & Fixes:**

**Character too small/large:**
```javascript
// In hero.js, adjust scaling:
hero.scaling.scaleInPlace(2.0);  // Try different values
```

**Character underground/floating:**
```javascript
// In hero.js, adjust Y position:
hero.position.y = -5;  // Try different values
```

**Animations not loading:**
- Check console for errors
- Verify GLB files exist in `assets/characters/racalvin/animations/`
- Ensure animation names match exactly

**Character not moving:**
- Check if physics collision is working
- Verify `character` object has physics aggregate
- Check movement.js integration

### 6. Scale Adjustment Guide

If character appears wrong size, find the sweet spot:

```javascript
// Too small: increase from 1.0
hero.scaling.scaleInPlace(1.5);
hero.scaling.scaleInPlace(2.0);
hero.scaling.scaleInPlace(2.5);

// Too large: decrease from 1.0
hero.scaling.scaleInPlace(0.5);
hero.scaling.scaleInPlace(0.75);

// Original HumanBaseMesh was 3.7, Racalvin may be different
```

### 7. Animation Speed Testing

```javascript
// Play animation at different speeds
PLAYER.animManager.playAnimation('run', true, 0.5);  // Slow
PLAYER.animManager.playAnimation('run', true, 1.0);  // Normal
PLAYER.animManager.playAnimation('run', true, 1.5);  // Fast
PLAYER.animManager.playAnimation('run', true, 2.0);  // Very fast
```

### 8. Combat Animation Test

```javascript
// Test attack animations
PLAYER.animManager.playOneShotAnimation('combo1', true, 1.0);

// After it finishes, should return to idle automatically
```

## Common Issues & Solutions

### Issue: "Cannot find module animationManager.js"
**Fix:** Ensure file path is correct in hero.js:
```javascript
import AnimationManager from './animationManager.js';
```

### Issue: Character model not loading
**Fix:** Check browser console for 404 errors. Verify:
- `assets/characters/racalvin/racalvin.glb` exists
- Path in hero.js is correct: `"./assets/characters/racalvin/"`

### Issue: Animations lag or stutter
**Fix:** 
- Reduce number of loaded animations
- Load animations on-demand rather than all at once
- Check if other heavy processes running

### Issue: Character orientation wrong
**Fix:** Adjust rotation in hero.js or check skeleton setup

## Success Criteria

✅ All 8 tasks completed
✅ Character model loads
✅ Animations play correctly
✅ Weapon switching works
✅ Movement functional
✅ No console errors

## Next Steps After Testing

1. Fine-tune character scaling
2. Test all weapon types
3. Integrate with combat system
4. Add equipment manager to UI
5. Test with actual weapon models
6. Add visual weapon attachment

## Performance Notes

- Loading all 70+ animations may take time
- Consider lazy-loading weapon-specific animations
- Base animations should load quickly (~10 files)
- Weapon animations load on first switch (~10-14 files per type)

## Screenshot Checklist

Take screenshots of:
- [ ] Racalvin character in-game
- [ ] Idle animation
- [ ] Walk animation
- [ ] Run animation  
- [ ] Attack animation (each weapon type)
- [ ] Console showing successful loads

---

**Ready to Test!** 🎮

Run `npm start` and navigate to the outdoor scene to see Racalvin in action!
