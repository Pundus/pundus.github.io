/*:
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/savefile/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Changes the default save / load screens
 * @help
 * ============================================================================
 * For terms and conditions using this plugin in your game please visit:
 * https://www.caspergaming.com/terms-of-use/
 * ============================================================================
 * Become a Patron to get access to beta/alpha plugins plus other goodies!
 * https://www.patreon.com/CasperGamingRPGM
 * ============================================================================
 * Version: 1.1.1
 * ----------------------------------------------------------------------------
 * Compatibility: Only tested with my CGMZ plugins.
 * Made for RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Description: This plugin modifies the save / load screens to show more
 * game information as well as providing additional customization options.
 * ----------------------------------------------------------------------------
 * Documentation:
 * ---------------------------Save Images--------------------------------------
 * If using a save image:
 * Image Dimensions (default resolution) are 582 x 160
 * Image height can be changed in parameters below
 * Images should be placed in the "pictures" folder
 * ----------------------------Note Tags---------------------------------------
 * To set location, use note tag <cgmzname:yourName>
 * To set the save image for each map, use note tag <cgmzsaveimg:yourImage>
 * These note tags go in the map properties note box.
 * ------------------------Custom Save Data------------------------------------
 * The custom save data are game variables. To assign a game variable to store
 * text, use the script call:
 * $gameVariables.setValue(13, "The Hero Returns");
 * where 13 would be the variable id, and the string would be what shows up on
 * the save screen.
 * ------------------------------Saved Games-----------------------------------
 * This plugin is fully compatible with saved games. This means you can:
 *
 * ✓ Add this plugin to a saved game and it will work as expected
 * ✓ Change any plugin params and changes will be reflected in saved games
 * ✓ Remove the plugin with no issue to save data
 * -----------------------------Filename---------------------------------------
 * The filename for this plugin MUST remain CGMZ_SaveFile.js
 * This is what it comes as when downloaded. The filename is used to load
 * parameters and execute plugin commands. If you change it, things will begin
 * behaving incorrectly and your game will probably crash. Please do not
 * rename the js file.
 * -------------------------Version History------------------------------------
 * Version 1.0.1:
 * - Added ability to change the color of header / label text
 * - Added ability to change opacity of the black rectangle behind location
 *   info
 * - Now compatible with VS core
 * - Fix for location overlapping when no image
 * - Fix for image height ignoring height parameter
 *
 * Version 1.0.2:
 * - Fix for image height being stuck at 160px
 *
 * Version 1.0.3:
 * - Fix for autosave after battle not displaying correct info
 * - Updated documentation
 *
 * Version 1.0.4:
 * - Updated color parameter to use RMMZ 1.6.0 new color picker UI
 *
 * Version 1.1.0:
 * - Added drag and drop control over each item drawn in Save File Display
 * - Added option to display CGMZ achievement/achievement pts in save file
 * - Added option to hide touch UI space when touch UI is disabled
 * - Added text code support
 * - Added Spanish language help documentation
 * - Images no longer limited to the Pictures subfolder
 * - Moved Show Image/Show Faces params to new Display Info parameter
 * - Fix crash when using Event Test
 * - This plugin now reports JSON errors in the console instead of crashing
 *
 * Version 1.1.1:
 * - Fix crash when an old save from before this plugin is loaded
 *
 * @param Autosave Options
 * 
 * @param Show Autosave in Save Mode
 * @parent Autosave Options
 * @type boolean
 * @desc Show autosave in the save screen?
 * @default false
 *
 * @param File Options
 *
 * @param Max Save Files
 * @parent File Options
 * @type number
 * @min 1
 * @desc Change the number of files the player can select
 * @default 20
 *
 * @param File Icon Unused
 * @parent File Options
 * @type number
 * @min -1
 * @desc Icon ID to show next to a File that has no save data. Set to -1 for no icon
 * @default 229
 *
 * @param File Icon Used
 * @parent File Options
 * @type number
 * @min -1
 * @desc Icon ID to show next to a File that hassave data. Set to -1 for no icon
 * @default 230
 *
 * @param Image Options
 *
 * @param Default Image
 * @parent Image Options
 * @type file
 * @dir img
 * @desc Default image to show (if showing images) if no other image exists
 *
 * @param Image Height
 * @parent Image Options
 * @type number
 * @desc Height of the image to display
 * @default 160
 *
 * @param Location Fade Opacity
 * @parent Image Options
 * @type number
 * @desc Opacity (0-255) of the black rectangle behind the location
 * @default 120
 * 
 * @param Custom Options
 * 
 * @param Custom Save Variables
 * @parent Custom Options
 * @type struct<CustomSaveInfo>[]
 * @desc Set up custom save variables here
 * @default []
 * 
 * @param Display Options
 *
 * @param Header Color
 * @parent Display Options
 * @default 16
 * @type color
 * @desc The color to use for information headers (example - location: or gold:)
 *
 * @param Disable Touch UI Space
 * @parent Display Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Display Info
 * @parent Display Options
 * @type select[]
 * @option Image
 * @option Location
 * @option Image And Location
 * @option Date
 * @option Playtime
 * @option Gold
 * @option Custom Info
 * @option Faces
 * @option Characters
 * @option Achievements
 * @option Achievement Points
 * @option Blank Line
 * @desc Determines the order and what info the display window shows.
 * @default ["Image And Location","Date","Playtime","Gold","Faces"]
 *
 * @param Text Options
 * 
 * @param Empty Text
 * @parent Text Options
 * @desc Text to show when no save file information exists
 * @default No save data exists.
 * 
 * @param Location Text
 * @parent Text Options
 * @desc Text to describe the "location" string
 * @default Location: 
 * 
 * @param Playtime Text
 * @parent Text Options
 * @desc Text to describe the "playtime" string
 * @default Playtime: 
 * 
 * @param Gold Text
 * @parent Text Options
 * @desc Text to describe the "gold" string
 * @default Gold: 
 * 
 * @param Achievement Text
 * @parent Text Options
 * @desc Text to describe the "achievement" string. Requires CGMZ Achievements
 * @default Achievements: 
 * 
 * @param Achievement Point Text
 * @parent Text Options
 * @desc Text to describe the "achievement points" string. Requires CGMZ Achievements
 * @default Achievement Points: 
 * 
 * @param Level Text
 * @parent Text Options
 * @desc Text to describe the "level" string
 * @default Lv.  
*/
/*~struct~CustomSaveInfo:
 * @param Variable
 * @type variable
 * @desc The variable value to show as a custom option in the save screen
 *
 * @param Description
 * @desc The text to describe the variable (ex: Chapter: )
 *
 * @param Trailing Text
 * @desc Text to show after the variable (ex: %)
 *
 * @param Icon
 * @type number
 * @min -1
 * @desc The icon to show next to the variable. Set to -1 to not use
 * @default -1
*/
/*:es
 * @author Casper Gaming
 * @url https://www.caspergaming.com/plugins/cgmz/savefile/
 * @target MZ
 * @base CGMZ_Core
 * @orderAfter CGMZ_Core
 * @plugindesc Cambia las pantallas predeterminadas de guardar/cargar
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
 * Versión: 1.1.1
 * ----------------------------------------------------------------------------
 * Compatibilidad: Sólo probado con mis CGMZ plugins.
 * Hecho para RPG Maker MZ 1.7.0
 * ----------------------------------------------------------------------------
 * Descripción: este complemento modifica las pantallas de guardar/cargar para 
 * mostrar más información del juego, además de proporcionar opciones de 
 * personalización adicionales.
 * ----------------------------------------------------------------------------
 * Documentación:
 * -------------------------Guardar Imágenes-----------------------------------
 * Si usas una imagen guardada:
 * Las dimensiones de la imagen (resolución predeterminada) son 582 x 160
 * La altura de la imagen se puede cambiar en los parámetros a continuación
 * Las imágenes deben colocarse en la carpeta "imágenes"
 * ------------------------Etiquetas de nota-----------------------------------
 * Para establecer la ubicación, use la etiqueta de nota  <cgmzname:tuNombre>
 * Para configurar la imagen guardada para cada mapa, use la etiqueta de nota
 * <cgmzsaveimg:tuImagen>
 * Estas etiquetas de notas van en el cuadro de notas de propiedades del mapa.
 * --------------------Guardar datos personalizados----------------------------
 * Los datos guardados personalizados son variables del juego. Para asignar una 
 * variable de juego para almacenar texto, utilice la llamada de secuencia de
 * comandos:
 * $gameVariables.setValue(13, "El Heroe regresa");
 * donde 13 sería el id de la variable y la cadena sería lo que aparece en
 * la pantalla de guardar.
 * ----------------------Historial de Versiones--------------------------------
 *  Versión 1.0.1:
 * - Se agregó la capacidad de cambiar el color del texto del
 *   encabezado / etiqueta
 * - Se agregó la capacidad de cambiar la opacidad del rectángulo negro detrás
 *   de la información de ubicación
 * - Ahora compatible con VS core
 * - Solución para la superposición de ubicaciones cuando no hay imagen
 * - Corrección para la altura de la imagen ignorando el parámetro de altura
 *
 * Versión 1.0.2:
 * - Solución de la altura de la imagen atascada en 160px
 *
 * Versión 1.0.3:
 * - Solución para el guardado automático después de la batalla que no muestra
 *   la información correcta
 * - Documentación actualizada
 *
 * Versión 1.0.4:
 * - Updated color parameter to use RMMZ 1.6.0 new color picker UI
 *
 * Version 1.1.0:
 * - Added drag and drop control over each item drawn in Save File Display
 * - Added option to display CGMZ achievement/achievement pts in save file
 * - Added option to hide touch UI space when touch UI is disabled
 * - Added text code support
 * - Added Spanish language help documentation
 * - Images no longer limited to the Pictures subfolder
 * - Moved Show Image/Show Faces params to new Display Info parameter
 * - Fix crash when using Event Test
 * - This plugin now reports JSON errors in the console instead of crashing
 *
 * Version 1.1.1:
 * - Fix crash when an old save from before this plugin is loaded
 *
 * @param Autosave Options
 * @text Opciones de autoguardado
 * 
 * @param Show Autosave in Save Mode
 * @text Mostrar guardado automático en el modo Guardar
 * @parent Autosave Options
 * @type boolean
 * @desc Mostrar guardado automático en la pantalla de guardar.
 * @default false
 *
 * @param File Options
 * @text Opciones de archivo
 *
 * @param Max Save Files
 * @text Máximo de archivos guardados
 * @parent File Options
 * @type number
 * @min 1
 * @desc Cambiar la cantidad de archivos que el jugador puede seleccionar.
 * @default 20
 *
 * @param File Icon Unused
 * @text Icono de archivo sin usar
 * @parent File Options
 * @type number
 * @min -1
 * @desc ID de icono para mostrar junto a un archivo que no tiene datos guardados. Establecer en -1 para ningún icono.
 * @default 229
 *
 * @param File Icon Used
 * @text Icono de archivo utilizado
 * @parent File Options
 * @type number
 * @min -1
 * @desc ID de icono para mostrar junto a un archivo que tiene datos guardados. Establecer en -1 para ningún icono.
 * @default 230
 *
 * @param Image Options
 * @text Opciones de Imagen
 *
 * @param Default Image
 * @text Imagen por defecto
 * @parent Image Options
 * @type file
 * @dir img
 * @desc Imagen predeterminada para mostrar (si se muestran imágenes) si no existe otra imagen.
 *
 * @param Image Height
 * @text Altura de Imagen
 * @parent Image Options
 * @type number
 * @desc Altura de la imagen a mostrar.
 * @default 160
 *
 * @param Location Fade Opacity
 * @text Ubicación Desvanecimiento de Opacidad
 * @parent Image Options
 * @type number
 * @desc Opacidad (0-255) del rectángulo negro detrás de la ubicación.
 * @default 120
 * 
 * @param Custom Options
 * @text Opciones personalizadas
 * 
 * @param Custom Save Variables
 * @text Variables de guardado personalizadas
 * @parent Custom Options
 * @type struct<CustomSaveInfo>[]
 * @desc Configure las variables de guardado personalizadas aquí.
 * @default []
 * 
 * @param Display Options
 * @text Opciones de pantalla
 *
 * @param Header Color
 * @text Color del encabezado
 * @parent Display Options
 * @type number
 * @default 16
 * @min 0
 * @desc El color que se usará para los encabezados de información (ejemplo: ubicación: u oro:).
 *
 * @param Disable Touch UI Space
 * @parent Display Options
 * @type boolean
 * @desc If true, will not leave space for Touch UI buttons if Touch UI is disabled
 * @default false
 *
 * @param Display Info
 * @parent Display Options
 * @type select[]
 * @option Image
 * @option Location
 * @option Image And Location
 * @option Date
 * @option Playtime
 * @option Gold
 * @option Custom Info
 * @option Faces
 * @option Characters
 * @option Achievements
 * @option Achievement Points
 * @option Blank Line
 * @desc Determines the order and what info the display window shows.
 * @default ["Image And Location","Date","Playtime","Gold","Faces"]
 *
 * @param Text Options
 * @text Opciones de texto
 * 
 * @param Empty Text
 * @text Texto Vacío
 * @parent Text Options
 * @desc Texto para mostrar cuando no existe información de archivo guardado.
 * @default No save data exists.
 * 
 * @param Location Text
 * @text Texto de Ubicación
 * @parent Text Options
 * @desc Texto para describir la cadena de "ubicación".
 * @default Location: 
 * 
 * @param Playtime Text
 * @text Texto de tiempo de juego
 * @parent Text Options
 * @desc Texto para describir la cadena "tiempo de juego".
 * @default Playtime: 
 * 
 * @param Gold Text
 * @text Texto Oro
 * @parent Text Options
 * @desc Texto para describir la cadena "oro".
 * @default Gold: 
 * 
 * @param Achievement Text
 * @parent Text Options
 * @desc Text to describe the "achievement" string. Requires CGMZ Achievements
 * @default Achievements: 
 * 
 * @param Achievement Point Text
 * @parent Text Options
 * @desc Text to describe the "achievement points" string. Requires CGMZ Achievements
 * @default Achievement Points: 
 * 
 * @param Level Text
 * @text Texto de nivel
 * @parent Text Options
 * @desc Texto para describir la cadena de "nivel".
 * @default Lv.  
*/
/*~struct~CustomSaveInfo:es
 * @param Variable
 * @text Variable
 * @type variable
 * @desc El valor de la variable para mostrar como una opción personalizada en la pantalla de guardar.
 *
 * @param Description
 * @text Descripción
 * @desc El texto para describir la variable (ej: Capítulo: ).
 *
 * @param Trailing Text
 * @text Texto final
 * @desc Texto a mostrar después de la variable (ej: %).
 *
 * @param Icon
 * @text Icono
 * @type number
 * @min -1
 * @desc El icono que se muestra junto a la variable. Establecer en -1 para no usar.
 * @default -1
*/
var Imported = Imported || {};
Imported.CGMZ_SaveFile = true;
var CGMZ = CGMZ || {};
CGMZ.Versions = CGMZ.Versions || {};
CGMZ.Versions["Save File"] = "1.1.1";
CGMZ.SaveFile = {};
CGMZ.SaveFile.parameters = PluginManager.parameters('CGMZ_SaveFile');
CGMZ.SaveFile.CustomSaveInfo = CGMZ_Utils.parseJSON(CGMZ.SaveFile.parameters["Custom Save Variables"], [], "CGMZ Save File", "Your Custom Save Variables had incorrect JSON and could not be loaded.");
CGMZ.SaveFile.DisplayInfo = CGMZ_Utils.parseJSON(CGMZ.SaveFile.parameters["Display Info"], [], "CGMZ Save File", "Your display info JSON was invalid and could not be loaded.");
CGMZ.SaveFile.ShowAutosaveInSaveMode = (CGMZ.SaveFile.parameters["Show Autosave in Save Mode"] === "true");
CGMZ.SaveFile.DisableTouchUISpace = (CGMZ.SaveFile.parameters["Disable Touch UI Space"] === "true");
CGMZ.SaveFile.MaxSaveFiles = Number(CGMZ.SaveFile.parameters["Max Save Files"]);
CGMZ.SaveFile.SaveIconUsed = Number(CGMZ.SaveFile.parameters["File Icon Used"]);
CGMZ.SaveFile.SaveIconUnused = Number(CGMZ.SaveFile.parameters["File Icon Unused"]);
CGMZ.SaveFile.ImageHeight = Number(CGMZ.SaveFile.parameters["Image Height"]);
CGMZ.SaveFile.FadeSpriteOpacity = Number(CGMZ.SaveFile.parameters["Location Fade Opacity"]);
CGMZ.SaveFile.HeaderColor = Number(CGMZ.SaveFile.parameters["Header Color"]);
CGMZ.SaveFile.DefaultImage = CGMZ.SaveFile.parameters["Default Image"];
CGMZ.SaveFile.EmptyText = CGMZ.SaveFile.parameters["Empty Text"];
CGMZ.SaveFile.LocationText = CGMZ.SaveFile.parameters["Location Text"];
CGMZ.SaveFile.PlaytimeText = CGMZ.SaveFile.parameters["Playtime Text"];
CGMZ.SaveFile.GoldText = CGMZ.SaveFile.parameters["Gold Text"];
CGMZ.SaveFile.AchievementText = CGMZ.SaveFile.parameters["Achievement Text"];
CGMZ.SaveFile.AchievementPointText = CGMZ.SaveFile.parameters["Achievement Point Text"];
CGMZ.SaveFile.LevelText = CGMZ.SaveFile.parameters["Level Text"];
//=============================================================================
// CGMZ Temp
//-----------------------------------------------------------------------------
// Create plugin data. Not saved.
//=============================================================================
//-----------------------------------------------------------------------------
// Create (unsaved) plugin data
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_CGMZTemp_createPluginData = CGMZ_Temp.prototype.createPluginData;
CGMZ_Temp.prototype.createPluginData = function() {
	alias_CGMZ_SaveFile_CGMZTemp_createPluginData.call(this);
	this._saveFileTempImageURL = "";
	this._saveFileTempMapName = "Unknown";
};
//=============================================================================
// Game_Map
//-----------------------------------------------------------------------------
// Add function for getting map save file image
//=============================================================================
//-----------------------------------------------------------------------------
// Get CGMZ Save File Image url
//-----------------------------------------------------------------------------
Game_Map.prototype.CGMZ_SaveFile_getImage = function() {
	let url = "";
	if($dataMap && $dataMap.meta && $dataMap.meta.cgmzsaveimg) url = $dataMap.meta.cgmzsaveimg;
	if(url === "" && $cgmzTemp._saveFileTempImageURL) url = $cgmzTemp._saveFileTempImageURL;
	return url;
};
//-----------------------------------------------------------------------------
// Temporarily store cgmz meta for save file on map load. Needed because
// map data is not yet loaded when autosave occurs after battle, so dataMap
// meta tags cannot be read after battle during autosave
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_GameMap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	alias_CGMZ_SaveFile_GameMap_setup.call(this, mapId);
	$cgmzTemp._saveFileTempImageURL = this.CGMZ_SaveFile_getImage();
	$cgmzTemp._saveFileTempMapName = this.CGMZ_getMapName();
};
//-----------------------------------------------------------------------------
// Alias. Check if data map is null, if so return temp saved map name
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_GameMap_CGMZ_getMapName = Game_Map.prototype.CGMZ_getMapName;
Game_Map.prototype.CGMZ_getMapName = function() {
	if(!$dataMap) return $cgmzTemp._saveFileTempMapName;
	return alias_CGMZ_SaveFile_GameMap_CGMZ_getMapName.call(this);
};
//=============================================================================
// Game_Party
//-----------------------------------------------------------------------------
// Add more to each actor's save info
//=============================================================================
//-----------------------------------------------------------------------------
// Get CGMZ Save File actor info
//-----------------------------------------------------------------------------
Game_Party.prototype.CGMZ_SaveFile_actorInfoForSavefile = function() {
	return this.battleMembers().map(actor => [
		actor.name(),
		actor._level,
		actor.nickname(),
		actor.currentClass().name
	]);
};
//=============================================================================
// DataManager
//-----------------------------------------------------------------------------
// Change max save file count and save file info
//=============================================================================
//-----------------------------------------------------------------------------
// OVERWRITE. Change max save files
//-----------------------------------------------------------------------------
DataManager.maxSavefiles = function() {
	return CGMZ.SaveFile.MaxSaveFiles;
};
//-----------------------------------------------------------------------------
// Alias. Add additional save file info
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
DataManager.makeSavefileInfo = function() {
	const info = alias_CGMZ_SaveFile_DataManager_makeSavefileInfo.call(this);
	info.cgmz_mapName = $gameMap.CGMZ_getMapName();
	info.cgmz_gold = $gameParty.gold();
	info.cgmz_image = $gameMap.CGMZ_SaveFile_getImage();
	info.cgmz_actor = $gameParty.CGMZ_SaveFile_actorInfoForSavefile();
	if(Imported.CGMZ_Achievements) {
		info.cgmz_achievements = $cgmz.countEarnedAchievements();
		info.cgmz_achievementPts = $cgmz.countEarnedAchievementPoints();
	}
	info.cgmz_custom = {};
	for(const customInfo of CGMZ.SaveFile.CustomSaveInfo) {
		const data = CGMZ_Utils.parseJSON(customInfo, null, "CGMZ Save File", "A custom save info property could not be read due to invalid JSON");
		if(!data) continue;
		const variable = Number(data.Variable);
		info.cgmz_custom[variable] = $gameVariables.value(variable);
	}
	return info;
};
//=============================================================================
// Window_SavefileList
//-----------------------------------------------------------------------------
// Do not include autosave if save mode and option disabled
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Do not include autosave if in save mode (optional)
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_WindowSavefileList_setMode = Window_SavefileList.prototype.setMode;
Window_SavefileList.prototype.setMode = function(mode, autosave) {
	if(mode === "save" && !CGMZ.SaveFile.ShowAutosaveInSaveMode) autosave = false;
	alias_CGMZ_SaveFile_WindowSavefileList_setMode.call(this, mode, autosave);
};
//-----------------------------------------------------------------------------
// OVERWRITE. Draw the item
//-----------------------------------------------------------------------------
Window_SavefileList.prototype.drawItem = function(index) {
	const savefileId = this.indexToSavefileId(index);
	const rect = this.itemRectWithPadding(index);
	this.resetTextColor();
	this.changePaintOpacity(this.isEnabled(savefileId));
	if(!!DataManager.savefileInfo(savefileId) && CGMZ.SaveFile.SaveIconUsed >= 0) {
		this.drawIcon(CGMZ.SaveFile.SaveIconUsed, rect.x, rect.y + 4);
		rect.x += ImageManager.iconWidth + 4;
	} else if(!DataManager.savefileInfo(savefileId) && CGMZ.SaveFile.SaveIconUsed >= 0) {
		this.drawIcon(CGMZ.SaveFile.SaveIconUnused, rect.x, rect.y + 4);
		rect.x += ImageManager.iconWidth + 4;
	}
	this.drawTitle(savefileId, rect.x, rect.y + 4);
};
//-----------------------------------------------------------------------------
// OVERWRITE. Change item height back to default
//-----------------------------------------------------------------------------
Window_SavefileList.prototype.itemHeight = function() {
	return Window_Selectable.prototype.itemHeight.call(this);
};
//-----------------------------------------------------------------------------
// Set Help Window
//-----------------------------------------------------------------------------
Window_SavefileList.prototype.CGMZ_SaveFile_setDisplayWindow = function(displayWindow) {
	this._CGMZ_SaveFile_displayWindow = displayWindow;
	this.callUpdateHelp();
};
//-----------------------------------------------------------------------------
// Update display window if exists
//-----------------------------------------------------------------------------
Window_SavefileList.prototype.callUpdateHelp = function() {
    if(this._CGMZ_SaveFile_displayWindow) {
		const savefileId = this.indexToSavefileId(this.index());
		const info = DataManager.savefileInfo(savefileId);
		this._CGMZ_SaveFile_displayWindow.setInfo(info);
	}
};
//=============================================================================
// Scene_File
//-----------------------------------------------------------------------------
// Shrink list window and display new display window
//=============================================================================
//-----------------------------------------------------------------------------
// Alias. Also create save file display window
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_SceneFile_create = Scene_File.prototype.create;
Scene_File.prototype.create = function() {
	alias_CGMZ_SaveFile_SceneFile_create.call(this);
	this.CGMZ_SaveFile_createDisplayWindow();
};
//-----------------------------------------------------------------------------
// Alias. Change help window y if no touch ui
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_SceneFile_helpWindowRect = Scene_File.prototype.helpWindowRect;
Scene_File.prototype.helpWindowRect = function() {
	const rect = alias_CGMZ_SaveFile_SceneFile_helpWindowRect.apply(this, arguments);
	if(CGMZ.SaveFile.DisableTouchUISpace && !ConfigManager.touchUI) rect.y = 0;
	return rect;
};
//-----------------------------------------------------------------------------
// Alias. Change width of save file select window
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_SceneFile_listWindowRect = Scene_File.prototype.listWindowRect;
Scene_File.prototype.listWindowRect = function() {
	const rect = alias_CGMZ_SaveFile_SceneFile_listWindowRect.call(this);
	rect.width = Graphics.boxWidth / 4;
	rect.y = this._helpWindow.height + this._helpWindow.y;
	rect.height = Graphics.boxHeight - rect.y;
	return rect;
};
//-----------------------------------------------------------------------------
// VS compatibility. Seems their core doesn't call above default function ¯\_(ツ)_/¯
//-----------------------------------------------------------------------------
const alias_CGMZ_SaveFile_SceneFile_createListWindow = Scene_File.prototype.createListWindow;
Scene_File.prototype.createListWindow = function() {
	alias_CGMZ_SaveFile_SceneFile_createListWindow.call(this);
	this._listWindow.width = Graphics.boxWidth / 4;
};
//-----------------------------------------------------------------------------
// Create display window
//-----------------------------------------------------------------------------
Scene_File.prototype.CGMZ_SaveFile_createDisplayWindow = function() {
	const rect = this.CGMZ_SaveFile_displayWindowRect();
	this._CGMZ_SaveFile_displayWindow = new CGMZ_Window_SaveFileDisplay(rect);
	this.addWindow(this._CGMZ_SaveFile_displayWindow);
	this._listWindow.CGMZ_SaveFile_setDisplayWindow(this._CGMZ_SaveFile_displayWindow);
};
//-----------------------------------------------------------------------------
// Display window rect
//-----------------------------------------------------------------------------
Scene_File.prototype.CGMZ_SaveFile_displayWindowRect = function() {
	const x = this._listWindow.width;
	const y = this._listWindow.y;
	const width = Graphics.boxWidth - this._listWindow.width;
	const height = this._listWindow.height;
	return new Rectangle(x, y, width, height);
};
//=============================================================================
// CGMZ_Window_SaveFileDisplay
//-----------------------------------------------------------------------------
// Display save file info
//=============================================================================
function CGMZ_Window_SaveFileDisplay(rect) {
	this.initialize.apply(this, arguments);
}
CGMZ_Window_SaveFileDisplay.prototype = Object.create(Window_Base.prototype);
CGMZ_Window_SaveFileDisplay.prototype.constructor = CGMZ_Window_SaveFileDisplay;
//-----------------------------------------------------------------------------
// Initialize
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.initialize = function(rect) {
	Window_Base.prototype.initialize.call(this, rect);
	this._info = null;
	this.initSprites();
	this.refresh();
};
//-----------------------------------------------------------------------------
// Initialize sprites
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.initSprites = function() {
	this._saveSprite = new Sprite();
	this._saveSprite.width = this.contents.width;
	this._saveSprite.height = CGMZ.SaveFile.ImageHeight;
	this._saveSpriteFade = new Sprite();
	this._saveSpriteFade.width = this.contents.width;
	this._saveSpriteFade.height = this.contents.height;
	this._saveSpriteFade.bitmap = new Bitmap(this._saveSpriteFade.width, this._saveSpriteFade.height);
	this._saveSpriteFade.bitmap.paintOpacity = CGMZ.SaveFile.FadeSpriteOpacity;
	this._saveSprite.x = $gameSystem.windowPadding();
	this._saveSprite.y = $gameSystem.windowPadding();
	this._saveSpriteFade.x = $gameSystem.windowPadding();
	this._saveSpriteFade.y = $gameSystem.windowPadding();
	this.addChildToBack(this._saveSpriteFade);
	this.addChildToBack(this._saveSprite);
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.refresh = function() {
	this.contents.clear();
	this.contentsBack.clear();
	this._saveSprite.hide();
	this._saveSpriteFade.hide();
	if(this._info) {
		this.loadSaveImage();
	} else {
		this.drawEmptyInfo();
	}
};
//-----------------------------------------------------------------------------
// Set save file info object (might also be null if save file not exists)
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.setInfo = function(info) {
	this._info = info;
	this.refresh();
};
//-----------------------------------------------------------------------------
// Draw empty save file information
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawEmptyInfo = function() {
	this.drawText(CGMZ.SaveFile.EmptyText, 0, 0, this.contents.width, 'center');
};
//-----------------------------------------------------------------------------
// Refresh
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.loadSaveImage = function() {
	let url = this._info.cgmz_image || CGMZ.SaveFile.DefaultImage;
	if(!url) {
		this.drawSaveFileInfo();
		return;
	}
	if(!url.includes("/")) url = "pictures/" + url; // backwards compatibility with pre-1.1.0 where pictures folder was mandatory; if no folder detected chances are it's the pictures folder
	const imgData = CGMZ_Utils.getImageData(url, "img");
	this._saveSprite.bitmap = ImageManager.loadBitmap(imgData.folder, imgData.filename);
	this._saveSprite.bitmap.addLoadListener(this.drawSaveFileInfo.bind(this));
};
//-----------------------------------------------------------------------------
// Draw save file information
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawSaveFileInfo = function() {
	let y = 0;
	let customInfoIndex = 0;
	for(const infoType of CGMZ.SaveFile.DisplayInfo) {
		this.resetFontSettings();
		switch(infoType) {
			case "Image":
				this._saveSprite.y = $gameSystem.windowPadding() + y;
				this._saveSprite.show();
				y += this._saveSprite.height;
				break;
			case "Image And Location": 
				this._saveSprite.y = $gameSystem.windowPadding() + y;
				this._saveSprite.show();
				this._saveSpriteFade.show();
				y += this._saveSprite.height - this.lineHeight();
				this.drawLocationInfo(4, y, true);
				y += this.lineHeight();
				break;
			case "Date":
				this.drawTimestamp(y);
				break;
			case "Location":
				this.drawLocationInfo(0, y, false);
				y += this.lineHeight();
				break;
			case "Playtime":
				this.drawPlaytime(y);
				y += this.lineHeight();
				break;
			case "Gold":
				this.drawGoldInfo(y);
				y += this.lineHeight();
				break;
			case "Achievements":
				y += this.lineHeight() * this.drawAchievements(y);
				break;
			case "Achievement Points":
				y += this.lineHeight() * this.drawAchievementPoints(y);
				break;
			case "Custom Info":
				y += this.lineHeight() * this.drawCustomInfo(y, customInfoIndex++);
				break;
			case "Faces":
				this.drawFaces(y);
				y += ImageManager.faceHeight;
				break;
			case "Characters":
				this.drawChars(y);
				y += this.lineHeight()*2;
				break;
		}
	}
};
//-----------------------------------------------------------------------------
// Draw location info
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawLocationInfo = function(x, y, drawFadeSprite) {
	const string = '\\c[' + CGMZ.SaveFile.HeaderColor + ']' + CGMZ.SaveFile.LocationText + '\\c[0]' + this._info.cgmz_mapName;
	this.CGMZ_drawTextLine(string, x, y, this.contents.width);
	if(drawFadeSprite) {
		const width = this.textSizeEx(string).width;
		this._saveSpriteFade.bitmap.clear();
		this._saveSpriteFade.bitmap.fillRect(0, y, width + x + 4, this.lineHeight(), "#000000");
	}
};
//-----------------------------------------------------------------------------
// Draw timestamp
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawTimestamp = function(y) {
	const date = new Date(this._info.timestamp);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const stardateRoot = date.getTime();
	const stardate = (stardateRoot / 1000 / 21071).toFixed(2);
	const customDate = $cgmzTemp.createDateText(day, month, year, 2, "/");
	const datedStar = "Stardate " + stardate + " (" + customDate +")"
	this.drawText(datedStar, 0, y, this.contents.width, 'right');
};
//-----------------------------------------------------------------------------
// Draw playtime
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawPlaytime = function(y) {
	const x = 0;
	const string = '\\c[' + CGMZ.SaveFile.HeaderColor + ']' + CGMZ.SaveFile.PlaytimeText + '\\c[0]' + this._info.playtime;
	this.CGMZ_drawTextLine(string, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw gold info
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawGoldInfo = function(y) {
	const x = 0;
	const string = (this._info.cgmz_gold) ? '\\c[' + CGMZ.SaveFile.HeaderColor + ']' + CGMZ.SaveFile.GoldText + '\\c[0]' + this._info.cgmz_gold.toLocaleString() : '\\c[' + CGMZ.SaveFile.HeaderColor + ']' + CGMZ.SaveFile.GoldText + '\\c[0]' + this._info.cgmz_gold;
	this.CGMZ_drawTextLine(string, x, y, this.contents.width);
};
//-----------------------------------------------------------------------------
// Draw achievements
// Returns false if nothing drawn, true if was able to draw the info
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawAchievements = function(y) {
	if(!this._info.cgmz_achievements) return false;
	const x = 0;
	const string = '\\c[' + CGMZ.SaveFile.HeaderColor + ']' + CGMZ.SaveFile.AchievementText + '\\c[0]' + this._info.cgmz_achievements.toLocaleString();
	this.CGMZ_drawTextLine(string, x, y, this.contents.width);
	return true;
};
//-----------------------------------------------------------------------------
// Draw achievement points
// Returns false if nothing drawn, true if was able to draw the info
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawAchievementPoints = function(y) {
	if(!this._info.cgmz_achievementPts) return false;
	const x = 0;
	const string = '\\c[' + CGMZ.SaveFile.HeaderColor + ']' + CGMZ.SaveFile.AchievementPointText + '\\c[0]' + this._info.cgmz_achievementPts.toLocaleString();
	this.CGMZ_drawTextLine(string, x, y, this.contents.width);
	return true;
};
//-----------------------------------------------------------------------------
// Draw custom save info. Returns false if nothing drawn, else true
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawCustomInfo = function(y, index) {
	if(!this._info.cgmz_custom) return false;
	const x = 0;
	const customInfo = CGMZ.SaveFile.CustomSaveInfo[index];
	const info = CGMZ_Utils.parseJSON(customInfo, null, "CGMZ Save File", "A custom save info line could not be loaded due to invalid JSON.");
	if(!info) return false;
	const variable = Number(info.Variable);
	if(typeof(this._info.cgmz_custom[variable]) === 'undefined') return false;
	let string = '\\c[' + CGMZ.SaveFile.HeaderColor + ']' + info.Description + '\\c[0]';
	if(Number(info.Icon) >= 0) string += '\\i[' + Number(info.Icon) + ']';
	string += this._info.cgmz_custom[variable].toString() + info["Trailing Text"];
	this.CGMZ_drawTextLine(string, x, y, this.contents.width);
	return true;
};
//-----------------------------------------------------------------------------
// Load face and info
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawFaces = function(y) {
	let x = 0;
	const width = this.contents.width / 4;
	for(let i = 0; i < this._info.faces.length; i++) {
		const faceName = this._info.faces[i][0];
		const faceIndex = this._info.faces[i][1];
		const bitmap = ImageManager.loadFace(faceName);
		const args = {"name": faceName, "index": faceIndex, "x": x, "y": y, "width": width};
		if(this._info.cgmz_actor && this._info.cgmz_actor[i]) {
			args.actorName = this._info.cgmz_actor[i][0];
			args.actorLevel = this._info.cgmz_actor[i][1];
			args.actorNickname = this._info.cgmz_actor[i][2];
			args.actorClass = this._info.cgmz_actor[i][3];
		}
		bitmap.addLoadListener(this.onFaceLoaded.bind(this, args));
		x += width;
	}
};
//-----------------------------------------------------------------------------
// Draw face & info after loaded
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.onFaceLoaded = function(args) {
	this.drawFace(args.name, args.index, args.x, args.y, args.width);
	const y = args.y + ImageManager.faceHeight - this.lineHeight();
	const ytwo = y +  this.lineHeight();
	this.contents.fontBold = true;
	this.contents.outlineWidth = 6;
	this.drawText(args.actorName, args.x, args.y, args.width, "center");
	this.drawText(args.actorNickname, args.x, y, args.width, "center");
	this.drawText(args.actorClass, args.x, ytwo, args.width, "center");
	this.contents.fontBold = false;
	this.contents.outlineWidth = 3;
};
//-----------------------------------------------------------------------------
// Load characters and info
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.drawChars = function(y) {
	let x = 0;
	const width = this.contents.width / 4;
	for(let i = 0; i < this._info.characters.length; i++) {
		const charName = this._info.characters[i][0];
		const charIndex = this._info.characters[i][1];
		const bitmap = ImageManager.loadCharacter(charName);
		const args = {"name": charName, "index": charIndex, "x": x, "y": y, "width": width};
		if(this._info.cgmz_actor && this._info.cgmz_actor[i]) {
			args.actorName = this._info.cgmz_actor[i][0];
			args.actorLevel = this._info.cgmz_actor[i][1];
		}
		bitmap.addLoadListener(this.onCharLoaded.bind(this, args));
		x += width;
	}
};
//-----------------------------------------------------------------------------
// Draw character & info after loaded
//-----------------------------------------------------------------------------
CGMZ_Window_SaveFileDisplay.prototype.onCharLoaded = function(args) {
	this.drawCharacter(args.name, args.index, args.x + args.width / 2, args.y + this.lineHeight()*2);
	const y = args.y + ImageManager.faceHeight - this.lineHeight();
	this.makeFontSmaller();
	this.contents.outlineWidth = 4;
	this.drawText(args.actorName, args.x, args.y, args.width, "center");
	this.drawText(CGMZ.SaveFile.LevelText + args.actorLevel, args.x, args.y + this.lineHeight()*1.5, args.width, "center");
	this.contents.outlineWidth = 3;
	this.makeFontBigger();
};