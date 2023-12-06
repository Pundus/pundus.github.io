/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/eventmovement/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Add more movement options for events
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
 * Description: This plugin adds new movement types for events to use for
 * auto movement. Things such as copy player movements, opposite player moves,
 * and more. Events will only move whenever the player moves, which can be
 * useful for monsters on the map screen similar to some old school SNES
 * games. It can also stun events for a certain amount of steps, and provide
 * a region ID through which events cannot move (but the player still can).
 * ----------------------------------------------------------------------------
 * Documentation:
 * -------------------------------Beta Notes-----------------------------------
 * Want additional features not already present? Make suggestions on the
 * Patreon Post, Itch IO Page, or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * --------------------------Event Comments------------------------------------
 * To use extra conditions, create a Comment event command and set the first
 * line in the comment to be:
 * CGMZ Event Movement
 *
 * Other lines can be in any order. Other lines include setup for move type and
 * speed.
 * To set up move type, use the following format:
 * Type: moveType
 *
 * Valid moveTypes include:
 * Random - same as default random move type
 * Approach - same as default approach move type
 * Custom - same as default custom move type
 * SmartApproach - will only ever try to approach
 * Random2 - will always move randomly
 * Avoid - will try to avoid the player
 * SmartAvoid - will only ever try to avoid the player
 * Mimic - will mimic the player's movements
 * Opposite - will perform the opposite of the player's movements
 * 
 * To set up speed, use the following format:
 * Speed: speedType
 * 
 * Valid speedTypes include:
 * VSlow - will move once every 4 steps the player takes
 * Slow - will move once every 2 steps the player takes
 * Normal - will move every step the player takes
 * Fast - will move twice every step the player takes
 *
 * A sample comment may look something like this:
 * CGMZ Event Movement
 * Type: Mimic
 * Speed: Fast
 * --------------------------Plugin Commands-----------------------------------
 * This plugin supports the following plugin commands:
 * • Stun Event
 * This will stun an event for a provided amount of steps.
 * 
 * • Unstun Event
 * This will unstun an event if it is stunned
 * 
 * • Get Event Stun Status
 * This will set a switch to ON if the event is stunned, else the switch will
 * be set to OFF.
 * ---------------------------Saved Games--------------------------------------
 * This plugin fully supports saved games.
 * 
 * This means the following should cause no issues even in saved games:
 * ✓ Add this plugin to your game
 * ✓ Modify this plugin's parameters
 * ✓ Remove this plugin from your game
 * -----------------------------Filename---------------------------------------
 * The filename of this plugin's JavaScript file MUST be CGMZ_EventMovement.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * --------------------------Version History-----------------------------------
 * 1.0.0 - Initial Release
 *
 * @command stunEvent
 * @text Stun Event
 * @desc Stuns an event from moving for a few steps
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to stun. Use 0 to refer to "this event"
 * @default 0
 *
 * @arg stunSteps
 * @type number
 * @text Steps
 * @desc The number of steps the player must take before the event is no longer stunned
 * @default 0
 *
 * @command Unstun Event
 * @desc Removes a stun from an event
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to unstun. Use 0 to refer to "this event"
 * @default 0
 *
 * @command Get Event Stun Status
 * @desc Sets a switch to on/off if an event is stunned or not
 *
 * @arg eventId
 * @type number
 * @text Event ID
 * @desc The ID of the event to check. Use 0 to refer to "this event"
 * @default 0
 *
 * @arg switchId
 * @text Switch ID
 * @type switch
 * @desc The Switch to turn on/off based on result
 * @default 0
 *
 * @param Prevent Event Movement Region
 * @type number
 * @min 0
 * @max 255
 * @desc Region ID which blocks event movement. Set to 0 to not use this feature.
 * @default 0
 *
 * @param Prevent Player Movement Region
 * @type number
 * @min 0
 * @max 255
 * @desc Region ID which blocks player movement. Set to 0 to not use this feature.
 * @default 0
