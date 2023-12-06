/*:
 * @target MV MZ
 * @plugindesc Set max inventory stack size to 9.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/threads/160268/
 * @help Free to use and/or modify for any project, no credit required.
 */
// Override
Game_Party.prototype.maxItems = function(item) {
    return 9999;  // originally 99
};