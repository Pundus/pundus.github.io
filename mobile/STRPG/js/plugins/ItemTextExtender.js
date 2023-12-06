/*:
 * @target MZ
 * @plugindesc 3-digit inventory quantity display.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/threads/160967/
 * @help Free to use and/or modify for any project, no credit required.
 */
// Override!
Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {
        this.drawText(":", x, y, width - this.textWidth("0000"), "right");  // width of 3 zeroes
        this.drawText($gameParty.numItems(item), x, y, width, "right");
    }
};