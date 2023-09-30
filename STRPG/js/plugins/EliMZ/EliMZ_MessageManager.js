//==========================================================================
// EliMZ_MessageManager.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book
@orderBefore EliMZ_MessageSounds
@orderBefore EliMZ_MessageScroll
@orderBefore EliMZ_MessageCommonEvent
@orderBefore EliMVZ_FaceWindow
@orderBefore EliMZ_AnimatedFaces
@orderBefore EliMZ_SmartSpeaker

@plugindesc ♦1.1.0♦ Enhanced message system!
@author Hakuen Studio
@url https://hakuenstudio.itch.io/hakuen-studio-message-manager-for-rpg-maker/rate?source=game

@help
★★★★★ Rate the plugin! Please, is very important to me ^^
● Terms of Use
https://www.hakuenstudio.com/terms-of-use-5-0-0

============================================================================
Features
============================================================================

● Change message window padding
● Change message window width
● Change message window amount of rows
● Change/Set the three message window positions, each one in a unique position of your liking!
● Set message window easing animations to open/close!
● Change the name box position, relative to the message window!
● Move the player with message open!

============================================================================
How to use
============================================================================

https://docs.google.com/document/d/1Nxb8peygDontNatGcCiBsH6B4iiw5c0kEFA4Njr7o70/edit?usp=sharing

============================================================================

@param moveOnMessageSwitch
@text Move On Message Switch
@type switch
@desc If this switch is on, player will be able to move when the message is open.
@default 0

@param Window Message

@param padding
@text Padding
@type text
@desc The padding of the window.
@default 12
@parent Window Message

@param maxRows
@text Max Rows(Lines)
@type text
@desc The amount of visible rows. Will also define the height of the window.
@default 3
@parent Window Message

@param width
@text Width
@type text
@desc The width of the window. Can use formulas.
@default 816
@parent Window Message

@param backgroundChangeBehavior
@text On Background Change
@type select
@option Reopen Window
@option Keep Opened
@desc The behavior of the window when the background changes.
@default Reopen Window
@parent Window Message

@param Show/Hide Movement

@param topSettings
@text Top Settings
@type struct<animeSt>
@desc The position of the face window when the message is on top.
@default 
@parent Show/Hide Movement

@param centerSettings
@text Center Settings
@type struct<animeSt>
@desc The position of the face window when the message is on the middle.
@default 
@parent Show/Hide Movement

@param bottomSettings
@text Bottom Settings
@type struct<animeSt>
@desc The position of the face window when the message is on the bottom.
@default 
@parent Show/Hide Movement

*/

/* ---------------------------------- ANIME --------------------------------- */
{

/*~struct~animeSt:

@param messagePos
@text Message Position
@type struct<messagePos>
@desc The position of the message window.
@default 
@parent Show/Hide Movement

@param namePos
@text Name Position
@type struct<namePosSt>
@desc The position of the name window. Relative to the message window.
@default 
@parent Show/Hide Movement

@param opennessBehavior
@text Open/Close Behavior
@type struct<opennessSt>
@desc How the window will open and close. Works for Name and Message window.
@default {"widthAlign":"None","heightAlign":"Centered","easing":"linear","duration":"8"}
@parent Show/Hide Movement

*/
}

/* ---------------------------- MESSAGE POSITION ---------------------------- */
{
/*~struct~messagePos:

@param duration
@text Move Duration
@type text
@desc The duration for the window to move from Initial to Target Position.
@default 1

@param easing
@text Easing
@type combo
@option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option easeInElastic @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option easeOutElastic @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option easeInOutElastic @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce @option easeOutInElastic 
@desc Choose the easing type. Can use \v[id].
@default linear

@param separator1
@text Initial

@param initialAlignX
@text Align X
@type select
@option left
@option center
@option right
@option left_offScreen
@option right_offScreen
@desc Select left to only use offset value.
@default left
@parent separator1

@param initialOffsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent separator1

@param initialAlignY
@text Align Y
@type select
@option top
@option center
@option bottom
@option top_offScreen
@option bottom_offScreen
@desc Select top to only use offset value.
@default top
@parent separator1

@param initialOffsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent separator1

@param initialAlpha
@text Alpha (Opacity)
@type text
@desc The alpha value. From 0 to 1. Can use decimals.
@default 0
@parent separator1

@param separator2
@text Target

@param targetAlignX
@text Align X
@type select
@option left
@option center
@option right
@desc Select left to only use offset value.
@default left
@parent separator2

@param targetOffsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent separator2

@param targetAlignY
@text Align Y
@type select
@option top
@option center
@option bottom
@desc Select top to only use offset value.
@default top
@parent separator2

@param targetOffsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent separator2

@param targetAlpha
@text Alpha (Opacity)
@type text
@desc The alpha value. From 0 to 1. Can use decimals.
@default 1
@parent separator2

*/
}

