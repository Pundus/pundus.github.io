/*=============================================================================
 EventLabel.js
----------------------------------------------------------------------------
 (C)2020 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.5.0 2023/08/17 ラベルのZ座標を変更できる機能を追加
 1.4.0 2023/05/13 すべてのラベルを一時的に非表示にできる機能を追加
 1.3.1 2022/10/16 ベースプラグインの説明を追加
 1.3.0 2022/10/16 ラベル位置によってはテールを上向きに表示するよう変更
 1.2.0 2022/10/16 ラベルにフキダシ(テール)を表示できる機能を追加
 1.1.6 2022/02/01 イベントラベルに制御文字を使ったとき、変数値の変更がリアルタイムで反映されない問題を修正
 1.1.5 2021/11/18 メモ欄<LB>に半角数値のみを指定するとエラーになる問題を修正
 1.1.4 2021/06/12 ラベルのZ座標をイベントのプライオリティとは無関係に6で設定するよう変更
 1.1.3 2021/05/07 動的生成したイベントを消去したときにラベルが残ってしまう競合を修正
 1.1.2 2020/09/26 1.1.0でイベントIDを0で指定していた場合に表示されない問題を修正
 1.1.1 2020/09/26 ラベル表示条件のヘルプを書き忘れていたので追加
 1.1.0 2020/09/26 ラベルの表示条件にスイッチ、セルフスイッチを追加
                  コマンドで他のイベントのラベルを表示、非表示できる機能を追加
 1.0.2 2020/09/26 英語版のヘルプにベースプラグインの説明を追記
 1.0.1 2020/09/18 英語版のヘルプを作成
 1.0.0 2020/09/17 初版
----------------------------------------------------------------------------
 [Blog]   : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @plugindesc EventLabelPlugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/EventLabel.js
 * @author triacontane
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @param showDefault
 * @desc You don't need to set anything up to see the label in the event name.
 * @default false
 * @type boolean
 *
 * @param hideNoImage
 * @desc If the image of the event is not specified, the label will not be displayed either.
 * @default true
 * @type boolean
 *
 * @param hideNameEv
 * @desc When the default display is enabled, events whose event name begins with "EV" are not labeled.
 * @default true
 * @type boolean
 *
 * @param fontSize
 * @desc The font size of the label.
 * @default 16
 *
 * @param backColor
 * @desc The background color of the label.
 * @default rgba(0,0,0,0.5)
 *
 * @param padding
 * @desc The padding of the label.
 * @default 2
 *
 * @param invisibleSwitchId
 * @desc 指定したスイッチがONのとき、すべてのラベルを非表示にします。
 * @default 0
 * @type switch
 *
 * @command SHOW_LABEL
 * @text Show label
 * @desc Displays the label of the event. If you specify empty, the label is cleared.
 *
 * @arg eventId
 * @text Event ID
 * @desc Target event id.
 * @default 0
 *
 * @arg text
 * @text Label text
 * @desc Label text
 * @default
 * @type multiline_string
 *
 * @arg fontSize
 * @text Font size
 * @desc The font size of the label.
 * @default 0
 *
 * @param showTail
 * @text Show label tail
 * @desc Show label tail
 * @default false
 * @type boolean
 *
 * @param tailWidth
 * @text Tail width
 * @desc テールを表示する場合の横幅です。
 * @default 12
 * @type number
 *
 * @param tailHeight
 * @text テール高さ
 * @desc テールを表示する場合の高さです。
 * @default 8
 * @type number
 *
 * @help EventLabel.js
 *　
 * The label appears at the top of the event. Specify the following in the memo field.
 * <LB:name> // The label [name] will be displayed on top of the event.
 * <LB> // the label will be displayed with the event name.
 * <LB_No> // the label will not be displayed. (When "Show by Default" is enabled.)
 * <LB_X:-4> // Shifts the label's position in the X direction.
 * <LB_Y:-4> // Shifts the label's position in the Y direction.
 * <LB_S:1>  // The label is displayed when the switch [1] is ON.
 * <LB_S:A>  // The label is displayed when the self-switch [A] is ON.
 * <LB_Z:2>
 *
 * The base plugin "PluginCommonBase.js" is required to use this plugin.
 * The "PluginCommonBase.js" is here.
 * (MZ install path)dlc/BasicResources/plugins/official/PluginCommonBase.js
 *
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc イベントラベルプラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/EventLabel.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param showDefault
 * @text デフォルトで表示
 * @desc 何も設定しなくてもイベント名でラベルが表示されます。
 * @default false
 * @type boolean
 *
 * @param hideNoImage
 * @text 画像がなければ表示しない
 * @desc イベントの画像が指定されていないとラベルも表示されなくなります。
 * @default true
 * @type boolean
 *
 * @param hideNameEv
 * @text EVはデフォルト表示しない
 * @desc デフォルト表示が有効なとき、イベント名が「EV」で始まるイベントはラベル表示しません。
 * @default true
 * @type boolean
 *
 * @param fontSize
 * @text フォントサイズ
 * @desc ラベルのフォントサイズです。
 * @default 16
 * @type number
 *
 * @param backColor
 * @text 背景カラー
 * @desc ラベルの背景色です。赤、緑、青、不透明度の順で設定します。
 * @default rgba(0,0,0,0.5)
 *
 * @param padding
 * @text 余白
 * @desc ラベルの余白です。
 * @default 2
 *
 * @param showTail
 * @text テール表示
 * @desc ラベルの下部に三角形のテールがデフォルトで表示されます。
 * @default false
 * @type boolean
 *
 * @param tailWidth
 * @text テール横幅
 * @desc テールを表示する場合の横幅です。
 * @default 12
 * @type number
 *
 * @param tailHeight
 * @text テール高さ
 * @desc テールを表示する場合の高さです。
 * @default 8
 * @type number
 *
 * @param invisibleSwitchId
 * @text 非表示スイッチID
 * @desc 指定したスイッチがONのとき、すべてのラベルを非表示にします。
 * @default 0
 * @type switch
 * 
 * @command SHOW_LABEL
 * @text ラベル表示
 * @desc イベントのラベルを表示します。空を指定するとラベルが消去されます。マップ移動で元に戻ります。
 *
 * @arg eventId
 * @text イベントID
 * @desc ラベルを表示するイベントIDです。0を指定するとコマンドを実行したイベントになります。
 * @default 0
 *
 * @arg text
 * @text ラベルテキスト
 * @desc ラベルテキストです。
 * @default 
 * @type multiline_string
 *
 * @arg fontSize
 * @text フォントサイズ
 * @desc ラベルのフォントサイズです。0を指定した場合、デフォルトサイズになります。
 * @default 0
 *
 * @help EventLabel.js
 *　
 * イベントの上部にラベルを表示します。メモ欄に以下の通り指定してください。
 * <LB:name> // ラベル[name]が表示されます。
 * <LB>      // イベント名でラベルが表示されます。
 * <LB_No>   // ラベルが表示されなくなります。
 * (『デフォルトで表示』が有効な場合)
 * <LB_X:4>  // ラベルのX方向の位置をずらします。
 * <LB_Y:-4> // ラベルのY方向の位置をずらします。
 * <LB_S:1>  // スイッチ[1]がONのときラベル表示します。
 * <LB_S:A>  // セルフスイッチ[A]がONのときラベル表示します。
 * <LB_T:true> // テールを表示します。プラグインパラメータより優先されます。
 * <LB_T:false> // テールを表示しません。プラグインパラメータより優先されます。
 * <LB_Z:2> // ラベルのZ座標を2(通常キャラの下)にします。デフォルトは6です。
 *
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const param  = PluginManagerEx.createParameter(script);

    PluginManager.registerCommand(PluginManagerEx.findPluginName(script), 'SHOW_LABEL', function(args) {
        const id = PluginManagerEx.convertVariables(args.eventId) || this.eventId();
        const event = $gameMap.event(id);
        if (event) {
            event.setEventLabel(args.text, PluginManagerEx.convertVariables(args.fontSize));
        }
    });

    /**
     * Game_Event
     */
    const _Game_Event_initialize    = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function() {
        _Game_Event_initialize.apply(this, arguments);
        this._labelText = this.findLabelName();
        this._labelSize = param.fontSize || 16;
        this._labelX = PluginManagerEx.findMetaValue(this.event(), 'LB_X') || 0;
        this._labelY = PluginManagerEx.findMetaValue(this.event(), 'LB_Y') || 0;
        this._labelZ = PluginManagerEx.findMetaValue(this.event(), 'LB_Z') || 0;
        this._labelSwitch = PluginManagerEx.findMetaValue(this.event(), 'LB_S') || null;
        this._labelTail = PluginManagerEx.findMetaValue(this.event(), 'LB_T');
    };

    Game_Event.prototype.findLabelX = function() {
        return this.screenX() + this._labelX;
    };

    Game_Event.prototype.findLabelY = function() {
        return this.screenY() + this._labelY - $gameMap.tileHeight();
    };

    Game_Event.prototype.findLabelZ = function() {
        return this._labelZ || 6;
    };

    Game_Event.prototype.isLabelTailTop = function() {
        return this.isNeedLabelTail() && this._labelY - $gameMap.tileHeight() >= 0;
    };

    Game_Event.prototype.findLabelName = function() {
        const metaLabel = this.event().meta['LB'];
        if (metaLabel && metaLabel !== true) {
            return String(metaLabel);
        } else {
            return param.showDefault || metaLabel ? this.findLabelEventName() : null;
        }
    };

    Game_Event.prototype.findLabelEventName = function() {
        if (PluginManagerEx.findMetaValue(this.event(), 'LB_No')) {
            return null;
        }
        const name = this.event().name;
        if (param.hideNameEv && name.match(/^EV/g)) {
            return null;
        } else {
            return name;
        }
    };

    Game_Event.prototype.setEventLabel = function(text, size) {
        this._labelText = text;
        if (size > 0) {
            this._labelSize = size;
        }
    };

    Game_Event.prototype.getEventLabel = function() {
        if (this.isValidEventLabel()) {
            return {text: this._labelText, size: this._labelSize};
        } else {
            return null;
        }
    };

    Game_Event.prototype.isValidEventLabel = function() {
        return this._labelText && !this._erased &&
            !this.isHideLabelBecauseOfNoImage() && this.isNearTheScreen() &&
            this.isValidEventLabelSwitch();
    };

    Game_Event.prototype.isValidEventLabelSwitch = function() {
        if (!this._labelSwitch) {
            return true;
        } else if (isFinite(this._labelSwitch)) {
            return $gameSwitches.value(this._labelSwitch);
        } else {
            const key = [this._mapId, this._eventId, this._labelSwitch.toUpperCase()];
            return $gameSelfSwitches.value(key);
        }
    };

    Game_Event.prototype.isHideLabelBecauseOfNoImage = function() {
        return param.hideNoImage && !this._characterName && !this._tileId;
    };

    Game_Event.prototype.isNeedLabelTail = function() {
        return this._labelTail !== undefined ? this._labelTail : param.showTail;
    };

    /**
     * Spriteset_Map
     */
    const _Spriteset_Map_initialize    = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        _Spriteset_Map_initialize.apply(this, arguments);
        this._eventLabelSprites = {};
    };

    const _Spriteset_Map_update    = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.apply(this, arguments);
        this.updateEventLabel();
    };

    Spriteset_Map.prototype.updateEventLabel = function() {
        for (const event of $gameMap.events()) {
            if (event.getEventLabel()) {
                this.addEventLabel(event.eventId());
            } else {
                this.removeEventLabel(event.eventId());
            }
        }
        Object.keys(this._eventLabelSprites).forEach(id => {
            if (!this._eventLabelSprites[id].event()) {
                this.removeEventLabel(id);
            }
        });
    };

    Spriteset_Map.prototype.addEventLabel = function(id) {
        if (this._eventLabelSprites[id]) {
            return;
        }
        const sprite                = new Sprite_EventLabel(id);
        this._eventLabelSprites[id] = sprite
        this._tilemap.addChild(sprite);
    };

    Spriteset_Map.prototype.removeEventLabel = function(id) {
        if (!this._eventLabelSprites[id]) {
            return;
        }
        this._tilemap.removeChild(this._eventLabelSprites[id]);
        delete this._eventLabelSprites[id];
    };

    /**
     * Sprite_EventLabel
     */
    class Sprite_EventLabel extends Sprite {
        constructor(eventId) {
            super();
            this._eventId = eventId;
            this._text    = null;
            this._size    = 0;
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
            this.update();
        }

        update() {
            super.update();
            const event = this.event();
            if (!event) {
                return;
            }
            this.updateLabel(event);
            this.updatePosition(event);
            this.updateVisibly();
        }

        updateVisibly() {
            if (param.invisibleSwitchId) {
                this.visible = !$gameSwitches.value(param.invisibleSwitchId);
            }
        }

        updatePosition(event) {
            this.x = event.findLabelX();
            this.y = event.findLabelY() - this.bitmap.height / 2;
            this.z = event.findLabelZ();
        }

        updateLabel(event) {
            const label   = event.getEventLabel();
            if (!label) {
                return;
            }
            const newText = PluginManagerEx.convertEscapeCharacters(label.text);
            if (this._text !== newText || this._size !== label.size) {
                this._text = newText;
                this._size = label.size;
                this.refresh();
            }
        }

        event() {
            return $gameMap.event(this._eventId);
        }

        refresh() {
            const dummyWindow = new Window_Dummy();
            this.bitmap       = dummyWindow.createTextBitmap(this._text, this._size, this.event());
        }
    }

    /**
     * Window_Dummy
     */
    class Window_Dummy extends Window_Base {
        constructor() {
            super(new Rectangle());
        }

        createTextBitmap(text, fontSize, event) {
    this._fontSize = fontSize;
    this.resetFontSettings();
    const p = param.padding || 0;

// Define a custom spacing factor to adjust line spacing
const lineSpacingFactor = 0.6; // Adjust this value to control spacing

// Calculate text size for multiline text
const lines = text.split('\n');
// Use the line height specified in the Window_Base class and apply the spacing factor
const lineHeight = this.lineHeight() * lineSpacingFactor;
const textWidth = Math.max(...lines.map(line => this.textWidth(line)));
const windowWidth = textWidth + p * 2;
const windowHeight = lines.length * lineHeight + p * 2;



    this.padding = 0;
    this.move(0, 0, windowWidth, windowHeight);

    const labelHeight = this.height;
    if (event.isNeedLabelTail()) {
        this.height += param.tailHeight;
    }

    this.createContents();
    const fillColor = param.backColor || 'rgba(0,0,0,0.5)';
    const y = event.isLabelTailTop() ? param.tailHeight : 0;
    this.contents.fillRect(0, y, this.width, labelHeight, fillColor);
    if (event.isNeedLabelTail()) {
        this.createLabelTail(labelHeight, fillColor, event);
    }

    // Calculate Y position for multiline text with reduced line spacing
    const yPositions = Array.from({ length: lines.length }, (_, i) => i * lineHeight);

    // Draw each line centered within the window
    lines.forEach((line, index) => {
        const y = yPositions[index];
        const x = Math.floor((windowWidth - this.textWidth(line)) / 2);
        this.drawTextEx(line, x + p, p + y, textWidth);
    });

    const bitmap = this.contents;
    this.contents = null;
    this.destroy();
    return bitmap;
}

        createLabelTail(labelHeight, fillColor, event) {
            const ctx = this.contents.context;
            ctx.beginPath();
            const halfWidth = param.tailWidth / 2;
            const baseX = (this.width / 2 - event.findLabelX() + event.screenX()).clamp(halfWidth, this.width - halfWidth);
            if (event.isLabelTailTop()) {
                ctx.moveTo(baseX - halfWidth, this.height - labelHeight);
                ctx.lineTo(baseX + halfWidth, this.height - labelHeight);
                ctx.lineTo(baseX, 0);
            } else {
                ctx.moveTo(baseX - halfWidth, labelHeight);
                ctx.lineTo(baseX + halfWidth, labelHeight);
                ctx.lineTo(baseX, this.height);
            }
            ctx.closePath();
            ctx.fillStyle = fillColor
            ctx.fill();
        }

        resetFontSettings() {
            super.resetFontSettings();
            this.contents.fontSize = this._fontSize;
        }
    }
})();