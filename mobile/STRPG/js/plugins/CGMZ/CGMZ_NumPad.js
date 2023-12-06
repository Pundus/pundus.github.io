/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/numpad/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Number input processing that looks like a phone numpad
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
 * Made for RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Description: Adds a new number input processing command which looks similar
 * to a phone numpad. You can specify how many numbers to use and which
 * variable the number will be stored in. It can also be stored as a string if
 * leading zeros are important.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Beta Notes------------------------------------
 * Want additional features not already present? Make suggestions on the
 * Patreon Post, Itch.io page, or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ----------------------------Plugin Commands---------------------------------
 * This plugin supports the following plugin commands:
 * 
 * • Call Scene
 * Calls the numpad scene, see further documentation below.
 * -----------------------------Calling Scene----------------------------------
 * Calling the numpad scene with number=true will lose leading 0s. This means
 * 007 will become 7, because with numbers the leading 0s are insignificant.
 *
 * If leading 0s are important, set number to false when calling the numpad
 * scene. If number is set to false it will be stored as a string.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_NumPad.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.0 - Initial Release
 *
 * @command Call Scene
 * @desc Calls the Difficulty scene
 *
 * @arg variable
 * @type variable
 * @desc The variable to save the numpad entry to
 * @default 0
 *
 * @arg number
 * @type boolean
 * @desc Convert the input to a number (leading 0s will be lost)? If false, the variable will store a string representation of the input
 * @default true
 *
 * @arg Max Numbers
 * @type number
 * @desc Amount of numbers to allow the user to input
 * @default 9
 * @min 1
 *
 * @arg Placeholder
 * @desc Character to use when a number has not yet been entered
 * @default _
 *
 * @arg Background Style
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 * @desc Window background style. Same as Show Text event command.
 * @default Window
 *
 * @arg Scene Image
 * @type file
 * @dir img
 * @desc Image to display in the numpad scene background
 *
 * @param Text Options
 *
 * @param DEL Text
 * @parent Text Options
 * @desc Text to show in the "DEL" option on num pad
 * @default DEL
 *
 * @param OK Text
 * @parent Text Options
 * @desc Text to show in the "OK" option on num pad
 * @default OK