/* ---------------------------- NAME BOX POSITION --------------------------- */
{
/*~struct~namePosSt:

@param alignX
@text Align X
@type select
@option left
@option center
@option right
@desc Select left to only use offset value.
@default left
@parent separator1

@param offsetX
@text Offset X
@type text
@desc The Offset X position.
@default 0
@parent separator1

@param alignY
@text Align Y
@type select
@option top
@option center
@option bottom
@desc Select top to only use offset value.
@default top
@parent separator1

@param offsetY
@text Offset Y
@type text
@desc The offset Y position.
@default 0
@parent separator1

*/
}

/* -------------------------------- OPENNESS -------------------------------- */
{

/*~struct~opennessSt:

@param widthAlign
@text Width Direction
@type select
@option None
@option Left to Right
@option Centered
@option Right to Left
@desc The direction that the window will open/close, regardless the width.
@default None

@param heightAlign
@text Height Direction
@type select
@option None
@option Top to Bottom
@option Centered
@option Bottom to Top
@desc The direction that the window will open/close, regardless the height.
@default Centered

@param easing
@text Easing
@type combo
@option inherit @option linear @option --- In --- @option easeInQuad @option easeInCubic @option easeInQuart @option easeInQuint @option easeInSine @option easeInExpo @option easeInCirc @option easeInBack @option easeInBounce @option --- Out --- @option easeOutQuad @option easeOutCubic @option easeOutQuart @option easeOutQuint @option easeOutSine @option easeOutExpo @option easeOutCirc @option easeOutBack @option easeOutBounce @option --- In / Out --- @option easeInOutQuad @option easeInOutCubic @option easeInOutQuart @option easeInOutQuint @option easeInOutSine @option easeInOutExpo @option easeInOutCirc @option easeInOutBack @option easeInOutBounce @option --- Out / In --- @option easeOutInQuad @option easeOutInCubic @option easeOutInQuart @option easeOutInQuint @option easeOutInSine @option easeOutInCirc @option easeOutInExpo @option easeOutInBack @option easeOutInBounce
@desc Choose the easing type. Can use \v[id]. "inherit" will get the same easing that was set on the position settings.
@default linear

@param duration
@text Duration
@type text
@desc How fast the window will open/close. In frames.
@default 8

*/

}

"use strict"

var Eli = Eli || {}
var Imported = Imported || {}
Imported.Eli_MessageManager = true

