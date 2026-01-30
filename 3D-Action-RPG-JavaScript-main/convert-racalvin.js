const convert = require('fbx2gltf');
const path = require('path');

async function convertCharacter() {
    console.log('Converting racalvin character model...');
    
    try {
        const srcPath = path.join(__dirname, 'uitoconvert/racalvin/rac.fbx');
        const destPath = path.join(__dirname, 'assets/characters/racalvin/racalvin.glb');
        
        await convert(srcPath, destPath, ['--binary']);
        console.log('✓ Character model converted successfully!');
        console.log(`  Output: ${destPath}`);
        
    } catch (error) {
        console.error('Error converting character:', error);
    }
}

async function convertBaseAnimations() {
    console.log('\nConverting base animations...');
    
    const baseAnims = [
        'standing idle.fbx',
        'standing idle 02.fbx',
        'Standing Walk Forward.fbx',
        'Standing Walk Back.fbx',
        'Standing Run Forward.fbx',
        'Standing Run Back.fbx',
        'Standing Jump.fbx',
        'Standing React Death Backward.fbx',
        'Standing Turn Left 90.fbx',
        'Standing Turn Right 90.fbx'
    ];
    
    for (const anim of baseAnims) {
        try {
            const srcPath = path.join(__dirname, 'uitoconvert/racalvin', anim);
            const animName = anim.replace('.fbx', '.glb');
            const destPath = path.join(__dirname, 'assets/characters/racalvin/animations/base', animName);
            
            await convert(srcPath, destPath, ['--binary']);
            console.log(`  ✓ ${animName}`);
        } catch (error) {
            console.error(`  ✗ Failed: ${anim}`, error.message);
        }
    }
}

async function convertMeleeAxeAnimations() {
    console.log('\nConverting melee axe (1H) animations...');
    
    const meleeAnims = [
        'standing melee attack horizontal.fbx',
        'standing melee attack downward.fbx',
        'standing melee attack backhand.fbx',
        'standing melee attack 360 high.fbx',
        'standing melee attack 360 low.fbx',
        'standing melee combo attack ver. 1.fbx',
        'standing melee combo attack ver. 2.fbx',
        'standing melee combo attack ver. 3.fbx',
        'standing melee attack kick ver. 1.fbx',
        'standing melee run jump attack.fbx'
    ];
    
    for (const anim of meleeAnims) {
        try {
            const srcPath = path.join(__dirname, 'uitoconvert/racalvin', anim);
            const animName = anim.replace('.fbx', '.glb');
            const destPath = path.join(__dirname, 'assets/characters/racalvin/animations/melee_axe', animName);
            
            await convert(srcPath, destPath, ['--binary']);
            console.log(`  ✓ ${animName}`);
        } catch (error) {
            console.error(`  ✗ Failed: ${anim}`, error.message);
        }
    }
}

async function convertSwordShieldAnimations() {
    console.log('\nConverting sword & shield animations...');
    
    const swordAnims = [
        'sword and shield idle.fbx',
        'sword and shield walk.fbx',
        'sword and shield run.fbx',
        'sword and shield slash.fbx',
        'sword and shield slash (2).fbx',
        'sword and shield slash (3).fbx',
        'sword and shield attack.fbx',
        'sword and shield attack (2).fbx',
        'sword and shield attack (3).fbx',
        'sword and shield block idle.fbx',
        'sword and shield block.fbx',
        'sword and shield jump.fbx',
        'draw sword 1.fbx',
        'sheath sword 1.fbx'
    ];
    
    for (const anim of swordAnims) {
        try {
            const srcPath = path.join(__dirname, 'uitoconvert/racalvin', anim);
            const animName = anim.replace('.fbx', '.glb');
            const destPath = path.join(__dirname, 'assets/characters/racalvin/animations/sword_shield', animName);
            
            await convert(srcPath, destPath, ['--binary']);
            console.log(`  ✓ ${animName}`);
        } catch (error) {
            console.error(`  ✗ Failed: ${anim}`, error.message);
        }
    }
}

