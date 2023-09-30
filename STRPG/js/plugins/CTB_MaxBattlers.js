//=============================================================================
// RPG Maker MZ - CT_Bolt's Max Battlers
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.00 CT_Bolt's Max Battlers
 * @author CT_Bolt
 *
 * @param Max Battlers
 * @text Number of Max Battlers
 * @desc Number of Max Battlers
 * @default
 *
 * @help CTB_MaxBattlers.js
 *
 * This plugin provides MaxBattler settings.
 *
 */

var CTB = CTB || {}; CTB.MaxBattlers  = CTB.MaxBattlers || {};
var Imported = Imported || {}; Imported["CTB_MaxBattlers"] = 1.00;

(($_$) => {
    const pluginName = "CTB_MaxBattlers";
    function getPluginParameters() {var a = document.currentScript || (function() { var b = document.getElementsByTagName('script'); return b[b.length - 1]; })(); return PluginManager.parameters(a.src.substring((a.src.lastIndexOf('/') + 1), a.src.indexOf('.js')));} $_$.par = getPluginParameters();

	$_$.par['Max Battlers'] = $_$.par['Max Battlers'] || 4;

Window_BattleStatus.prototype.maxCols = function() {
    const partySize = $gameParty.members().length;
    return Math.max(Math.min(partySize, 6), 4);
};

Game_Party.prototype.maxBattleMembers = function() {
    return  $_$.par['Max Battlers'] || 4;
};


})(CTB.MaxBattlers);