/* ========================================================================== */
/*                                   PLUGIN                                   */
/* ========================================================================== */
{

class Sprite_MessageInnerFace extends Sprite{

    initialize(bitmap){
        super.initialize(bitmap)
        this.setFrame(0, 0, ImageManager.faceWidth, ImageManager.faceHeight)
        this.faceIndex = 0
    }

    refreshFaceBitmap(){
        const faceName = $gameMessage.faceName()
        const faceIndex = $gameMessage.faceIndex()

        this.faceIndex = faceIndex
        this.bitmap = ImageManager.loadFace(faceName)
        this.bitmap.addLoadListener(this.refreshFaceFrame.bind(this))
    }

    refreshFaceFrame(){
        const faceWidth = ImageManager.faceWidth
        const faceHeight = ImageManager.faceHeight
        const rows = this.bitmap.height / faceWidth
        const cols = this.bitmap.width / faceHeight
        const index = this.faceIndex
        const x = index % cols * faceWidth
        const y = (Math.floor(index / cols) % rows) * faceHeight
    
        this.setFrame(x, y, faceWidth, faceHeight)
    }
}

Eli.MessageManager = {

    version: 1.02,
    url: "https://hakuenstudio.itch.io/hakuen-studio-message-manager-for-rpg-maker",
    alias: {},
    Sprite_MessageInnerFace: Sprite_MessageInnerFace,
    parameters: {},
    
    initialize(){
        this.initParameters()
    },

    initParameters(){
        const parameters = PluginManager.parameters("EliMZ_MessageManager")
        this.parameters = this.createParameters(parameters)
    },

    createParameters(parameters){
        return {
            moveOnMessageSwitch: Number(parameters.moveOnMessageSwitch),
            maxRows: Number(parameters.maxRows),
            width: new Function(`return ${parameters.width}`),
            padding: Number(parameters.padding),
            backgroundChangeBehavior: parameters.backgroundChangeBehavior,
            animeSettings: [
                this.createAnimeSettings(JSON.parse(parameters.topSettings)),
                this.createAnimeSettings(JSON.parse(parameters.centerSettings)),
                this.createAnimeSettings(JSON.parse(parameters.bottomSettings)),
            ]
        }
    },

    createAnimeSettings(parameters){
        return {
            messagePosition: this.createMessagePosition(JSON.parse(parameters.messagePos)),
            namePosition: this.createNamePosition(JSON.parse(parameters.namePos)),
            opennessBehavior: this.createOpenness(JSON.parse(parameters.opennessBehavior)),
        }
    },

    createMessagePosition(parameters){
        return {
            initial: {
                alignX: parameters.initialAlignX,
                alignY: parameters.initialAlignY,
                offsetX: Number(parameters.initialOffsetX),
                offsetY: Number(parameters.initialOffsetY),
                alpha: Number(parameters.initialAlpha),
            },
            target: {
                alignX: parameters.targetAlignX,
                alignY: parameters.targetAlignY,
                offsetX: Number(parameters.targetOffsetX),
                offsetY: Number(parameters.targetOffsetY),
                alpha: Number(parameters.targetAlpha),
            },
            easing: parameters.easing,
            duration: Number(parameters.duration),
        }
    },

    createNamePosition(parameters){
        return {
            alignX: parameters.alignX,
            alignY: parameters.alignY,
            offsetX: Number(parameters.offsetX),
            offsetY: Number(parameters.offsetY),
        }
    },

    createOpenness(parameters){
        return {
            widthAlign: parameters.widthAlign,
            heightAlign: parameters.heightAlign,
            easing: parameters.easing,
            duration: Number(parameters.duration),
        }
    },

    getParam(){
        return this.parameters
    },

    playerCanMoveOnMessage(){
        return $gameMessage.isBusy() && $gameSwitches.value(this.getParam().moveOnMessageSwitch)
    }

}

const Plugin = Eli.MessageManager
const Alias = Eli.MessageManager.alias

Plugin.initialize()

/* -------------------------------- GAME TEMP ------------------------------- */
Alias.Game_Temp_setDestination = Game_Temp.prototype.setDestination
Game_Temp.prototype.setDestination = function(x, y) {
    if(!Plugin.playerCanMoveOnMessage()){
        Alias.Game_Temp_setDestination.call(this, x, y)
    }
}

/* ------------------------------- GAME PLAYER ------------------------------ */
Alias.Game_Player_canMove = Game_Player.prototype.canMove
Game_Player.prototype.canMove = function() {
    if(Plugin.playerCanMoveOnMessage()){
        return true
    }

    return Alias.Game_Player_canMove.call(this)
}

/* ---------------------------- GAME INTERPRETER ---------------------------- */
// Overwrite
Alias.Game_Interpreter_command101 = Game_Interpreter.prototype.command101
Game_Interpreter.prototype.command101 = function(params) {
    const messages = []

    if(!$gameMessage.isBusy()){

        while(this.canScanCommandsForMessages()){
            this.scanCommandsForMessages(params, messages)
        }
    }

    const alias = Alias.Game_Interpreter_command101.call(this, params)

    if(alias){
        this.addMessagesToShowText(params, messages)
    }

    return alias 
}

Game_Interpreter.prototype.canScanCommandsForMessages = function(params) {
    return this.nextEventCode() === 401 || this.nextEventCode() === 405
}

Game_Interpreter.prototype.scanCommandsForMessages = function(params, messages) {
    this._index++
    messages.push(this.currentCommand().parameters[0])

    if(this.canAddMessageFromScrollText(params, messages)){
        messages.pop()
        this._index++

    }else if(this.canAddMessageFromShowText(params)){
        this._index++
    }
}

Game_Interpreter.prototype.canAddMessageFromShowText = function(params) {
    return  this.nextEventCode() === 101 && 
            this.getNextEventCommand().parameters.join() === params.join()
}

Game_Interpreter.prototype.canAddMessageFromScrollText = function(params, messages) {
    return  this.nextEventCode() === 105 && 
            messages[0] === "" &&
            messages.length === 1
}

Game_Interpreter.prototype.addMessagesToShowText = function(params, messages) {
    $gameMessage._texts = []

    for(const msg of messages){
        $gameMessage.add(msg)
    }
}

/* ------------------------------ SCENE MESSAGE ----------------------------- */
// Overwrite
Scene_Message.prototype.messageWindowRect = function() {
    const ww = Plugin.getParam().width()
    const wh = this.calcWindowHeight(Plugin.getParam().maxRows, false) + Plugin.getParam().maxRows * 2
    const wx = -1000
    const wy = -1000

    return new Rectangle(wx, wy, ww, wh)
}

/* ----------------------------- WINDOW MESSAGE ----------------------------- */
Alias.Window_Message_initialize = Window_Message.prototype.initialize
Window_Message.prototype.initialize = function(rect) {
    this.isInitializing = true

    Alias.Window_Message_initialize.call(this, rect)

    if(!Imported.Eli_AnimatedFaces && this.isWindowMessage()){
        this.createFaceSprite()
    }
}

Window_Message.prototype.isWindowMessage = function(rect) {
    return this.constructor.name === "Window_Message"
}

Alias.Window_Message_move = Window_Message.prototype.move
Window_Message.prototype.move = function(x, y, width, height) {
    if(this.isInitializing && this.isWindowMessage()){
        height = this.fittingHeight(this.maxRows()) + this.maxRows() * 2
        this.isInitializing = false
    }

    Alias.Window_Message_move.call(this, x, y, width, height)
}

Alias.Window_Message_fittingHeight = Window_Message.prototype.fittingHeight
Window_Message.prototype.fittingHeight = function(numLines) {
    if(this.isWindowMessage()){
        return numLines * this.itemHeight() + this.getPadding() * 2
    }else{
        return Alias.Window_Message_fittingHeight.call(this, numLines)
    }
}

Alias.Window_Message_updatePadding = Window_Message.prototype.updatePadding
Window_Message.prototype.updatePadding = function() {
    if(this.isWindowMessage()){
        this.padding = this.getPadding()
    }else{
        Alias.Window_Message_updatePadding.call(this)
    }
}

Window_Message.prototype.getPadding = function() {
    return Plugin.getParam().padding
}

Window_Message.prototype.createFaceSprite = function() {
    const bitmap = new Bitmap(ImageManager.faceWidth, ImageManager.faceWidth)
    this.faceSprite = new Sprite_MessageInnerFace(bitmap)
    this.addInnerChild(this.faceSprite)
}

Alias.Window_Message_initMembers = Window_Message.prototype.initMembers
Window_Message.prototype.initMembers = function() {
    Alias.Window_Message_initMembers.call(this)

    if(this.isWindowMessage()){
        this.initMessageManagerMembers()
        this.createAnime()
    }
}

Window_Message.prototype.initMessageManagerMembers = function() {
    this._opened = false
    this._closed = true
    this.animeGroups = [
        new Eli.AnimeGroup([], {paused: true}),
        new Eli.AnimeGroup([], {paused: true}),
        new Eli.AnimeGroup([], {paused: true}),
    ]
    this.isAnimeRunning = false
    this.needRestart = false
}

Window_Message.prototype.maxRows = function() {
    return Plugin.getParam().maxRows
}

Alias.Window_Message_update = Window_Message.prototype.update
Window_Message.prototype.update = function(){
    for(const anime of this.animeGroups){
        anime.update()
    }
    Alias.Window_Message_update.call(this)
}

Alias.Window_Message_updateWait = Window_Message.prototype.updateWait
Window_Message.prototype.updateWait = function() {

    if(this.isAnimeRunning){
        return this.updateWaitOnAnimeRun()
    }

    return Alias.Window_Message_updateWait.call(this)
}

Window_Message.prototype.updateWaitOnAnimeRun = function() {
    if(this.needRestart){
        this.needRestart = false
        this.playAnime("normal")
    }

    return true
}

Alias.Window_Message_onFirstMessage = Window_Message.prototype.onFirstMessage
Window_Message.prototype.onFirstMessage = function() {
    Alias.Window_Message_onFirstMessage.call(this)
    this.playAnime("normal")
}

// Overwrite
Window_Message.prototype.updatePlacement = function() {
    const oldPositionType = this._positionType
    this._positionType = $gameMessage.positionType()

    if(this.hasNewPosition(oldPositionType)){
        this.onNewPosition()
    }
}

Window_Message.prototype.hasNewPosition = function(oldPosition) {
    return oldPosition !== this._positionType && !this.needRestart && this._opened
}

Window_Message.prototype.onNewPosition = function() {
    this.needRestart = true
    this.playAnime("reverse")
}

Alias.Window_Message_updateBackground = Window_Message.prototype.updateBackground
Window_Message.prototype.updateBackground = function() {
    const backType = this._background
    Alias.Window_Message_updateBackground.call(this)

    if(this.hasNewBackground(backType)){
        this.onNewBackground()
    }
}

Window_Message.prototype.hasNewBackground = function(oldBackground) {
    return  oldBackground !== this._background && !this.needRestart && 
            Plugin.getParam().backgroundChangeBehavior === "Reopen Window" &&
            this._opened
}

Window_Message.prototype.onNewBackground = function() {
    this.needRestart = true
    this.playAnime("reverse")
}

Alias.Window_Message_loadMessageFace = Window_Message.prototype.loadMessageFace
Window_Message.prototype.loadMessageFace = function() {
    Alias.Window_Message_loadMessageFace.call(this)
    this._faceBitmap = null

    if(this.canLoadFaceMessageSprite()){
        this.loadFaceMessageSprite()
    }else{
        this.faceSprite.visible = false
    }
}

Window_Message.prototype.canLoadFaceMessageSprite = function() {
    if(Imported.Eli_FaceWindow){
        return Eli.FaceWindow.isFaceWindowDisabled()
    }else{
        return true
    }
}

Window_Message.prototype.loadFaceMessageSprite = function() {
    this.faceSprite.visible = true
    this.faceSprite.refreshFaceBitmap()
}

Alias.Window_Message_onLastMessage = Window_Message.prototype.onLastMessage
Window_Message.prototype.onLastMessage = function() {
    Alias.Window_Message_onLastMessage.call(this)
    this.needRestart = false
    this.playAnime("reverse")
}

/* ---------------------------------- ANIME --------------------------------- */
// Overwrite
Window_Message.prototype.updateOpen = function(){}
Window_Message.prototype.updateClose = function(){}

Alias.Window_Message_close = Window_Message.prototype.close
Window_Message.prototype.close = function(){
    if(this.isWindowMessage()){

    }else{
        Alias.Window_Message_close.call(this)
    }
}

Alias.Window_Message_open = Window_Message.prototype.open
Window_Message.prototype.open = function(){
    if(this.isWindowMessage()){

    }else{
        Alias.Window_Message_open.call(this)
    }
}

Alias.Window_Message_isClosed = Window_Message.prototype.isClosed
Window_Message.prototype.isClosed = function() {
    if(this.isWindowMessage()){
        return this._closed
    }else{
        return Alias.Window_Message_isClosed.call(this)
    }
}

Alias.Window_Message_isOpen = Window_Message.prototype.isOpen
Window_Message.prototype.isOpen = function() {
    if(this.isWindowMessage()){
        return this._opened
    }else{
        return Alias.Window_Message_isOpen.call(this)
    }
}

Object.defineProperty(Window_Message.prototype, "openness", {
    get: function() {
        return this._openness
    },
    set: function(value) {
        const param = Plugin.getParam().animeSettings[this._positionType || 0]
        const {widthAlign, heightAlign} = param.opennessBehavior

        this._openness = value.clamp(0, 255)
        
        this.updateHorizontalOpenness(widthAlign)
        this.updateVerticalOpenness(heightAlign)
    },
    configurable: true
})

Window_Message.prototype.createAnime = function(){
    for(let i = 0; i < 3; i++){
        const param = Plugin.getParam().animeSettings[i]
        const props = this.createAnimeProps(param)
        const defaultData = this.createAnimeDefaultData(param)

        this.createAnimeChilds(props, defaultData, i)
        this.setAnimeGroupsCallbacks(i)
    }
}

Window_Message.prototype.createAnimeProps = function(param){
    const initPos = param.messagePosition.initial
    const targetPos = param.messagePosition.target
    const [initialX, initialY] = this.createAnimePosition(initPos, targetPos.offsetX, targetPos.offsetY)
    const [targetX, targetY] = this.createAnimePosition(targetPos)

    return {
        openness: this.createOpennessAnimeProp(param),
        x: {value: [initialX, targetX]},
        y: {value: [initialY, targetY]},
        alpha: {value: [initPos.alpha, targetPos.alpha]},
    }
}

Window_Message.prototype.createAnimePosition = function(position, targetOffsetX = 0, targetOffsetY = 0){
    const {alignX, alignY, offsetX, offsetY} = position
    const realOffsetX = Number(Eli.Utils.processEscapeVarOrFormula(offsetX))
    const realOffsetY = Number(Eli.Utils.processEscapeVarOrFormula(offsetY))
    const realTargetOffsetX = Number(Eli.Utils.processEscapeVarOrFormula(targetOffsetX))
    const realTargetOffsetY = Number(Eli.Utils.processEscapeVarOrFormula(targetOffsetY))

    const x = {
        left: realOffsetX,
        center: (Graphics.boxWidth/2 - this.width/2) + realOffsetX,
        right: (Graphics.boxWidth - this.width) + realOffsetX,
        left_offScreen: 0 - (Math.abs(realTargetOffsetX) + this.width),
        right_offScreen: Graphics.width + this.width + Math.abs(realTargetOffsetX),
    }[alignX]

    const y = {
        top: realOffsetY,
        center: (Graphics.boxHeight/2 - this.height/2) + realOffsetY,
        bottom: (Graphics.boxHeight - this.height) + realOffsetY,
        top_offScreen: 0 - (Math.abs(realTargetOffsetY) + this.height),
        bottom_offScreen: Graphics.height + this.height + Math.abs(realTargetOffsetY),
    }[alignY]
    
    return [Math.round(x), Math.round(y)]
}

Window_Message.prototype.createOpennessAnimeProp = function(param){
    const positionEasing = param.messagePosition.easing
    const {widthAlign, heightAlign, easing, duration} = param.opennessBehavior
    const initialOpenness = (widthAlign === "None" && heightAlign === "None") ? 255 : 0
    const parsedEasing = easing === "inherit" ? positionEasing : Eli.Utils.convertEscapeVariablesOnly(easing)

    return {
        value: [initialOpenness, 255],
        duration: duration,
        easing: parsedEasing,
    }
}

Window_Message.prototype.createAnimeDefaultData = function(param){
    const defaultData = Eli.AnimeManager.createDefaultData()
    defaultData.autoPlay = false
    defaultData.duration = param.messagePosition.duration
    defaultData.easing = param.messagePosition.easing
    defaultData.direction = "normal"

    return defaultData
}

Window_Message.prototype.createAnimeChilds = function(props, defaultData, i){
    const animations = Eli.AnimeManager.createAnimations(this, props, defaultData)
    this.animeGroups[i].setAnimations(animations)
}

Window_Message.prototype.setAnimeGroupsCallbacks = function(i){
    this.animeGroups[i].onStart = this.onAnimeGroupStart.bind(this)
    this.animeGroups[i].onUpdate = this.onAnimeGroupUpdate.bind(this)
    this.animeGroups[i].onComplete = this.onAnimeGroupComplete.bind(this)
}

Window_Message.prototype.onAnimeGroupStart = function(anime){
    if(anime.direction === "normal"){
        this._opened = false
        this._closed = false
        this.faceSprite.visible = true
    }else{
        this.contents.clear()
        this._nameBoxWindow.contents.clear()
        this.faceSprite.visible = false
    }
    
    this.isAnimeRunning = true
}

Window_Message.prototype.onAnimeGroupUpdate = function(anime){
    this._nameBoxWindow.updatePlacementAnime()
    this.isAnimeRunning = true
}

Window_Message.prototype.onAnimeGroupComplete = function(anime){
    this._nameBoxWindow.updatePlacementAnime()

    if(anime.direction === "normal"){
        this._opened = true
        this._closed = false
    }else{
        this._closed = true
        this._opened = false
        this._nameBoxWindow.openness = 0
        this._openness = 0
    }   

    this.isAnimeRunning = false
}

Window_Message.prototype.playAnime = function(direction, posType = this._positionType){
    this.getAnimeGroup(posType).play(direction)
}

Window_Message.prototype.getAnimeGroup = function(posType = this._positionType){
    return this.animeGroups[posType]
}

/* ----------------------------- WINDOW NAME BOX ---------------------------- */
Alias.Window_NameBox_initialize = Window_NameBox.prototype.initialize
Window_NameBox.prototype.initialize = function() {
    Alias.Window_NameBox_initialize.call(this)
    this.createPositions()
}

Window_NameBox.prototype.createPositions = function() {
    this.positions = [
        {x: new Function(), y: new Function()},
        {x: new Function(), y: new Function()},
        {x: new Function(), y: new Function()},
    ]

    for(let i = 0; i < 3; i++){
        const pos = Plugin.getParam().animeSettings[i].namePosition
        this.positions[i] = this.createPositionMethods(pos)
    }
}

Window_NameBox.prototype.createPositionMethods = function(position){
    const {alignX, alignY, offsetX, offsetY} = position
    
    const x = {
        left: () => Math.round(offsetX),
        center: () =>  Math.round( (this._messageWindow.width/2 - this.width/2) + offsetX),
        right: () => Math.round( (this._messageWindow.width - this.width) + offsetX),
    }[alignX]

    const y = {
        top: () => Math.round(offsetY) - this.height,
        center: () => Math.round( (this._messageWindow.height/2 - this.height/2) + offsetY),
        bottom: () => Math.round( (this._messageWindow.height - this.height) + offsetY + this.height),
    }[alignY]
    
    return {updateX: x, updateY: y}
}

// Overwrite
Window_NameBox.prototype.updatePlacement = function() {
    this.width = this.windowWidth()
    this.height = this.windowHeight()
}

Window_NameBox.prototype.updatePlacementAnime = function() {
    const type = this._messageWindow._positionType
    const pos = this.positions[type]
    this._isWindow = false

    this.openness = this._messageWindow.openness
    this.alpha = this._messageWindow.alpha
    this.width = this.windowWidth()
    this.height = this.windowHeight()
    this.x = this._messageWindow.x + pos.updateX()
    this.y = this._messageWindow.y + pos.updateY()
}

// Overwrite
Window_NameBox.prototype.updateOpen = function() {}
Window_NameBox.prototype.updateClose = function() {}
Window_NameBox.prototype.close = function() {}
Window_NameBox.prototype.open = function() {}

Window_NameBox.prototype.isOpen = function() {
    return this._messageWindow?._opened
}

Window_NameBox.prototype.isClosed = function() {
    return this._messageWindow?._closed
}

Object.defineProperty(Window_NameBox.prototype, "openness", {
    get: function() {
        return this._openness
    },
    set: function(value) {
        const posType = this?._messageWindow?._positionType || 0
        const param = Plugin.getParam().animeSettings[posType]
        this._openness = value.clamp(0, 255)
        this.updateHorizontalOpenness(param.opennessBehavior.widthAlign)
        this.updateVerticalOpenness(param.opennessBehavior.heightAlign)
    },
    configurable: true
})

/* ------------------------------ WINDOW CHOICE ----------------------------- */
Window_ChoiceList.prototype.canSetDefaultPositionXY = function() {
    return (this._messageWindow && this._messageWindow.isOpen()) || Imported.Eli_ChoiceManager
}

Alias.Window_ChoiceList_windowX = Window_ChoiceList.prototype.windowX
Window_ChoiceList.prototype.windowX = function() {
    if(this.canSetDefaultPositionXY()){
        return Alias.Window_ChoiceList_windowX.call(this)
    }else{
        return this.windowXWithMessageClose()
    }
}

Window_ChoiceList.prototype.windowXWithMessageClose = function() {
    const posType = $gameMessage.choicePositionType()
    return {
        0: 0,
        1: (Graphics.boxWidth/2 - this.windowWidth()/2),
        2: (Graphics.boxWidth - this.windowWidth()),
    }[posType]
}

Alias.Window_ChoiceList_windowY = Window_ChoiceList.prototype.windowY
Window_ChoiceList.prototype.windowY = function() {
    if(this.canSetDefaultPositionXY()){
        return Alias.Window_ChoiceList_windowY.call(this)
    }else{
        return this.windowYWithMessageClose()
    }
}

Window_ChoiceList.prototype.windowYWithMessageClose = function() {
    return (Graphics.boxHeight/2 - this.windowHeight()/2)
}

}