//=============================================================================
// Ramza Plugins - Title Screen Movie Player
// Ramza_TitleMovie_MZ.js
// v1.13
//=============================================================================

var Ramza = Ramza || {};
var Imported = Imported || {}
Ramza.TM = Ramza.TM || {};
Ramza.TM.version = 1.13
Imported['Ramza_TitleMovie_MZ'] = true

//=============================================================================
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.13 Allows the user to define a movie that will play on the title screen after a set amount of frames
 * @author Ramza
 *
 * @param Frames
 * @type Number
 * @desc The number of idle frames before the video plays
 * @default 900
 *
 * @param FadeFrames
 * @type Number
 * @desc The number of frames the BGM and screen fades out for before the video plays.
 * @default 60
 * 
 * @param MultiVideoPlayType
 * @text Multi Video Play Type
 * @desc If using multiple videos, how will they play?
 * @type select
 * @option Sequential Order
 * @option Random Order
 * @option Random Order w/ No Repeats
 * @default Sequential Order
 *
 * @param ResetTimeout
 * @text Reset Timeout Between Videos
 * @desc Return to the title screen and reset the timeout counter before playing the next video?
 * @type boolean
 * @default true
 *
 * @param Movie
 * @type text[]
 * @desc The filename of the movie to play. Include the folder.
 * Example: movies/titlemovie.webm
 * @default []
 *
 *
 * @help
 * ============================================================================
 * Description:
 * ============================================================================
 *
 * This plugin allows you to set videos to play on the title screen of your
 * project after a set number of frames. While a video is playing, pressing
 * any arrow key, or ok, or cancel will immediately stop playback and return 
 * back to the title screen. 
 * 
 * Prior to the first video playing, the BGM and screen will begin to fadeout a
 * configurable number of frames before the timeout occurs. If a key is pressed
 * during the fadeout, it is immediately reversed, preventing a video from 
 * playing.
 * 
 * If multiple videos are defined, they will be played either in the order 
 * they appear on the list, or at random, depending on the setting chosen. 
 * Canceling one video by pressing a key will not clear the video queue, 
 * meaning if any unplayed videos existed in the queue, they will play before 
 * the video that was just canceled (unless Random order is chosen, since it 
 * can repeat).
 *
 * ============================================================================
 * Terms of Use:
 * ============================================================================
 * 
 * -Free for commercial and non-commercial use, with credit to me, Ramza.
 * -Do not edit the header of this plugin, or claim sole ownership of it.
 * -Editing the plugin to add new features, or fix compatibility problems is 
 *  allowed.
 * -Redistributing this plugin is also allowed.
 *
 * ============================================================================
 * Changelog:
 * ============================================================================
 *
 * Version 1.13:
 * -Corrected an issue where videos played from scene which were not the title 
 *  scene would cause a crash error.
 *
 * Version 1.12:
 * -Corrected an issue where this plugin was defining its plugin parameters as 
 *  a constant, which was causing a crash error when used together with any 
 *  other plugins that happened to use the same variable name for their own
 *  plugin parameters.
 *
 * Version 1.11:
 * -Timeout can now be delayed via moving the mouse cursor.
 * -Clicking or right-clicking the screen will now cancel a video being played
 *  in the same way that pressing an arrow key or ok, or cancel will.
 *
 * Version 1.10:
 * -Fixed an issue where the title music would continue playing in the 
 *  background when a video was playing.
 * -Aliased the title command functions I had previously defined in this plugin,
 *  to improve compatibility with other plugins that may also be modifying the 
 *  Window_TitleCommand window.
 * -Changed the video parameter to be a list, you can now specify multiple 
 *  videos.
 * -Added a parameter to set whether the plugin will play each video in order,
 *  or pick one at random.
 * -Added a parameter to set if in between multiple videos, it will go back to 
 *  the title screen to timeout again, or just play the next video immediately.
 * -Added a parameter to set the amount of time the BGM and screen takes to fade 
 *  out before the video begins playing. This was instant prior to this update.
 *
 * Version 1.00:
 * -Initial release
 * 
 * **end of help file**
*/

//Initialize plugin params
var params = PluginManager.parameters('Ramza_TitleMovie_MZ')
Ramza.TM.parameters = {}
Ramza.TM.parameters.idleFrames = Number(params['Frames'])
Ramza.TM.parameters.fadeoutFrames = Number(params['FadeFrames'])

