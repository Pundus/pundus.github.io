/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/screenshots/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Allows you to take screenshots within the game
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Description: Lets you take screenshots within the game. Screenshots can
 * capture the game screen and be saved directly to computer or prompted to
 * save at the user's choice location.
 * ----------------------------------------------------------------------------
 * Documentation:
 * The Screenshots folder will automatically be created if it does not exist.
 * For web-hosted games, the game will prompt the user to download the
 * screenshot.
 * ----------------------Background Color Parameter----------------------------
 * By default, some things rendered by the engine are somewhat transparent.
 * Also by default, the HTML of the page has a background color of black. This
 * bg color is not captured by the screenshot as the screenshot captures only
 * what is rendered by the engine. You can add this bg color back in using the
 * background color parameter. If you're not sure, it is suggested to leave it
 * as "black". Set to blank if you want to preserve the transparency.
 * -------------------------Plugin Commands------------------------------------
 * The following plugin commands are supported:
 * 
 * • Take Screenshot
 * Takes a screenshot as if the player had pressed the Print Screen key. Also
 * has an optional parameter to name the screenshot. If no filename is
 * provided, it will be the default timestampe filename.
 * Note: The filename should not contain spaces.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Screenshots.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.0 - Initial Release
 *
 * Version 1.0.1:
 * - Removed Filesystem Functions (moved to CGMZ Core 1.7.0+)
 *
 * Version 1.0.2:
 * - Added option to name screenshot filename differently
 * - Added Spanish Language support
 *
 * @command Take Screenshot
 * @desc Takes a screenshot of the current game screen
 *
 * @arg Filename
 * @desc The filename to save the screenshot as. Leave blank to use timestamp as filename
 *
 * @param Automatic Screenshot
 * @type boolean
 * @default true
 * @desc Automatically takes a screenshot of the screen when pressing Print Screen.
 *
 * @param Screenshot Folder
 * @default screenshots
 * @desc The folder (from game project folder root) to save screenshots. Will be created automatically
 *
 * @param Background Color
 * @default black
 * @desc Background color of the screenshot. See documentation.
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/screenshots/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Te permite tomar capturas de pantalla dentro del juego
 * @help
 * ============================================================================
 * Para términos y condiciones de uso de este pluging en tu juego, por favor
 * visita:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * ¡Conviértete en un Patrocinador para obtener acceso a los plugings beta y
 * alfa, ademas de otras cosas geniales!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Versión: 1.0.2
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.6.0
 * ----------------------------------------------------------------------------
 * Descripción: Te permite tomar capturas de pantalla dentro del juego. Las 
 * capturas de pantalla pueden capturar la pantalla del juego y guardarla 
 * directamente en la computadora o pedirle que la guarde en la ubicación 
 * elegida por el usuario.
 * ----------------------------------------------------------------------------
 * Documentación:
 * La carpeta Capturas de pantalla se creará automáticamente si no existe.
 * Para juegos alojados en la web, el juego solicitará al usuario que descargue
 * la captura de pantalla.
 * ----------------------Parámetro de color de fondo----------------------------
 * Por defecto, algunas cosas renderizadas por el motor son algo transparentes.
 * También por defecto, el HTML de la página tiene un color de fondo negro. Este
 * color de fondo no se captura en la captura de pantalla, ya que la captura de
 * pantalla solo captura lo que es renderizado por el motor. Puede volver a 
 * agregar este color de fondo usando el parámetro de color de fondo. Si no 
 * está seguro, se sugiere dejarlo como "negro". Establézcalo en blanco si desea
 * conservar la transparencia.
 * -------------------------Plugin Commands------------------------------------
 * The following plugin commands are supported:
 * 
 * • Take Screenshot
 * Takes a screenshot as if the player had pressed the Print Screen key. Also
 * has an optional parameter to name the screenshot. If no filename is
 * provided, it will be the default timestampe filename.
 * Note: The filename should not contain spaces.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_Screenshots.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * ------------------------Historial de Versiones-------------------------------
 * Versión 1.0.0 - Versión Inicial
 *
 * Versión 1.0.1:
 * - Funciones del sistema de archivos eliminadas (movido a CGMZ Core 1.7.0+)
 *
 * Versión 1.0.2:
 * - Added option to name screenshot filename differently
 * - Added Spanish Language support
 *
 * @command Take Screenshot
 * @text Tomar captura de pantalla
 * @desc Toma una captura de pantalla de la pantalla del juego actual.
 *
 * @arg Filename
 * @desc The filename to save the screenshot as. Leave blank to use timestamp as filename
 *
 * @param Automatic Screenshot
 * @text Captura de pantalla automática
 * @type boolean
 * @default true
 * @desc Toma automáticamente una captura de la pantalla al presionar Imprimir pantalla.
 *
 * @param Screenshot Folder
 * @text Carpeta de captura de pantalla
 * @default screenshots
 * @desc La carpeta (desde la raíz de la carpeta del proyecto del juego) para guardar capturas de pantalla. Se creará automáticamente.
 *
 * @param Background Color
 * @text Color de fondo
 * @default black
 * @desc Color de fondo de la captura de pantalla. Ver documentación.
