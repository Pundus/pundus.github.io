/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/currencysystem/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Create multiple currencies in your game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Alpha
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Description: Implements a currency system for your game which can handle
 * multiple currencies.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Alpha Notes-----------------------------------
 * This plugin is in *ALPHA* stage, which means it is not feature complete.
 * I plan to add the following features before it reaches *BETA* stage:
 * 1) Shops that use multiple currencies in the same shop
 * 2) Item values different in different currencies
 * 3) Equipment for gold-double effect of custom currencies
 *
 * Want additional features not already present/listed above? Make suggestions
 * on the Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ----------------------------Main Currency-----------------------------------
 * The main currency controls which currency is displayed in the gold window,
 * which is typically shown in the main menu or with the \$ text code.
 * -----------------------------Currency ID------------------------------------
 * The currency ID is just a unique way to refer to the currency. It does not
 * have to be a number, just unique (no currencies can have the same ID). The
 * ID "default" is reserved for the built-in currency and should not be used
 * for a custom currency.
 * ------------------------------Text Codes------------------------------------
 * Text used in the descriptions support most text codes such as those used
 * in the Show Text event command, including colors, icons, variables, etc.
 * It should also support most custom text codes depending on the custom code
 * implementation.
 * ---------------------------Default Currency---------------------------------
 * The default currency set up via the database is not affected by this plugin.
 * Some options not available through the database are provided, such as the
 * description parameter, but the options used in the database will be used for
 * the default currency.
 * -------------------------------Notetags-------------------------------------
 * To set up enemies that drop custom currencies, use the notetag:
 * <cgmzcurrencyrewards:id:amount>
 * For example, if your currency id was "gems" and you wanted to drop 15, the
 * note tag would be:
 * <cgmzcurrencyrewards:gems:15>
 * You can also separate multiple currencies via a comma. If you wanted the
 * enemy to drop 15 gems AND 100 crystals, you could do:
 * <cgmzcurrencyrewards:gems:15,crystals:100>
 * You can drop as many currencies as you want via chaining them together with
 * commas, there is no limit.
 * ------------------------------Saved Games-----------------------------------
 * This plugin supports saved games. You should be able to add it in, create
 * currencies, and those will be recognized in saved games. Modifying existing
 * currencies is supported for parameters including max, icon, color, unit,
 * description, and name. Saved games will not recognize if the currency
 * discover status changes in the plugin parameters, only if you change it via
 * plugin command.
 * ----------------------------------FAQ---------------------------------------
 * Q: I just added the plugin without setting anything up and now my game is
 *    crashing?
 *
 * A: This plugin adds unlimited new currencies, which is the main function of
 *    the plugin. It assumes you will set at least one currency up before
 *    using it and could have problems if none are set up.
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JS file MUST be CGMZ_CurrencySystem.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * ----------------------------Version History---------------------------------
 * Version 1.0.0: Initial Release
 *
 * @command Call Scene
 * @desc Calls the currency scene
 *
 * @command Gain Currency
 * @desc Gain a specified amount of a currency
 *
 * @arg id
 * @desc The id of the currency to increase
 *
 * @arg amount
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of currency to gain
 *
 * @arg variable
 * @type variable
 * @default 0
 * @desc Gain the amount of currency stored in the variable. Leave 0 to use a set Amount instead
 *
 * @command Lose Currency
 * @desc Lose a specified amount of a currency
 *
 * @arg id
 * @desc The id of the currency to decrease
 *
 * @arg amount
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of currency to lose
 *
 * @arg variable
 * @type variable
 * @default 0
 * @desc Lose the amount of currency stored in the variable. Leave 0 to use a set Amount instead
 *
 * @command Discover Currency
 * @desc Change discovered status of a currency
 *
 * @arg id
 * @desc The id of the currency to change
 *
 * @arg discover
 * @type boolean
 * @default true
 * @desc Whether the currency should be discovered or not
 *
 * @command Set Main Currency
 * @desc Designate a currency as the "main" currency. "default" = database currency
 *
 * @arg id
 * @desc The id of the currency to designate as the main currency
 *
 * @command Get Currency Amount
 * @desc Store the amount of currency a player has in a variable for use in conditionals
 *
 * @arg id
 * @desc The id of the currency
 *
 * @arg variableId
 * @type variable
 * @default 0
 * @desc The id of the variable to store the currency amount in
 *
 * @command Check Main Currency
 * @desc Store whether the main currency matches the id provided in a switch for use in conditionals
 *
 * @arg id
 * @desc The id of the currency
 *
 * @arg switchId
 * @type switch
 * @default 0
 * @desc The id of the switch to store the result in. True = match, False = no match
 *
 * @param ---DEFAULT CURRENCY OPTIONS---
 *
 * @param Default Color
 * @parent ---DEFAULT CURRENCY OPTIONS---
 * @type number
 * @default 1
 * @desc The text color code to use for the default currency unit/name
 *
 * @param Default Icon
 * @parent ---DEFAULT CURRENCY OPTIONS---
 * @type number
 * @min 0
 * @default 0
 * @desc Icon index of the default currency
 *
 * @param Default Name
 * @parent ---DEFAULT CURRENCY OPTIONS---
 * @default Gold
 * @desc The full name of the default currency
 *
 * @param Default Max
 * @parent ---DEFAULT CURRENCY OPTIONS---
 * @type number
 * @default 99999999
 * @desc The maximum amount of the default currency
 *
 * @param Default Description
 * @parent ---DEFAULT CURRENCY OPTIONS---
 * @type note
 * @default ""
 * @desc A short description of the default currency.
 *
 * @param -----CURRENCIES-----
 *
 * @param Currencies
 * @parent -----CURRENCIES-----
 * @type struct<Currency>[]
 * @default []
 * @desc Set up currencies here
 *
 * @param ---CURRENCY OPTIONS---
 *
 * @param Always Draw Icons
 * @parent ---CURRENCY OPTIONS---
 * @type boolean
 * @default true
 * @desc Determines if currency amounts should always draw their icon
 *
 * @param ---CURRENCY SCENE OPTIONS---
 *
 * @param Scene Help Lines
 * @parent ---CURRENCY SCENE OPTIONS---
 * @type number
 * @default 2
 * @desc The height in lines of the help window
 *
 * @param Scene Background Image
 * @parent ---CURRENCY SCENE OPTIONS---
 * @type file
 * @require 1
 * @dir img
 * @desc The image to show as the scene background while the player is in the currency scene
 *
 * @param Transparent Windows
 * @parent ---CURRENCY SCENE OPTIONS---
 * @type boolean
 * @default false
 * @desc Determines if currency scene windows are transparent
 *
 * @param ---TEXT OPTIONS---
 *
 * @param Found Text
 * @parent ---TEXT OPTIONS---
 * @default found!
 * @desc Text to describe currency drop from battle.
