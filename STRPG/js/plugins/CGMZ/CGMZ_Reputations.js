/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/reputations/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @orderAfter CGMZ_ToastManager
 * @plugindesc Creates a reputation system for your game
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
 * Description: Creates a reputation system for your game. You can have
 * different categories of reputations (for example, people or towns or
 * factions). Reputations can have multiple levels as well (for example,
 * friendly / exalted) with configurable amounts of reputation needed for
 * each level.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ------------------------------Beta Notes------------------------------------
 * Want additional features not already present? Make suggestions on the
 * Patreon Post or in my discord under the #suggestions channel!
 * https://discord.gg/Gbx7JXP
 * ------------------------------Text Codes------------------------------------
 * This plugin supports text codes (such as \c[x] or \v[x]) in most areas. It
 * also supports automatic word wrap, but you can also add manual line breaks
 * in descriptions.
 *
 * Additionally, the toast messages support some text codes specific to this
 * plugin:
 * %reprank - will be replaced by the current rank of the reputation
 * %repname - will be replaced by the current name of the reputation
 * ----------------------------Color Parameters--------------------------------
 * Colors support either hex format (ex. #ffffff) or rgb format 
 * (ex. rgb(255, 255, 255))
 * -------------------------------JS Info--------------------------------------
 * Some people may want to call the scene using JavaScript. You can do so
 * with the following code:
 * 
 * SceneManager.push(CGMZ_Scene_Reputations);
 * ----------------------------Plugin Commands---------------------------------
 * • Call Scene
 * Calls the reputation scene
 *
 * • Reinitialize
 * This will reset all reputation data as if you had just started a new game.
 * Use for saved game testing.
 *
 * • Discover Reputation
 * This will discover (or undiscover) a given reputation.
 *
 * • Gain Reputation
 * Allows you to add reputation points to a reputation
 *
 * • Lose Reputation
 * Allows you to subtract reputation points from a reputation
 *
 * Set Reputation
 * • Allows you to set reputation points for a reputation
 *
 * Get Reputation
 * • Allows you to store the amount of reputation points in the provided
 * reputation within a game variable.
 *
 * • Change Rep Image
 * Use this to change the picture associated with a rep.
 * 
 * • Change Rep Description
 * Used to change the description associated with a reputation.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is partially compatible with saved games. This means you can:
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change rank params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * 
 * However, the following will not work in saved games:
 * ✘ Change reputation parameters and have changed be reflected in saved games
 * ----------------------------Version History---------------------------------
 * Version 1.0.0 - Initial Release
 *
 * @command callScene
 * @text Call Scene
 * @desc Calls the Reputation scene
 *
 * @command gainRep
 * @text Gain Reputation
 * @desc Adds to the amount of reputation the player has
 *
 * @arg name
 * @text Reputation Name
 * @desc The name of the reputation
 *
 * @arg category
 * @text Reputation Category
 * @desc The name of the category the reputation belongs to
 *
 * @arg amount
 * @type number
 * @text Amount
 * @min 0
 * @desc The amount of reputation to gain
 * @default 0
 *
 * @command loseRep
 * @text Lose Reputation
 * @desc Subtracts from the amount of reputation the player has
 *
 * @arg name
 * @text Reputation Name
 * @desc The name of the reputation
 *
 * @arg category
 * @text Reputation Category
 * @desc The name of the category the reputation belongs to
 *
 * @arg amount
 * @type number
 * @text Amount
 * @min 0
 * @desc The amount of reputation to lose
 * @default 0
 *
 * @command setRep
 * @text Set Reputation
 * @desc Set the amount of reputation the player has to a constant
 *
 * @arg name
 * @text Reputation Name
 * @desc The name of the reputation
 *
 * @arg category
 * @text Reputation Category
 * @desc The name of the category the reputation belongs to
 *
 * @arg amount
 * @type number
 * @text Amount
 * @min 0
 * @desc The amount of reputation the player should have
 * @default 0
 *
 * @command discover
 * @text Discover Reputation
 * @desc Discovers (or undiscovers) a reputation
 *
 * @arg name
 * @text Reputation Name
 * @desc The name of the reputation to discover
 *
 * @arg category
 * @text Reputation Category
 * @desc The name of the category the reputation belongs to
 *
 * @arg discover
 * @type boolean
 * @text Discover
 * @desc Discovers the reputation if true. Undiscovers the reputation if false.
 * @default true
 *
 * @command getRep
 * @text Get Reputation
 * @desc Store amount of reputation the player has in a game variable
 *
 * @arg name
 * @text Reputation Name
 * @desc The name of the reputation
 *
 * @arg category
 * @text Reputation Category
 * @desc The name of the category the reputation belongs to
 *
 * @arg variable
 * @type variable
 * @text Variable
 * @min 0
 * @desc The variable to store the reputation amount in
 * @default 0
 *
 * @command Change Rep Image
 * @desc Change the reputation image
 *
 * @arg Reputation Name
 * @desc The name of the reputation
 *
 * @arg Reputation Category
 * @desc The name of the category the reputation belongs to
 *
 * @arg Image
 * @type file
 * @dir img/pictures
 * @desc The image to use for the reputation (will be resized to fit window if too wide)
 *
 * @command Change Rep Description
 * @desc Change the reputation description
 *
 * @arg Reputation Name
 * @desc The name of the reputation
 *
 * @arg Reputation Category
 * @desc The name of the category the reputation belongs to
 *
 * @arg Description
 * @type note
 * @default ""
 * @desc The description to use for the reputation.
 *
 * @command reinitialize
 * @text Reinitialize
 * @desc Resets all reputation data as if you just started a new game.
 *
 * @param Reputations
 * @type struct<Reputation>[]
 * @default []
 * @desc Set up different reputations here
 *
 * @param Reputation Ranks
 * @type struct<ReputationRank>[]
 * @default []
 * @desc Set up different reputation ranks here
 *
 * @param Reputation Options
 *
 * @param Common Event Rank Up
 * @parent Reputation Options
 * @type number
 * @default 0
 * @min 0
 * @desc Common event to call when a rep ranks up
 *
 * @param Common Event Rank Down
 * @parent Reputation Options
 * @type number
 * @default 0
 * @min 0
 * @desc Common event to call when a rep ranks down
 *
 * @param Reputation Scene Options
 *
 * @param Display Hidden Reputations
 * @parent Reputation Scene Options
 * @type boolean
 * @default true
 * @desc Whether undiscovered reputations are displayed in the reputation scene.
 *
 * @param Show Actor Faces
 * @parent Reputation Scene Options
 * @type boolean
 * @desc Determine if the display window should display actor faces when reputations track actors
 * @default true
 *
 * @param Show Actor Profiles
 * @parent Reputation Scene Options
 * @type boolean
 * @desc Determine if the display window should display actor profiles when reputations track actors
 * @default true
 *
 * @param Display Image Before Description
 * @parent Reputation Scene Options
 * @type boolean
 * @desc Determine if the display window should display a reputation's picture (if exists) before description
 * @default false
 *
 * @param Description Alignment
 * @parent Reputation Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the description text.
 * @default left
 *
 * @param Profile Alignment
 * @parent Reputation Scene Options
 * @type select
 * @option left
 * @option center
 * @option right
 * @desc The alignment of the profile text.
 * @default left
 *
 * @param Default Gauge Color 1
 * @parent Reputation Scene Options
 * @type number
 * @min 0
 * @desc Default color 1 for rep gauges (if not using ranks). This is a text color from windowskin
 * @default 20
 *
 * @param Default Gauge Color 2
 * @parent Reputation Scene Options
 * @type number
 * @min 0
 * @desc Default color 2 for rep gauges (if not using ranks). This is a text color from windowskin
 * @default 21
 *
 * @param Label Color
 * @parent Reputation Scene Options
 * @type number
 * @min 0
 * @desc Color to draw label text in.
 * @default 16
 *
 * @param Scroll Speed
 * @parent Reputation Scene Options
 * @type number
 * @min 0
 * @desc speed at which the display window scrolls (if needed)
 * @default 1
 *
 * @param Scroll Wait
 * @parent Reputation Scene Options
 * @type number
 * @min 0
 * @desc amount of time (in frames) to wait before beginning to scroll
 * @default 300
 *
 * @param Scroll Deceleration
 * @parent Reputation Scene Options
 * @type number
 * @min 0.01
 * @max 0.99
 * @decimals 2
 * @desc Rate of deceleration after letting go of touch
 * @default 0.92
 *
 * @param Auto Scroll
 * @parent Reputation Scene Options
 * @type boolean
 * @desc Determine if the display window should automatically scroll after so long of no user input
 * @default true
 *
 * @param Text Options
 *
 * @param Hidden Reputation Name
 * @parent Text Options
 * @default ???
 * @desc The display name for reputations which are not yet discovered
 *
 * @param Hidden Reputation Text
 * @parent Text Options
 * @default This reputation has not yet been discovered.
 * @desc The text to show in display window for reputations which are not yet discovered
 *
 * @param Rank Label
 * @parent Text Options
 * @default Current Rank:
 * @desc The text label for the player's rank (if reputation has ranks)
 *
 * @param Description Label
 * @parent Text Options
 * @default Description:
 * @desc The text label for the reputation description (leave blank for no label)
 *
 * @param Description Header
 * @parent Text Options
 * @default Description:
 * @desc The text label for the reputation description Header (leave blank for no label)
 *
 * @param Profile Label
 * @parent Text Options
 * @default Profile:
 * @desc The text label for the reputation actor profile (leave blank for no label)
 *
 * @param CGMZ Options
 *
 * @param Reputation Up Toast
 * @parent CGMZ Options
 * @type struct<Toast>
 * @default {"display":"true","Line 1":"\\c[3]Reputation Increased!\\c[0]","Line 2":"%repname: %reprank","Sound Effect":"{\"SE\":\"\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","Width":"0","Use Custom Tone":"false","Tone":"{\"Red\":\"0\",\"Green\":\"0\",\"Blue\":\"0\"}","Style":"Window"}
 * @desc Options for the Reputation Up Toast
 *
 * @param Reputation Down Toast
 * @parent CGMZ Options
 * @type struct<Toast>
 * @default {"display":"true","Line 1":"\\c[2]Reputation Decreased!\\c[0]","Line 2":"%repname: %reprank","Sound Effect":"{\"SE\":\"\",\"volume\":\"90\",\"pitch\":\"100\",\"pan\":\"0\"}","Width":"0","Use Custom Tone":"false","Tone":"{\"Red\":\"0\",\"Green\":\"0\",\"Blue\":\"0\"}","Style":"Window"}
 * @desc Options for the Reputation Down Toast
*/
/*~struct~Reputation:
 * @param name
 * @text Name
 * @type text
 * @desc The name of the reputation. This should be unique for every reputation within a category
 * 
 * @param category
 * @text Category
 * @type text
 * @desc Determine which category this reputation should display under in the reputation scene
 * 
 * @param startingReputation
 * @text Starting Rep
 * @type number
 * @min 0
 * @default 0
 * @desc The amount of reputation the player has at the start of a new game.
 *
 * @param discovered
 * @text Discovered
 * @type boolean
 * @default true
 * @desc Whether the reputation is discovered at the start of the game or not.
 *
 * @param actorId
 * @text Actor ID
 * @type actor
 * @default 0
 * @desc Set this to an actor to have it track actor name changes
 *
 * @param description
 * @text Description
 * @type note
 * @default ""
 * @desc The description to use for the reputation.
 *
 * @param icon
 * @text Icon
 * @type number
 * @default 0
 * @min -1
 * @desc Icon index to use for the reputation. Set to -1 to not use
 *
 * @param color
 * @text Color
 * @type text
 * @default #ffffff
 * @desc rgb or hex values accepted. Hex format: #ffffff RGB format: rgb(255, 255, 255)
 *
 * @param picture
 * @text Picture
 * @type file
 * @dir img/pictures
 * @desc The image to use for the reputation (will be resized to fit window if too wide)
 * 
 * @param maxRep
 * @text Max Rep
 * @type number
 * @min 0
 * @default 0
 * @desc The maximum amount of reputation the player can have if not using ranks (display only).
 *
 * @param ranks
 * @text Ranks
 * @type text[]
 * @default []
 * @desc Enter rank IDs in the order you want the player to progress through the ranks. Leave empty if not using ranks.
 */
/*~struct~ReputationRank:
 * @param id
 * @text ID
 * @type text
 * @desc The ID you want to use to refer to this reputation rank. Case insensitive. MUST be unique.
 *
 * @param name
 * @text Name
 * @type text
 * @desc The name of the reputation rank.
 * 
 * @param reputationAmount
 * @text Reputation Amount
 * @type number
 * @min 1
 * @default 1
 * @desc The amount of reputation before advancing to the next rank.
 *
 * @param icon
 * @text Icon
 * @type number
 * @default 0
 * @min -1
 * @desc Icon index to use for the reputation rank. Set to -1 to not use
 *
 * @param color
 * @text Color
 * @type text
 * @default #ffffff
 * @desc rgb or hex values accepted. Hex format: #ffffff RGB format: rgb(255, 255, 255)
 *
 * @param gaugeColor1
 * @text Gauge Color 1
 * @type number
 * @min 0
 * @desc Default color 1 for rep gauges (if not using ranks). This is a text color from windowskin
 * @default 20
 *
 * @param gaugeColor2
 * @text Gauge Color 2
 * @type number
 * @min 0
 * @desc Default color 2 for rep gauges (if not using ranks). This is a text color from windowskin
 * @default 21
*/
/*~struct~Toast:
 * @param display
 * @type boolean
 * @default true
 * @desc Determines if this toast is displayed
 *
 * @param Line 1
 * @desc Text to show in line 1 of the toast
 *
 * @param Line 2
 * @desc Text to show in line 2 of the toast
 * 
 * @param Sound Effect
 * @type struct<ToastSE>
 * @default {"SE":"","volume":"90","pitch":"100","pan":"0"}
 * @desc Sound effect options for the toast. Set SE name to blank to not use
 *
 * @param Width
 * @type number
 * @default 0
 * @min 0
 * @desc Width of the toast. Set to 0 to use default toast width.
 *
 * @param Use Custom Tone
 * @type boolean
 * @default false
 * @desc Whether or not the tone param is used
 *
 * @param Tone
 * @type struct<Tone>
 * @default {"Red":"0","Green":"0","Blue":"0"}
 * @desc Windowskin tone. Only if using custom tone.
 *
 * @param Style
 * @type select
 * @option Window
 * @option Dim
 * @option Transparent
 * @desc Window background style. Same as Show Text event command.
 * @default Window
*/
/*~struct~ToastSE:
 * @param SE
 * @type file
 * @dir audio/se
 * @desc The sound effect file to play
 *
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @desc Volume of SE
 *
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @desc The pitch of the SE
 *
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @desc The pan of the SE
*/
/*~struct~Tone:
 * @param Red
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of red in the tone
 * @default 0
 *
 * @param Green
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of green in the tone
 * @default 0
 *
 * @param Blue
 * @type number
 * @min -255
 * @max 255
 * @desc Amount of blue in the tone
 * @default 0
*/
var Imported = Imported || {};
Imported.CGMZ_Reputations = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Reputations"] = "Beta";
CGMZ.Reputations = CGMZ.Reputations || {};
CGMZ.Reputations.parameters = PluginManager.parameters('CGMZ_Reputations');
CGMZ.Reputations.Reputations = JSON.parse(CGMZ.Reputations.parameters["Reputations"]);
CGMZ.Reputations.ReputationRanks = JSON.parse(CGMZ.Reputations.parameters["Reputation Ranks"]);
CGMZ.Reputations.HiddenRepDisplayName = CGMZ.Reputations.parameters["Hidden Reputation Name"];
CGMZ.Reputations.HiddenRepText = CGMZ.Reputations.parameters["Hidden Reputation Text"];
CGMZ.Reputations.DisplayHiddenReputations = (CGMZ.Reputations.parameters["Display Hidden Reputations"] === "true");
CGMZ.Reputations.ShowActorFaces = (CGMZ.Reputations.parameters["Show Actor Faces"] === "true");
CGMZ.Reputations.ShowActorProfiles = (CGMZ.Reputations.parameters["Show Actor Profiles"] === "true");
CGMZ.Reputations.DisplayImageBeforeDescription = (CGMZ.Reputations.parameters["Display Image Before Description"] === "true");
CGMZ.Reputations.ScrollSpeed = Number(CGMZ.Reputations.parameters["Scroll Speed"]);
CGMZ.Reputations.ScrollWait = Number(CGMZ.Reputations.parameters["Scroll Wait"]);
CGMZ.Reputations.ScrollDeceleration = parseFloat(CGMZ.Reputations.parameters["Scroll Deceleration"]);
CGMZ.Reputations.AutoScroll = (CGMZ.Reputations.parameters["Auto Scroll"] === "true");
CGMZ.Reputations.RankLabel = CGMZ.Reputations.parameters["Rank Label"];
CGMZ.Reputations.DescriptionLabel = CGMZ.Reputations.parameters["Description Label"];
CGMZ.Reputations.DescriptionHeader = CGMZ.Reputations.parameters["Description Header"];
CGMZ.Reputations.ProfileLabel = CGMZ.Reputations.parameters["Profile Label"];
CGMZ.Reputations.LabelColor = Number(CGMZ.Reputations.parameters["Label Color"]);
CGMZ.Reputations.GaugeColor1 = Number(CGMZ.Reputations.parameters["Default Gauge Color 1"]);
CGMZ.Reputations.GaugeColor2 = Number(CGMZ.Reputations.parameters["Default Gauge Color 2"]);
CGMZ.Reputations.DescriptionAlignment = CGMZ.Reputations.parameters["Description Alignment"];
CGMZ.Reputations.ProfileAlignment = CGMZ.Reputations.parameters["Profile Alignment"];
CGMZ.Reputations.CommonEventRankUp = Number(CGMZ.Reputations.parameters["Common Event Rank Up"]);
CGMZ.Reputations.CommonEventRankDown = Number(CGMZ.Reputations.parameters["Common Event Rank Down"]);
CGMZ.Reputations.RepUpToastOpts = JSON.parse(CGMZ.Reputations.parameters["Reputation Up Toast"]);
CGMZ.Reputations.RepDownToastOpts = JSON.parse(CGMZ.Reputations.parameters["Reputation Down Toast"]);
//=============================================================================
// CGMZ_Reputation
//-----------------------------------------------------------------------------
// Handles a single reputation's data
//=============================================================================
function CGMZ_Reputation() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Reputation
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.initialize = function(reputation) {
	this._discovered = (reputation.discovered === 'true');
	this._reputation = Number(reputation.startingReputation);
	this._name = reputation.name;
	this._category = reputation.category;
	this._actorId = Number(reputation.actorId);
	this._iconIndex = Number(reputation.icon);
	this._color = reputation.color;
	this._picture = reputation.picture;
	this._description = JSON.parse(reputation.description);
	this._maxRep = Number(reputation.maxRep);
	this._ranks = JSON.parse(reputation.ranks);
};
//-----------------------------------------------------------------------------
// Check if reputation is discovered
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.isDiscovered = function() {
	return this._discovered;
};
//-----------------------------------------------------------------------------
// Get amount of rep earned in the reputation
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.repAmount = function() {
	return this._reputation;
};
//-----------------------------------------------------------------------------
// Get the display name to use for the reputation
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.getDisplayName = function() {
	if(!this._discovered) {
		return CGMZ.Reputations.HiddenRepDisplayName;
	}
	if(this._actorId) {
		const actor = $gameActors.actor(this._actorId);
		if(actor) return actor.name();
	}
	return this._name;
};
//-----------------------------------------------------------------------------
// Changed discovery status
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.changeDiscoveredStatus = function(discovered) {
	this._discovered = discovered;
};
//-----------------------------------------------------------------------------
// Set the description to something different
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.setDescription = function(description) {
	this._description = description;
};
//-----------------------------------------------------------------------------
// Set the picture to something different
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.setPicture = function(picture) {
	this._picture = picture;
};
//-----------------------------------------------------------------------------
// Change reputation
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.changeRep = function(mode, amount) {
	const rank = this.calculateRankId();
	switch(mode) {
		case '=':  this._reputation = amount; break;
		case '+': this._reputation += amount; break;
		case '-': this._reputation -= amount; break;
		default:
			const script = "CGMZ Reputations";
			const error = "Malformed 'Change Reputation' command received";
			const suggestion = "Check for proper plugin command usage in events";
			$cgmzTemp.reportError(error, script, suggestion);
	}
	if(this._reputation < 0) this._reputation = 0;
	const newRank = this.calculateRankId();
	if(rank !== newRank) {
		rank < newRank ? this.onRankUp(newRank) : this.onRankDown(newRank);
	}
};
//-----------------------------------------------------------------------------
// Get Rank ID
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.calculateRankId = function() {
	if(this._ranks.length === 0) return 0;
	let rankId = 0;
	let repAmount = this.repAmount();
	for(let i = 0; i < this._ranks.length; i++) {
		rankId = i;
		const rankObject = $cgmzTemp.getReputationRank(this._ranks[rankId]);
		const rankAmount = rankObject._repAmount;
		if(rankAmount > repAmount) {
			return rankId;
		}
		repAmount -= rankAmount;
	}
	return this._ranks.length - 1;
};
//-----------------------------------------------------------------------------
// Handling for reputation rank down
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.onRankDown = function(rankId) {
	this.setupToast($cgmzTemp._repDownToastOpts, rankId);
	if(CGMZ.Reputations.CommonEventRankDown) {
		$gameTemp.reserveCommonEvent(CGMZ.Reputations.CommonEventRankDown);
	}
};
//-----------------------------------------------------------------------------
// Handling for reputation rank up
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.onRankUp = function(rankId) {
	this.setupToast($cgmzTemp._repUpToastOpts, rankId);
	if(CGMZ.Reputations.CommonEventRankUp) {
		$gameTemp.reserveCommonEvent(CGMZ.Reputations.CommonEventRankUp);
	}
};
//-----------------------------------------------------------------------------
// Handling for reputation rank up
//-----------------------------------------------------------------------------
CGMZ_Reputation.prototype.setupToast = function(toastOpts, rankId) {
	if(!toastOpts.display) return;
	const toast = {};
	toast.CGMZReputationToast = true;
	toast.CGMZRepOptions = {rankId: this._ranks[rankId], repName: this.getDisplayName()};
	if(toastOpts.hasOwnProperty('width')) toast.width = toastOpts.width;
	if(toastOpts.hasOwnProperty('windowskinTone')) toast.windowskinTone = toastOpts.windowskinTone;
	if(toastOpts.hasOwnProperty('SE')) toast.SE = toastOpts.SE;
	toast.backgroundStyle = toastOpts.backgroundStyle;
	toast.lineOne = toastOpts.lineOne;
	toast.lineTwo = toastOpts.lineTwo;
	$cgmzTemp.createNewToast(toast);
};
//=============================================================================
// CGMZ_ReputationRank
//-----------------------------------------------------------------------------
// Handles a single reputation rank. Not saved in save data.
//=============================================================================
function CGMZ_ReputationRank() {
    this.initialize.apply(this, arguments);
}
//-----------------------------------------------------------------------------
// Initialize Reputation Rank
//-----------------------------------------------------------------------------
CGMZ_ReputationRank.prototype.initialize = function(rank) {
	this._name = rank.name;
	this._repAmount = Number(rank.reputationAmount);
	this._iconIndex = Number(rank.icon);
	this._color = rank.color;
	this._gaugeColor1 = Number(rank.gaugeColor1);
	this._gaugeColor2 = Number(rank.gaugeColor2);
};
//=============================================================================
// CGMZ_Core
//-----------------------------------------------------------------------------
// Manage reputation data
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize reputation data
//-----------------------------------------------------------------------------
const alias_CGMZ_Reputations_createPluginData = CGMZ_Core.prototype.createPluginData;
CGMZ_Core.prototype.createPluginData = function() {
	alias_CGMZ_Reputations_createPluginData.call(this);
	this.initializeReputationData(false);
};
//-----------------------------------------------------------------------------
// Alias. Also check for new reputations after load
//-----------------------------------------------------------------------------
const alias_CGMZ_Reputations_onAfterLoad = CGMZ_Core.prototype.onAfterLoad;
CGMZ_Core.prototype.onAfterLoad = function() {
	alias_CGMZ_Reputations_onAfterLoad.call(this);
	this.initializeReputationData(false);
};
//-----------------------------------------------------------------------------
// Initialize reputation data. Will only add new data if reinitialize is false
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeReputationData = function(reinitialize) {
	if(!this._reputations || reinitialize) {
		this.initializeReputationVariables();
	}
	for(let i = 0; i < CGMZ.Reputations.Reputations.length; i++) {
		let parseData = JSON.parse(CGMZ.Reputations.Reputations[i]);
		let rep = new CGMZ_Reputation(parseData);
		let id = this.getReputationIdFromJSON(parseData);
		if(!this._reputations[id]) {
			this._reputations[id] = rep;
			this.addReputationCategory(rep);
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize reputation variables
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.initializeReputationVariables = function() {
	this._reputations = {};
	this._reputationCategories = [];
};
//-----------------------------------------------------------------------------
// Add a reputation category if does not already exist
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.addReputationCategory = function(reputation) {
	if(reputation._category && !this._reputationCategories.includes(reputation._category)) {
		this._reputationCategories.push(reputation._category);
	}
};
//-----------------------------------------------------------------------------
// Get reputation ID from JSON data
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getReputationIdFromJSON = function(parseData) {
	return parseData.name.toLowerCase() + "-" + parseData.category.toLowerCase();
};
//-----------------------------------------------------------------------------
// Get reputation ID directly.
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getReputationId = function(name, category) {
	return name.toLowerCase() + "-" + category.toLowerCase();
};
//-----------------------------------------------------------------------------
// Get reputation by id. Returns undefined if not found
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getReputation = function(name, category) {
	const repId = this.getReputationId(name, category);
	return this._reputations[repId];
};
//-----------------------------------------------------------------------------
// Alters the discovered property of a reputation
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.discoverReputation = function(name, category, discovered) {
	let reputation = this.getReputation(name, category);
	if(reputation) {
		discovered = (discovered === "true");
		reputation.changeDiscoveredStatus(discovered);
	}
};
//-----------------------------------------------------------------------------
// Gain/Lose rep for reputation
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.changeReputationAmount = function(name, category, mode, amount) {
	let reputation = this.getReputation(name, category);
	if(reputation) {
		reputation.changeRep(mode, amount);
	}
};
//-----------------------------------------------------------------------------
// Get reputation categories
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getReputationCategories = function() {
	return this._reputationCategories;
};
//-----------------------------------------------------------------------------
// Get all reputations
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllReputations = function() {
	return Object.values(this._reputations);
};
//-----------------------------------------------------------------------------
// Get all reputations in a category
//-----------------------------------------------------------------------------
CGMZ_Core.prototype.getAllReputationsByCategory = function(category) {
	const repArray = this.getAllReputations();
	return repArray.filter(reputation => reputation._category.toLowerCase() === category);
};
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Manage reputation rank data + new plugin commands
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also initialize reputation rank data
//-----------------------------------------------------------------------------
const alias_CGMZ_Reputations_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_Reputations_CGMZTemp_createPluginData.call(this);
	this.initializeReputationRankData();
	this._repUpToastOpts = this.initializeReputationToasts(CGMZ.Reputations.RepUpToastOpts);
	this._repDownToastOpts = this.initializeReputationToasts(CGMZ.Reputations.RepDownToastOpts);
};
//-----------------------------------------------------------------------------
// Initialize reputation rank data
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeReputationRankData = function() {
	this._reputationRanks = {};
	for(let i = 0; i < CGMZ.Reputations.ReputationRanks.length; i++) {
		parseData = JSON.parse(CGMZ.Reputations.ReputationRanks[i]);
		let rank = new CGMZ_ReputationRank(parseData);
		let id = parseData.id.toLowerCase();
		if(!this._reputationRanks[id]) {
			this._reputationRanks[id] = rank;
		}
	}
};
//-----------------------------------------------------------------------------
// Initialize reputation toasts
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.initializeReputationToasts = function(json) {
	const toast = {};
	toast.display = (json["display"] === 'true' && Imported.CGMZ_ToastManager);
	if(!toast.display) return toast;
	toast.lineOne = json["Line 1"];
	toast.lineTwo = json["Line 2"];
	toast.backgroundStyle = json["Style"];
	const seOpts = JSON.parse(json["Sound Effect"]);
	if(seOpts.SE) toast.SE = {name: seOpts.SE, pan: seOpts.pan, pitch: seOpts.pitch, volume: seOpts.volume};
	if(json["Use Custom Tone"] === 'true') toast.windowskinTone = json.Tone;
	if(json["Width"] !== "0") toast.width = Number(json["Width"]);
	return toast;
};
//-----------------------------------------------------------------------------
// Get a reputation rank
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.getReputationRank = function(id) {
	return this._reputationRanks[id.toLowerCase()];
};
//-----------------------------------------------------------------------------
// Alias. Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Reputations_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Reputations_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Reputations", "callScene", this.pluginCommandReputationsCallScene);
	PluginManager.registerCommand("CGMZ_Reputations", "reinitialize", this.pluginCommandReputationsReinitialize);
	PluginManager.registerCommand("CGMZ_Reputations", "discover", this.pluginCommandReputationsDiscover);
	PluginManager.registerCommand("CGMZ_Reputations", "gainRep", this.pluginCommandReputationsGainRep);
	PluginManager.registerCommand("CGMZ_Reputations", "loseRep", this.pluginCommandReputationsLoseRep);
	PluginManager.registerCommand("CGMZ_Reputations", "setRep", this.pluginCommandReputationsSetRep);
	PluginManager.registerCommand("CGMZ_Reputations", "getRep", this.pluginCommandReputationsGetRep);
	PluginManager.registerCommand("CGMZ_Reputations", "Change Rep Image", this.pluginCommandReputationsChangeRepImage);
	PluginManager.registerCommand("CGMZ_Reputations", "Change Rep Description", this.pluginCommandReputationsChangeRepDesc);
};
//-----------------------------------------------------------------------------
// Call reputation scene
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsCallScene = function() {
	SceneManager.push(CGMZ_Scene_Reputations);
};
//-----------------------------------------------------------------------------
// Reinitialize reputations
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsReinitialize = function() {
	$cgmz.initializeReputationData(true);
};
//-----------------------------------------------------------------------------
// (Un)discover a reputation
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsDiscover = function(args) {
	const reputation = $cgmz.getReputation(args.name, args.category);
	if(reputation) {
		reputation.changeDiscoveredStatus(args.discover === "true");
	}
};
//-----------------------------------------------------------------------------
// Gain reputation
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsGainRep = function(args) {
	const reputation = $cgmz.getReputation(args.name, args.category);
	if(reputation) {
		reputation.changeRep("+", Number(args.amount));
	}
};
//-----------------------------------------------------------------------------
// Lose reputation
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsLoseRep = function(args) {
	const reputation = $cgmz.getReputation(args.name, args.category);
	if(reputation) {
		reputation.changeRep("-", Number(args.amount));
	}
};
//-----------------------------------------------------------------------------
// Set reputation
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsSetRep = function(args) {
	const reputation = $cgmz.getReputation(args.name, args.category);
	if(reputation) {
		reputation.changeRep("=", Number(args.amount));
	}
};
//-----------------------------------------------------------------------------
// Get reputation amount, store it in game variable
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsGetRep = function(args) {
	const reputation = $cgmz.getReputation(args.name, args.category);
	if(reputation) {
		$gameVariables.setValue(Number(args.variable), reputation._reputation);
	}
};
//-----------------------------------------------------------------------------
// Changes a reputation's image
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsChangeRepImage = function(args) {
	const reputation = $cgmz.getReputation(args["Reputation Name"], args["Reputation Category"]);
	if(reputation) {
		reputation.setPicture(args.Image);
	}
};
//-----------------------------------------------------------------------------
// Changes a reputation's description
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandReputationsChangeRepDesc = function(args) {
	const reputation = $cgmz.getReputation(args["Reputation Name"], args["Reputation Category"]);
	if(reputation) {
		reputation.setDescription(JSON.parse(args.Description));
	}
};
//=============================================================================
// CGMZ_Scene_Reputations
//-----------------------------------------------------------------------------
// Handle the reputations scene
//=============================================================================
function CGMZ_Scene_Reputations() {
    this.initialize.apply(this, arguments);
}
CGMZ_Scene_Reputations.prototype = Object.create(Scene_MenuBase.prototype);
CGMZ_Scene_Reputations.prototype.constructor = CGMZ_Scene_Reputations;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};
//-----------------------------------------------------------------------------
// Create reputation windows
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._hasCategories = $cgmz.getReputationCategories().length > 0;
	if(this._hasCategories) {
		this.createCategoryWindow();
	}
	this.createListWindow();
	this.createDisplayWindow();
	if(this._hasCategories) {
		this._categoryWindow.setListWindow(this._listWindow);
		this.createDummyWindow();
		this._displayWindow.hide();
	}
};
//-----------------------------------------------------------------------------
// Create category window
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.createCategoryWindow = function() {
	const rect = this.categoryWindowRect();
    this._categoryWindow = new CGMZ_Window_ReputationCategory(rect);
	this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
	this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
    this.addWindow(this._categoryWindow);
};
//-----------------------------------------------------------------------------
// Get category window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.categoryWindowRect = function() {
	const x = 0;
	const y = this.buttonAreaBottom();
	const width = Graphics.boxWidth;
	const height = this.calcWindowHeight(1, true);
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create list window
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.createListWindow = function() {
	const rect = this.listWindowRect();
    this._listWindow = new CGMZ_Window_ReputationList(rect);
	this._listWindow.setHandler('cancel', (this._hasCategories) ? this.onListCancel.bind(this) : this.popScene.bind(this));
	this._listWindow.setHandler('ok', this.onListOk.bind(this));
    this.addWindow(this._listWindow);
};
//-----------------------------------------------------------------------------
// Get list window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.listWindowRect = function() {
	const x = 0;
	const y = (this._hasCategories) ? this._categoryWindow.y + this._categoryWindow.height : this.buttonAreaBottom();
	const width = Graphics.boxWidth / 3;
	const height = Graphics.boxHeight - y;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.createDisplayWindow = function() {
	const rect = this.displayWindowRect()
    this._displayWindow = new CGMZ_Window_ReputationDisplay(rect);
	this._displayWindow.setHandler('cancel', this.onDisplayCancel.bind(this));
	this._listWindow.setDisplayWindow(this._displayWindow);
    this.addWindow(this._displayWindow);
};
//-----------------------------------------------------------------------------
// Get display window rect
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.displayWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = this._listWindow.height;
	return new Rectangle(x, y, width, height);
};
//-----------------------------------------------------------------------------
// Create dummy window
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.createDummyWindow = function() {
	const rect = this.displayWindowRect()
    this._dummyWindow = new Window_Base(rect);
    this.addWindow(this._dummyWindow);
};
//-----------------------------------------------------------------------------
// On Display Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.onDisplayCancel = function() {
	this._listWindow.activate();
};
//-----------------------------------------------------------------------------
// On List Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.onListOk = function() {
	this._displayWindow.activate();
	this._listWindow.deactivate();
};
//-----------------------------------------------------------------------------
// On List Cancel
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.onListCancel = function() {
	this._listWindow.select(0);
	this._listWindow.deselect();
	this._listWindow.deactivate();
	this._categoryWindow.activate();
	this._displayWindow.hide();
	this._dummyWindow.show();
};
//-----------------------------------------------------------------------------
// On Category Ok
//-----------------------------------------------------------------------------
CGMZ_Scene_Reputations.prototype.onCategoryOk = function() {
	this._categoryWindow.deactivate();
	this._listWindow.activate();
	this._listWindow.select(0);
	this._displayWindow.show();
	this._dummyWindow.hide();
	this._displayWindow.deactivate();
};
//=============================================================================
// CGMZ_Window_ReputationCategory
//-----------------------------------------------------------------------------
// Command window for choosing a category for reputations
//=============================================================================
function CGMZ_Window_ReputationCategory(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ReputationCategory.prototype = Object.create(Window_HorzCommand.prototype);
CGMZ_Window_ReputationCategory.prototype.constructor = CGMZ_Window_ReputationCategory;
//-----------------------------------------------------------------------------
// Window Width
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationCategory.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};
//-----------------------------------------------------------------------------
// Get max cols (if less than 4)
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationCategory.prototype.maxCols = function() {
	let cols = $cgmz.getReputationCategories().length;
    return Math.min(4, cols);
};
//-----------------------------------------------------------------------------
// Make list of commands to display
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationCategory.prototype.makeCommandList = function() {
	let categories = $cgmz.getReputationCategories();
	for(let i = 0; i < categories.length; i++) {
		this.addCommand(categories[i], categories[i].toLowerCase(), true);
	}
};
//-----------------------------------------------------------------------------
// Set list (helper) window
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationCategory.prototype.setListWindow = function(listWindow) {
	this._listWindow = listWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationCategory.prototype.callUpdateHelp = function() {
	if(this.active) {
		this.updateHelperWindows();
	}
};
//-----------------------------------------------------------------------------
// See if able to update helper windows
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationCategory.prototype.updateHelperWindows = function() {
	if(this._listWindow) {
		this._listWindow.setItem(this.currentData());
	}
};
//=============================================================================
// CGMZ_Window_ReputationList
//-----------------------------------------------------------------------------
// Selectable window for choosing a reputation in a list.
//=============================================================================
function CGMZ_Window_ReputationList(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ReputationList.prototype = Object.create(Window_Selectable.prototype);
CGMZ_Window_ReputationList.prototype.constructor = CGMZ_Window_ReputationList;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};
//-----------------------------------------------------------------------------
// Max items
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};
//-----------------------------------------------------------------------------
// Current item
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.item = function() {
    return this._data[this.index()];
};
//-----------------------------------------------------------------------------
// Set Item
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.setItem = function(data) {
	if(this._symbol !== data.symbol) {
		this._symbol = data.symbol;
		this.refresh();
	}
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};
//-----------------------------------------------------------------------------
// Make item list
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.makeItemList = function() {
	if(this._symbol) {
		this._data = $cgmz.getAllReputationsByCategory(this._symbol);
	} else {
		this._data = $cgmz.getAllReputations();
	}
	if(!CGMZ.Reputations.DisplayHiddenReputations) {
		this._data = this._data.filter(rep => rep._discovered);
	}
};
//-----------------------------------------------------------------------------
// Draw item in list
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.drawItem = function(index) {
    let item = this._data[index];
    let rect = this.itemRectWithPadding(index);
	this.changeTextColor(item._color);
	let iconBoxWidth = 0;
	if(item._iconIndex >= 0) {
		this.drawIcon(item._iconIndex, rect.x, rect.y + 4);
		iconBoxWidth = ImageManager.iconWidth + 4;
	}
    this.drawText(item.getDisplayName(), rect.x + iconBoxWidth, rect.y, rect.width, 'left');
	this.changeTextColor(ColorManager.normalColor());
};
//-----------------------------------------------------------------------------
// Set display window
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.setDisplayWindow = function(displayWindow) {
    this._displayWindow = displayWindow;
    this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// See if can update display window
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationList.prototype.callUpdateHelp = function() {
    if(this.active && this._displayWindow) {
		this._displayWindow.setItem(this.item());
	}
};
//=============================================================================
// CGMZ_Window_ReputationDisplay
//-----------------------------------------------------------------------------
// Window displaying reputation information
//=============================================================================
function CGMZ_Window_ReputationDisplay(rect) {
    this.initialize.apply(this, arguments);
}
CGMZ_Window_ReputationDisplay.prototype = Object.create(CGMZ_Window_Scrollable.prototype);
CGMZ_Window_ReputationDisplay.prototype.constructor = CGMZ_Window_ReputationDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.initialize = function(rect) {
	const heightMultiplier = 5; // maximum of 5 windows tall of data to scroll
    CGMZ_Window_Scrollable.prototype.initialize.call(this, rect, heightMultiplier, CGMZ.Reputations.ScrollWait, CGMZ.Reputations.ScrollSpeed, CGMZ.Reputations.AutoScroll, CGMZ.Reputations.ScrollDeceleration);
	this._reputation = null;
	this._iconBitmap = ImageManager.loadSystem("IconSet");
	this._pictureSprite = new Sprite();
	this.addInnerChild(this._pictureSprite);
};
//-----------------------------------------------------------------------------
// Set the reputation to be displayed
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.setItem = function(reputation) {
	if(this._reputation === reputation) return;
	this._reputation = reputation;
	this.requestRefresh();
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.refresh = function() {
	if(!this._reputation) return;
	this.setupWindowForNewEntry();
	this._neededHeight = 0;
	this._pictureSprite.hide();
	(this._reputation.isDiscovered()) ? this.drawDiscoveredReputation(this._reputation) : this.drawUndiscoveredReputation();
};
//-----------------------------------------------------------------------------
// Draw an undiscovered reputation
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.drawUndiscoveredReputation = function() {
	this.drawText(CGMZ.Reputations.HiddenRepText, 0, 0, this.contents.width, 'center');
	this._neededHeight = this.lineHeight();
};
//-----------------------------------------------------------------------------
// Draw a discovered reputation
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.drawDiscoveredReputation = function(reputation) {
	this.drawReputationName(reputation.getDisplayName());
	let y = this.drawReputationProgress(reputation);
	if(!CGMZ.Reputations.DisplayImageBeforeDescription) {
		y += this.drawReputationDescription(reputation, 0, y);
	}
	this.drawReputationPicture(reputation, y);
	this._neededHeight += y;
};
//-----------------------------------------------------------------------------
// Draw name of reputation
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.drawReputationName = function(name) {
	this.contents.fontBold = true;
	this.drawText(name, 0, 0, this.contents.width, 'center');
	this.contents.fontBold = false;
};
//-----------------------------------------------------------------------------
// Draw reputation rank and progress bar
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.drawReputationProgress = function(reputation) {
	let y = this.lineHeight();
	let x  = 0;
	let drawingFace = false;
	if(reputation._actorId && CGMZ.Reputations.ShowActorFaces) {
		drawingFace = true;
		const actor = $gameActors.actor(reputation._actorId);
		this._faceBitmap = ImageManager.loadFace(actor.faceName());
		this._faceBitmap.addLoadListener(this.drawFace.bind(this, actor.faceName(), actor.faceIndex(), x, y, ImageManager.faceWidth, ImageManager.faceHeight));
		x += ImageManager.faceWidth + 4;
		y += (ImageManager.faceHeight / 2) - this.lineHeight();
	}
	let progress = this.getDisplayInfo(reputation);
	let gaugeColor1 = ColorManager.textColor(CGMZ.Reputations.GaugeColor1);
	let gaugeColor2 = ColorManager.textColor(CGMZ.Reputations.GaugeColor2);
	if(progress.rankId) {
		const rank = $cgmzTemp.getReputationRank(progress.rankId);
		this.drawLabel(CGMZ.Reputations.RankLabel, x, y);
		let x2 = x + this.textWidth(CGMZ.Reputations.RankLabel);
		if(rank._iconIndex >= 0) {
			this.drawIcon(rank._iconIndex, x2, y + 4);
			x2 += 4 + ImageManager.iconWidth;
		}
		this.changeTextColor(rank._color);
		this.drawText(rank._name, x2, y, this.contents.width - x2, 'left');
		this.changeTextColor(ColorManager.normalColor());
		gaugeColor1 = ColorManager.textColor(rank._gaugeColor1);
		gaugeColor2 = ColorManager.textColor(rank._gaugeColor2);
		y += this.lineHeight();
	}
	const gaugeHeight = 24;
	y += gaugeHeight / 2;
	const gaugeRect = new Rectangle(x, y, this.contents.width - x, gaugeHeight);
	this.CGMZ_drawGauge(gaugeRect, progress.numerator / progress.denominator, gaugeColor1, gaugeColor2);
	const gaugeText = progress.numerator.toLocaleString() + "/" + progress.denominator.toLocaleString();
	this.drawText(gaugeText, x, y - gaugeHeight / 4, this.contents.width-x, 'center');
	y += gaugeHeight;
	y = Math.max(y, (this.lineHeight() + ImageManager.faceHeight) * drawingFace);
	return y;
};
//-----------------------------------------------------------------------------
// Draw reputation description
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.drawReputationDescription = function(reputation, x, y) {
	const width = this.contents.width - x;
	let xOffset = 0;
	let drawingHeight = 0;
	if(reputation._actorId && CGMZ.Reputations.ShowActorProfiles) {
		const actor = $gameActors.actor(reputation._actorId);
		const profile = actor.profile().replace(/\n/, " ");
		this.drawLabel(CGMZ.Reputations.ProfileLabel, x, y);
		xOffset = this.textWidth(CGMZ.Reputations.ProfileLabel);
		drawingHeight = this.CGMZ_drawText(profile, x, xOffset, y, width, CGMZ.Reputations.ProfileAlignment);
	}
	
	this.CGMZ_drawHeader(CGMZ.Reputations.DescriptionHeader, y + 1.5*drawingHeight);
	drawingHeight += this.lineHeight();
	
	this.drawLabel(CGMZ.Reputations.DescriptionLabel, x, y + drawingHeight);
	xOffset = this.textWidth(CGMZ.Reputations.DescriptionLabel);
	drawingHeight += this.CGMZ_drawText(reputation._description, x, xOffset, y + drawingHeight, width, CGMZ.Reputations.DescriptionAlignment);
	return drawingHeight;
};
//-----------------------------------------------------------------------------
// Draw reputation image
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.drawReputationPicture = function(reputation, y) {
	this._pictureSprite.hide();
	if(reputation._picture) {
		this._pictureSprite.bitmap = ImageManager.loadPicture(reputation._picture);
		this._pictureSprite.bitmap.addLoadListener(this.displayPictureBitmapOnLoad.bind(this, y, reputation));
	}
};
//-----------------------------------------------------------------------------
// Display reputation picture bitmap image after load
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.displayPictureBitmapOnLoad = function(y, reputation) {
	y += 6 * CGMZ.Reputations.DisplayImageBeforeDescription;
	this._pictureSprite.y = y;
	let scale = 1;
	if(this._pictureSprite.width > this.contents.width) {
		scale = this.contents.width/this._pictureSprite.width;
	}
	this._pictureSprite.scale.x = scale;
	this._pictureSprite.scale.y = scale;
	this._pictureSprite.x = (this.contents.width - this._pictureSprite.width * scale) / 2;
	this._pictureSprite.show();
	this._neededHeight += this._pictureSprite.height * scale + 6 * CGMZ.Reputations.DisplayImageBeforeDescription;
	if(CGMZ.Reputations.DisplayImageBeforeDescription) {
		const y2 = this.drawReputationDescription(reputation, 0, y + this._pictureSprite.height * scale);
		this._neededHeight += y2;
	}
	this.checkForScroll();
};
//-----------------------------------------------------------------------------
// Get reputation's display info (current rank + current amount into rank)
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.getDisplayInfo = function(rep) {
	let repAmount = rep.repAmount();
	if(rep._ranks.length === 0) {
		if(repAmount > rep._maxRep) {
			repAmount = rep._maxRep;
		}
		return {rankId: null, numerator: repAmount, denominator: rep._maxRep};
	}
	for(let i = 0; i < rep._ranks.length; i++) {
		let rankId = rep._ranks[i];
		let rankObject = $cgmzTemp.getReputationRank(rankId);
		let rankAmount = rankObject._repAmount;
		if(rankAmount > repAmount) {
			return {rankId: rankId, numerator: repAmount, denominator: rankAmount};
		}
		repAmount -= rankAmount;
	}
	let maxRankId = rep._ranks[rep._ranks.length - 1];
	let maxRankObject = $cgmzTemp.getReputationRank(maxRankId);
	return {rankId: maxRankId, numerator: maxRankObject._repAmount, denominator: maxRankObject._repAmount};
};
//-----------------------------------------------------------------------------
// Draws a text label
//-----------------------------------------------------------------------------
CGMZ_Window_ReputationDisplay.prototype.drawLabel = function(label, x, y) {
	this.changeTextColor(ColorManager.textColor(CGMZ.Reputations.LabelColor));
	this.drawText(label, x, y, this.contents.width - x, 'left');
	this.changeTextColor(ColorManager.normalColor());
};
//=============================================================================
// CGMZ_Window_Toast
//-----------------------------------------------------------------------------
// Handle CGMZ Reputation Toasts
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Processing for custom toasts.
//-----------------------------------------------------------------------------
if(Imported.CGMZ_ToastManager) {
const alias_CGMZ_Reputations_processCustomToast = CGMZ_Window_Toast.prototype.processCustomToast;
CGMZ_Window_Toast.prototype.processCustomToast = function(toastObject) {
	alias_CGMZ_Reputations_processCustomToast.call(this, toastObject);
	if(toastObject.hasOwnProperty('CGMZReputationToast')) {
		const line1 = toastObject.lineOne.replace(/%repname/g, toastObject.CGMZRepOptions.repName).replace(/%reprank/g, $cgmzTemp.getReputationRank(toastObject.CGMZRepOptions.rankId)._name);
		const line2 = toastObject.lineTwo.replace(/%repname/g, toastObject.CGMZRepOptions.repName).replace(/%reprank/g, $cgmzTemp.getReputationRank(toastObject.CGMZRepOptions.rankId)._name);
		this.CGMZ_drawTextLine(line1, 0, 0, this.contents.width, 'center');
		this.CGMZ_drawTextLine(line2, 0, this.lineHeight(), this.contents.width, 'center');
	}
};
}