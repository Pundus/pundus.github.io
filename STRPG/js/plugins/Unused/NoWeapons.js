//=============================================================================
// NoWeapons.js
//=============================================================================
 /*:
 * @plugindesc For custom sideview graphics that don't use Weapons
 * @author tale (credit not necessary)
 *
 * @help
 * ImageManager ignores Weapons graphic in img/system without weapon loading.
 *
 * ===
 * 
 * License: Public Domain
 * 
 */

Scene_Boot.loadSystemImages = function() {
    // ImageManager.reserveSystem('Weapons1');
    // ImageManager.reserveSystem('Weapons2');
    // ImageManager.reserveSystem('Weapons3');
};

Sprite_Weapon.prototype.loadBitmap = function() {
};