async function convertMagicAnimations() {
    console.log('\nConverting magic animations...');
    
    const magicAnims = [
        'Standing 1H Magic Attack 01.fbx',
        'Standing 1H Magic Attack 02.fbx',
        'Standing 1H Magic Attack 03.fbx',
        'standing 1H cast spell 01.fbx',
        'Standing 2H Cast Spell 01.fbx',
        'Standing 2H Magic Attack 01.fbx',
        'Standing 2H Magic Attack 02.fbx',
        'Standing 2H Magic Area Attack 01.fbx',
        'Standing 2H Magic Area Attack 02.fbx',
        'spell cast.fbx'
    ];
    
    for (const anim of magicAnims) {
        try {
            const srcPath = path.join(__dirname, 'uitoconvert/racalvin', anim);
            const animName = anim.replace('.fbx', '.glb');
            const destPath = path.join(__dirname, 'assets/characters/racalvin/animations/magic', animName);
            
            await convert(srcPath, destPath, ['--binary']);
            console.log(`  ✓ ${animName}`);
        } catch (error) {
            console.error(`  ✗ Failed: ${anim}`, error.message);
        }
    }
}

async function convertGreatswordAnimations() {
    console.log('\nConverting greatsword (2H) animations...');
    
    const gsAnims = [
        'great sword idle.fbx',
        'great sword walk.fbx',
        'great sword run.fbx',
        'great sword slash.fbx',
        'great sword slash (2).fbx',
        'great sword slash (3).fbx',
        'great sword attack.fbx',
        'great sword jump attack.fbx',
        'great sword high spin attack.fbx',
        'great sword slide attack.fbx',
        'great sword blocking.fbx',
        'draw a great sword 1.fbx'
    ];
    
    for (const anim of gsAnims) {
        try {
            const srcPath = path.join(__dirname, 'uitoconvert/racalvin', anim);
            const animName = anim.replace('.fbx', '.glb');
            const destPath = path.join(__dirname, 'assets/characters/racalvin/animations/greatsword', animName);
            
            await convert(srcPath, destPath, ['--binary']);
            console.log(`  ✓ ${animName}`);
        } catch (error) {
            console.error(`  ✗ Failed: ${anim}`, error.message);
        }
    }
}

async function convertUnarmedAnimations() {
    console.log('\nConverting unarmed (capoeira) animations...');
    
    const unarmedAnims = [
        'ginga forward.fbx',
        'ginga backward.fbx',
        'armada.fbx',
        'martelo 2.fbx',
        'meia lua de compasso.fbx',
        'au.fbx',
        'esquiva 1.fbx',
        'rasteira 1.fbx',
        'capoeira.fbx'
    ];
    
    for (const anim of unarmedAnims) {
        try {
            const srcPath = path.join(__dirname, 'uitoconvert/racalvin', anim);
            const animName = anim.replace('.fbx', '.glb');
            const destPath = path.join(__dirname, 'assets/characters/racalvin/animations/unarmed', animName);
            
            await convert(srcPath, destPath, ['--binary']);
            console.log(`  ✓ ${animName}`);
        } catch (error) {
            console.error(`  ✗ Failed: ${anim}`, error.message);
        }
    }
}

async function main() {
    console.log('=== RACALVIN CHARACTER CONVERSION ===\n');
    
    await convertCharacter();
    await convertBaseAnimations();
    await convertMeleeAxeAnimations();
    await convertSwordShieldAnimations();
    await convertMagicAnimations();
    await convertGreatswordAnimations();
    await convertUnarmedAnimations();
    
    console.log('\n=== CONVERSION COMPLETE ===');
    console.log('\nNext steps:');
    console.log('1. Update hero.js to load racalvin.glb');
    console.log('2. Implement weapon-based animation switching');
    console.log('3. Test character in game');
}

main().catch(console.error);
