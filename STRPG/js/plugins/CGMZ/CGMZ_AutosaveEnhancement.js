/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/autosaveenhancement/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Get more control over the built in autosave feature
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Beta
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: Control when the game attempts to autosave, manually autosave
 * via plugin command, and show a window when autosaving.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Beta Notes------------------------------------
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * --------------------------------General-------------------------------------
 * This plugin does not remove the default checks for autosaving. You still
 * need to have saving and autosaving enabled in the database.
 * ----------------------------Plugin Commands---------------------------------
 * • Autosave
 * This command will manually request an autosave. Optionally, you can tell
 * the game to forcefully attempt to autosave, which means the autosave will
 * ignore any conditions that might prevent autosave from occurring.
 *
 * • Enable Autosave
 * Allows you to enable or disable autosave types during the game. For example,
 * if you have a boss gauntlet coming up and do not want battle autosaves to 
 * occur until it is over, you can temporarily disable battle autosaves and
 * then re-enable them after using this plugin command.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add plugin to saved game and it will work as expected
 * ✓ Modify plugin parameters and have changes reflected in saved games
 * ✓ Remove plugin and saved games will continue to work as expected
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_AutosaveEnhancement.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Beta Release
 * - Added option to enable/disable autosave types mid-game
 *
 * @command Autosave
 * @desc Requests an autosave (may still fail).
 *
 * @arg Force
 * @type boolean
 * @desc Ignores auto save being temporarily disabled if true
 * @default false
 *
 * @command Enable Autosave
 * @desc Set if an autosave type should start/stop happening
 *
 * @arg Enable
 * @type boolean
 * @desc Whether this type of autosave will now be enabled
 * @default false
 *
 * @arg Type
 * @type select
 * @option transfer
 * @option battle
 * @desc The type of autosave to change
 * @default transfer
 * 
 * @param Battle Save
 * @type boolean
 * @desc Whether to autosave at end of battle or not
 * @default true
 * 
 * @param Transfer Save
 * @type boolean
 * @desc Whether to autosave at end of transfer player or not
 * @default true
 *
 * @param Window Options
 * 
 * @param Display Window
 * @parent Window Options
 * @type boolean
 * @desc Whether to show autosaving window or not when autosaving
 * @default true
 * 
 * @param Display Time
 * @parent Window Options
 * @type number
 * @min 1
 * @desc Amount of time (in frames) to display the autosaving window. 60f = 1s
 * @default 60
 * 
 * @param Window Text
 * @parent Window Options
 * @desc Text to display in autosaving display window
 * @default Autosaving...
 * 
 * @param Window Text Alignment
 * @parent Window Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc Autosaving window text alignment
 * @default center
 * 
 * @param Window Background
 * @parent Window Options
 * @type select
 * @option Normal
 * @value 0
 * @option Dim
 * @value 1
 * @option Transparent
 * @value 2
 * @desc Autosaving window background type
 * @default 1
 * 
 * @param Window Width
 * @parent Window Options
 * @type number
 * @desc Width (in pixels) of the Autosaving window
 * @default 200
 * 
 * @param X Offset
 * @parent Window Options
 * @type number
 * @desc Value to be subtracted from the X value of the window
 * @default 41
 * 
 * @param Y Offset
 * @parent Window Options
 * @type number
 * @desc Value to be subtracted from the Y value of the window
 * @default 31