*/
var Imported = Imported || {};
Imported.CGMZ_Screenshots = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Screenshots"] = "1.0.2";
CGMZ.Screenshots = CGMZ.Screenshots || {};
CGMZ.Screenshots.parameters = PluginManager.parameters('CGMZ_Screenshots');
CGMZ.Screenshots.AutomaticScreenshot = (CGMZ.Screenshots.parameters["Automatic Screenshot"] === 'true');
CGMZ.Screenshots.ScreenshotFolder = CGMZ.Screenshots.parameters["Screenshot Folder"];
CGMZ.Screenshots.BGColor = CGMZ.Screenshots.parameters["Background Color"];
//=============================================================================
// CGMZ_Temp
//-----------------------------------------------------------------------------
// Handle plugin command for taking a screenshot and capturing of print screen
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Register Plugin Commands
//-----------------------------------------------------------------------------
const alias_CGMZ_Screenshots_registerPluginCommands = CGMZ_Temp.prototype.registerPluginCommands;
CGMZ_Temp.prototype.registerPluginCommands = function() {
	alias_CGMZ_Screenshots_registerPluginCommands.call(this);
	PluginManager.registerCommand("CGMZ_Screenshots", "Take Screenshot", this.pluginCommandScreenshotsTakeScreenshot);
};
//-----------------------------------------------------------------------------
// Plugin command for taking screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.pluginCommandScreenshotsTakeScreenshot = function(args) {
	$cgmzTemp.takeScreenshot(args.Filename);
};
//-----------------------------------------------------------------------------
// Create the screenshot sprite
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.createScreenshotSprite = function() {
	const width = Graphics.width;
	const height = Graphics.height;
	const bitmap1 = new Bitmap(width, height);
	const bitmap2 = Bitmap.snap(SceneManager._scene);
	if(CGMZ.Screenshots.BGColor) bitmap1.fillAll(CGMZ.Screenshots.BGColor);
	bitmap1.blt(bitmap2, 0, 0, width, height, 0, 0, width, height);
	return new Sprite(bitmap1);
};
//-----------------------------------------------------------------------------
// Take a screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.takeScreenshot = function(filename = "") {
	if(Utils.isNwjs()) {
		const data = Graphics.app.renderer.extract.canvas(this.createScreenshotSprite()).toDataURL('image/png');
		this.saveScreenshot(data, filename);
	} else {
		Graphics.app.renderer.extract.canvas(this.createScreenshotSprite()).toBlob(this.promptScreenshotDownload(filename), 'image/png');
	}
};
//-----------------------------------------------------------------------------
// Save the screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.saveScreenshot = function(data, filename) {
	data = data.replace(/^data:image\/png;base64,/, "");
	const date = new Date();
	const timestamp = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
	const folder = CGMZ.Screenshots.ScreenshotFolder + "/";
	const file = filename || "Screenshot_" + timestamp;
	const ext = ".png";
	this.saveToLocalFile(folder, file, ext, data);
};
//-----------------------------------------------------------------------------
// Prompt user to download screenshot
//-----------------------------------------------------------------------------
CGMZ_Temp.prototype.promptScreenshotDownload = function(filename) {
	return function(file){
		const a = document.createElement('a');
		document.body.append(a);
		const date = new Date();
		const timestamp = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
		a.download = filename || "Screenshot_" + timestamp;
		a.href = URL.createObjectURL(file);
		a.click();
		a.remove();
	};
};
//-----------------------------------------------------------------------------
// Processing on key up
//-----------------------------------------------------------------------------
const alias_CGMZ_Screenshots_refreshForKeysUp = CGMZ_Temp.prototype.refreshForKeysUp;
CGMZ_Temp.prototype.refreshForKeysUp = function() {
	alias_CGMZ_Screenshots_refreshForKeysUp.call(this);
	if(CGMZ.Screenshots.AutomaticScreenshot && this._inputCurrentState.hasOwnProperty("PrintScreen")) {
		this.takeScreenshot();
		delete this._inputCurrentState["PrintScreen"];
	}
};