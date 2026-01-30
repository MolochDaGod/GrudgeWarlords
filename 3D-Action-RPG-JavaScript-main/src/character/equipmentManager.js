// Equipment Manager for Racalvin Character
// Handles weapon equipping and animation mode switching

export class EquipmentManager {
    constructor(character, animManager) {
        this.character = character;
        this.animManager = animManager;
        this.currentWeapon = null;
        this.currentWeaponType = 'unarmed';
        this.equippedItems = {
            mainHand: null,
            offHand: null,
            head: null,
            chest: null,
            legs: null,
            feet: null
        };
    }

    /**
     * Equip a weapon and switch animation mode
     * @param {Object} weapon - Weapon object with type and model
     */
    async equipWeapon(weapon) {
        if (!weapon) {
            return this.unequipWeapon();
        }

        // Determine weapon type and animation mode
        const weaponType = this.getWeaponAnimationType(weapon);
        
        // Unequip current weapon first
        if (this.currentWeapon) {
            await this.unequipWeapon();
        }

        // Store weapon
        this.currentWeapon = weapon;
        this.currentWeaponType = weaponType;
        this.equippedItems.mainHand = weapon;

        // Switch animation mode
        await this.animManager.switchWeaponType(weaponType);

        // Play equip/draw animation if available
        if (weaponType === 'sword_shield' || weaponType === 'greatsword') {
            this.animManager.playOneShotAnimation('draw', true);
        }

        console.log(`Equipped weapon: ${weapon.name} (${weaponType})`);
    }

    /**
     * Unequip current weapon
     */
    async unequipWeapon() {
        if (!this.currentWeapon) return;

        // Play sheath animation if available
        if (this.currentWeaponType === 'sword_shield' || this.currentWeaponType === 'greatsword') {
            this.animManager.playOneShotAnimation('sheath', false);
        }

        this.currentWeapon = null;
        this.currentWeaponType = 'unarmed';
        this.equippedItems.mainHand = null;

        // Switch to unarmed
        await this.animManager.switchWeaponType('unarmed');

        console.log('Weapon unequipped');
    }

    /**
     * Determine animation type based on weapon properties
     */
    getWeaponAnimationType(weapon) {
        if (!weapon.type) return 'unarmed';

        const type = weapon.type.toLowerCase();

        // Magic weapons
        if (type.includes('staff') || type.includes('wand') || type.includes('magic')) {
            return 'magic';
        }

        // Two-handed weapons
        if (type.includes('greatsword') || type.includes('2h') || type.includes('two-handed')) {
            return 'greatsword';
        }

        // Sword and shield
        if (weapon.hasShield || type.includes('shield')) {
            return 'sword_shield';
        }

        // One-handed melee (axe, mace, hammer, sword)
        if (type.includes('axe') || type.includes('mace') || type.includes('hammer') || 
            type.includes('sword') || type.includes('dagger') || type.includes('1h')) {
            return 'melee_axe';
        }

        // Default to unarmed
        return 'unarmed';
    }

    /**
     * Equip armor piece
     */
    equipArmor(slot, armorItem) {
        if (!this.equippedItems.hasOwnProperty(slot)) {
            console.error(`Invalid armor slot: ${slot}`);
            return false;
        }

        this.equippedItems[slot] = armorItem;
        console.log(`Equipped ${armorItem.name} to ${slot}`);
        return true;
    }

    /**
     * Unequip armor piece
     */
    unequipArmor(slot) {
        if (!this.equippedItems.hasOwnProperty(slot)) {
            console.error(`Invalid armor slot: ${slot}`);
            return false;
        }

        const item = this.equippedItems[slot];
        this.equippedItems[slot] = null;
        console.log(`Unequipped ${slot}`);
        return item;
    }

    /**
     * Get all equipped items
     */
    getEquippedItems() {
        return { ...this.equippedItems };
    }

    /**
     * Get current weapon type
     */
    getCurrentWeaponType() {
        return this.currentWeaponType;
    }
}

// Example weapon objects structure:
/*
const exampleWeapons = {
    ironSword: {
        name: "Iron Sword",
        type: "1H Sword",
        damage: 10,
        model: "Sword2.glb",
        hasShield: false
    },
    knightShield: {
        name: "Knight Sword & Shield",
        type: "Sword",
        damage: 8,
        defense: 5,
        model: "Sword2.glb",
        hasShield: true
    },
    battleAxe: {
        name: "Battle Axe",
        type: "1H Axe",
        damage: 12,
        model: "axe.glb"
    },
    greatsword: {
        name: "Legendary Greatsword",
        type: "2H Greatsword",
        damage: 25,
        model: "greatsword.glb"
    },
    fireStaff: {
        name: "Fire Staff",
        type: "Magic Staff",
        damage: 15,
        magicPower: 20,
        model: "staff.glb"
    }
};
*/

export default EquipmentManager;
