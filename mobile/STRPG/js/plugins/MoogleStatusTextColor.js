//=============================================================================
// RPG Maker MZ - HP / MP / TP Font Colors
//=============================================================================
// Author: Mooglerampage (Chris W.)
// Developed Oct 2021 - alpha version


var Imported = Imported || {};
Imported.MoogleStatusTextColor = true;

var Mooglerampage = Mooglerampage || {};        // Mooglerampage main
Mooglerampage.FC = Mooglerampage.FC || {};      // Plugin object itself
Mooglerampage.FC.pluginName = "MoogleStatusTextColor";


/*:
 * @target MZ
 * @plugindesc Customize the font colors for the HP, MP, and/or TP text within the status area (on top of the bars)
 * @author mooglerampage
 *
 * @param HPColor
 * @default 20
 * @text HP text color code
 * @desc Text color used for the HP text within the status bar
 * 
 * 
 * @param MPColor
 * @text MP text color code
 * @desc Text color used for the MP text within the status bar
 * @default 22
 *
 * @param TPColor
 * @text TP text color code
 * @desc Text color used for the TP text within the status bar
 * @default 28
 * 
 * 
 */



Sprite_Gauge.prototype.labelColor = function() {
	switch (this._statusType) {
		case "hp":
			if (PluginManager.parameters('MoogleStatusTextColor').HPColor) {
				return ColorManager.textColor(PluginManager.parameters('MoogleStatusTextColor').HPColor);
			}
			else {
				return ColorManager.hpGaugeColor1();
			}
		case "mp":
			if (PluginManager.parameters('MoogleStatusTextColor').MPColor) {
				return ColorManager.textColor(PluginManager.parameters('MoogleStatusTextColor').MPColor);
			}
			else {
				return ColorManager.mpGaugeColor1();
			}
		case "tp":
			if (PluginManager.parameters('MoogleStatusTextColor').TPColor) {
				return ColorManager.textColor(PluginManager.parameters('MoogleStatusTextColor').TPColor);
			}
			else {
				return ColorManager.tpGaugeColor1();
			}
		case "time":
			return ColorManager.ctGaugeColor1();
		default:
			return ColorManager.normalColor();
	}
};