*/
var Imported = Imported || {};
Imported.CGMZ_NumPad = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["NumPad"] = "Beta";
CGMZ.NumPad = CGMZ.NumPad || {};
CGMZ.NumPad.parameters = PluginManager.parameters('CGMZ_NumPad');
CGMZ.NumPad.DelText = CGMZ.NumPad.parameters["DEL Text"];
CGMZ.NumPad.OkText = CGMZ.NumPad.parameters["OK Text"];
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add plugin command for numpad processing
//=============================================================================
//-----------------------------------------------------------------------------
// Register Difficulty Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_NumPad_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_NumPad_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_NumPad", "Call Scene", this.pluginCommandNumPadCallScene);
};
//-----------------------------------------------------------------------------
// Plugin Command - Call difficulty scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandNumPadCallScene = function(args) {
	SceneManager.push(CGMZ_Scene_NumPad);
	const bgStyle = ["Window","Dim","Transparent"].indexOf(args["Background Style"]);
	SceneManager.prepareNextScene(Number(args.variable), args.number === "true", Number(args["Max Numbers"]), args.Placeholder, bgStyle, args["Scene Image"]);
};
//=============================================================================
// CGMZ_Scene_NumPad
//-----------------------------------------------------------------------------
// Handle the numpad scene
//=============================================================================
function CGMZ_Scene_NumPad() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_NumPad.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_NumPad.prototype.constructor = CGMZ_Scene_NumPad;
//-----------------------------------------------------------------------------
// Prepare scene option
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.prepare = function(gameVar, isNumber, maxNumbers, placeholder, bgStyle, sceneImage) {
    this._gameVar = gameVar;
	this._isNumber = isNumber;
	this._maxNumbers = maxNumbers;
	this._placeholder = placeholder;
	this._bgStyle = bgStyle;
	this._sceneImage = sceneImage;
};
//-----------------------------------------------------------------------------
// Create numpad windows
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createCurrentEntryWindow();
	this.createListWindow();
};
//-----------------------------------------------------------------------------
// Create current difficulty window
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.createCurrentEntryWindow = function() {
	const rect = this.currentEntryWindowRect();
    this._currentEntryWindow = new CGMZ_Window_NumPad_CurrentEntry(rect, this._bgStyle);
	this._currentEntryWindow.setMax(this._maxNumbers);
	this._currentEntryWindow.setPlaceholder(this._placeholder);
    this.addWindow(this._currentEntryWindow);
};
//-----------------------------------------------------------------------------
// Get current difficulty window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.currentEntryWindowRect = function() {
	const x = Graphics.boxWidth / 4;
	const width = Graphics.boxWidth / 2;
	const height = this.calcWindowHeight(1, false);
	const y = Graphics.boxHeight / 4;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create current difficulty window
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_NumPad_NumberSelect(rect, this._bgStyle);
	this._listWindow.setHandler('cancel', this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
	this._listWindow.setEntryWindow(this._currentEntryWindow);
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get current difficulty window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.listWindowRect = function() {
	const x = this._currentEntryWindow.x;
	const width = this._currentEntryWindow.width;
	const height = this.calcWindowHeight(4, true);
	const y = this._currentEntryWindow.y + this._currentEntryWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.onListOk = function() {
	const entry = this._listWindow.item();
	if(entry === CGMZ.NumPad.DelText) {
		this._currentEntryWindow.removeNumber();
	} else if(entry === CGMZ.NumPad.OkText) {
		this.submitEntry(this._currentEntryWindow._entry);
	} else {
		this._currentEntryWindow.addNumber(entry);
	}
	this._listWindow.refresh();
	this._listWindow.activate();
};
//-----------------------------------------------------------------------------
// On entry submit
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.submitEntry = function(entry) {
	const value = this._isNumber ? Number(entry) : entry;
	$gameVariables.setValue(this._gameVar, value);
	this.popScene();
};
//-----------------------------------------------------------------------------
// Add background image
//-----------------------------------------------------------------------------
CGMZ_Scene_NumPad.prototype.createBackground = function() {
	if(this._sceneImage) {
		const imageData = $cgmzTemp.getImageData(this._sceneImage);
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		this.addChild(this._backgroundCustomSprite);
	} else {
		Scene_MenuBase.prototype.createBackground.call(this);
	}
};
//=============================================================================
// CGMZ_Window_NumPad_CurrentEntry
//-----------------------------------------------------------------------------
// Shows current numpad entry
//=============================================================================
function CGMZ_Window_NumPad_CurrentEntry(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_NumPad_CurrentEntry.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_NumPad_CurrentEntry.prototype.constructor = CGMZ_Window_NumPad_CurrentEntry;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.initialize = function(rect, bgStyle) {
    Window_Base.prototype.initialize.call(this, rect);
	this._entry = "";
	this._maxNumbers = 0;
	this.setBackgroundType(bgStyle);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.refresh = function() {
	this.contents.clear();
	this.drawCurrentEntry();
};
//-----------------------------------------------------------------------------
// Draw current difficulty
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.drawCurrentEntry = function() {
	const string = this._entry.padEnd(this._maxNumbers, this._placeholder);
	this.drawText(string, 0, 0, this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Add Number
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.addNumber = function(number) {
	this._entry = this._entry.concat(number);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Remove Number
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.removeNumber = function() {
	this._entry = this._entry.slice(0, -1);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Set max numbers
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.setMax = function(maxNumbers) {
	this._maxNumbers = maxNumbers;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Set placeholder
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.setPlaceholder = function(placeholder) {
	this._placeholder = placeholder;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Is more numbers ok?
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_CurrentEntry.prototype.canEnterNumber = function() {
	return this._maxNumbers > this._entry.length;
};
//=============================================================================
// CGMZ_Window_NumPad_NumberSelect
//-----------------------------------------------------------------------------
// Selectable window for choosing a number in the numpad
//=============================================================================
function CGMZ_Window_NumPad_NumberSelect(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_NumPad_NumberSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_NumPad_NumberSelect.prototype.constructor = CGMZ_Window_NumPad_NumberSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.initialize = function(rect, bgStyle) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this._entryWindow = null;
	this.setBackgroundType(bgStyle);
	this.select(0);
	this.activate();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Max columns
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.maxCols = function() {
    return 3;
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Determine if number entry is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.isEnabled = function(item) {
    if(item === CGMZ.NumPad.DelText || item === CGMZ.NumPad.OkText) return true;
	if(!this._entryWindow) return true;
	return this._entryWindow.canEnterNumber();
};
//-----------------------------------------------------------------------------
// Determine if current selected item is enabled
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.isCurrentItemEnabled = function() {
	return this.isEnabled(this.item());
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.makeItemList = function() {
    this._data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", CGMZ.NumPad.DelText, "0", CGMZ.NumPad.OkText];
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	this.changePaintOpacity(this.isEnabled(item));
    this.drawText(item, rect.x, rect.y, rect.width, 'center');
};
//-----------------------------------------------------------------------------
// Set Entry Window
//-----------------------------------------------------------------------------
CGMZ_Window_NumPad_NumberSelect.prototype.setEntryWindow = function(entryWindow) {
    this._entryWindow = entryWindow;
};