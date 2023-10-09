/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/systemsettings/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Adds plugin commands for additional control over system settings
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.0
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.5.0
 * ----------------------------------------------------------------------------
 * Description: Adds some plugin commands that are meant to give you more
 * control over system settings after the game starts. While there are a lot of
 * system settings in the database, these are often not very easily changed
 * during gameplay. This plugin fixes that by allowing control over the
 * system settings mid-game.
 * ----------------------------------------------------------------------------
 * Documentation:
 * -----------------------Plugin Commands--------------------------------------
 * Set Destination Sprite - Enable/Disable the touch UI destination sprite.
 * Set Show Number of Key Items - Enable/Disable showing number of key items.
 * Set Slip Death - Enable/Disable if slip damage can kill.
 * Set Floor Death - Enable/Disable the floor damage can kill.
 * Set Display TP - Enable/Disable if TP is shown.
 * Set Autosave - Enable/Disable autosave functionality.
 * Set EXP for Reserve Members - Enable/Disable exp for reserve party members.
 * Set Side View Battle - Enable/Disable the sideview battle perspective.
 * Set Battle System - Alter which battle system is used.
 * Set Item Category - Change item categories during item select.
 * Set Menu Commands - Change display of menu categories.
 * Set Currency Unit - Change the currency unit.
 * Reset System Settings - Will reset the settings to match the current db.
 * ------------------------------Saved Games-----------------------------------
 * This plugin completely supports saved games.
 *
 * Since the system settings are now included in save data, changing them in
 * the database system tabs will no longer affect saved games. Changes made to
 * the settings in the database will only affect new games. Use reset command
 * to set all system settings back to what they are in the database.
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_SystemSettings.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -----------------------Version History--------------------------------------
 * 1.0.0 - Initial release
 *
 * @command Set Destination Sprite
 * @desc Enables/Disables the destination sprite from touch UI display
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable the Destination Sprite used by Touch UI
 * @default true
 *
 * @command Set Show Number of Key Items
 * @desc Enables/Disables numbers next to key items in item lists
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable the numbers next to key items in item lists
 * @default true
 *
 * @command Set Slip Death
 * @desc Enables/Disables the ability for party members to die from slip damage
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable slip death
 * @default true
 *
 * @command Set Floor Death
 * @desc Enables/Disables the ability for party members to die from floor damage
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable floor death
 * @default true
 *
 * @command Set Display TP
 * @desc Enables/Disables the displaying of TP
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable display of TP
 * @default true
 *
 * @command Set Autosave
 * @desc Enables/Disables autosave functionality
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable autosave
 * @default true
 *
 * @command Set EXP for Reserve Members
 * @desc Enables/Disables exp for reserve members
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable exp for reserve members
 * @default true
 *
 * @command Set Side View Battle
 * @desc Enables/Disables side view battle system
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable side view battle system
 * @default true
 *
 * @command Set Battle System
 * @desc Set the battle system to use
 *
 * @arg system
 * @type select
 * @option Turn-based
 * @option Time Progress (Active)
 * @option Time Progress (Wait)
 * @desc Changes to the selected battle system
 * @default Turn-based
 *
 * @command Set Item Category
 * @desc Set the item categories to display on item select screens
 *
 * @arg category
 * @type select
 * @option item
 * @option armor
 * @option weapon
 * @option key item
 * @desc The category to change
 * @default item
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable the selected category
 * @default true
 *
 * @command Set Menu Commands
 * @desc Set the menu commands to display
 *
 * @arg category
 * @type select
 * @option item
 * @option skill
 * @option equip
 * @option status
 * @option formation
 * @option save
 * @desc The command to change
 * @default item
 *
 * @arg enable
 * @type boolean
 * @desc Enable or Disable the selected command
 * @default true
 *
 * @command Set Currency Unit
 * @desc Set the currency unit
 *
 * @arg unit
 * @desc The new currency unit
 * @default G
 *
 * @command Reset System Settings
 * @desc Resets the system settings to what they are in the database