*/
var Imported = Imported || {};
Imported.CGMZ_AutosaveEnhancement = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Autosave Enhancement"] = "Beta";
CGMZ.AutosaveEnhancement = {};
CGMZ.AutosaveEnhancement.parameters = PluginManager.parameters('CGMZ_AutosaveEnhancement');
CGMZ.AutosaveEnhancement.WindowText = CGMZ.AutosaveEnhancement.parameters["Window Text"];
CGMZ.AutosaveEnhancement.WindowTextAlignment = CGMZ.AutosaveEnhancement.parameters["Window Text Alignment"];
CGMZ.AutosaveEnhancement.BattleSave = (CGMZ.AutosaveEnhancement.parameters["Battle Save"] === 'true');
CGMZ.AutosaveEnhancement.TransferSave = (CGMZ.AutosaveEnhancement.parameters["Transfer Save"] === 'true');
CGMZ.AutosaveEnhancement.DisplayWindow = (CGMZ.AutosaveEnhancement.parameters["Display Window"] === 'true');
CGMZ.AutosaveEnhancement.DisplayTime = Number(CGMZ.AutosaveEnhancement.parameters["Display Time"]);
CGMZ.AutosaveEnhancement.WindowBackground = Number(CGMZ.AutosaveEnhancement.parameters["Window Background"]);
CGMZ.AutosaveEnhancement.WindowWidth = Number(CGMZ.AutosaveEnhancement.parameters["Window Width"]);
CGMZ.AutosaveEnhancement.XOffset = Number(CGMZ.AutosaveEnhancement.parameters["X Offset"]);
CGMZ.AutosaveEnhancement.YOffset = Number(CGMZ.AutosaveEnhancement.parameters["Y Offset"]);
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Register and process new plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_AutosaveEnhancement_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_AutosaveEnhancement_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_AutosaveEnhancement", "Autosave", this.pluginCommandAutosaveEnhancementAutosave);
	PluginManager.registerCommand("CGMZ_AutosaveEnhancement", "Enable Autosave", this.pluginCommandAutosaveEnhancementEnableAutosave);
};
//-----------------------------------------------------------------------------
// Request an autosave
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAutosaveEnhancementAutosave = function(args) {
	$cgmz.setAutosaveEnhancementForcing(args.Force === 'true');
	try {
		SceneManager._scene.requestAutosave();
	} catch(e) {
		console.warn("Autosave failed: " + e.name + ": " + e.message);
	}
};
//-----------------------------------------------------------------------------
// Enable/Disable autosave types
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandAutosaveEnhancementEnableAutosave = function(args) {
	$cgmz.setAutosaveEnhancementTypeEnabled(args.Type, (args.Enable === 'true'));
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Handle saved autosave enchancement data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize Autosave Data
//-----------------------------------------------------------------------------
const alias_CGMZ_AutosaveEnhancement_CGMZ_Core_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_AutosaveEnhancement_CGMZ_Core_createPluginData.call(this);
	this.initializeAutosaveData();
};
//-----------------------------------------------------------------------------
// Initialize Autosave Data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeAutosaveData = function() {
	this._autosaveEnhancementForcing = false;
	this._transferAutosave = CGMZ.AutosaveEnhancement.TransferSave;
	this._battleAutosave = CGMZ.AutosaveEnhancement.BattleSave;
};
//-----------------------------------------------------------------------------
// Check if loaded save after plugin was added, initialize data if so
//-----------------------------------------------------------------------------
const alias_CGMZ_AutosaveEnhancement_CGMZ_Core_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_AutosaveEnhancement_CGMZ_Core_onAfterLoad.call(this);
	if(typeof this._transferAutosave === 'undefined') {
		this._autosaveEnhancementForcing = false;
		this._transferAutosave = CGMZ.AutosaveEnhancement.TransferSave;
		this._battleAutosave = CGMZ.AutosaveEnhancement.BattleSave;
	}
};
//-----------------------------------------------------------------------------
// Set if the autosave should be forceful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setAutosaveEnhancementForcing = function(forcing) {
	this._autosaveEnhancementForcing = forcing;
};
//-----------------------------------------------------------------------------
// Check if the autosave should be forceful
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.isAutosaveEnhancementForcing = function() {
	return this._autosaveEnhancementForcing;
};
//-----------------------------------------------------------------------------
// Set the enabled status of autosaving for the given autosave type
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setAutosaveEnhancementTypeEnabled = function(type, enabled) {
	switch(type) {
		case 'transfer': this._transferAutosave = enabled; break;
		case 'battle': this._battleAutosave = enabled; break;
	}
};
//-----------------------------------------------------------------------------
// Check if autosave is enabled for the current type of autosave
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.isAutosaveEnhancementTypeEnabled = function(type) {
	switch(type) {
		case 'transfer': return this._transferAutosave;
		case 'battle': return this._battleAutosave;
	}
	return false;
};
//=============================================================================
// Scene_Base
//-----------------------------------------------------------------------------
// Additional control over autosave. Also create autosave window
//=============================================================================
//-----------------------------------------------------------------------------
// Add additional checks if autosave is enabled
//-----------------------------------------------------------------------------
const alias_CGMZ_AutosaveEnhancement_isAutosaveEnabled = Scene_Base.prototype.isAutosaveEnabled;
Scene_Base.prototype.isAutosaveEnabled = function() {
	if(DataManager.isBattleTest() || DataManager.isEventTest()) return false;
	if($cgmz.isAutosaveEnhancementForcing()) return true;
    return alias_CGMZ_AutosaveEnhancement_isAutosaveEnabled.call(this);
};
//-----------------------------------------------------------------------------
// Disable autosave forcing flag after attempt to autosave
//-----------------------------------------------------------------------------
const alias_CGMZ_AutosaveEnhancement_requestAutosave = Scene_Base.prototype.requestAutosave;
Scene_Base.prototype.requestAutosave = function() {
    alias_CGMZ_AutosaveEnhancement_requestAutosave.call(this);
	$cgmz.setAutosaveEnhancementForcing(false);
	if(this._cgmz_autosaveWindow) this._cgmz_autosaveWindow.open();
};
//-----------------------------------------------------------------------------
// Alias. Create autosave window after scene makes the window layer
//-----------------------------------------------------------------------------
const alias_CGMZ_AutosaveEnhancement_SceneBase_createWindowLayer = Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    alias_CGMZ_AutosaveEnhancement_SceneBase_createWindowLayer.call(this);
	if(CGMZ.AutosaveEnhancement.DisplayWindow) this.CGMZ_AutosaveEnhancement_createWindow();
};
//-----------------------------------------------------------------------------
// Create autosave window
//-----------------------------------------------------------------------------
Scene_Base.prototype.CGMZ_AutosaveEnhancement_createWindow = function() {
	const rect = this.CGMZ_AutosaveEnhancement_autosaveWindowRect();
    this._cgmz_autosaveWindow = new CGMZ_Window_Autosave(rect);
    this.addWindow(this._cgmz_autosaveWindow);
};
//-----------------------------------------------------------------------------
// Rect for autosave window
//-----------------------------------------------------------------------------
Scene_Base.prototype.CGMZ_AutosaveEnhancement_autosaveWindowRect = function() {
	const width = CGMZ.AutosaveEnhancement.WindowWidth;
	const height = this.calcWindowHeight(1, false);
	const x = Graphics.boxWidth - width - CGMZ.AutosaveEnhancement.XOffset;
	const y = Graphics.boxHeight - height - CGMZ.AutosaveEnhancement.YOffset;
	return new Rectangle(x, y, width, height);
};
//=============================================================================
// Scene_Battle
//-----------------------------------------------------------------------------
// Additional check if battle autosaving is turned ON
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if battle autosaving is turned ON
//-----------------------------------------------------------------------------
const alias_SceneBattle_CGMZ_AutosaveEnhancement_shouldAutosave = Scene_Battle.prototype.shouldAutosave;
Scene_Battle.prototype.shouldAutosave = function() {
	const oldReturn = alias_SceneBattle_CGMZ_AutosaveEnhancement_shouldAutosave.call(this);
    return (oldReturn && $cgmz.isAutosaveEnhancementTypeEnabled('battle'));
};
//=============================================================================
// Scene_Map
//-----------------------------------------------------------------------------
// Additional check if map autosaving is turned ON
//=============================================================================
//-----------------------------------------------------------------------------
// Also check if map autosaving is turned ON
//-----------------------------------------------------------------------------
const alias_SceneMap_CGMZ_AutosaveEnhancement_shouldAutosave = Scene_Map.prototype.shouldAutosave;
Scene_Map.prototype.shouldAutosave = function() {
    const oldReturn = alias_SceneMap_CGMZ_AutosaveEnhancement_shouldAutosave.call(this);
    return (oldReturn && $cgmz.isAutosaveEnhancementTypeEnabled('transfer'));
};
//=============================================================================
// CGMZ_Window_Autosave
//-----------------------------------------------------------------------------
// Autosave window that displays when game is autosaving
//=============================================================================
function CGMZ_Window_Autosave() {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_Autosave.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_Autosave.prototype.constructor = CGMZ_Window_Autosave;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_Autosave.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
	this._isDisplaying = false;
	this._bgType = CGMZ.AutosaveEnhancement.WindowBackground;
    this.contents.clear();
	this.createDimmerSprite();
	this.refreshDimmerBitmap();
	this._dimmerSprite.opacity = 0;
	this.CGMZ_drawTextLine(CGMZ.AutosaveEnhancement.WindowText, 0, 0, this.contents.width, CGMZ.AutosaveEnhancement.WindowTextAlignment);
};
//-----------------------------------------------------------------------------
// Update for fade in/out
//-----------------------------------------------------------------------------
CGMZ_Window_Autosave.prototype.update = function() {
	if(this._isDisplaying) {
		Window_Base.prototype.update.call(this);
		if (this._showCount > 0) {
			this.updateFadeIn();
			this._showCount--;
		} else {
			this.updateFadeOut();
		}
		if(this.contentsOpacity <= 0) {
			this._isDisplaying = false;
		}
	}
};
//-----------------------------------------------------------------------------
// Fade in
//-----------------------------------------------------------------------------
CGMZ_Window_Autosave.prototype.updateFadeIn = function() {
	this.opacity += 16 * (this._bgType === 0);
	this._dimmerSprite.opacity += 16 * (this._bgType === 1);
    this.contentsOpacity += 16;
};
//-----------------------------------------------------------------------------
// Fade out
//-----------------------------------------------------------------------------
CGMZ_Window_Autosave.prototype.updateFadeOut = function() {
	this.opacity -= 16 * (this._bgType === 0);
	this._dimmerSprite.opacity -= 16 * (this._bgType === 1);
    this.contentsOpacity -= 16;
};
//-----------------------------------------------------------------------------
// Open the window
//-----------------------------------------------------------------------------
CGMZ_Window_Autosave.prototype.open = function() {
	this._isDisplaying = true;
    this._showCount = CGMZ.AutosaveEnhancement.DisplayTime;
};
//-----------------------------------------------------------------------------
// Close the window
//-----------------------------------------------------------------------------
CGMZ_Window_Autosave.prototype.close = function() {
    this._showCount = 0;
};
//-----------------------------------------------------------------------------
// Do nothing, update this in opacity update function instead
//-----------------------------------------------------------------------------
CGMZ_Window_Autosave.prototype.updateBackgroundDimmer = function() {
};