*/
var Imported = Imported || {};
Imported.CGMZ_EventMovement = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Event Movement"] = "Beta";
CGMZ.EventMovement = CGMZ.EventMovement || {};
CGMZ.EventMovement.parameters = PluginManager.parameters('CGMZ_EventMovement');
CGMZ.EventMovement.PreventMoveRegion = Number(CGMZ.EventMovement.parameters["Prevent Event Movement Region"]);
CGMZ.EventMovement.PreventPlayerMoveRegion = Number(CGMZ.EventMovement.parameters["Prevent Player Movement Region"]);
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Registration and processing for new plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_EventMovement_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_EventMovement", "stunEvent", this.pluginCommandEventMovementStunEvent);
	PluginManager.registerCommand("CGMZ_EventMovement", "Unstun Event", this.pluginCommandEventMovementUnstunEvent);
	PluginManager.registerCommand("CGMZ_EventMovement", "Get Event Stun Status", this.pluginCommandEventMovementGetEventStunStatus);
};
//-----------------------------------------------------------------------------
// Plugin Command - Stun Event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEventMovementStunEvent = function(args) {
    const character = this.character(Number(args.eventId));
	if(character) character.CGMZ_EventMovement_stunEvent(Number(args.stunSteps));
};
//-----------------------------------------------------------------------------
// Plugin Command - Unstun Event
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEventMovementUnstunEvent = function(args) {
    const character = this.character(Number(args.eventId));
	if(character) character.CGMZ_EventMovement_unstunEvent();
};
//-----------------------------------------------------------------------------
// Plugin Command - Get Event Stun Status
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandEventMovementGetEventStunStatus = function(args) {
    const character = this.character(Number(args.eventId));
	if(character) $gameSwitches.setValue(Number(args.switchId), character.CGMZ_EventMovement_isEventStunned());
};
//=============================================================================
// Game_Event
//-----------------------------------------------------------------------------
// Check for additional movement types
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Check for custom move types
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	alias_CGMZ_EventMovement_setupPageSettings.call(this);
	this._cgmz_eventMovement_hasCustomMovement = false;
    const page = this.page();
	let hasCustomMovement = false;
	let rawMoveData = [];
	for(const command of page.list) {
		if(hasCustomMovement) {
			if(command.code !== 408) {
				const moveData = this.CGMZ_EventMovement_parseMovementData(rawMoveData);
				this.CGMZ_EventMovement_setMovementType(moveData);
				break;
			}
			rawMoveData.push(command.parameters[0].trim().toLowerCase().split(" "));
		} else {
			hasCustomMovement = (command.code === 108 && command.parameters[0].trim() === "CGMZ Event Movement");
		}
	}
};
//-----------------------------------------------------------------------------
// Parse custom move data and return a movement object
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_parseMovementData = function(rawMoveData) {
	// Expected Format of rawMoveData: [[dataType, value], ...]
	let moveData = {type: "random", speed: "normal"};
	for(let i = 0; i < rawMoveData.length; i++) {
		switch(rawMoveData[i][0]) {
			case "type:": moveData.type = rawMoveData[i][1]; continue;
			case "speed:": moveData.speed = rawMoveData[i][1]; continue;
		}
	}
	return moveData;
};
//-----------------------------------------------------------------------------
// Set cgmz move data
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_setMovementType = function(moveData) {
	this._cgmz_eventMovement_hasCustomMovement = true;
	this._cgmz_eventMovement_playerStepCount = $gameParty.steps();
	this._cgmz_eventMovement_isStunned = false;
	this._cgmz_eventMovement_stunSteps = 0;
	this._cgmz_eventMovement_customMovement = moveData;
};
//-----------------------------------------------------------------------------
// Alias. Perform CGMZ movement if has custom movement
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if(!this._cgmz_eventMovement_hasCustomMovement) {
		alias_CGMZ_EventMovement_updateSelfMovement.call(this);
	} else {
		this.CGMZ_EventMovement_updateStun();
		this.CGMZ_EventMovement_handleCustomMovement();
	}
};
//-----------------------------------------------------------------------------
// Update event stun state
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_updateStun = function() {
	this._cgmz_eventMovement_isStunned = (this._cgmz_eventMovement_stunSteps >= $gameParty.steps());
};
//-----------------------------------------------------------------------------
// Stun event for n steps
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_stunEvent = function(n) {
	this._cgmz_eventMovement_stunSteps = $gameParty.steps() + n;
	this._cgmz_eventMovement_isStunned = true;
};
//-----------------------------------------------------------------------------
// Unstun event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_unstunEvent = function() {
	this._cgmz_eventMovement_stunSteps = 0;
	this._cgmz_eventMovement_isStunned = false;
};
//-----------------------------------------------------------------------------
// Get stun status of event
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_isEventStunned = function() {
	return this._cgmz_eventMovement_isStunned;
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ movement
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_handleCustomMovement = function() {
	if(this.CGMZ_EventMovement_shouldMove()) {
		this._cgmz_eventMovement_playerStepCount = $gameParty.steps();
		if(this._cgmz_eventMovement_customMovement.speed !== "fast") {
			switch(this._cgmz_eventMovement_customMovement.type) {
				case "random": this.CGMZ_EventMovement_moveTypeRandom(); break;
				case "approach": this.CGMZ_EventMovement_moveTypeApproach(); break;
				case "custom": this.CGMZ_EventMovement_moveTypeCustom(); break;
				case "smartapproach": this.CGMZ_EventMovement_moveTypeSmartApproach(); break;
				case "avoid": this.CGMZ_EventMovement_moveTypeAvoid(); break;
				case "smartavoid": this.CGMZ_EventMovement_moveTypeSmartAvoid(); break;
				case "mimic": this.CGMZ_EventMovement_moveTypeMimic(); break;
				case "opposite": this.CGMZ_EventMovement_moveTypeOpposite(); break;
				case "random2": this.CGMZ_EventMovement_moveTypeRandom2();
			}
		} else {
			switch(this._cgmz_eventMovement_customMovement.type) {
				case "random": this.CGMZ_EventMovement_moveTypeRandomFast(); break;
				case "approach": this.CGMZ_EventMovement_moveTypeApproachFast(); break;
				case "custom": this.CGMZ_EventMovement_moveTypeCustom(); break;
				case "smartapproach": this.CGMZ_EventMovement_moveTypeSmartApproachFast(); break;
				case "avoid": this.CGMZ_EventMovement_moveTypeAvoidFast(); break;
				case "smartavoid": this.CGMZ_EventMovement_moveTypeSmartAvoidFast(); break;
				case "mimic": this.CGMZ_EventMovement_moveTypeMimicFast(); break;
				case "opposite": this.CGMZ_EventMovement_moveTypeOppositeFast(); break;
				case "random2": this.CGMZ_EventMovement_moveTypeRandom2Fast();
			}
		}
	}
};
//-----------------------------------------------------------------------------
// Determine if the event should move by on steps
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_shouldMove = function() {
	const currentSteps = $gameParty.steps();
	let neededSteps = currentSteps;
	switch(this._cgmz_eventMovement_customMovement.speed) {
		case "vslow": neededSteps = this._cgmz_eventMovement_playerStepCount + 4; break;
		case "slow": neededSteps = this._cgmz_eventMovement_playerStepCount + 2; break;
		case "normal":
		case "fast": neededSteps = this._cgmz_eventMovement_playerStepCount + 1;
	}
	return (!this.CGMZ_EventMovement_isEventStunned() && currentSteps >= neededSteps);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Random Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeRandom = function() {
	this.moveTypeRandom();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Approach Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeApproach = function() {
	this.moveTypeTowardPlayer();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Custom Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeCustom = function() {
	this.moveTypeCustom();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Smart Approach Move Type - never does not approach
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeSmartApproach = function() {
	this.moveTowardPlayer();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Avoid Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeAvoid = function() {
    if (this.isNearThePlayer()) {
        switch (Math.randomInt(6)) {
            case 0:
            case 1:
            case 2:
            case 3: this.moveAwayFromPlayer(); break;
            case 4: this.moveRandom(); break;
            case 5: this.moveForward(); break;
        }
    } else {
        this.moveRandom();
    }
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Smart Avoid Move Type - never does not move away
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeSmartAvoid = function() {
	this.moveAwayFromPlayer();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Mimic Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeMimic = function() {
	this.setDirection($gamePlayer.direction());
	this.moveForward();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Opposite Move Type
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeOpposite = function() {
	this.setDirection(10 - $gamePlayer.direction());
	this.moveForward();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Random 2 Move Type (only random movements)
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeRandom2 = function() {
	this.moveRandom();
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Random Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeRandomFast = function() {
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	for(let i = 0; i < 2; i++) {
		let route = {code: 0, indent: null};
		switch (Math.randomInt(6)) {
			case 0:
			case 1: route.code = Game_Character.ROUTE_MOVE_RANDOM; break;
			case 2:
			case 3:
			case 4: route.code = Game_Character.ROUTE_MOVE_FORWARD; break;
		}
		moveRoute.list.push(route);
		if(route.code === 0) break;
	}
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Approach Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeApproachFast = function() {
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	for(let i = 0; i < 2; i++) {
		let route = {code: 0, indent: null};
		switch (Math.randomInt(6)) {
			case 0:
			case 1:
			case 2:
			case 3: route.code = Game_Character.ROUTE_MOVE_TOWARD; break;
			case 4: route.code = Game_Character.ROUTE_MOVE_RANDOM; break;
			case 5: route.code = Game_Character.ROUTE_MOVE_FORWARD;
		}
		moveRoute.list.push(route);
	}
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Smart Approach Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeSmartApproachFast = function() {
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	const route = {code: Game_Character.ROUTE_MOVE_TOWARD, indent: null};
	moveRoute.list.push(route);
	moveRoute.list.push(route);
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Random 2 Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeRandom2Fast = function() {
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	const route = {code: Game_Character.ROUTE_MOVE_RANDOM, indent: null};
	moveRoute.list.push(route);
	moveRoute.list.push(route);
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Avoid Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeAvoidFast = function() {
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	for(let i = 0; i < 2; i++) {
		let route = {code: 0, indent: null};
		switch (Math.randomInt(6)) {
			case 0:
			case 1:
			case 2:
			case 3: route.code = Game_Character.ROUTE_MOVE_AWAY; break;
			case 4: route.code = Game_Character.ROUTE_MOVE_RANDOM; break;
			case 5: route.code = Game_Character.ROUTE_MOVE_FORWARD;
		}
		moveRoute.list.push(route);
	}
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Smart Avoid Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeSmartAvoidFast = function() {
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	const route = {code: Game_Character.ROUTE_MOVE_AWAY, indent: null};
	moveRoute.list.push(route);
	moveRoute.list.push(route);
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Mimic Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeMimicFast = function() {
	this.setDirection($gamePlayer.direction());
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	const route = {code: Game_Character.ROUTE_MOVE_FORWARD, indent: null};
	moveRoute.list.push(route);
	moveRoute.list.push(route);
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Handle custom CGMZ Mimic Move Type for Fast speed
//-----------------------------------------------------------------------------
Game_Event.prototype.CGMZ_EventMovement_moveTypeOppositeFast = function() {
	this.setDirection(10 - $gamePlayer.direction());
	let moveRoute = {list: [], repeat: false, wait: false, skippable: true};
	const route = {code: Game_Character.ROUTE_MOVE_FORWARD, indent: null};
	moveRoute.list.push(route);
	moveRoute.list.push(route);
	moveRoute.list.push({code: 0});
	this.forceMoveRoute(moveRoute);
};
//-----------------------------------------------------------------------------
// Turn off moving through a region for events
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_canPass = Game_Event.prototype.canPass;
Game_Event.prototype.canPass = function(x, y, d) {
    const defaultValue = alias_CGMZ_EventMovement_canPass.call(this, x, y, d);
	if(CGMZ.EventMovement.PreventMoveRegion > 0 && !this.isThrough()) {
		const xd = $gameMap.roundXWithDirection(x, d);
		const yd = $gameMap.roundYWithDirection(y, d);
		const regionId = $gameMap.regionId(xd, yd);
		if(regionId === CGMZ.EventMovement.PreventMoveRegion) {
			return false;
		}
	}
	return defaultValue;
};
//=============================================================================
// Game_Player
//-----------------------------------------------------------------------------
// Block player movement by region id
//=============================================================================
//-----------------------------------------------------------------------------
// Turn off moving through a region for player
//-----------------------------------------------------------------------------
const alias_CGMZ_EventMovement_GamePlayer_canPass = Game_Player.prototype.canPass;
Game_Player.prototype.canPass = function(x, y, d) {
    const defaultValue = alias_CGMZ_EventMovement_GamePlayer_canPass.call(this, x, y, d);
	if(CGMZ.EventMovement.PreventPlayerMoveRegion > 0 && !(this.isThrough() || this.isDebugThrough())) {
		const xd = $gameMap.roundXWithDirection(x, d);
		const yd = $gameMap.roundYWithDirection(y, d);
		const regionId = $gameMap.regionId(xd, yd);
		if(regionId === CGMZ.EventMovement.PreventPlayerMoveRegion) {
			return false;
		}
	}
	return defaultValue;
};