*/
var Imported = Imported || {};
Imported.CGMZ_SystemSettings = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["System Settings"] = "1.0.0";
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Registration and processing for new plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_SystemSettings_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_SystemSettings_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Destination Sprite", this.pluginCommandSystemSettingsSetOpts.bind(this, "destinationSprite"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Show Number of Key Items", this.pluginCommandSystemSettingsSetOpts.bind(this, "optKeyItemsNumber"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Slip Death", this.pluginCommandSystemSettingsSetOpts.bind(this, "optSlipDeath"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Floor Death", this.pluginCommandSystemSettingsSetOpts.bind(this, "optFloorDeath"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Display TP", this.pluginCommandSystemSettingsSetOpts.bind(this, "optDisplayTp"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Autosave", this.pluginCommandSystemSettingsSetOpts.bind(this, "optAutosave"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set EXP for Reserve Members", this.pluginCommandSystemSettingsSetOpts.bind(this, "optExtraExp"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Side View Battle", this.pluginCommandSystemSettingsSetOpts.bind(this, "optSideView"));
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Battle System", this.pluginCommandSystemSettingsSetBattleSystem);
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Item Category", this.pluginCommandSystemSettingsSetItemCategory);
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Menu Commands", this.pluginCommandSystemSettingsSetMenuCommands);
	PluginManager.registerCommand("CGMZ_SystemSettings", "Set Currency Unit", this.pluginCommandSystemSettingsSetCurrencyUnit);
	PluginManager.registerCommand("CGMZ_SystemSettings", "Reset System Settings", this.pluginCommandSystemSettingsReset);
};
//-----------------------------------------------------------------------------
// Enables/Disables the boolean system settings such as autosave or display TP
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSystemSettingsSetOpts = function(setting, args) {
	const enable = (args.enable === 'true');
	$cgmz.setSystemSetting(setting, enable);
};
//-----------------------------------------------------------------------------
// Sets the battle system to use
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSystemSettingsSetBattleSystem = function(args) {
	const battleSystems = ["Turn-based", "Time Progress (Active)", "Time Progress (Wait)"];
	const id = battleSystems.indexOf(args.system);
	$cgmz.setSystemSetting("battleSystem", id);
};
//-----------------------------------------------------------------------------
// Sets the item category to enable/disable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSystemSettingsSetItemCategory = function(args) {
	const itemCategories = ["item", "weapon", "armor", "key item"];
	const enable = (args.enable === 'true');
	const id = itemCategories.indexOf(args.category);
	const cgmzItemCategories = $cgmz.getSystemSetting("itemCategories");
	cgmzItemCategories[id] = enable;
	$cgmz.setSystemSetting("itemCategories", cgmzItemCategories);
};
//-----------------------------------------------------------------------------
// Sets the menu command to enable/disable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSystemSettingsSetMenuCommands = function(args) {
	const menuCommands = ["item", "skill", "equip", "status", "formation", "save"];
	const enable = (args.enable === 'true');
	const id = menuCommands.indexOf(args.category);
	const cgmzMenuCommands = $cgmz.getSystemSetting("menuCommands");
	cgmzMenuCommands[id] = enable;
	$cgmz.setSystemSetting("menuCommands", cgmzMenuCommands);
};
//-----------------------------------------------------------------------------
// Sets the currency unit
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSystemSettingsSetCurrencyUnit = function(args) {
	$cgmz.setSystemSetting("currencyUnit", args.unit);
};
//-----------------------------------------------------------------------------
// Sets the currency unit
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandSystemSettingsReset = function() {
	$dataSystem = JSON.parse(JSON.stringify($cgmzDeepCopyDataSystem));
	$cgmz.initSystemSettings();
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Handling of new system setting options
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize system settings
//-----------------------------------------------------------------------------
const alias_CGMZ_SystemSettings_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_SystemSettings_createPluginData.call(this);
	this.initSystemSettings();
};
//-----------------------------------------------------------------------------
// Init cgmz system settings (if no exist) or use cgmz system settings
//-----------------------------------------------------------------------------
const alias_CGMZ_SystemSettings_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_SystemSettings_onAfterLoad.call(this);
	if(!this._systemSettings) {
		$dataSystem = JSON.parse(JSON.stringify($cgmzDeepCopyDataSystem));
		this.initSystemSettings();
	} else {
		this.updateSystemDataSettings();
	}
};
//-----------------------------------------------------------------------------
// Initialize system settings
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initSystemSettings = function() {
	this._systemSettings = {};
	this._systemSettings.destinationSprite = true;
	this._systemSettings.optKeyItemsNumber = $dataSystem.optKeyItemsNumber;
	this._systemSettings.optSlipDeath = $dataSystem.optSlipDeath;
	this._systemSettings.optFloorDeath = $dataSystem.optFloorDeath;
	this._systemSettings.optDisplayTp = $dataSystem.optDisplayTp;
	this._systemSettings.optAutosave = $dataSystem.optAutosave;
	this._systemSettings.optExtraExp = $dataSystem.optExtraExp;
	this._systemSettings.optSideView = $dataSystem.optSideView;
	this._systemSettings.battleSystem = $dataSystem.battleSystem;
	this._systemSettings.itemCategories = [...$dataSystem.itemCategories];
	this._systemSettings.menuCommands = [...$dataSystem.menuCommands];
	this._systemSettings.currencyUnit = $dataSystem.currencyUnit;
};
//-----------------------------------------------------------------------------
// Set data settings
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.updateSystemDataSettings = function() {
	$dataSystem.optKeyItemsNumber = this._systemSettings.optKeyItemsNumber;
	$dataSystem.optSlipDeath = this._systemSettings.optSlipDeath;
	$dataSystem.optFloorDeath = this._systemSettings.optFloorDeath;
	$dataSystem.optDisplayTp = this._systemSettings.optDisplayTp;
	$dataSystem.optAutosave = this._systemSettings.optAutosave;
	$dataSystem.optExtraExp = this._systemSettings.optExtraExp;
	$dataSystem.optSideView = this._systemSettings.optSideView;
	$dataSystem.battleSystem = this._systemSettings.battleSystem;
	$dataSystem.itemCategories = [...this._systemSettings.itemCategories];
	$dataSystem.menuCommands = [...this._systemSettings.menuCommands];
	$dataSystem.currencyUnit = this._systemSettings.currencyUnit;
};
//-----------------------------------------------------------------------------
// Setter for system settings
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setSystemSetting = function(setting, value) {
	this._systemSettings[setting] = value;
	this.updateSystemDataSettings();
};
//-----------------------------------------------------------------------------
// Getter for system settings
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getSystemSetting = function(setting) {
	return this._systemSettings[setting];
};
//=============================================================================
// Scene_Boot
//-----------------------------------------------------------------------------
// Make a deep copy of data system on database load
//=============================================================================
$cgmzDeepCopyDataSystem = null;
//-----------------------------------------------------------------------------
// Alias. Deep copy data system
//-----------------------------------------------------------------------------
const alias_CGMZ_SystemSettings_SceneBoot_startNormalGame = Scene_Boot.prototype.startNormalGame;
Scene_Boot.prototype.startNormalGame = function() {
    alias_CGMZ_SystemSettings_SceneBoot_startNormalGame.call(this);
	$cgmzDeepCopyDataSystem = JSON.parse(JSON.stringify($dataSystem));
};
//=============================================================================
// Scene_Title
//-----------------------------------------------------------------------------
// New game should also include reloading the data system file
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Reset data system to what it was on game boot
//-----------------------------------------------------------------------------
const alias_CGMZ_SystemSettings_SceneTitle_commandNewGame = Scene_Title.prototype.commandNewGame;
Scene_Title.prototype.commandNewGame = function() {
	$dataSystem = JSON.parse(JSON.stringify($cgmzDeepCopyDataSystem));
	alias_CGMZ_SystemSettings_SceneTitle_commandNewGame.call(this);
};
//=============================================================================
// Sprite_Destination
//-----------------------------------------------------------------------------
// Do not display sprite if setting is false
//=============================================================================
//-----------------------------------------------------------------------------
// Do not update or display if turned off
//-----------------------------------------------------------------------------
const alias_CGMZ_SystemSettings_SpriteDestination_update = Sprite_Destination.prototype.update;
Sprite_Destination.prototype.update = function() {
	if($cgmz.getSystemSetting("destinationSprite")) {
		alias_CGMZ_SystemSettings_SpriteDestination_update.call(this);
	} else {
		Sprite.prototype.update.call(this);
		this._frameCount = 0;
        this.visible = false;
	}
};