Ramza.TM.parameters.titleMovie = JSON.parse(params['Movie'])
Ramza.TM.parameters.playType = String(params['MultiVideoPlayType'])
Ramza.TM.parameters.resetTimeout = eval(params['ResetTimeout'])

Ramza.TM.titleInit = Window_TitleCommand.prototype.initialize
Window_TitleCommand.prototype.initialize = function(rect){
	Ramza.TM.titleInit.call(this, rect)
	this._count = 0
}

Ramza.TM.createVideoList = function(){
	Ramza.TM.videolist = []
	switch (Ramza.TM.parameters.playType){
		case "Sequential Order":
		for (let i = 0; i < Ramza.TM.parameters.titleMovie.length; i++){
			Ramza.TM.videolist.push(Ramza.TM.parameters.titleMovie[i])
		}
		break;
		case "Random Order":
		Ramza.TM.videolist.push(Ramza.TM.parameters.titleMovie[Math.round(Math.random()*(Ramza.TM.parameters.titleMovie.length - 1))])
		break;
		case "Random Order w/ No Repeats":
		for (;Ramza.TM.videolist.length < Ramza.TM.parameters.titleMovie.length;){
			var rando = Ramza.TM.parameters.titleMovie[Math.round(Math.random() * (Ramza.TM.parameters.titleMovie.length - 1))]
			if (!Ramza.TM.videolist.includes(rando)) Ramza.TM.videolist.push(rando)
		}
		break;
		default:
		for (let i = 0; i < Ramza.TM.parameters.titleMovie.length; i++){
			Ramza.TM.videolist.push(Ramza.TM.parameters.titleMovie[i])
		}
		break;
	}
}

Window_TitleCommand.prototype.clearCount = function(){
	this._count = 0
	if (!Video.isPlaying()) this.resetVideoPlaybackList()
}

Ramza.TM._on_mouse_move = TouchInput._onMouseMove
TouchInput._onMouseMove = function(event) {
	if (SceneManager._scene && SceneManager._scene.constructor && SceneManager._scene.constructor.name === "Scene_Title"){
		SceneManager._scene._commandWindow.clearCount()
		Ramza.TM._on_mouse_move.call(this, event)
	} else {
		Ramza.TM._on_mouse_move.call(this, event)
	}
};

Ramza.TM._on_left_button = TouchInput._onLeftButtonDown
TouchInput._onLeftButtonDown = function(event) {
	if (SceneManager._scene && SceneManager._scene.constructor && SceneManager._scene.constructor.name === "Scene_Title"){
		SceneManager._scene._commandWindow.clearCount()
		if (Video.isPlaying()){
			SceneManager._scene._commandWindow.resetVideoPlaybackList()
			Video._element.currentTime = Video._element.duration
		} else {
			Ramza.TM._on_left_button.call(this, event)
		}
	} else {
		Ramza.TM._on_left_button.call(this, event)
	}
};

Ramza.TM._on_right_button = TouchInput._onRightButtonDown
TouchInput._onRightButtonDown = function(event) {
	if (SceneManager._scene && SceneManager._scene.constructor && SceneManager._scene.constructor.name === "Scene_Title"){
		SceneManager._scene._commandWindow.clearCount()
		if (Video.isPlaying()){
			SceneManager._scene._commandWindow.resetVideoPlaybackList()
			Video._element.currentTime = Video._element.duration
		} else {
			Ramza.TM._on_right_button.call(this, event)
		}
	} else {
		Ramza.TM._on_right_button.call(this, event)
	}
};

Ramza.TM._title_update = Window_TitleCommand.prototype.update
Window_TitleCommand.prototype.update = function(){
	if (!Video.isPlaying()) this._count += 1
	if (this._count == Ramza.TM.parameters.idleFrames - Ramza.TM.parameters.fadeoutFrames){
		this._oldBGM = AudioManager._currentBgm
		AudioManager.fadeOutBgm(Ramza.TM.parameters.fadeoutFrames / 60)
		SceneManager._scene.startFadeOut(Ramza.TM.parameters.fadeoutFrames)
	}
	if (this._count >= Ramza.TM.parameters.idleFrames){
		AudioManager.stopBgm()
		if (!Ramza.TM.videolist || (Ramza.TM.videolist && !Ramza.TM.videolist[0])){
			Ramza.TM.createVideoList()
		}
		Video.play(Ramza.TM.videolist[0])
		Ramza.TM.videolist.shift()
		this._count = 0
	}
	Ramza.TM._title_update.call(this)
}

