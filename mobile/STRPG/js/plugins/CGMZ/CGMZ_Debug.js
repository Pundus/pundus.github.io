/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/debug/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Provides additional debugging tools
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: Beta R4
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: Provides additional debugging tools while preserving the
 * default switch/variable scene. It adds things such as manipulating gold,
 * armor, weapons, and items. It also has other features, like running a
 * common event or changing the bgm.
 * ----------------------------------------------------------------------------
 * Documentation:
 * This plugin provides an easy way to manipulate additional things in the
 * debug menu, which by default only supports switches/variables.
 *
 * New to the debug menu is:
 * • Gold: Add/subtract gold from the party
 * • Item/Weapon/Armor: Add/remove item/weapon/armor from the inventory
 * • Battle Test: Fight troops from the database with your current party
 * • Common Events: Execute a common event
 * • Sound Test: Listen to any BGM/BGS/ME/SE in your audio folders
 * • View Cache: See what images/sounds/fonts are currently cached
 * • Actors: Manipulate actor levels, skills, party status, and reinitialize
 * • Weather: Change the weather, same as event command but in game
 * • Tint: Change the screen tint, same as event command but in game
 * • Map Transfer: Transfer to any map you want
 * ---------------------------Web/Mobile Games---------------------------------
 * The Sound Test debug feature will crash on web/mobile deploys if the player
 * somehow manages to access the debug menu and select it. Since this is a
 * debug tool, it is recommended to disable this plugin before deployment.
 * -------------------------Plugin Commands------------------------------------
 * This plugin does not have any plugin commands.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * 
 * This means the following should cause no issues even in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify this plugin's parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_Debug.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Beta R4
 * - Added Map Transfer debug command
 *
 * @param Default
 * @desc Name for the command to enter the default debug screen
 * @default Switches & Vars
 *
 * @param Gold
 * @desc Name for the command to enter the gold debug screen
 * @default Gold
 *
 * @param Item
 * @desc Name for the command to enter the item debug screen
 * @default Items
 *
 * @param Weapon
 * @desc Name for the command to enter the weapon debug screen
 * @default Weapons
 *
 * @param Armor
 * @desc Name for the command to enter the armor debug screen
 * @default Armors
 *
 * @param Battle Test
 * @desc Name for the command to enter the battle test debug screen
 * @default Battle Test
 *
 * @param Common Event
 * @desc Name for the command to enter the common event debug screen
 * @default Common Events
 *
 * @param Sound Test
 * @desc Name for the command to enter the sound test debug screen
 * @default Sound Test
 *
 * @param View Cache
 * @desc Name for the command to enter the view cache debug screen
 * @default View Cache
 *
 * @param Actors
 * @desc Name for the command to enter the actor debug screen
 * @default Actors
 *
 * @param Weather
 * @desc Name for the command to enter the weather debug screen
 * @default Weather
 *
 * @param Tint
 * @desc Name for the command to enter the tint debug screen
 * @default Tint Screen
 *
 * @param Map Transfer
 * @desc Name for the command to enter the map transfer debug screen
 * @default Map Transfer
 *
 * @param Sound Settings
 * @desc Name for the command to enter the Sound Test -> Settings menu
 * @default Settings
 *
 * @param Sound Volume
 * @desc Text to use for the Sound Test -> Settings -> Volume label
 * @default Volume:
 *
 * @param Sound Pan
 * @desc Text to use for the Sound Test -> Settings -> Pan label
 * @default Pan:
 *
 * @param Sound Pitch
 * @desc Text to use for the Sound Test -> Settings -> Pitch label
 * @default Pitch:
 *
 * @param Image Cache
 * @desc Text to use for the View Cache -> Image Cache command
 * @default Image Cache
 *
 * @param Font Cache
 * @desc Text to use for the View Cache -> Font Cache command
 * @default Font Cache
 *
 * @param Remove From Party
 * @desc Text to use for the Actor -> Remove From Party text
 * @default Remove From Party
 *
 * @param Add To Party
 * @desc Text to use for the Actor -> Remove From Party text
 * @default Add To Party
 *
 * @param Current Level
 * @desc Text to use for the Actor -> Current Level text
 * @default Current Level: 
 *
 * @param Change Skills
 * @desc Text to use for the Actor -> Change Skills text
 * @default Change Skills
 *
 * @param Recover All
 * @desc Text to use for the Actor -> Recover All text
 * @default Recover All
 *
 * @param Initialize Actor
 * @desc Text to use for the Actor -> Initialize text
 * @default Initialize Actor
 *
 * @param Weather Type
 * @desc Text to use for the Weather -> Type text
 * @default Type
 *
 * @param Weather Power
 * @desc Text to use for the Weather -> Power text
 * @default Power
 *
 * @param Weather Help
 * @desc Text to use for the Weather -> Help text
 * @default Left/Right to Change
 *
 * @param Weather Type None
 * @desc Text to use for the Weather -> Type text when None is selected
 * @default None
 *
 * @param Weather Type Rain
 * @desc Text to use for the Weather -> Type text when Rain is selected
 * @default Rain
 *
 * @param Weather Type Storm
 * @desc Text to use for the Weather -> Type text when Storm is selected
 * @default Storm
 *
 * @param Weather Type Snow
 * @desc Text to use for the Weather -> Type text when Snow is selected
 * @default Snow
 *
 * @param Tint Help
 * @desc Text to use for the Tint Screen -> Help text
 * @default Left/Right to Change
 *
 * @param Tint Red
 * @desc Text to use for the Tint Screen -> Red text
 * @default Red
 *
 * @param Tint Green
 * @desc Text to use for the Tint Screen -> Green text
 * @default Green
 *
 * @param Tint Blue
 * @desc Text to use for the Tint Screen -> Blue text
 * @default Blue
 *
 * @param Tint Gray
 * @desc Text to use for the Tint Screen -> Gray text
 * @default Gray