*/
/*~struct~Currency:
 * @param Id
 * @desc The unique id of the currency. Does not need to be a number, just unique.
 *
 * @param Name
 * @desc The full name of the currency.
 *
 * @param Description
 * @type note
 * @default ""
 * @desc A short description of the currency.
 *
 * @param Unit
 * @desc The shortened currency unit
 *
 * @param Color
 * @type number
 * @default 2
 * @desc The text color code to use for the currency unit/name
 *
 * @param Icon
 * @type number
 * @desc Icon index of the icon to represent the currency
 *
 * @param Discovered
 * @type boolean
 * @default false
 * @desc Whether the player has discovered this currency yet.
 * 
 * @param Max
 * @type number
 * @default 0
 * @min 0
 * @desc The maximum amount of this currency the player can hold. 0 = infinite
*/
var Imported = Imported || {};
Imported.CGMZ_CurrencySystem = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Currency System"] = "Alpha";
CGMZ.CurrencySystem = {};
CGMZ.CurrencySystem.parameters = PluginManager.parameters('CGMZ_CurrencySystem');
CGMZ.CurrencySystem.Currencies = JSON.parse(CGMZ.CurrencySystem.parameters["Currencies"]);
CGMZ.CurrencySystem.DefaultDescription = JSON.parse(CGMZ.CurrencySystem.parameters["Default Description"]);
CGMZ.CurrencySystem.DefaultName = CGMZ.CurrencySystem.parameters["Default Name"];
CGMZ.CurrencySystem.SceneBackground = CGMZ.CurrencySystem.parameters["Scene Background Image"];
CGMZ.CurrencySystem.FoundText = CGMZ.CurrencySystem.parameters["Found Text"];
CGMZ.CurrencySystem.SceneHelpLines = Number(CGMZ.CurrencySystem.parameters["Scene Help Lines"]);
CGMZ.CurrencySystem.DefaultIconIndex = Number(CGMZ.CurrencySystem.parameters["Default Icon"]);
CGMZ.CurrencySystem.DefaultColor = Number(CGMZ.CurrencySystem.parameters["Default Color"]);
CGMZ.CurrencySystem.DefaultMax = Number(CGMZ.CurrencySystem.parameters["Default Max"]);
CGMZ.CurrencySystem.TransparentWindows = (CGMZ.CurrencySystem.parameters["Transparent Windows"] === 'true');
CGMZ.CurrencySystem.AlwaysDrawIcons = (CGMZ.CurrencySystem.parameters["Always Draw Icons"] === 'true');
//=============================================================================
// CGMZ_CurrencyTemp
//-----------------------------------------------------------------------------
// Temp data class used to track currency properties
//=============================================================================
function CGMZ_CurrencyTemp() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_CurrencyTemp.prototype.initialize = function(currency) {
	this._id = currency.Id;
	this._name = currency.Name;
	this._unit = currency.Unit;
	this._description = JSON.parse(currency.Description);
	this._iconIndex = Number(currency.Icon);
	this._color = Number(currency.Color);
	this._max = Number(currency.Max);
};
//-----------------------------------------------------------------------------
// Get max currency
//-----------------------------------------------------------------------------
CGMZ_CurrencyTemp.prototype.max = function() {
	return this._max;
};
//=============================================================================
// CGMZ_Currency
//-----------------------------------------------------------------------------
// Saved currency data class
//=============================================================================
function CGMZ_Currency() {
    this.initialize(...arguments);
}
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Currency.prototype.initialize = function(currency) {
	this._id = currency.Id;
	this._discovered = (currency.Discovered === 'true');
	this._amount = 0;
};
//-----------------------------------------------------------------------------
// Get currency amount (always return 0 if not discovered)
//-----------------------------------------------------------------------------
CGMZ_Currency.prototype.amount = function() {
	return this._discovered ? this._amount : 0;
};
//-----------------------------------------------------------------------------
// Check if currency is discovered
//-----------------------------------------------------------------------------
CGMZ_Currency.prototype.isDiscovered = function() {
	return this._discovered;
};
//-----------------------------------------------------------------------------
// Change discover status of currency.
//-----------------------------------------------------------------------------
CGMZ_Currency.prototype.discover = function(discoverStatus) {
	if(this._discovered !== discoverStatus) {
		this._discovered = discoverStatus;
	}
};
//-----------------------------------------------------------------------------
// Gain Currency
//-----------------------------------------------------------------------------
CGMZ_Currency.prototype.gainCurrency = function(amount) {
	this._amount = (this._amount + amount).clamp(0, this.max());
};
//-----------------------------------------------------------------------------
// Lose Currency
//-----------------------------------------------------------------------------
CGMZ_Currency.prototype.loseCurrency = function(amount) {
	this.gainCurrency(-amount);
};
//-----------------------------------------------------------------------------
// Get max currency
//-----------------------------------------------------------------------------
CGMZ_Currency.prototype.max = function() {
	const currency = $cgmzTemp.getCurrency(this._id);
	return currency ? currency.max() : 0;
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Handle saved currency data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize currency data
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_CGMZ_Core_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_CurrencySystem_CGMZ_Core_createPluginData.call(this);
	this.initializeCurrencyData(false);
};
//-----------------------------------------------------------------------------
// Initialize currency data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeCurrencyData = function(reinitialize) {
	if(!this._currencies || reinitialize) {
		this._currencies = {};
		this._currentMainCurrency = "default";
	}
	for(const currencyJSON of CGMZ.CurrencySystem.Currencies) {
		const currencyObj = JSON.parse(currencyJSON);
		if(typeof this._currencies[currencyObj.Id] === 'undefined') {
			this._currencies[currencyObj.Id] = new CGMZ_Currency(currencyObj);
		}
	}
};
//-----------------------------------------------------------------------------
// Check if currency should be created in save game.
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_CGMZ_Core_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_CurrencySystem_CGMZ_Core_onAfterLoad.call(this);
	this.initializeCurrencyData(false);
};
//-----------------------------------------------------------------------------
// Get a currency object
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.mainCurrency = function() {
	return this._currentMainCurrency;
};
//-----------------------------------------------------------------------------
// Get a currency object
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getCurrency = function(id) {
	return this._currencies[id];
};
//-----------------------------------------------------------------------------
// Get discovered currencies
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getDiscoveredCurrencies = function() {
	return Object.keys(this._currencies).filter(c => this.getCurrency(c).isDiscovered());
};
//-----------------------------------------------------------------------------
// Get a currency amount
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getCurrencyAmount = function(id) {
	const currency = this._currencies[id];
	if(currency) return currency.amount();
	return 0;
};
//-----------------------------------------------------------------------------
// Set the current main currency.
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.setMainCurrency = function(id) {
	this._currentMainCurrency = id;
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Add temp currency data and plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Also initialize currency data
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_CGMZ_Temp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_CurrencySystem_CGMZ_Temp_createPluginData.call(this);
	this.initializeCurrencyData();
};
//-----------------------------------------------------------------------------
// Initialize currency data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeCurrencyData = function() {
	this._currencies = {};
	for(const currencyJSON of CGMZ.CurrencySystem.Currencies) {
		const currencyObj = JSON.parse(currencyJSON);
		this._currencies[currencyObj.Id] = new CGMZ_CurrencyTemp(currencyObj);
	}
};
//-----------------------------------------------------------------------------
// Get currency data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getCurrency = function(id) {
	return this._currencies[id];
};
//-----------------------------------------------------------------------------
// Register Currency Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_CGMZ_Temp_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_CurrencySystem_CGMZ_Temp_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_CurrencySystem", "Call Scene", this.pluginCommandCurrencySystemCallScene);
	PluginManager.registerCommand("CGMZ_CurrencySystem", "Gain Currency", this.pluginCommandCurrencySystemGainCurrency);
	PluginManager.registerCommand("CGMZ_CurrencySystem", "Lose Currency", this.pluginCommandCurrencySystemLoseCurrency);
	PluginManager.registerCommand("CGMZ_CurrencySystem", "Discover Currency", this.pluginCommandCurrencySystemDiscoverCurrency);
	PluginManager.registerCommand("CGMZ_CurrencySystem", "Set Main Currency", this.pluginCommandCurrencySystemSetMainCurrency);
	PluginManager.registerCommand("CGMZ_CurrencySystem", "Get Currency Amount", this.pluginCommandCurrencySystemGetCurrencyAmount);
	PluginManager.registerCommand("CGMZ_CurrencySystem", "Check Main Currency", this.pluginCommandCurrencySystemCheckMainCurrency);
};
//-----------------------------------------------------------------------------
// Plugin Command - call scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCurrencySystemCallScene = function() {
	SceneManager.push(CGMZ_Scene_CurrencyBag);
};
//-----------------------------------------------------------------------------
// Plugin Command - gain currency
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCurrencySystemGainCurrency = function(args) {
	const variable = Number(args.variable);
	const amount = (variable > 0) ? $gameVariables.value(variable) : Number(args.amount);
	const currency = $cgmz.getCurrency(args.id);
	if(currency) {
		currency.gainCurrency(amount);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - lose currency
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCurrencySystemLoseCurrency = function(args) {
	const variable = Number(args.variable);
	const amount = (variable > 0) ? $gameVariables.value(variable) : Number(args.amount);
	const currency = $cgmz.getCurrency(args.id);
	if(currency) {
		currency.loseCurrency(amount);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - discover currency
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCurrencySystemDiscoverCurrency = function(args) {
	const discover = (args.discover === 'true');
	const currency = $cgmz.getCurrency(args.id);
	if(currency) {
		currency.discover(discover);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - set main currency
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCurrencySystemSetMainCurrency = function(args) {
	const currency = $cgmz.getCurrency(args.id);
	if(currency || args.id === "default") {
		$cgmz.setMainCurrency(args.id);
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - get currency amount
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCurrencySystemGetCurrencyAmount = function(args) {
	const currency = $cgmz.getCurrency(args.id);
	const variableId = Number(args.variableId);
	if(currency) {
		$gameVariables.setValue(variableId, currency.amount());
	}
};
//-----------------------------------------------------------------------------
// Plugin Command - check main currency
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandCurrencySystemCheckMainCurrency = function(args) {
	const switchId = Number(args.switchId);
	$gameSwitches.setValue(switchId, $cgmz.mainCurrency() === args.id);
};
//=============================================================================
// CGMZ_Scene_CurrencyBag
//-----------------------------------------------------------------------------
// Handle the currency bag scene
//=============================================================================
function CGMZ_Scene_CurrencyBag() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_CurrencyBag.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_CurrencyBag.prototype.constructor = CGMZ_Scene_CurrencyBag;
//-----------------------------------------------------------------------------
// Create scene windows
//-----------------------------------------------------------------------------
CGMZ_Scene_CurrencyBag.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this.createHelpWindow();
	this.createSelectWindow();
};
//-----------------------------------------------------------------------------
// Create help window
//-----------------------------------------------------------------------------
CGMZ_Scene_CurrencyBag.prototype.createHelpWindow = function() {
	const rect = this.helpWindowRect();
    this._helpWindow = new Window_Help(rect);
    this.addWindow(this._helpWindow);
};
//-----------------------------------------------------------------------------
// Get help window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_CurrencyBag.prototype.helpWindowRect = function() {
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(CGMZ.CurrencySystem.SceneHelpLines, false);
	const x = 0;
	const y = this.buttonAreaHeight();
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create select window
//-----------------------------------------------------------------------------
CGMZ_Scene_CurrencyBag.prototype.createSelectWindow = function() {
	const rect = this.selectWindowRect();
    this._selectWindow = new CGMZ_Window_CurrencyBagSelect(rect);
	this._selectWindow.setHandler('cancel', this.popScene.bind(this));
	this._selectWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._selectWindow);
};
//-----------------------------------------------------------------------------
// Get select window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_CurrencyBag.prototype.selectWindowRect = function() {
	const width = this._helpWindow.width;
	const height = Graphics.boxHeight - this._helpWindow.y - this._helpWindow.height;
	const x = 0
	const y = this._helpWindow.y + this._helpWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Add custom background image
//-----------------------------------------------------------------------------
CGMZ_Scene_CurrencyBag.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
	if(CGMZ.CurrencySystem.SceneBackground) {
		const imageData = $cgmzTemp.getImageData(CGMZ.CurrencySystem.SceneBackground);
		this._backgroundCustomSprite = new Sprite();
		this._backgroundCustomSprite.bitmap = ImageManager.loadBitmap(imageData.folder, imageData.filename);
		this.addChild(this._backgroundCustomSprite);
	}
};
//=============================================================================
// CGMZ_Window_CurrencyBagSelect
//-----------------------------------------------------------------------------
// Selectable window for looking at currencies
//=============================================================================
function CGMZ_Window_CurrencyBagSelect(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_CurrencyBagSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_CurrencyBagSelect.prototype.constructor = CGMZ_Window_CurrencyBagSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_CurrencyBagSelect.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
	this.setBackgroundType(2 * (CGMZ.CurrencySystem.TransparentWindows));
	this.makeItemList();
	this.refresh();
	this.select(0);
	this.activate();
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_CurrencyBagSelect.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_CurrencyBagSelect.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_CurrencyBagSelect.prototype.makeItemList = function() {
	this._data = $cgmz.getDiscoveredCurrencies();
	this._data.unshift("default");
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_CurrencyBagSelect.prototype.drawItem = function(index) {
    const item = this._data[index];
    const rect = this.itemRectWithPadding(index);
	const currency = $cgmz.getCurrency(item);
	const currencyTemp = $cgmzTemp.getCurrency(item);
	let icon, color, name, amount;
	if(currency) {
		icon = '\\i[' + currencyTemp._iconIndex + '] ';
		color = '\\c[' + currencyTemp._color + ']';
		name = currencyTemp._name;
		amount = currency.amount().toLocaleString();
	} else {
		icon = '\\i[' + CGMZ.CurrencySystem.DefaultIconIndex + '] ';
		color = '\\c[' + CGMZ.CurrencySystem.DefaultColor + ']';
		name = CGMZ.CurrencySystem.DefaultName;
		amount = $gameParty.gold().toLocaleString();
	}
	this.CGMZ_drawTextLine(icon + color + name + '\\c[0]', rect.x, rect.y, rect.width, 'left');
	this.CGMZ_drawTextLine(amount, rect.x, rect.y, rect.width, 'right');
};
//-----------------------------------------------------------------------------
// Update help window
//-----------------------------------------------------------------------------
CGMZ_Window_CurrencyBagSelect.prototype.updateHelp = function() {
	const item = this.item();
	const currency = $cgmzTemp.getCurrency(item);
	const passItem = {description: (currency) ? currency._description : CGMZ.CurrencySystem.DefaultDescription};
    this._helpWindow.setItem(passItem);
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Add new currency options for default currency
//=============================================================================
//-----------------------------------------------------------------------------
// Return new currency max
//-----------------------------------------------------------------------------
Game_Party.prototype.maxGold = function() {
    return CGMZ.CurrencySystem.DefaultMax;
};
//=============================================================================
// Window_Gold
//-----------------------------------------------------------------------------
// Change where the gold value and currency unit come from
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Return custom currency amount (if main currency).
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_WindowGold_value = Window_Gold.prototype.value;
Window_Gold.prototype.value = function() {
	const mainCurrency = $cgmz.mainCurrency();
	const currency = $cgmz.getCurrency(mainCurrency);
	if(mainCurrency === "default" || !currency) {
		return {cgmzCS: true, val: alias_CGMZ_CurrencySystem_WindowGold_value.call(this), id: "default", drawFullName: false};
	}
	return {cgmzCS: true, val: currency.amount(), id: mainCurrency, drawFullName: false};
};
//-----------------------------------------------------------------------------
// Alias. Return custom currency unit (if main currency).
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_WindowGold_currencyUnit = Window_Gold.prototype.currencyUnit;
Window_Gold.prototype.currencyUnit = function() {
    const mainCurrency = $cgmz.mainCurrency();
	const currency = $cgmzTemp.getCurrency(mainCurrency);
	if(mainCurrency === "default" || !currency) {
		return alias_CGMZ_CurrencySystem_WindowGold_currencyUnit.call(this);
	}
	return currency._unit;
};
//=============================================================================
// Window_Base
//-----------------------------------------------------------------------------
// Change how currency value is drawn if value is a CGMZ value
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Use CGMZ function if value is CGMZ CS object instead of number
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_WindowBase_drawCurrencyValue = Window_Base.prototype.drawCurrencyValue;
Window_Base.prototype.drawCurrencyValue = function(value, unit, x, y, width) {
	if(isNaN(value) && value.cgmzCS) {
		this.CGMZ_drawCSCurrencyValue(value.val, unit, x, y, width, value.id, value.drawFullName);
	} else {
		alias_CGMZ_CurrencySystem_WindowBase_drawCurrencyValue.apply(this, arguments);
	}
};
//-----------------------------------------------------------------------------
// Draw CGMZ Currency System currency value
//-----------------------------------------------------------------------------
Window_Base.prototype.CGMZ_drawCSCurrencyValue = function(value, unit, x, y, width, id, drawFullName = false) {
	const unitWidth = this.textWidth(unit);
	const currency = $cgmzTemp.getCurrency(id);
	let color, icon, name;
	if(id === "default" || !currency) {
		color = CGMZ.CurrencySystem.DefaultColor;
		icon = CGMZ.CurrencySystem.DefaultIconIndex;
		name = CGMZ.CurrencySystem.DefaultName;
	} else {
		color = currency._color;
		icon = currency._iconIndex;
		name = currency._name
	}
	const iconWidth = 36 * CGMZ.CurrencySystem.AlwaysDrawIcons;
	if(CGMZ.CurrencySystem.AlwaysDrawIcons) {
		this.drawIcon(icon, x, y);
	}
	if(drawFullName) {
		this.changeTextColor(ColorManager.textColor(color));
		this.drawText(name, x + iconWidth, y, width - unitWidth - iconWidth - 6, "left");
	}
    this.resetTextColor();
    this.drawText(value.toLocaleString(), x + iconWidth, y, width - unitWidth - iconWidth - 6, "right");
    this.changeTextColor(ColorManager.textColor(color));
    this.drawText(unit, x + width - unitWidth, y, unitWidth, "right");
};
//=============================================================================
// Scene_Shop
//-----------------------------------------------------------------------------
// Add handling for different currencies.
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Return CGMZ Value if CGMZ Object is retrieved from gold window
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_SceneShop_money = Scene_Shop.prototype.money;
Scene_Shop.prototype.money = function() {
    const oldReturn = alias_CGMZ_CurrencySystem_SceneShop_money.call(this);
	if(oldReturn.cgmzCS) return oldReturn.val;
	return oldReturn;
};
//-----------------------------------------------------------------------------
// Alias. Route to custom currency if custom currency is main currency
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_SceneShop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
	const mainCurrency = $cgmz.mainCurrency();
	const currency = $cgmz.getCurrency(mainCurrency);
	if(mainCurrency === "default" || !currency) {
		alias_CGMZ_CurrencySystem_SceneShop_doBuy.call(this, number);
	} else {
		currency.loseCurrency(number * this.buyingPrice());
		$gameParty.gainItem(this._item, number);
	}
};
//-----------------------------------------------------------------------------
// Alias. Route to custom currency if custom currency is main currency
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_SceneShop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
	const mainCurrency = $cgmz.mainCurrency();
	const currency = $cgmz.getCurrency(mainCurrency);
	if(mainCurrency === "default" || !currency) {
		alias_CGMZ_CurrencySystem_SceneShop_doSell.call(this, number);
	} else {
		currency.gainCurrency(number * this.sellingPrice());
		$gameParty.loseItem(this._item, number);
	}
};
//=============================================================================
// Window_ShopNumber
//-----------------------------------------------------------------------------
// Add handling for different currencies.
//=============================================================================
//-----------------------------------------------------------------------------
// Draw CGMZ currency value
//-----------------------------------------------------------------------------
Window_ShopNumber.prototype.drawTotalPrice = function() {
    const padding = this.itemPadding();
    const total = {cgmzCS: true, val: this._price * this._number, id: $cgmz.mainCurrency(), drawFullName: true};
    const width = this.innerWidth - padding * 2;
    const y = this.totalPriceY();
	const x = padding * 2;
    this.drawCurrencyValue(total, this._currencyUnit, x, y, width);
};
//=============================================================================
// BattleManager
//-----------------------------------------------------------------------------
// Add handling for different currency drops
//=============================================================================
//-----------------------------------------------------------------------------
// Also add custom cgmz currencies to rewards
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    alias_CGMZ_CurrencySystem_BattleManager_makeRewards.call(this);
	this._rewards["cgmz_custom_currency"] = $gameTroop.CGMZ_makeCurrencySystemRewards();
};
//-----------------------------------------------------------------------------
// Also display custom cgmz currency rewards
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_BattleManager_displayGold = BattleManager.displayGold;
BattleManager.displayGold = function() {
	alias_CGMZ_CurrencySystem_BattleManager_displayGold.call(this);
	const rewards = this._rewards.cgmz_custom_currency;
	for(const rewardKey of Object.keys(rewards)) {
		const amount = rewards[rewardKey];
		const currencyData = $cgmzTemp.getCurrency(rewardKey);
		if(currencyData) {
			$gameMessage.add("\\." + amount + " \\c[" + currencyData._color + "]\\i[" + currencyData._iconIndex + "]" + currencyData._name + "\\c[0] " + CGMZ.CurrencySystem.FoundText);
		}
	}
};
//-----------------------------------------------------------------------------
// Also give custom cgmz currency rewards
//-----------------------------------------------------------------------------
const alias_CGMZ_CurrencySystem_BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    alias_CGMZ_CurrencySystem_BattleManager_gainRewards.call(this);
	this.CGMZ_gainCustomCurrencyRewards();
};
//-----------------------------------------------------------------------------
// Give custom cgmz currency rewards
//-----------------------------------------------------------------------------
BattleManager.CGMZ_gainCustomCurrencyRewards = function() {
	for(const rewardKey of Object.keys(this._rewards.cgmz_custom_currency)) {
		const currency = $cgmz.getCurrency(rewardKey);
		if(currency) {
			currency.gainCurrency(this._rewards.cgmz_custom_currency[rewardKey]);
		}
	}
};
//=============================================================================
// Game_Troop
//-----------------------------------------------------------------------------
// Add handling for different currency drops
//=============================================================================
//-----------------------------------------------------------------------------
// Get custom currency enemy drops
//-----------------------------------------------------------------------------
Game_Troop.prototype.CGMZ_makeCurrencySystemRewards = function() {
    const members = this.deadMembers();
	const rewards = {};
    for(const enemy of members) {
		const enemyReward = enemy.CGMZ_makeCurrencySystemRewards();
		for(const key of Object.keys(enemyReward)) {
			if(rewards[key]) {
				rewards[key] += enemyReward[key];
			} else {
				rewards[key] = enemyReward[key];
			}
		}
	}
	return rewards;
};
//=============================================================================
// Game_Enemy
//-----------------------------------------------------------------------------
// Add handling for different currency drops
//=============================================================================
//-----------------------------------------------------------------------------
// Get custom currency enemy drops
//-----------------------------------------------------------------------------
Game_Enemy.prototype.CGMZ_makeCurrencySystemRewards = function() {
    const currencies = {};
	if(this.enemy().meta && this.enemy().meta.cgmzcurrencyrewards) {
		const rewards = this.enemy().meta.cgmzcurrencyrewards.split(",");
		for(const reward of rewards) {
			const rewardSplit = reward.split(":");
			currencies[rewardSplit[0]] = Number(rewardSplit[1]);
		}
	}
	return currencies;
};