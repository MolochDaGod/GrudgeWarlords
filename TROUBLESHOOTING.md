# 🔧 Troubleshooting Guide

## Current Issues & Fixes

### ✅ FIXED: Animation Errors

**Error**: `Cannot read properties of undefined (reading 'isPlaying')`

**Cause**: Animations not loading properly or not found by name

**Fix Applied**: 
- Updated `src/utils/anim.js` with safety checks
- Added dummy animations for missing ones
- Added console logging to show which animations loaded

**What to check**:
1. Open browser console (F12)
2. Look for: `"All animations:"` - shows loaded animation names
3. Look for: `"Loaded animations:"` - shows which ones were found

**If animations still missing**:
```javascript
// Check the console output for animation names
// Update src/utils/anim.js to match the actual names
// Example:
anim.Running = scene.animationGroups.find(ag => ag.name.includes("your-actual-animation-name"));
```

---

### ✅ FIXED: Favicon 404 Error

**Error**: `Failed to load resource: the server responded with a status of 404 (Not Found)` for favicon.ico

**Fix Applied**: 
- Added favicon links to `index.html`
- Using existing `favicon.svg`

**If still showing error**:
- Create a simple `favicon.ico` file
- Or ignore - it's not critical for functionality

---

### ⚠️ Browser Extension Warning (Not Critical)

**Error**: `evmAsk.js:15 Uncaught TypeError: Cannot redefine property: ethereum`

**Cause**: Browser extension (likely crypto wallet like MetaMask) conflict

**Impact**: None - game still works fine

**Fix**: 
- Ignore it (doesn't affect game)
- Or disable crypto wallet extensions while developing

---

## Common Issues & Solutions

### Character Not Visible

**Symptoms**: Game loads but no character visible

**Checks**:
1. Open browser console (F12)
2. Look for loading errors
3. Check Network tab for failed asset loads

**Solutions**:
```javascript
// In src/character/hero.js
// Try different scale values:
hero.scaling.scaleInPlace(1);    // Current
hero.scaling.scaleInPlace(5);    // Try larger
hero.scaling.scaleInPlace(0.5);  // Try smaller

// Try different Y position:
hero.position.y = 0;    // Current
hero.position.y = 10;   // Try higher
hero.position.y = -10;  // Try lower
```

---

### Animations Not Playing

**Symptoms**: Character visible but frozen/not animating

**Debug Steps**:
1. Open console (F12)
2. Check for animation loading messages
3. Look for the logged animation names

**Solution**:
```javascript
// In src/utils/anim.js
// Check line 5 output:
console.log("All animations:", scene.animationGroups.map(ag => ag.name));

// Update the .includes() strings to match your actual animation names
anim.BreathingIdle = scene.animationGroups.find(ag => ag.name.includes("idle"));
```

---

### Controls Not Working

**Symptoms**: Can't move character

**Checks**:
1. Click on the game canvas first
2. Check if keyboard focus is on the game
3. Look for JavaScript errors in console

**Solutions**:
- Click the game canvas
- Refresh the page
- Check console for errors

**Test Controls**:
- W/A/S/D - Movement
- Space - Roll
- V - Jump
- 5 - Attack

---

### Performance Issues / Low FPS

**Symptoms**: Game is laggy or slow

**Solutions**:
1. **Disable Debug Mode**: Remove `?debug=true` from URL
2. **Close Inspector**: If Babylon Inspector is open, close it
3. **Reduce Graphics**:
```javascript
// In src/GLOBALS.js
let WEBGPU = false;  // Use WebGL instead
```

---

### Assets Not Loading (404 Errors)

**Symptoms**: Missing textures, models, or sounds

**Debug**:
1. Open Network tab in DevTools (F12)
2. Look for red/failed requests
3. Check the file paths

**Common Causes**:
- Wrong file path
- File doesn't exist
- Case-sensitive paths (Linux/Mac)

**Solution**:
```javascript
// Check paths in hero.js:
const result = await BABYLON.SceneLoader.ImportMeshAsync(
    null, 
    "./assets/characters/racalvin/",  // ← Check this path
    "racalvin.glb",                    // ← Check this filename
    scene
);
```

---

### Scene Not Loading

**Symptoms**: Black screen or loading forever

**Debug**:
1. Check console for errors
2. Verify scene name in URL
3. Check SceneManager.js

**Solutions**:
```javascript
// Valid scene names (check src/scene/SceneManager.js):
?scene=outdoor
?scene=indoor
?scene=inn
?scene=town
?scene=builder
?scene=underground
```

---

## Debug Tools

### Enable Debug Mode
Add to URL: `?debug=true`
```
http://localhost:3001/?scene=outdoor&debug=true
```

### Console Commands
Open console (F12) and try:
```javascript
// Check loaded animations
console.log(SCENE_MANAGER.currentScene.animationGroups);

// Check character
console.log(PLAYER);

// Check scene
console.log(SCENE_MANAGER.currentScene);
```

### Babylon Inspector
When debug mode is enabled:
- Press F12 to open DevTools
- Click "Inspector" tab
- Explore scene hierarchy
- Check meshes, materials, animations

---

## Quick Fixes

### Refresh Not Working?
**Hard Refresh**:
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

### Clear Cache
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

### Reset Everything
1. Close browser
2. Delete `node_modules` (optional)
3. Run `npm install`
4. Restart servers
5. Hard refresh browser

---

## Getting Help

### Information to Provide

When asking for help, include:

1. **Browser Console Output**:
   - Press F12
   - Copy errors from Console tab

2. **Network Errors**:
   - Check Network tab
   - Note any red/failed requests

3. **What You Changed**:
   - Which files did you edit?
   - What were you trying to do?

4. **Steps to Reproduce**:
   - What did you do before the error?
   - Can you reproduce it?

### Useful Console Logs

Add these to your code for debugging:

```javascript
// In hero.js after loading
console.log("Hero loaded:", hero);
console.log("Skeleton:", skeleton);
console.log("Animations:", scene.animationGroups);

// In anim.js
console.log("Animation setup complete:", anim);

// In movement.js
console.log("Input detected:", inputMap);
```

---

## Prevention Tips

1. **Always check console** - Errors show up here first
2. **Test incrementally** - Make small changes, test often
3. **Keep backups** - Save working versions
4. **Use version control** - Git commit frequently
5. **Read error messages** - They usually tell you what's wrong

---

**Still stuck?** Check the documentation files or compare with the reference repository!