*/
var Imported = Imported || {};
Imported.CGMZ_Debug = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Debug"] = "Beta R4";
CGMZ.Debug = {};
CGMZ.Debug.parameters = PluginManager.parameters('CGMZ_Debug');
CGMZ.Debug.DefaultCommand = CGMZ.Debug.parameters["Default"];
CGMZ.Debug.GoldCommand = CGMZ.Debug.parameters["Gold"];
CGMZ.Debug.ItemCommand = CGMZ.Debug.parameters["Item"];
CGMZ.Debug.WeaponCommand = CGMZ.Debug.parameters["Weapon"];
CGMZ.Debug.ArmorCommand = CGMZ.Debug.parameters["Armor"];
CGMZ.Debug.BattleTestCommand = CGMZ.Debug.parameters["Battle Test"];
CGMZ.Debug.CommonEventCommand = CGMZ.Debug.parameters["Common Event"];
CGMZ.Debug.SoundTestCommand = CGMZ.Debug.parameters["Sound Test"];
CGMZ.Debug.ViewCacheCommand = CGMZ.Debug.parameters["View Cache"];
CGMZ.Debug.ActorsCommand = CGMZ.Debug.parameters["Actors"];
CGMZ.Debug.WeatherCommand = CGMZ.Debug.parameters["Weather"];
CGMZ.Debug.TintCommand = CGMZ.Debug.parameters["Tint"];
CGMZ.Debug.MapTransferCommand = CGMZ.Debug.parameters["Map Transfer"];
CGMZ.Debug.SoundTestSettingsCommand = CGMZ.Debug.parameters["Sound Settings"];
CGMZ.Debug.SoundTestSettingsVolume = CGMZ.Debug.parameters["Sound Volume"];
CGMZ.Debug.SoundTestSettingsPan = CGMZ.Debug.parameters["Sound Pan"];
CGMZ.Debug.SoundTestSettingsPitch = CGMZ.Debug.parameters["Sound Pitch"];
CGMZ.Debug.FontCacheCommand = CGMZ.Debug.parameters["Font Cache"];
CGMZ.Debug.ImageCacheCommand = CGMZ.Debug.parameters["Image Cache"];
CGMZ.Debug.RemoveFromParty = CGMZ.Debug.parameters["Remove From Party"];
CGMZ.Debug.AddToParty = CGMZ.Debug.parameters["Add To Party"];
CGMZ.Debug.CurrentLevel = CGMZ.Debug.parameters["Current Level"];
CGMZ.Debug.ChangeSkills = CGMZ.Debug.parameters["Change Skills"];
CGMZ.Debug.RecoverAll = CGMZ.Debug.parameters["Recover All"];
CGMZ.Debug.InitializeActor = CGMZ.Debug.parameters["Initialize Actor"];
CGMZ.Debug.WeatherType = CGMZ.Debug.parameters["Weather Type"];
CGMZ.Debug.WeatherTypeNone = CGMZ.Debug.parameters["Weather Type None"];
CGMZ.Debug.WeatherTypeRain = CGMZ.Debug.parameters["Weather Type Rain"];
CGMZ.Debug.WeatherTypeStorm = CGMZ.Debug.parameters["Weather Type Storm"];
CGMZ.Debug.WeatherTypeSnow = CGMZ.Debug.parameters["Weather Type Snow"];
CGMZ.Debug.WeatherPower = CGMZ.Debug.parameters["Weather Power"];
CGMZ.Debug.WeatherHelp = CGMZ.Debug.parameters["Weather Help"];
CGMZ.Debug.TintHelp = CGMZ.Debug.parameters["Tint Help"];
CGMZ.Debug.TintRed = CGMZ.Debug.parameters["Tint Red"];
CGMZ.Debug.TintGreen = CGMZ.Debug.parameters["Tint Green"];
CGMZ.Debug.TintBlue = CGMZ.Debug.parameters["Tint Blue"];
CGMZ.Debug.TintGray = CGMZ.Debug.parameters["Tint Gray"];
//=============================================================================
// Scene_Debug
//-----------------------------------------------------------------------------
// Creates additional CGMZ Windows and handlers
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Create additional windows and hide/deactivate default windows
//-----------------------------------------------------------------------------
const alias_CGMZ_Debug_SceneDebug_create = Scene_Debug.prototype.create;
Scene_Debug.prototype.create = function() {
	alias_CGMZ_Debug_SceneDebug_create.call(this);
	this.CGMZ_deactivateDefaultWindows();
	this.CGMZ_createWindows();
};
//-----------------------------------------------------------------------------
// Alias. Change functionality of cancel for range window
//-----------------------------------------------------------------------------
const alias_CGMZ_Debug_SceneDebug_createRangeWindow = Scene_Debug.prototype.createRangeWindow;
Scene_Debug.prototype.createRangeWindow = function() {
	alias_CGMZ_Debug_SceneDebug_createRangeWindow.call(this);
	this._rangeWindow.setHandler("cancel", this.CGMZ_onRangeCancel.bind(this));
};
//-----------------------------------------------------------------------------
// Alias. Fix bug with mode never being switch
//-----------------------------------------------------------------------------
const alias_CGMZ_Debug_SceneDebug_helpText = Scene_Debug.prototype.helpText;
Scene_Debug.prototype.helpText = function() {
	if(this._editWindow._mode === "switch") {
		return "Enter : ON / OFF";
	} else {
		return alias_CGMZ_Debug_SceneDebug_helpText.call(this);
	}
};
//-----------------------------------------------------------------------------
// Deactivate and hide the default debug windows
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onRangeCancel = function() {
	this.CGMZ_deactivateDefaultWindows();
	this._cgmz_commandWindow.activate();
	this._cgmz_commandWindow.show();
};
//-----------------------------------------------------------------------------
// Deactivate and hide the default debug windows
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_deactivateDefaultWindows = function() {
	this._rangeWindow.deactivate();
	this._rangeWindow.hide();
	this._editWindow.hide();
	this._debugHelpWindow.hide();
};
//-----------------------------------------------------------------------------
// Activate and show the default debug windows
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_activateDefaultWindows = function() {
	this._rangeWindow.show();
	this._editWindow.show();
	this._debugHelpWindow.show();
	this._rangeWindow.activate();
};
//-----------------------------------------------------------------------------
// Create the CGMZ Windows
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createWindows = function() {
	this.CGMZ_createCommandWindow();
	this.CGMZ_createGoldWindow();
	this.CGMZ_createGoldHelperWindow();
	this.CGMZ_createItemSelectWindow();
	this.CGMZ_createItemSelectWindowHelp();
	this.CGMZ_createTroopSelectWindow();
	this.CGMZ_createCommonEventSelectWindow();
	this.CGMZ_createSoundTestCommandWindow();
	this.CGMZ_createSoundTestSelectWindow();
	this.CGMZ_createSoundTestSettingsWindow();
	this.CGMZ_createViewCacheSelectWindow();
	this.CGMZ_createViewCacheWindow();
	this.CGMZ_createActorSelectWindow();
	this.CGMZ_createActorManipulateWindow();
	this.CGMZ_createActorNameWindow();
	this.CGMZ_createActorSkillWindow();
	this.CGMZ_createWeatherWindow();
	this.CGMZ_createTintWindow();
	this.CGMZ_createMapSelectWindow();
	this.CGMZ_createMapWindow();
};
//-----------------------------------------------------------------------------
// Create the CGMZ Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createCommandWindow = function() {
	const rect = this.CGMZ_commandWindowRect();
	this._cgmz_commandWindow = new CGMZ_Debug_Window_Command(rect);
	this._cgmz_commandWindow.setHandler("cancel", this.popScene.bind(this));
	this._cgmz_commandWindow.setHandler("default", this.CGMZ_commandDefault.bind(this));
	this._cgmz_commandWindow.setHandler("gold", this.CGMZ_commandGold.bind(this));
	this._cgmz_commandWindow.setHandler("items", this.CGMZ_commandItem.bind(this));
	this._cgmz_commandWindow.setHandler("armors", this.CGMZ_commandArmor.bind(this));
	this._cgmz_commandWindow.setHandler("weapons", this.CGMZ_commandWeapon.bind(this));
	this._cgmz_commandWindow.setHandler("troops", this.CGMZ_commandTroops.bind(this));
	this._cgmz_commandWindow.setHandler("commonEvent", this.CGMZ_commandCommonEvent.bind(this));
	this._cgmz_commandWindow.setHandler("soundTest", this.CGMZ_commandSoundTest.bind(this));
	this._cgmz_commandWindow.setHandler("viewCache", this.CGMZ_commandViewCache.bind(this));
	this._cgmz_commandWindow.setHandler("actors", this.CGMZ_commandActors.bind(this));
	this._cgmz_commandWindow.setHandler("weather", this.CGMZ_commandWeather.bind(this));
	this._cgmz_commandWindow.setHandler("tint", this.CGMZ_commandTint.bind(this));
	this._cgmz_commandWindow.setHandler("transfer", this.CGMZ_commandMapTransfer.bind(this));
	this.addWindow(this._cgmz_commandWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandWindowRect = function() {
	const ww = Graphics.boxWidth / 2;
	const wh = this.calcWindowHeight(13, true);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - wh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Gold Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createGoldWindow = function() {
	const rect = this.CGMZ_goldWindowRect();
	this._cgmz_goldWindow = new CGMZ_Debug_Window_Gold(rect);
	this._cgmz_goldWindow.setHandler("cancel", this.CGMZ_onGoldCancel.bind(this));
	this._cgmz_goldWindow.hide();
	this._cgmz_goldWindow.deactivate();
	this.addWindow(this._cgmz_goldWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ gold window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_goldWindowRect = function() {
	const ww = Graphics.boxWidth / 2;
	const wh = this.calcWindowHeight(1, true);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - wh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Gold Helper Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createGoldHelperWindow = function() {
	const rect = this.CGMZ_goldWindowHelperRect();
	this._cgmz_goldHelperWindow = new Window_Base(rect);
	this._cgmz_goldHelperWindow.contents.clear();
	const helpRect = this._cgmz_goldHelperWindow.baseTextRect();
	this._cgmz_goldHelperWindow.drawTextEx(this.CGMZ_GoldHelpText(), helpRect.x, helpRect.y, helpRect.width);
	this._cgmz_goldHelperWindow.hide();
	this.addWindow(this._cgmz_goldHelperWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ Gold Helper Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_goldWindowHelperRect = function() {
	const ww = this._cgmz_goldWindow.width;
	const wh = this.calcWindowHeight(3, false);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = this._cgmz_goldWindow.y + this._cgmz_goldWindow.height;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Item Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createItemSelectWindow = function() {
	const rect = this.CGMZ_itemSelectWindowRect();
	this._cgmz_itemSelectWindow = new CGMZ_Debug_Window_ItemSelect(rect);
	this._cgmz_itemSelectWindow.setHandler("cancel", this.CGMZ_onItemSelectCancel.bind(this));
	this.addWindow(this._cgmz_itemSelectWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ item select window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_itemSelectWindowRect = function() {
	const x = 0;
	const y = 0;
	const width = Graphics.boxWidth;
	const height = Graphics.boxHeight - this.calcWindowHeight(2, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Item Select Window Help
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createItemSelectWindowHelp = function() {
	const rect = this.CGMZ_itemSelectWindowHelpRect();
	this._cgmz_itemSelectHelpWindow = new Window_Base(rect);
	this._cgmz_itemSelectHelpWindow.contents.clear();
	const helpRect = this._cgmz_itemSelectHelpWindow.baseTextRect();
	this._cgmz_itemSelectHelpWindow.drawTextEx(this.CGMZ_ItemHelpText(), helpRect.x, helpRect.y, helpRect.width);
	this._cgmz_itemSelectHelpWindow.hide();
	this.addWindow(this._cgmz_itemSelectHelpWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ item select window help
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_itemSelectWindowHelpRect = function() {
	const x = 0;
	const y = this._cgmz_itemSelectWindow.height;
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(2, false);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Troop Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createTroopSelectWindow = function() {
	const rect = this.CGMZ_troopSelectWindowRect();
	this._cgmz_troopSelectWindow = new CGMZ_Debug_Window_TroopSelect(rect);
	this._cgmz_troopSelectWindow.setHandler("cancel", this.CGMZ_onTroopSelectCancel.bind(this));
	this._cgmz_troopSelectWindow.setHandler("ok", this.CGMZ_onTroopSelectOk.bind(this));
	this.addWindow(this._cgmz_troopSelectWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ troop select window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_troopSelectWindowRect = function() {
	const width = Graphics.boxWidth * 0.75;
	const height = Graphics.boxHeight - this.calcWindowHeight(4, true);
	const x = (Graphics.boxWidth - width) / 2;
	const y = (Graphics.boxHeight - height) / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Common Event Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createCommonEventSelectWindow = function() {
	const rect = this.CGMZ_troopSelectWindowRect();
	this._cgmz_commonEventSelectWindow = new CGMZ_Debug_Window_CommonEventSelect(rect);
	this._cgmz_commonEventSelectWindow.setHandler("cancel", this.CGMZ_onCommonEventSelectCancel.bind(this));
	this._cgmz_commonEventSelectWindow.setHandler("ok", this.CGMZ_onCommonEventSelectOk.bind(this));
	this.addWindow(this._cgmz_commonEventSelectWindow);
};
//-----------------------------------------------------------------------------
// Create the Sound Test Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createSoundTestCommandWindow = function() {
	const rect = this.CGMZ_soundTestCommandWindowRect();
	this._cgmz_soundTestCommandWindow = new CGMZ_Debug_Window_SoundTestCommand(rect);
	this._cgmz_soundTestCommandWindow.setHandler("cancel", this.CGMZ_onSoundTestCommandCancel.bind(this));
	this._cgmz_soundTestCommandWindow.setHandler("bgm", this.CGMZ_soundTestCommandSelect.bind(this, "bgm"));
	this._cgmz_soundTestCommandWindow.setHandler("bgs", this.CGMZ_soundTestCommandSelect.bind(this, "bgs"));
	this._cgmz_soundTestCommandWindow.setHandler("me", this.CGMZ_soundTestCommandSelect.bind(this, "me"));
	this._cgmz_soundTestCommandWindow.setHandler("se", this.CGMZ_soundTestCommandSelect.bind(this, "se"));
	this._cgmz_soundTestCommandWindow.setHandler("settings", this.CGMZ_soundTestCommandSettings.bind(this));
	this.addWindow(this._cgmz_soundTestCommandWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the Sound Test Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_soundTestCommandWindowRect = function() {
	const ww = Graphics.boxWidth / 2;
	const wh = this.calcWindowHeight(5, true);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - wh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the Sound Test Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createSoundTestSelectWindow = function() {
	const rect = this.CGMZ_soundTestSelectWindowRect();
	this._cgmz_soundTestSelectWindow = new CGMZ_Debug_Window_SoundTestSelect(rect);
	this._cgmz_soundTestSelectWindow.setHandler("cancel", this.CGMZ_onSoundTestSelectCancel.bind(this));
	this._cgmz_soundTestSelectWindow.setHandler("ok", this.CGMZ_onSoundTestSelectOk.bind(this));
	this.addWindow(this._cgmz_soundTestSelectWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the Sound Test Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_soundTestSelectWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = Graphics.boxHeight;
	const wx = 0;
	const wy = 0;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the Sound Test Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createSoundTestSettingsWindow = function() {
	const rect = this.CGMZ_soundTestSettingsWindowRect();
	this._cgmz_soundTestSettingsWindow = new CGMZ_Debug_Window_SoundTestSettings(rect);
	this._cgmz_soundTestSettingsWindow.setHandler("cancel", this.CGMZ_onSoundTestSettingsCancel.bind(this));
	this.addWindow(this._cgmz_soundTestSettingsWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the Sound Test Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_soundTestSettingsWindowRect = function() {
	const ww = Graphics.boxWidth / 2;
	const wh = this.calcWindowHeight(3, true);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - wh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the Sound Test Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createViewCacheSelectWindow = function() {
	const rect = this.CGMZ_viewCacheSelectWindowRect();
	this._cgmz_viewCacheSelectWindow = new CGMZ_Debug_Window_ViewCacheSelect(rect);
	this._cgmz_viewCacheSelectWindow.setHandler("cancel", this.CGMZ_onViewCacheSelectCancel.bind(this));
	this._cgmz_viewCacheSelectWindow.setHandler("img", this.CGMZ_viewCacheCommandSelect.bind(this, "img"));
	this._cgmz_viewCacheSelectWindow.setHandler("font", this.CGMZ_viewCacheCommandSelect.bind(this, "font"));
	this.addWindow(this._cgmz_viewCacheSelectWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the Sound Test Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_viewCacheSelectWindowRect = function() {
	const ww = Graphics.boxWidth / 2;
	const wh = this.calcWindowHeight(2, true);
	const wx = (Graphics.boxWidth - ww) / 2;
	const wy = (Graphics.boxHeight - wh) / 2;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the Sound Test Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createViewCacheWindow = function() {
	const rect = this.CGMZ_viewCacheWindowRect();
	this._cgmz_viewCacheWindow = new CGMZ_Debug_Window_ViewCache(rect);
	this._cgmz_viewCacheWindow.setHandler("cancel", this.CGMZ_onViewCacheCancel.bind(this));
	this.addWindow(this._cgmz_viewCacheWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the Sound Test Command Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_viewCacheWindowRect = function() {
	const ww = Graphics.boxWidth;
	const wh = Graphics.boxHeight;
	const wx = 0;
	const wy = 0;
	return new Rectangle(wx, wy, ww, wh);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Actor Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createActorSelectWindow = function() {
	const rect = this.CGMZ_actorSelectWindowRect();
	this._cgmz_actorSelectWindow = new CGMZ_Debug_Window_ActorSelect(rect);
	this._cgmz_actorSelectWindow.setHandler("cancel", this.CGMZ_onActorSelectCancel.bind(this));
	this._cgmz_actorSelectWindow.setHandler("ok", this.CGMZ_onActorSelectOk.bind(this));
	this.addWindow(this._cgmz_actorSelectWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ actor select window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_actorSelectWindowRect = function() {
	const x = 0;
	const y = 0;
	const width = Graphics.boxWidth;
	const height = Graphics.boxHeight;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Actor Manipulate Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createActorManipulateWindow = function() {
	const rect = this.CGMZ_actorManipulateWindowRect();
	this._cgmz_actorManipulateWindow = new CGMZ_Debug_Window_ActorManipulate(rect);
	this._cgmz_actorManipulateWindow.setHandler("cancel", this.CGMZ_onActorManipulateCancel.bind(this));
	this._cgmz_actorManipulateWindow.setHandler("ok", this.CGMZ_onActorManipulateOk.bind(this));
	this.addWindow(this._cgmz_actorManipulateWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ actor manipulate window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_actorManipulateWindowRect = function() {
	const width = Graphics.boxWidth * 0.75;
	const height = this.calcWindowHeight(5, true);
	const x = (Graphics.boxWidth - width) / 2;
	const y = (Graphics.boxHeight - height) / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Actor Name Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createActorNameWindow = function() {
	const rect = this.CGMZ_actorNameWindowRect();
	this._cgmz_actorNameWindow = new CGMZ_Debug_Window_ActorName(rect);
	this._cgmz_actorNameWindow.hide();
	this.addWindow(this._cgmz_actorNameWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ actor name window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_actorNameWindowRect = function() {
	const width = this._cgmz_actorManipulateWindow.width;
	const height = this.calcWindowHeight(1, false);
	const x = this._cgmz_actorManipulateWindow.x;
	const y = this._cgmz_actorManipulateWindow.y - height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Actor Skill Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createActorSkillWindow = function() {
	const rect = this.CGMZ_actorSkillWindowRect();
	this._cgmz_actorSkillWindow = new CGMZ_Debug_Window_ActorSkill(rect);
	this._cgmz_actorSkillWindow.setHandler("cancel", this.CGMZ_onActorSkillCancel.bind(this));
	this._cgmz_actorSkillWindow.setHandler("ok", this.CGMZ_onActorSkillOk.bind(this));
	this.addWindow(this._cgmz_actorSkillWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ actor skill window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_actorSkillWindowRect = function() {
	const width = Graphics.boxWidth;
	const height = Graphics.boxHeight;
	const x = 0;
	const y = 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Weather Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createWeatherWindow = function() {
	const rect = this.CGMZ_weatherWindowRect();
	this._cgmz_weatherWindow = new CGMZ_Debug_Window_WeatherSelect(rect);
	this._cgmz_weatherWindow.setHandler("cancel", this.CGMZ_onWeatherCancel.bind(this));
	this._cgmz_weatherWindow.setHandler("ok", this.CGMZ_onWeatherOk.bind(this));
	this.addWindow(this._cgmz_weatherWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ weather window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_weatherWindowRect = function() {
	const width = Graphics.boxWidth * 0.5;
	const height = this.calcWindowHeight(3, true);
	const x = (Graphics.boxWidth - width) / 2;
	const y = (Graphics.boxHeight - height) / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ tint Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createTintWindow = function() {
	const rect = this.CGMZ_tintWindowRect();
	this._cgmz_tintWindow = new CGMZ_Debug_Window_TintSelect(rect);
	this._cgmz_tintWindow.setHandler("cancel", this.CGMZ_onTintCancel.bind(this));
	this._cgmz_tintWindow.setHandler("ok", this.CGMZ_onTintOk.bind(this));
	this.addWindow(this._cgmz_tintWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ tint window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_tintWindowRect = function() {
	const width = Graphics.boxWidth * 0.5;
	const height = this.calcWindowHeight(5, true);
	const x = (Graphics.boxWidth - width) / 2;
	const y = (Graphics.boxHeight - height) / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Map Transfer Select Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createMapSelectWindow = function() {
	const rect = this.CGMZ_mapSelectWindowRect();
	this._cgmz_mapSelectWindow = new CGMZ_Debug_Window_MapSelect(rect);
	this._cgmz_mapSelectWindow.setHandler("cancel", this.CGMZ_onMapSelectCancel.bind(this));
	this._cgmz_mapSelectWindow.setHandler("ok", this.CGMZ_onMapSelectOk.bind(this));
	this.addWindow(this._cgmz_mapSelectWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ map select window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_mapSelectWindowRect = function() {
	const width = Graphics.boxWidth * 0.5;
	const height = Graphics.boxHeight * 0.8;
	const x = (Graphics.boxWidth - width) / 2;
	const y = (Graphics.boxHeight - height) / 2;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create the CGMZ Map Window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_createMapWindow = function() {
	const rect = this.CGMZ_mapWindowRect();
	this._cgmz_mapWindow = new CGMZ_Window_Map(rect, 1);
	this._cgmz_mapWindow.setHandler("cancel", this.CGMZ_onMapCancel.bind(this));
	this._cgmz_mapWindow.setHandler("ok", this.CGMZ_onMapOk.bind(this));
	this._cgmz_mapWindow.hide();
	this._cgmz_mapWindow.deactivate();
	this.addWindow(this._cgmz_mapWindow);
};
//-----------------------------------------------------------------------------
// Get the rect for the CGMZ map window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_mapWindowRect = function() {
	const width = Math.floor(Graphics.boxWidth / $gameMap.tileWidth()) * $gameMap.tileWidth() + $gameSystem.windowPadding() * 2 - 1;
	const height = Math.floor(Graphics.boxHeight / $gameMap.tileHeight()) * $gameMap.tileHeight() + $gameSystem.windowPadding() * 2 - 1;
	const x = 0;
	const y = 0;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Get the help text for the gold helper window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_GoldHelpText = function() {
	return ("Right : +1  Pageup   : +100\nLeft  : -1  Pagedown : -100\nHold to increase rate");
};
//-----------------------------------------------------------------------------
// Get the help text for the gold helper window
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_ItemHelpText = function() {
	return ("Right : +1  Pageup   : +10\nLeft  : -1  Pagedown : -10");
};
//-----------------------------------------------------------------------------
// Handling for the default switches/variables command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandDefault = function() {
	this.CGMZ_activateDefaultWindows();
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the gold command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandGold = function() {
	this._cgmz_goldWindow.show();
	this._cgmz_goldWindow.activate();
	this._cgmz_goldHelperWindow.show();
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the item command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandItem = function() {
	this._cgmz_itemSelectWindow.setItemType("item");
	this._cgmz_itemSelectWindow.show();
	this._cgmz_itemSelectHelpWindow.show();
	this._cgmz_itemSelectWindow.activate();
	this._cgmz_itemSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the armor command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandArmor = function() {
	this._cgmz_itemSelectWindow.setItemType("armor");
	this._cgmz_itemSelectWindow.show();
	this._cgmz_itemSelectHelpWindow.show();
	this._cgmz_itemSelectWindow.activate();
	this._cgmz_itemSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the weapon command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandWeapon = function() {
	this._cgmz_itemSelectWindow.setItemType("weapon");
	this._cgmz_itemSelectWindow.show();
	this._cgmz_itemSelectHelpWindow.show();
	this._cgmz_itemSelectWindow.activate();
	this._cgmz_itemSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the gold window cancel function
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onGoldCancel = function() {
	this._cgmz_goldWindow.hide();
	this._cgmz_goldHelperWindow.hide();
	this._cgmz_goldWindow.deactivate();
	this._cgmz_commandWindow.activate();
	this._cgmz_commandWindow.show();
};
//-----------------------------------------------------------------------------
// Handling for the item window cancel function
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onItemSelectCancel = function() {
	this._cgmz_itemSelectWindow.hide();
	this._cgmz_itemSelectHelpWindow.hide();
	this._cgmz_itemSelectWindow.deactivate();
	this._cgmz_commandWindow.activate();
	this._cgmz_commandWindow.show();
};
//-----------------------------------------------------------------------------
// Handling for the battle test command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandTroops = function() {
	this._cgmz_troopSelectWindow.show();
	this._cgmz_troopSelectWindow.activate();
	this._cgmz_troopSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the common event command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandCommonEvent = function() {
	this._cgmz_commonEventSelectWindow.show();
	this._cgmz_commonEventSelectWindow.activate();
	this._cgmz_commonEventSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the common event command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandSoundTest = function() {
	this._cgmz_soundTestCommandWindow.show();
	this._cgmz_soundTestCommandWindow.activate();
	this._cgmz_soundTestCommandWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the actors command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandActors = function() {
	this._cgmz_actorSelectWindow.show();
	this._cgmz_actorSelectWindow.activate();
	this._cgmz_actorSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the weather command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandWeather = function() {
	this._cgmz_weatherWindow.show();
	this._cgmz_weatherWindow.activate();
	this._cgmz_weatherWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the tint command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandTint = function() {
	this._cgmz_tintWindow.show();
	this._cgmz_tintWindow.activate();
	this._cgmz_tintWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the map transfer command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandMapTransfer = function() {
	this._cgmz_mapSelectWindow.show();
	this._cgmz_mapSelectWindow.activate();
	this._cgmz_mapSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the troop window cancel function
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onTroopSelectCancel = function() {
	this._cgmz_troopSelectWindow.hide();
	this._cgmz_troopSelectWindow.deactivate();
	this._cgmz_commandWindow.activate();
	this._cgmz_commandWindow.show();
};
//-----------------------------------------------------------------------------
// Handling for the troop window ok function
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onTroopSelectOk = function() {
	const troop = $dataTroops[this._cgmz_troopSelectWindow.index() + 1];
	BattleManager.setup(troop.id, true, true);
	SceneManager.push(Scene_Battle);
};
//-----------------------------------------------------------------------------
// Handling for the common event window cancel function
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onCommonEventSelectCancel = function() {
	this._cgmz_commonEventSelectWindow.hide();
	this._cgmz_commonEventSelectWindow.deactivate();
	this._cgmz_commandWindow.activate();
	this._cgmz_commandWindow.show();
};
//-----------------------------------------------------------------------------
// Handling for the common event window ok function
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onCommonEventSelectOk = function() {
	const commonEvent = $dataCommonEvents[this._cgmz_commonEventSelectWindow.index() + 1];
	$gameTemp.reserveCommonEvent(commonEvent.id);
	this.popScene();
};
//-----------------------------------------------------------------------------
// Handling for the sound test command cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onSoundTestCommandCancel = function() {
	this._cgmz_soundTestCommandWindow.hide();
	this._cgmz_soundTestCommandWindow.deactivate();
	this._cgmz_commandWindow.activate();
	this._cgmz_commandWindow.show();
};
//-----------------------------------------------------------------------------
// Handling for the sound test command select
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_soundTestCommandSelect = function(type) {
	this._cgmz_soundTestCommandWindow.hide();
	this._cgmz_soundTestCommandWindow.deactivate();
	this._cgmz_soundTestSelectWindow.setType(type);
	this._cgmz_soundTestSelectWindow.show();
	this._cgmz_soundTestSelectWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for the sound test command settings select
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_soundTestCommandSettings = function() {
	this._cgmz_soundTestCommandWindow.hide();
	this._cgmz_soundTestCommandWindow.deactivate();
	this._cgmz_soundTestSettingsWindow.show();
	this._cgmz_soundTestSettingsWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for the sound test select ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onSoundTestSelectOk = function() {
	const name = this._cgmz_soundTestSelectWindow.item().slice(0, -4);
	const volume = this._cgmz_soundTestSettingsWindow.volume();
	const pan = this._cgmz_soundTestSettingsWindow.pan();
	const pitch = this._cgmz_soundTestSettingsWindow.pitch();
	const sound = {name: name, volume: volume, pan: pan, pitch: pitch};
	switch(this._cgmz_soundTestSelectWindow._type) {
		case "bgm": AudioManager.playBgm(sound); break;
		case "bgs": AudioManager.playBgs(sound); break;
		case "se": AudioManager.playSe(sound); break;
		case "me": AudioManager.playMe(sound);
	}
	this._cgmz_soundTestSelectWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for sound test select cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onSoundTestSelectCancel = function() {
	this._cgmz_soundTestSelectWindow.hide();
	this._cgmz_soundTestSelectWindow.deactivate();
	this._cgmz_soundTestCommandWindow.show();
	this._cgmz_soundTestCommandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for sound test settings cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onSoundTestSettingsCancel = function() {
	this._cgmz_soundTestSettingsWindow.hide();
	this._cgmz_soundTestSettingsWindow.deactivate();
	this._cgmz_soundTestCommandWindow.show();
	this._cgmz_soundTestCommandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for the view cache command
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_commandViewCache = function() {
	this._cgmz_viewCacheSelectWindow.show();
	this._cgmz_viewCacheSelectWindow.activate();
	this._cgmz_viewCacheSelectWindow.select(0);
	this._cgmz_commandWindow.deactivate();
	this._cgmz_commandWindow.hide();
};
//-----------------------------------------------------------------------------
// Handling for the view cache select cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onViewCacheSelectCancel = function() {
	this._cgmz_viewCacheSelectWindow.hide();
	this._cgmz_viewCacheSelectWindow.deactivate();
	this._cgmz_commandWindow.activate();
	this._cgmz_commandWindow.show();
};
//-----------------------------------------------------------------------------
// Handling for the view cache command select
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_viewCacheCommandSelect = function(type) {
	this._cgmz_viewCacheSelectWindow.hide();
	this._cgmz_viewCacheSelectWindow.deactivate();
	this._cgmz_viewCacheWindow.setType(type);
	this._cgmz_viewCacheWindow.show();
	this._cgmz_viewCacheWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for view cache cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onViewCacheCancel = function() {
	this._cgmz_viewCacheWindow.hide();
	this._cgmz_viewCacheWindow.deactivate();
	this._cgmz_viewCacheSelectWindow.show();
	this._cgmz_viewCacheSelectWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for actor select ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onActorSelectOk = function() {
	const actor = $dataActors[this._cgmz_actorSelectWindow.index() + 1];
	this._cgmz_actorSelectWindow.hide();
	this._cgmz_actorSelectWindow.deactivate();
	this._cgmz_actorNameWindow.setName(actor.name);
	this._cgmz_actorNameWindow.show();
	this._cgmz_actorManipulateWindow.setActor(actor.id);
	this._cgmz_actorManipulateWindow.show();
	this._cgmz_actorManipulateWindow.select(0);
	this._cgmz_actorManipulateWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for actor select cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onActorSelectCancel = function() {
	this._cgmz_actorSelectWindow.hide();
	this._cgmz_actorSelectWindow.deactivate();
	this._cgmz_commandWindow.show();
	this._cgmz_commandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for actor manipulate ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onActorManipulateOk = function() {
	const command = this._cgmz_actorManipulateWindow.index();
	const actor = this._cgmz_actorManipulateWindow._actor;
	switch(command) {
		case 0:
			const isInParty = $gameParty.members().includes(actor);
			(isInParty) ? $gameParty.removeActor(actor._actorId) : $gameParty.addActor(actor._actorId);
			break;
		case 2:
			this._cgmz_actorManipulateWindow.deactivate();
			this._cgmz_actorManipulateWindow.hide();
			this._cgmz_actorNameWindow.hide();
			this._cgmz_actorSkillWindow.setActor(actor);
			this._cgmz_actorSkillWindow.activate();
			this._cgmz_actorSkillWindow.select(0);
			this._cgmz_actorSkillWindow.show();
			return;
		case 3: actor.recoverAll(); break;
		case 4: actor.setup(actor._actorId); break;
	}
	this._cgmz_actorManipulateWindow.refresh();
	this._cgmz_actorManipulateWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for actor manipulate cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onActorManipulateCancel = function() {
	this._cgmz_actorManipulateWindow.hide();
	this._cgmz_actorManipulateWindow.deactivate();
	this._cgmz_actorNameWindow.hide();
	this._cgmz_actorSelectWindow.show();
	this._cgmz_actorSelectWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for actor skill ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onActorSkillOk = function() {
	const skillId = this._cgmz_actorSkillWindow.index() + 1;
	const actor = this._cgmz_actorSkillWindow._actor;
	(actor.isLearnedSkill(skillId)) ? actor.forgetSkill(skillId) : actor.learnSkill(skillId);
	this._cgmz_actorSkillWindow.redrawCurrentItem();
	this._cgmz_actorSkillWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for actor skill cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onActorSkillCancel = function() {
	this._cgmz_actorSkillWindow.hide();
	this._cgmz_actorSkillWindow.deactivate();
	this._cgmz_actorManipulateWindow.show();
	this._cgmz_actorManipulateWindow.activate();
	this._cgmz_actorNameWindow.show();
};
//-----------------------------------------------------------------------------
// Handling for weather cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onWeatherCancel = function() {
	this._cgmz_weatherWindow.hide();
	this._cgmz_weatherWindow.deactivate();
	this._cgmz_commandWindow.show();
	this._cgmz_commandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for weather ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onWeatherOk = function() {
	const weather = this._cgmz_weatherWindow.getWeather();
	$gameScreen.changeWeather(weather.type, weather.power, weather.duration);
	this._cgmz_weatherWindow.hide();
	this._cgmz_weatherWindow.deactivate();
	this._cgmz_commandWindow.show();
	this._cgmz_commandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for tint cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onTintCancel = function() {
	this._cgmz_tintWindow.hide();
	this._cgmz_tintWindow.deactivate();
	this._cgmz_commandWindow.show();
	this._cgmz_commandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for tint ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onTintOk = function() {
	const tone = this._cgmz_tintWindow.getTone();
	$gameScreen.startTint(tone.tone, tone.duration);
	this._cgmz_tintWindow.hide();
	this._cgmz_tintWindow.deactivate();
	this._cgmz_commandWindow.show();
	this._cgmz_commandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for map select cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onMapSelectCancel = function() {
	this._cgmz_mapSelectWindow.hide();
	this._cgmz_mapSelectWindow.deactivate();
	this._cgmz_commandWindow.show();
	this._cgmz_commandWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for map select ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onMapSelectOk = function() {
	const mapId = this._cgmz_mapSelectWindow.mapId();
	this._cgmz_mapSelectWindow.hide();
	this._cgmz_mapSelectWindow.deactivate();
	this._cgmz_mapWindow.setMapId(mapId);
	this._cgmz_mapWindow.select(0);
	this._cgmz_mapWindow.ensureCursorVisible();
	this._cgmz_mapWindow.show();
	this._cgmz_mapWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for map cancel
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onMapCancel = function() {
	this._cgmz_mapWindow.hide();
	this._cgmz_mapWindow.deactivate();
	this._cgmz_mapSelectWindow.show();
	this._cgmz_mapSelectWindow.activate();
};
//-----------------------------------------------------------------------------
// Handling for map ok
//-----------------------------------------------------------------------------
Scene_Debug.prototype.CGMZ_onMapOk = function() {
	const mapId = this._cgmz_mapWindow._mapId;
	const x = this._cgmz_mapWindow.column();
	const y = this._cgmz_mapWindow.row();
	$gamePlayer.reserveTransfer(mapId, x, y, 2, 0)
	this.popScene();
};
//=============================================================================
// CGMZ_Debug_Window_Command
//-----------------------------------------------------------------------------
// Command window for the Debug scene
//=============================================================================
function CGMZ_Debug_Window_Command() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_Command.prototype = Object.create(Window_Command.prototype);
CGMZ_Debug_Window_Command.prototype.constructor = CGMZ_Debug_Window_Command;
//-----------------------------------------------------------------------------
// Initialize the command window
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Command.prototype.initialize = function(rect) {
	Window_Command.prototype.initialize.call(this, rect);
	this.selectLast();
};
//-----------------------------------------------------------------------------
// Track command position
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Command._lastCommandSymbol = null;
CGMZ_Debug_Window_Command.initCommandPosition = function() {
	this._lastCommandSymbol = null;
};
//-----------------------------------------------------------------------------
// Make the list of commands for the window
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Command.prototype.makeCommandList = function() {
	this.addCommand(CGMZ.Debug.DefaultCommand, "default");
	this.addCommand(CGMZ.Debug.GoldCommand, "gold");
	this.addCommand(CGMZ.Debug.ItemCommand, "items");
	this.addCommand(CGMZ.Debug.WeaponCommand, "weapons");
	this.addCommand(CGMZ.Debug.ArmorCommand, "armors");
	this.addCommand(CGMZ.Debug.BattleTestCommand, "troops");
	this.addCommand(CGMZ.Debug.CommonEventCommand, "commonEvent");
	this.addCommand(CGMZ.Debug.SoundTestCommand, "soundTest");
	this.addCommand(CGMZ.Debug.ViewCacheCommand, "viewCache");
	this.addCommand(CGMZ.Debug.ActorsCommand, "actors");
	this.addCommand(CGMZ.Debug.WeatherCommand, "weather");
	this.addCommand(CGMZ.Debug.TintCommand, "tint");
	this.addCommand(CGMZ.Debug.MapTransferCommand, "transfer");
};
//-----------------------------------------------------------------------------
// Processing for "OK" button pressed
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Command.prototype.processOk = function() {
	CGMZ_Debug_Window_Command._lastCommandSymbol = this.currentSymbol();
	Window_Command.prototype.processOk.call(this);
};
//-----------------------------------------------------------------------------
// Select the last item that was selected
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Command.prototype.selectLast = function() {
	if (CGMZ_Debug_Window_Command._lastCommandSymbol) {
		this.selectSymbol(CGMZ_Debug_Window_Command._lastCommandSymbol);
	} else {
		this.selectSymbol("default");
	}
};
//=============================================================================
// CGMZ_Debug_Window_Gold
//-----------------------------------------------------------------------------
// Shows the gold window with controls for increasing / decreasing gold
//=============================================================================
function CGMZ_Debug_Window_Gold() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_Gold.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_Gold.prototype.constructor = CGMZ_Debug_Window_Gold;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Gold.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._scaler = 1;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh the window to show updated party gold
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Gold.prototype.refresh = function(index) {
	this.contents.clear();
	const rect = this.itemLineRect(0);
	const x = rect.x;
	const y = rect.y;
	const width = rect.width;
	this.drawCurrencyValue($cgmzTemp.numberSplit($gameParty.gold()), TextManager.currencyUnit, x, y, width);
};
//-----------------------------------------------------------------------------
// Update if active
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Gold.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if(this.active) {
		this.updateGold();
	}
};
//-----------------------------------------------------------------------------
// Update the gold the party has
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Gold.prototype.updateGold = function() {
	const value = $gameParty.gold();
	$gameParty.gainGold(this.deltaForGold())
	const newValue = $gameParty.gold();
	if(value !== newValue) {
		this.playCursorSound();
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Get how much to change the gold by. The rate increases the longer the
// button is pressed.
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_Gold.prototype.deltaForGold = function() {
	let rate = 1;
	if(Input.isLongPressed("right") || Input.isLongPressed("left")) {
		this._scaler = this._scaler * 1.01;
		rate = Math.floor(rate * this._scaler);
	} else if(Input.isLongPressed("pageup") || Input.isLongPressed("pagedown")) {
		this._scaler = this._scaler * 1.03;
		rate = Math.floor(rate * this._scaler);
	} else {
		this._scaler = 1;
	}
	if(Input.isRepeated("right")) {
		return 1 * rate;
	} else if (Input.isRepeated("left")) {
		return -1 * rate;
	} else if (Input.isRepeated("pageup")) {
		return 100 * rate;
	} else if (Input.isRepeated("pagedown")) {
		return -100 * rate;
	}
	return 0;
};
//=============================================================================
// CGMZ_Debug_Window_ItemSelect
//-----------------------------------------------------------------------------
// Shows the items, armors, or weapons in the game
//=============================================================================
function CGMZ_Debug_Window_ItemSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_ItemSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_ItemSelect.prototype.constructor = CGMZ_Debug_Window_ItemSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._itemType = null;
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.setItemType = function(itemType) {
	this._itemType = itemType;
	this.contents.clear();
	this.contentsBack.clear();
	this.drawAllItems();
};
//-----------------------------------------------------------------------------
// Get the max items based on itemType
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.maxItems = function() {
	switch(this._itemType) {
		case "item": return $dataItems.length - 1;
		case "armor": return $dataArmors.length - 1;
		case "weapon": return $dataWeapons.length - 1;
		default: 
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Do not move cursor on pageup/pagedown
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.cursorPagedown = function() {
};
//-----------------------------------------------------------------------------
// Do not move cursor on pageup/pagedown
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.cursorPageup = function() {
};
//-----------------------------------------------------------------------------
// Get the item object at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.getItemObject = function(index) {
	switch(this._itemType) {
		case "item": return $dataItems[index + 1];
		case "armor": return $dataArmors[index + 1];
		case "weapon": return $dataWeapons[index + 1];
		default: 
	}
	return null;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.drawItem = function(index) {
	const item = this.getItemObject(index);
	const itemRect = this.itemRectWithPadding(index);
	const amount = $gameParty.numItems(item);
	const amountText = "x" + amount;
	this.drawItemName(item, itemRect.x, itemRect.y, itemRect.width);
	this.drawText(amountText, itemRect.x, itemRect.y, itemRect.width, "right");
};
//-----------------------------------------------------------------------------
// Update if active
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if(this.active) {
		this.updateDebugItems();
	}
};
//-----------------------------------------------------------------------------
// Update the gold the party has
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.updateDebugItems = function() {
	const changeVal = this.deltaForItem();
	if(changeVal !== 0) {
		const item = this.getItemObject(this.index());
		const currentAmount = $gameParty.numItems(item);
		if((!$gameParty.hasMaxItems(item) &&  changeVal > 0) || 
		   ($gameParty.numItems(item) > 0 && changeVal < 0)) {
			const includeEquip = false;
			$gameParty.gainItem(item, changeVal, includeEquip);
			this.playCursorSound();
			this.redrawCurrentItem();
		}
	}
};
//-----------------------------------------------------------------------------
// Get how much to change the item amount by. Only 99 max items so no need to
// scale.
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ItemSelect.prototype.deltaForItem = function() {
	if(Input.isRepeated("right")) {
		return 1;
	} else if (Input.isRepeated("left")) {
		return -1;
	} else if (Input.isRepeated("pageup")) {
		return 10;
	} else if (Input.isRepeated("pagedown")) {
		return -10;
	}
	return 0;
};
//=============================================================================
// CGMZ_Debug_Window_TroopSelect
//-----------------------------------------------------------------------------
// Shows the troops available in the game
//=============================================================================
function CGMZ_Debug_Window_TroopSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_TroopSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_TroopSelect.prototype.constructor = CGMZ_Debug_Window_TroopSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TroopSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.refresh();
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Get the max items based on itemType
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TroopSelect.prototype.maxItems = function() {
	return $dataTroops.length - 1;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TroopSelect.prototype.drawItem = function(index) {
	const troop = $dataTroops[index + 1];
	const itemRect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(troop.name, itemRect.x, itemRect.y, itemRect.width, "left");
};
//=============================================================================
// CGMZ_Debug_Window_CommonEventSelect
//-----------------------------------------------------------------------------
// Shows the common events in the game
//=============================================================================
function CGMZ_Debug_Window_CommonEventSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_CommonEventSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_CommonEventSelect.prototype.constructor = CGMZ_Debug_Window_CommonEventSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_CommonEventSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.refresh();
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Get the max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_CommonEventSelect.prototype.maxItems = function() {
	return $dataCommonEvents.length - 1;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_CommonEventSelect.prototype.drawItem = function(index) {
	const event = $dataCommonEvents[index + 1];
	const itemRect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(event.name, itemRect.x, itemRect.y, itemRect.width, "left");
};
//=============================================================================
// CGMZ_Debug_Window_SoundTestCommand
//-----------------------------------------------------------------------------
// Command window for sound test commands
//=============================================================================
function CGMZ_Debug_Window_SoundTestCommand() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_SoundTestCommand.prototype = Object.create(Window_Command.prototype);
CGMZ_Debug_Window_SoundTestCommand.prototype.constructor = CGMZ_Debug_Window_SoundTestCommand;
//-----------------------------------------------------------------------------
// Initialize the command window
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestCommand.prototype.initialize = function(rect) {
	Window_Command.prototype.initialize.call(this, rect);
	this.hide();
	this.deactivate();
};
//-----------------------------------------------------------------------------
// Make the list of commands for the window
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestCommand.prototype.makeCommandList = function() {
	this.addCommand("BGM", "bgm");
	this.addCommand("BGS", "bgs");
	this.addCommand("ME", "me");
	this.addCommand("SE", "se");
	this.addCommand(CGMZ.Debug.SoundTestSettingsCommand, "settings");
};
//=============================================================================
// CGMZ_Debug_Window_SoundTestSelect
//-----------------------------------------------------------------------------
// Shows the sounds available to select
//=============================================================================
function CGMZ_Debug_Window_SoundTestSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_SoundTestSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_SoundTestSelect.prototype.constructor = CGMZ_Debug_Window_SoundTestSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._type = null;
	this.refresh();
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSelect.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSelect.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSelect.prototype.setType = function(type) {
	this._type = type;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSelect.prototype.refresh = function() {
	if(!this._type) return;
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Synchronously create an array of all files in a given directory
// TODO: Make this support subdirectories
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSelect.prototype.makeItemList = function() {
	const fs = require('fs');
	const folderPath = $cgmzTemp.fileDirectoryPath("audio/" + this._type);
	const files = [];
	const filenames = fs.readdirSync(folderPath);
	filenames.forEach(function(file) {
		files.push(file);
	});
	this._data = files;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSelect.prototype.drawItem = function(index) {
	const filename = this._data[index];
	const itemRect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(filename, itemRect.x, itemRect.y, itemRect.width, "left");
};
//=============================================================================
// CGMZ_Debug_Window_SoundTestSettings
//-----------------------------------------------------------------------------
// Manipulate sound test settings
//=============================================================================
function CGMZ_Debug_Window_SoundTestSettings() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_SoundTestSettings.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_SoundTestSettings.prototype.constructor = CGMZ_Debug_Window_SoundTestSettings;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._volume = 90;
	this._pan = 0;
	this._pitch = 100;
	this.refresh();
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.maxItems = function() {
	return 3;
};
//-----------------------------------------------------------------------------
// Volume
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.volume = function() {
	return this._volume;
};
//-----------------------------------------------------------------------------
// Pan
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.pan = function() {
	return this._pan;
};
//-----------------------------------------------------------------------------
// Pitch
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.pitch = function() {
	return this._pitch;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.drawItem = function(index) {
	const strings = [CGMZ.Debug.SoundTestSettingsVolume, CGMZ.Debug.SoundTestSettingsPan, CGMZ.Debug.SoundTestSettingsPitch];
	const descriptor = strings[index];
	const value = this.itemValue(index);
	const itemRect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(descriptor, itemRect.x, itemRect.y, itemRect.width, "left");
	this.CGMZ_drawTextLine(String(value), itemRect.x, itemRect.y, itemRect.width, "right");
};
//-----------------------------------------------------------------------------
// Update if active
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if(this.active) {
		this.updateSettings();
	}
};
//-----------------------------------------------------------------------------
// Current item value
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.itemValue = function(index) {
	switch(index) {
		case 0: return this.volume();
		case 1: return this.pan();
		case 2: return this.pitch();
	}
	return 0;
};
//-----------------------------------------------------------------------------
// Set item value
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.setValue = function(index, addValue) {
	switch(index) {
		case 0: this._volume = (this._volume + addValue).clamp(0, 100); break;
		case 1: this._pan = (this._pan + addValue).clamp(-100, 100); break;
		case 2: this._pitch = (this._pitch + addValue).clamp(50, 150);
	}
};
//-----------------------------------------------------------------------------
// Update the sound settings
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.updateSettings = function() {
	const index = this.index();
	const value = this.itemValue(index);
	this.setValue(index, this.deltaForValue())
	const newValue = this.itemValue(index);
	if (value !== newValue) {
		this.playCursorSound();
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Get how much to change the setting by.
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_SoundTestSettings.prototype.deltaForValue = function() {
	if(Input.isRepeated("right")) {
		return 1;
	} else if(Input.isRepeated("left")) {
		return -1;
	} else if(Input.isRepeated("pageup")) {
		return 10;
	} else if(Input.isRepeated("pagedown")) {
		return -10;
	}
	return 0;
};
//=============================================================================
// CGMZ_Debug_Window_ViewCacheSelect
//-----------------------------------------------------------------------------
// Command window for view cache
//=============================================================================
function CGMZ_Debug_Window_ViewCacheSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_ViewCacheSelect.prototype = Object.create(Window_Command.prototype);
CGMZ_Debug_Window_ViewCacheSelect.prototype.constructor = CGMZ_Debug_Window_ViewCacheSelect;
//-----------------------------------------------------------------------------
// Initialize the command window
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCacheSelect.prototype.initialize = function(rect) {
	Window_Command.prototype.initialize.call(this, rect);
	this.hide();
	this.deactivate();
};
//-----------------------------------------------------------------------------
// Make the list of commands for the window
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCacheSelect.prototype.makeCommandList = function() {
	this.addCommand(CGMZ.Debug.ImageCacheCommand, "img");
	this.addCommand(CGMZ.Debug.FontCacheCommand, "font");
};
//=============================================================================
// CGMZ_Debug_Window_ViewCache
//-----------------------------------------------------------------------------
// Shows what is in the cache
//=============================================================================
function CGMZ_Debug_Window_ViewCache() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_ViewCache.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_ViewCache.prototype.constructor = CGMZ_Debug_Window_ViewCache;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCache.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._type = null;
	this.refresh();
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCache.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCache.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCache.prototype.setType = function(type) {
	this._type = type;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCache.prototype.refresh = function() {
	if(!this._type) return;
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
	this.select(0);
};
//-----------------------------------------------------------------------------
// Create a list of items in the proper cache
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCache.prototype.makeItemList = function() {
	const urls = [];
	switch(this._type) {
		case "font":
			for(const family in FontManager._states) {
				const state = FontManager._states[family];
				urls.push({url: family, state: state});
			}
			break;
		case "img":
			for (const cache of [ImageManager._cache, ImageManager._system]) {
				for (const url in cache) {
					const bitmap = cache[url];
					const state = bitmap._loadingState;
					urls.push({url: url, state: state});
				}
			}
	}
	this._data = urls;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ViewCache.prototype.drawItem = function(index) {
	const item = this._data[index];
	const itemRect = this.itemRectWithPadding(index);
	const color = 2 + 1*(item.state === "loaded");
	this.CGMZ_drawTextLine('\\c[' + color + ']' + item.url + '\\c[0]', itemRect.x, itemRect.y, itemRect.width, "left");
};
//=============================================================================
// CGMZ_Debug_Window_ActorSelect
//-----------------------------------------------------------------------------
// Shows the actors of the game
//=============================================================================
function CGMZ_Debug_Window_ActorSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_ActorSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_ActorSelect.prototype.constructor = CGMZ_Debug_Window_ActorSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.refresh();
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Get the max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorSelect.prototype.maxItems = function() {
	return $dataActors.length - 1;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorSelect.prototype.drawItem = function(index) {
	const actor = $dataActors[index + 1];
	const itemRect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine(actor.name, itemRect.x, itemRect.y, itemRect.width, "left");
};
//=============================================================================
// CGMZ_Debug_Window_ActorName
//-----------------------------------------------------------------------------
// Shows the currently selected actor's name
//=============================================================================
function CGMZ_Debug_Window_ActorName() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_ActorName.prototype = Object.create(Window_Base.prototype);
CGMZ_Debug_Window_ActorName.prototype.constructor = CGMZ_Debug_Window_ActorName;
//-----------------------------------------------------------------------------
// Set the actor name
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorName.prototype.setName = function(name) {
	this._name = name;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Draw the actor name
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorName.prototype.refresh = function() {
	this.contents.clear();
	this.CGMZ_drawTextLine(this._name, 0, 0, this.contents.width, 'center');
};
//=============================================================================
// CGMZ_Debug_Window_ActorManipulate
//-----------------------------------------------------------------------------
// Shows the options to manipulate the currently selected actor
//=============================================================================
function CGMZ_Debug_Window_ActorManipulate() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_ActorManipulate.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_ActorManipulate.prototype.constructor = CGMZ_Debug_Window_ActorManipulate;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorManipulate.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.deselect();
	this.hide();
	this._actor = null;
};
//-----------------------------------------------------------------------------
// Get the max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorManipulate.prototype.maxItems = function() {
	return 5;
};
//-----------------------------------------------------------------------------
// Set the actor
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorManipulate.prototype.setActor = function(id) {
	this._actor = $gameActors.actor(id);
	this.refresh();
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorManipulate.prototype.drawItem = function(index) {
	if(!this._actor) return;
	const itemRect = this.itemRectWithPadding(index);
	switch(index) {
		case 0:
			const addRemoveText = $gameParty.members().includes(this._actor) ? CGMZ.Debug.RemoveFromParty : CGMZ.Debug.AddToParty;
			this.CGMZ_drawTextLine(addRemoveText, itemRect.x, itemRect.y, itemRect.width, "left");
			break;
		case 1: this.CGMZ_drawTextLine(CGMZ.Debug.CurrentLevel + " " + this._actor.level + " (left/right to edit)", itemRect.x, itemRect.y, itemRect.width, "left"); break;
		case 2: this.CGMZ_drawTextLine(CGMZ.Debug.ChangeSkills, itemRect.x, itemRect.y, itemRect.width, "left"); break;
		case 3: this.CGMZ_drawTextLine(CGMZ.Debug.RecoverAll, itemRect.x, itemRect.y, itemRect.width, "left"); break;
		case 4: this.CGMZ_drawTextLine(CGMZ.Debug.InitializeActor, itemRect.x, itemRect.y, itemRect.width, "left"); break;
	}
};
//-----------------------------------------------------------------------------
// Update if active
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorManipulate.prototype.update = function() {
	Window_Selectable.prototype.update.call(this);
	if(this.active && this.index() === 1) {
		this.updateSettings();
	}
};
//-----------------------------------------------------------------------------
// Update the actor level if needed
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorManipulate.prototype.updateSettings = function() {
	const changeAmount = this.deltaForValue();
	if (changeAmount) {
		this.playCursorSound();
		const level = this._actor.level;
		this._actor.changeLevel(level + changeAmount, false);
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Get how much to change the setting by.
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorManipulate.prototype.deltaForValue = function() {
	if(Input.isRepeated("right")) {
		return 1;
	} else if(Input.isRepeated("left")) {
		return -1;
	} else if(Input.isRepeated("pageup")) {
		return 10;
	} else if(Input.isRepeated("pagedown")) {
		return -10;
	}
	return 0;
};
//=============================================================================
// CGMZ_Debug_Window_ActorSkill
//-----------------------------------------------------------------------------
// Shows the actors' skills of the game
//=============================================================================
function CGMZ_Debug_Window_ActorSkill() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_ActorSkill.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_ActorSkill.prototype.constructor = CGMZ_Debug_Window_ActorSkill;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorSkill.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this._actor = null;
	this.deselect();
	this.hide();
};
//-----------------------------------------------------------------------------
// Get the max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorSkill.prototype.setActor = function(actor) {
	this._actor = actor;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Get the max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorSkill.prototype.maxItems = function() {
	return $dataSkills.length - 1;
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_ActorSkill.prototype.drawItem = function(index) {
	const skillId = index + 1;
	const color = (this._actor) ? (this._actor.isLearnedSkill(skillId) ? 3 : 2) : 0;
	const skill = $dataSkills[skillId];
	const itemRect = this.itemRectWithPadding(index);
	this.CGMZ_drawTextLine('\\c[' + color + ']' + skill.name + '\\c[0]', itemRect.x, itemRect.y, itemRect.width, "left");
};
//=============================================================================
// CGMZ_Debug_Window_WeatherSelect
//-----------------------------------------------------------------------------
// Weather debug window for changing the weather type and power
//=============================================================================
function CGMZ_Debug_Window_WeatherSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_WeatherSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_WeatherSelect.prototype.constructor = CGMZ_Debug_Window_WeatherSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_WeatherSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.deselect();
	this.hide();
	this._power = ($gameScreen._weatherPower).clamp(1, 9);
	const types = ["none", "rain", "storm", "snow"];
	this._type = types.indexOf($gameScreen._weatherType) || 0;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Get the desired weather settings from window
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_WeatherSelect.prototype.getWeather = function() {
	const types = ["none", "rain", "storm", "snow"];
	return {type: types[this._type], power: this._power, duration: 0};
};
//-----------------------------------------------------------------------------
// Get the max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_WeatherSelect.prototype.maxItems = function() {
	return 2;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_WeatherSelect.prototype.refresh = function() {
	Window_Selectable.prototype.refresh.call(this);
	const helpRect = this.itemRectWithPadding(2);
	this.drawText(CGMZ.Debug.WeatherHelp, helpRect.x, helpRect.y, helpRect.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_WeatherSelect.prototype.drawItem = function(index) {
	const itemRect = this.itemRectWithPadding(index);
	const weatherTypes = [CGMZ.Debug.WeatherTypeNone, CGMZ.Debug.WeatherTypeRain, CGMZ.Debug.WeatherTypeStorm, CGMZ.Debug.WeatherTypeSnow];
	if(index === 0) {
		this.drawText(CGMZ.Debug.WeatherType, itemRect.x, itemRect.y, itemRect.width, 'left');
		this.drawText(weatherTypes[this._type], itemRect.x + itemRect.width/2, itemRect.y, itemRect.width/2, 'center');
	} else {
		this.drawText(CGMZ.Debug.WeatherPower, itemRect.x, itemRect.y, itemRect.width, 'left');
		this.drawText(this._power, itemRect.x + itemRect.width/2, itemRect.y, itemRect.width/2, 'center');
	}
};
//-----------------------------------------------------------------------------
// Handling for cursor right
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_WeatherSelect.prototype.cursorRight = function() {
	const index = this.index();
	if (index === 0) {
		this._type = (this._type + 1).clamp(0,3);
	} else {
		this._power= (this._power + 1).clamp(1,9);
	}
	this.playCursorSound();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Handling for cursor left
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_WeatherSelect.prototype.cursorLeft = function() {
	const index = this.index();
	if (index === 0) {
		this._type = (this._type - 1).clamp(0,3);
	} else {
		this._power= (this._power - 1).clamp(1,9);
	}
	this.playCursorSound();
	this.refresh();
};
//=============================================================================
// CGMZ_Debug_Window_TintSelect
//-----------------------------------------------------------------------------
// Tint debug window for changing the screen tint
//=============================================================================
function CGMZ_Debug_Window_TintSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_TintSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_TintSelect.prototype.constructor = CGMZ_Debug_Window_TintSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.deselect();
	this.hide();
	this._tone = $gameScreen._tone.clone();
	this._scaler = 1;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Get the tone
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.getTone = function() {
	return {tone: this._tone, duration: 0};
};
//-----------------------------------------------------------------------------
// Get the max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.maxItems = function() {
	return 4;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.refresh = function() {
	Window_Selectable.prototype.refresh.call(this);
	const helpRect = this.itemRectWithPadding(4);
	this.drawText(CGMZ.Debug.TintHelp, helpRect.x, helpRect.y, helpRect.width, 'center');
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.drawItem = function(index) {
	const itemRect = this.itemRectWithPadding(index);
	switch(index) {
		case 0:
			this.drawText(CGMZ.Debug.TintRed, itemRect.x, itemRect.y, itemRect.width, 'left');
			break;
		case 1:
			this.drawText(CGMZ.Debug.TintGreen, itemRect.x, itemRect.y, itemRect.width, 'left');
			break;
		case 2:
			this.drawText(CGMZ.Debug.TintBlue, itemRect.x, itemRect.y, itemRect.width, 'left');
			break;
		case 3:
			this.drawText(CGMZ.Debug.TintGray, itemRect.x, itemRect.y, itemRect.width, 'left');
	}
	this.drawText(this._tone[index], itemRect.x + itemRect.width/2, itemRect.y, itemRect.width/2, 'center');
};
//-----------------------------------------------------------------------------
// Handling for cursor right
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.cursorRight = function() {
	const index = this.index();
	switch(index) {
		case 0:
		case 1:
		case 2:
			this._tone[index] = (this._tone[index] + this.deltaForTone()).clamp(-255, 255);
			break;
		case 3:
			this._tone[index] = (this._tone[index] + this.deltaForTone()).clamp(0, 255);
	}
	this.playCursorSound();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Handling for cursor left
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.cursorLeft = function() {
	this.cursorRight();
};
//-----------------------------------------------------------------------------
// Get amonut to change tone by
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_TintSelect.prototype.deltaForTone = function() {
	let rate = 1;
	if(Input.isLongPressed("right") || Input.isLongPressed("left")) {
		this._scaler = this._scaler * 1.1;
		rate = Math.floor(rate * this._scaler);
	} else {
		this._scaler = 1;
	}
	if(Input.isRepeated("right")) {
		return 1 * rate;
	} else if (Input.isRepeated("left")) {
		return -1 * rate;
	}
	return 0;
};
//=============================================================================
// CGMZ_Debug_Window_MapSelect
//-----------------------------------------------------------------------------
// Map Transfer debug window for selecting a map
//=============================================================================
function CGMZ_Debug_Window_MapSelect() {
	this.initialize(...arguments);
}
CGMZ_Debug_Window_MapSelect.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Debug_Window_MapSelect.prototype.constructor = CGMZ_Debug_Window_MapSelect;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_MapSelect.prototype.initialize = function(rect) {
	Window_Selectable.prototype.initialize.call(this, rect);
	this.deselect();
	this.hide();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Get the selected map's id
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_MapSelect.prototype.mapId = function() {
	return this.item().id;
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_MapSelect.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_MapSelect.prototype.item = function() {
	return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_MapSelect.prototype.refresh = function() {
	this.makeItemList();
	Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make list of items
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_MapSelect.prototype.makeItemList = function() {
	this._data = [];
	for(const mapInfo of $dataMapInfos) {
		if(!mapInfo) continue;
		const object = {id: mapInfo.id, name: mapInfo.name};
		this._data.push(object);
	}
};
//-----------------------------------------------------------------------------
// Draw the item at the specified index
//-----------------------------------------------------------------------------
CGMZ_Debug_Window_MapSelect.prototype.drawItem = function(index) {
	const itemRect = this.itemRectWithPadding(index);
	const mapName = this._data[index].name;
	this.drawText(mapName, itemRect.x, itemRect.y, itemRect.width, 'center');
};