Ramza.TM._video_on_end = Video._onEnd
Video._onEnd = function (){
	if (Ramza.TM.parameters.resetTimeout || (Ramza.TM.videolist && !Ramza.TM.videolist[0])){
		Ramza.TM._video_on_end.call(this)
		if (SceneManager._scene.constructor.name == "Scene_Title" && SceneManager._scene._commandWindow._oldBGM) {
			AudioManager.playBgm(SceneManager._scene._commandWindow._oldBGM)
			delete SceneManager._scene._commandWindow._oldBGM
			SceneManager._scene.startFadeIn(12)
		}
	} else if (!$gameTemp._cancelledOut){
		Ramza.TM._video_on_end.call(this)
		Video.play(Ramza.TM.videolist[0])
		Ramza.TM.videolist.shift()
	} else {
		delete $gameTemp._cancelledOut
		Ramza.TM._video_on_end.call(this)
		if (SceneManager._scene.constructor.name == "Scene_Title" && SceneManager._scene._commandWindow._oldBGM) {
			AudioManager.playBgm(SceneManager._scene._commandWindow._oldBGM)
			delete SceneManager._scene._commandWindow._oldBGM
			SceneManager._scene.startFadeIn(12)
		}
	}
}

Window_TitleCommand.prototype.resetVideoPlaybackList = function(){
	if (this._oldBGM) {
		this._oldBGM.pos = AudioManager._bgmBuffer ? AudioManager._bgmBuffer.seek() : null
		AudioManager.replayBgm(this._oldBGM)
		delete this._oldBGM
		$gameTemp._cancelledOut = true
		SceneManager._scene.startFadeIn(12)
	}
};

Ramza.TM._title_cursor_down = Window_TitleCommand.prototype.cursorDown
Window_TitleCommand.prototype.cursorDown = function(){
	this._count = 0
	this.resetVideoPlaybackList()
	if (Video.isPlaying()){
		Video._element.currentTime = Video._element.duration
	} else {
		Ramza.TM._title_cursor_down.call(this)
	}
};

Ramza.TM._title_cursor_up = Window_TitleCommand.prototype.cursorUp
Window_TitleCommand.prototype.cursorUp = function(){
	this._count = 0
	this.resetVideoPlaybackList()
	if (Video.isPlaying()){
		Video._element.currentTime = Video._element.duration
	} else {
		Ramza.TM._title_cursor_up.call(this)
	}
};

Ramza.TM._title_cursor_right = Window_TitleCommand.prototype.cursorRight
Window_TitleCommand.prototype.cursorRight = function(){
	this._count = 0
	this.resetVideoPlaybackList()
	if (Video.isPlaying()){
		Video._element.currentTime = Video._element.duration
	} else {
		Ramza.TM._title_cursor_right.call(this)
	}
};

Ramza.TM._title_cursor_left = Window_TitleCommand.prototype.cursorLeft
Window_TitleCommand.prototype.cursorLeft = function(){
	this._count = 0
	this.resetVideoPlaybackList()
	if (Video.isPlaying()){
		Video._element.currentTime = Video._element.duration
	} else {
		Ramza.TM._title_cursor_left.call(this)
	}
};

Ramza.TM.processTitleOk = Window_TitleCommand.prototype.processOk
Window_TitleCommand.prototype.processOk = function(){
	this._count = 0
	this.resetVideoPlaybackList()
	if (Video.isPlaying()){
		Video._element.currentTime = Video._element.duration
	} else {
		Ramza.TM.processTitleOk.call(this)
	}
};

Ramza.TM.processTitleCancel = Window_TitleCommand.prototype.processCancel
Window_TitleCommand.prototype.processCancel = function(){
	this._count = 0
	this.resetVideoPlaybackList()
	if (Video.isPlaying()){
		Video._element.currentTime = Video._element.duration
	} else {
		Ramza.TM.processTitleCancel.call(this)
	}
};

