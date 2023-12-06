//=============================================================================
// ST0RMTiger - Actor based HP/MP/TP Customization (inkl. Gauge colors)
// ST0RM_ActorBased_HP_MP_TP_Customization.js
//=============================================================================

  var Imported = Imported || {};
  Imported.ST0RM_ActorBased_HP_MP_TP_Customization = true;

  var ST0RM = ST0RM || {};
  ST0RM.ABHPMPTP = ST0RM.ABHPMPTP || {};

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc v1.0
 * Customize Names and Colors for MP/HP/TP and it's Gauges for each Actor
 * (even being in the same class)
 * 
 * @author ST0RMTiger
 * 
 * @param ActorHPGaugeConfig
 * @type struct<ActorConfig>[]
 * 
 * @param ActorMPGaugeConfig
 * @type struct<ActorConfig>[]
 * 
 * @param ActorTPGaugeConfig
 * @type struct<ActorConfig>[]
 * 
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 * 
 * This plugin lets you completely customize HP / MP / TP Names and Gauges
 * (including colors) for each Actor - independently of it's class.
 * 
 * Everything is effecting both Battle-Menu AND Game-Menu.
 * 
 * Customization is done completely in the Plugin Manager. No notetags
 * are used. Define HP / MP / TP styles independently for as many actors as
 * you want. Choose whether you want to keep standard maker functionality for
 * each single possible customization option. You can combine everything or
 * nothing as you need it.
 * 
 * If you want to apply the same settings of a gauge to more that 1 actor,
 * just set the parameter 'MakeItSameAs' to that actor. All other parameters
 * will be ignored and the HP, MP or TP gauge with this parameter set will
 * look like the one of your "template" actor (it is a normal actor, no need
 * to make an actor just for being a "template"!)
 * 
 * To keep system standard (text / color) for a parameter, just leave it blank.
 * NOTE: The maker plugin manager is a bit tricky when trying to reset a value
 * to blank that had been set to something before. If you try this on the page
 * where you shall define a number (as for the colors for example) it will fall
 * back to 0 if you delete and confirm. 0 means "white" and not "system standard".
 * You empty the value switching to the "text" tab and delete the value here and
 * confirm with "ok". Then the value is set back to empty.
 * 
 * Following text commands are supported to be used inside HP/MP/TP Names:
 * - \C[x] with x specifying a color
 * - \C to return to normal color (as specified in the parameters)
 * - \I[x] to place Icon with ID x
 * - { to make font bigger
 * - } to make font smaller
 * Commands 'c' and 'i' are case insensitive.
 * Examples:
 * - L\C[3]i\C[12]f\Ce for colorful word "Life"
 * - \{Po\}w\}e\}r for the word power with each character becoming smaller
 *   (until reaching minimum font size)
 * - H\i[87]P for Icon 87 (Star) being placed between letters "H" and "P"
 * NOTE: Icons will be drawn smaller if text would otherwise exceed
 * GaugeNameMaxWidth. To scale them normally, don't put too much text beside
 * or raise GaugeNameMaxWidth.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * - If using Icons, these are scaled:
 *   - There is only 26 pixel space in height so at least they are scaled to
 *     26x26
 *   - If Text Width is not defined higher, icons are narrowed with the same
 *     factor as text is to fit in that defined overall width. They are scaled
 *     in x and y directions though to keep x:y relation even unter this
 *     conditions. You can use this to shrink Icons also (just specify a smaller
 *     value for "GaugeNameMaxWidth" so that a full size icon (plus text)
 *     doesn't fit in)!
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * v1.0
 * - first release version for MZ
 * - based my the MV Plugin version 1.1
 * - it was widely a complete rewrite as both maker are really different in
 *   drawing status gauges!
 * - additionally to the MV version it it possible to make an actor gauge look
 *   as the gauge of another actor (parameter 'MakeItSameAs')
 * 
 * ============================================================================
 * Warranty
 * ============================================================================
 * 
 * No warranty at all! All use is in your own responsibility!
 * 
 * ============================================================================
 * License
 * ============================================================================
 * 
 * You may use this plugin in every rpg maker project, even adult and commercial.
 * 
 * You have to credit ST0RMTiger.
 * 
 * You are not allowed to commercialize the plugin, only your game itself that
 * may use this plugin.
 * 
 * All distributions, modifications etc. of this plugin has to keep the information
 * written here and has to keep the license conditions and attribution of ST0RMTiger.
 * 
 */
/*~struct~ActorConfig:
 * @param Actor
 * @type actor
 * @min 1
 * @max 1000
 * @default 0
 * 
 * @param MakeItSameAs
 * @type actor
 * 
 * @param GaugeName
 * @type text
 * @default Name
 * 
 * @param GaugeNameMaxWidth
 * @type number
 * @default 28
 *
 * @param GaugeNameColor
 * @type number
 * @max 31
 *
 * @param GaugeGradientColor1
 * @type number
 * @max 31
 * 
 * @param GaugeGradientColor2
 * @type number
 * @max 31
 * 
 * @param NumberCurrentColor
 * @type number
 * @max 31
 * 
 * @param NumberCurrentChangeColorBelowThreshold
 * @type boolean
 * @default false
 * 
 * @param NumberCurrentThreshold
 * @type number
 * @decimals 2
 * @min 0
 * @max 1
 * 
 * @param NumberCurrentColorBelowThreshold
 * @type number
 * @max 31
 * @default 18
 * 
 * @param NumberCurrentDyingColor
 * @type number
 * @max 31
 * 
 * @param NumberCurrentDeathColor
 * @type number
 * @max 31
 * 
 * @param ShowMaxValue
 * @type boolean
 * @default false
 * 
 * @param NumberMaxColor
 * @type number
 * @max 31
 * 
 * @param NumbersHidden
 * @type boolean
 * @default false
 */
//=============================================================================


//=============================================================================
// Parameters
//=============================================================================

parameters = PluginManager.parameters('ST0RM_ActorBased_HP_MP_TP_Customization');
ST0RM.ABHPMPTP.PARAMS = parameters || {};

ST0RM.ABHPMPTP.actorParams = function(type,actor_id) {
    if (type === 'HP') {
        actors_params = JSON.parse(ST0RM.ABHPMPTP.PARAMS.ActorHPGaugeConfig || '{}');
    } else if (type === 'MP') {
        actors_params = JSON.parse(ST0RM.ABHPMPTP.PARAMS.ActorMPGaugeConfig || '{}');
    } else if (type === 'TP') {
        actors_params = JSON.parse(ST0RM.ABHPMPTP.PARAMS.ActorTPGaugeConfig || '{}');
    } else {
        return null;
    }
    for (const key in actors_params) {
        if (Object.hasOwnProperty.call(actors_params, key)) {
            const element = actors_params[key];
            actor_params = JSON.parse(element);
            if(actor_params.Actor === String(actor_id)) {
                return actor_params;
            }
        }
    }
    return null;
}

ST0RM.ABHPMPTP.unpackedActorGaugeParams = {};
unpackAllActorParams();

function unpackAllActorParams() {
    let notesForCopy = []; // for the "makeItSameAs" functionality
    let actors_params = JSON.parse(ST0RM.ABHPMPTP.PARAMS.ActorHPGaugeConfig || '{}');
    for (const key in actors_params) {
        if (Object.hasOwnProperty.call(actors_params, key)) {
            const element = actors_params[key];
            let actor_params = JSON.parse(element);
            let actor_id = actor_params.Actor;
            //make it same?
            const newKey = actor_params.MakeItSameAs;
            if (newKey && newKey !== '0') {
                let note = {};
                note.actor_id = actor_id;
                note.type = 'hp';
                note.template = newKey;
                notesForCopy.push(note)
                continue;
            }
            // ---
            delete actor_params.Actor; // remove "Actor: Number" because in new object this is the key and not a property
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] = ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] || {};
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id]['hp'] = actor_params;
        }
    }

    actors_params = JSON.parse(ST0RM.ABHPMPTP.PARAMS.ActorMPGaugeConfig || '{}');
    for (const key in actors_params) {
        if (Object.hasOwnProperty.call(actors_params, key)) {
            const element = actors_params[key];
            let actor_params = JSON.parse(element);
            let actor_id = actor_params.Actor;
            //make it same?
            const newKey = actor_params.MakeItSameAs;
            if (newKey && newKey !== '0') {
                let note = {};
                note.actor_id = actor_id;
                note.type = 'mp';
                note.template = newKey;
                notesForCopy.push(note)
                continue;
            }
            // ---
            delete actor_params.Actor; // remove "Actor: Number" because in new object this is the key and not a property
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] = ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] || {};
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id]['mp'] = actor_params;
        }
    }

    actors_params = JSON.parse(ST0RM.ABHPMPTP.PARAMS.ActorTPGaugeConfig || '{}');
    for (const key in actors_params) {
        if (Object.hasOwnProperty.call(actors_params, key)) {
            const element = actors_params[key];
            let actor_params = JSON.parse(element);
            let actor_id = actor_params.Actor;
            //make it same?
            const newKey = actor_params.MakeItSameAs;
            if (newKey && newKey !== '0') {
                let note = {};
                note.actor_id = actor_id;
                note.type = 'mp';
                note.template = newKey;
                notesForCopy.push(note)
                continue;
            }
            // ---
            delete actor_params.Actor; // remove "Actor: Number" because in new object this is the key and not a property
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] = ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] || {};
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id]['tp'] = actor_params;
        }
    }

    actors_params = JSON.parse(ST0RM.ABHPMPTP.PARAMS.ActorTIMEGaugeConfig || '{}');
    for (const key in actors_params) {
        if (Object.hasOwnProperty.call(actors_params, key)) {
            const element = actors_params[key];
            let actor_params = JSON.parse(element);
            let actor_id = actor_params.Actor;
            //make it same?
            const newKey = actor_params.MakeItSameAs;
            if (newKey && newKey !== '0') {
                let note = {};
                note.actor_id = actor_id;
                note.type = 'time';
                note.template = newKey;
                notesForCopy.push(note)
                continue;
            }
            // ---
            delete actor_params.Actor; // remove "Actor: Number" because in new object this is the key and not a property
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] = ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id] || {};
            ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id]['time'] = actor_params;
        }
    }

    //copy what is to copy
    for (const key in notesForCopy) {
        const element = notesForCopy[key];
        let template = ST0RM.ABHPMPTP.unpackedActorGaugeParams[element.template][element.type];
        ST0RM.ABHPMPTP.unpackedActorGaugeParams[element.actor_id] = ST0RM.ABHPMPTP.unpackedActorGaugeParams[element.actor_id] || {};
        ST0RM.ABHPMPTP.unpackedActorGaugeParams[element.actor_id][element.type] = template;
    }
}

ST0RM.ABHPMPTP.getActorGaugeParam = function(gauge_type,actor_id,param) {
    let actorParams = null;
    if (ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id]) {
        actorParams = ST0RM.ABHPMPTP.unpackedActorGaugeParams[actor_id][gauge_type];
        if(actorParams && actorParams[param]) {
            return actorParams[param];
        }
    }
    return null; // if no customized value is present function returns null
}


//=============================================================================
// Sprite_Gauge
//=============================================================================

// make these functions dependent from "this._battler"
// which is an object of class "Game_Actor" and has the property "_actorId"

ST0RM.former_Sprite_Gauge_prototype_label = Sprite_Gauge.prototype.label;
Sprite_Gauge.prototype.label = function() {
    let param = 'GaugeName';
    let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    return value ? value : ST0RM.former_Sprite_Gauge_prototype_label.call(this);
};

ST0RM.former_Sprite_Gauge_prototype_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
    let param = 'GaugeGradientColor1';
    let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    return value ? ColorManager.textColor(value) : ST0RM.former_Sprite_Gauge_prototype_gaugeColor1.call(this);
};

ST0RM.former_Sprite_Gauge_prototype_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
    let param = 'GaugeGradientColor2';
    let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    return value ? ColorManager.textColor(value) : ST0RM.former_Sprite_Gauge_prototype_gaugeColor2.call(this);
};

ST0RM.former_Sprite_Gauge_prototype_drawLabel = Sprite_Gauge.prototype.drawLabel;
// This is the only function that is overridden in every case at the moment
Sprite_Gauge.prototype.drawLabel = function() {
    const label = this.label(); // brings the adepted text already
    const x = this.labelOutlineWidth() / 2;
    const y = this.labelY();
    //const width = this.bitmapWidth(); //(gives 128 if nothing else is changed)
    // a max. of 28 would be necessary to not draw over the bars
    let param = 'GaugeNameMaxWidth';
    let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    const width = value ? value : 28; // text will only be stretched if unstreched text is wider that this value
    //const height = this.textHeight(); //(gives 24 if nothing else is changed)
    this.setupLabelFont();
    this.bitmap.paintOpacity = this.labelOpacity();

    //this.bitmap.drawText(label, x, y, width, height, "left");
    //use own Text Processor to support icons and colors per escape blocks
    myTextProcessor = new ST0RM.textProcessor(label);
    myTextProcessor.setDestination(this,x,y);
    myTextProcessor.setMaxWidth(width);
    myTextProcessor.processText();
    myTextProcessor.drawText();

    this.bitmap.paintOpacity = 255;
}

ST0RM.former_Sprite_Gauge_prototype_labelColor = Sprite_Gauge.prototype.labelColor;
Sprite_Gauge.prototype.labelColor = function() {
    if (this._changeColorNow) {
        return this._changeColorNow;
    } // else
    let param = 'GaugeNameColor';
    let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    return value ? ColorManager.textColor(value) : ST0RM.former_Sprite_Gauge_prototype_labelColor.call(this);
};

// Not implemented yet
//labelOutlineColor
//labelOutlineWidth

ST0RM.former_Sprite_Gauge_prototype_drawValue = Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
    let param = 'NumbersHidden';
    let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    // do not draw numbers if parameter === 'true' (comes as a string)
    if(value === 'true') {
        return;
    } // else

    // make it possible to show max max value
    param = 'ShowMaxValue';
    value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    if(value === 'true') {

        const currentValue = this.currentValue();
        const width = this.bitmapWidth();
        const height = this.textHeight();
        
        this._drawNumberMaxNow = true; // needed to distinguish current and max number colors in function "valueColor"
        this.setupValueFont();
        this.bitmap.drawText("/"+this._maxValue, 0, 0, width, height, "right");
        this._drawNumberMaxNow = false;
        let w = this.bitmap.measureTextWidth("/"+this._maxValue);
        
        this.setupValueFont();
        this.bitmap.drawText(currentValue, -w, 0, width, height, "right");
        
        return;
    } // else call standard function
    ST0RM.former_Sprite_Gauge_prototype_drawValue.call(this);
};

ST0RM.former_Sprite_Gauge_prototype_valueColor = Sprite_Gauge.prototype.valueColor;
Sprite_Gauge.prototype.valueColor = function() {
    // make all hp/mp/tp/time numbers dependent from "dying" or "death" states with configurable colors
    if (this._battler.isDead()) {
        let param = 'NumberCurrentDeathColor';
        let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
        return value ? ColorManager.textColor(value) : ST0RM.former_Sprite_Gauge_prototype_valueColor.call(this);
    } else if (this._battler.isDying()) {
        let param = 'NumberCurrentDyingColor';
        let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
        return value ? ColorManager.textColor(value) : ST0RM.former_Sprite_Gauge_prototype_valueColor.call(this);
    } else if (this._drawNumberMaxNow) {
        let param = 'NumberMaxColor';
        let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
        return value ? ColorManager.textColor(value) : ST0RM.former_Sprite_Gauge_prototype_valueColor.call(this);
    } else {
        let param = 'NumberCurrentThreshold';
        let threshold = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
        let relativecurrentValue = 1;
        switch (this._statusType) {
            case 'hp':
                relativecurrentValue = this._battler.hp/this._battler.mhp;
                break;
            case 'mp':
                relativecurrentValue = this._battler.mp/this._battler.mmp;
                break;
            case 'tp':
                relativecurrentValue = this._battler.tp/this._battler.mtp;
                break;
            case 'time':
                relativecurrentValue = this._battler.tpbChargeTime(); // max = 1
                break;
            default:
                break;
        }
        if(threshold && (relativecurrentValue < threshold)) {
            let param = 'NumberCurrentColorBelowThreshold';
            let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
            if (value) {
                return ColorManager.textColor(value);
            }
        }
    } // 'else' draw "normal" color as defined or if not defined as maker standard
    // to-do: make it dependent from threshold
    let param = 'NumberCurrentColor';
    let value = ST0RM.ABHPMPTP.getActorGaugeParam(this._statusType,this._battler._actorId,param);
    return value ? ColorManager.textColor(value) : ST0RM.former_Sprite_Gauge_prototype_valueColor.call(this);
};

// Not implemented yet
//valueOutlineColor
//valueOutlineWidth
/*Sprite_Gauge.prototype.valueFontSize = function() {
    return $gameSystem.mainFontSize() - 6;
};*/


//=============================================================================
// New general ST0RM objects & functions
//=============================================================================
//object ST0RM.textProcessor constructor

ST0RM.textProcessor = function (inputText) {
    this.inputText = inputText;
    this.window = {};
    this.x = 0;
    this.y = 0;
    this.formerTextSize = 0;
    this.dest = {
        commands: {},
        text: {}
    };
    this.maxWidth = 0;
    //this.formerColor = 0;
    processIndex = 0;
    this.theoreticalTextWidth = 0;
    this.numberOfIcons = 0;
    this.theoreticalTotalWidth = 0;
    this.drawerX = 0;
    this.drawerY = 0;
    this.drawerScaleFactor = 1;
    this.drawerSkip = 0;
}

ST0RM.textProcessor.prototype.setDestination = function (sprite, x, y) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.formerTextSize = sprite.labelFontSize();
}

ST0RM.textProcessor.prototype.setMaxWidth = function (w) {
    this.maxWidth = w;
}

ST0RM.textProcessor.prototype.makeTextCommand = function(code, textState) {
    let pos = textState.index-1;

    switch (code) {
    case 'C':
        this.dest.commands[pos] = {};
        this.dest.commands[pos].type = 'C';
        //this.formerColor = this.sprite.labelColor();
        this.dest.commands[pos].value = ColorManager.textColor(Window_Base.prototype.obtainEscapeParam(textState));
        this.cutEscapeBlock(pos);
        break;
    case 'CEnd':
        this.dest.commands[pos+2] = {};
        this.dest.commands[pos+2].type = 'C';
        //this.dest.commands[pos+2].value = this.formerColor;
        this.cutEscapeCharacter('C',pos+2);
        break;
    case 'I':
        this.dest.commands[pos] = {};
        this.dest.commands[pos].type = 'I';
        this.dest.commands[pos].value = Window_Base.prototype.obtainEscapeParam(textState);
        this.cutEscapeBlock(pos);
        this.numberOfIcons++;
        break;
    case '{':
        this.makeFontBigger();
        this.dest.commands[pos] = {};
        this.dest.commands[pos].type = '{';
        this.dest.commands[pos].value = '';
        this.cutEscapeCharacter('{',pos);
        break;
    case '}':
        this.makeFontSmaller();
        this.dest.commands[pos] = {};
        this.dest.commands[pos].type = '}';
        this.dest.commands[pos].value = '';
        this.cutEscapeCharacter('}',pos);
        break;
    }
};

ST0RM.textProcessor.prototype.cutEscapeBlock = function (i) {
    let escapeBlock = Window_Base.prototype.convertEscapeCharacters(this.getEscapeBlock(i));
    this.dest.commands[i].skip = escapeBlock.length-1;
    this.theoreticalTextWidth = this.theoreticalTextWidth - this.sprite.bitmap.measureTextWidth(escapeBlock);
}

ST0RM.textProcessor.prototype.getEscapeBlock = function (i) {
    let blockStart = i-1
    let blockEnd = this.inputText.indexOf(']',i);
    return this.inputText.substring(blockStart,blockEnd+1);
}

ST0RM.textProcessor.prototype.cutEscapeCharacter = function (c,i) {
    let escapeBlock = Window_Base.prototype.convertEscapeCharacters('\\')+c;
    this.dest.commands[i].skip = escapeBlock.length-1;
    this.theoreticalTextWidth = this.theoreticalTextWidth - this.sprite.bitmap.measureTextWidth(escapeBlock);
}

ST0RM.textProcessor.prototype.processText = function () {
    let myText = Window_Base.prototype.convertEscapeCharacters(this.inputText);
    let myTextState = {};
    myTextState.index = 0;
    myTextState.text = myText;
    myTextState.x = this.x;
    myTextState.y = this.y;
    myTextState.height = 14;
    
    for (this.processIndex = 0; this.processIndex < myTextState.text.length; this.processIndex++) {
        myTextState.index = this.processIndex;
        let c = myTextState.text[myTextState.index];
        switch (c) {
        case '\n':
            //Window_Base.prototype.processNewLine(textState);
            break;
        case '\f':
            //Window_Base.prototype.processNewPage(textState);
            break;
        case '\x1b':
            if (myTextState.text[myTextState.index+1].toUpperCase() === 'C' && myTextState.text[myTextState.index+2] !== '[') {
                this.makeTextCommand('CEnd', myTextState); // if escaped \Ctext instead of \C[x]
            } else {
                myTextState.index++;
                let escapeCode = Window_Base.prototype.obtainEscapeCode(myTextState);
                this.makeTextCommand(escapeCode, myTextState);
            }
            break;
        default:
            //nothing to do here
            break;
        }
        this.theoreticalTextWidth = this.theoreticalTextWidth + this.sprite.bitmap.measureTextWidth(c);
    }

    //reset fontsize to start-size (need to change in betweentime to calculate with even without drawing text)
    this.sprite.bitmap.fontSize = this.formerTextSize;
}

ST0RM.textProcessor.prototype.drawText = function () {
    if(this.maxWidth > 0) {
        this.theoreticalTotalWidth = this.theoreticalTextWidth + this.numberOfIcons*ImageManager.iconWidth;
        if (this.theoreticalTotalWidth > this.maxWidth) {
            this.drawerScaleFactor = this.maxWidth/this.theoreticalTotalWidth;
        }
    }

    for (let i = 1; i < this.inputText.length+1; i++) {
        if (this.drawerSkip > 0) {
            this.drawerSkip--;
            continue;
        }
        const c = this.inputText[i-1];
        if (this.dest.commands[i]) {
            switch (this.dest.commands[i].type) {
            case 'C':
                this.sprite._changeColorNow = this.dest.commands[i].value || null;
                this.drawerSkip = this.dest.commands[i].skip;
                break;
            case 'I':
                this.drawIconWidthScaled(this.dest.commands[i].value,this.x+this.drawerX,this.y);
                this.drawerSkip = this.dest.commands[i].skip;
                break;
            case '{':
                formerTextHeight = this.sprite.bitmap.fontSize+8;
                this.makeFontBigger();
                currentTextHeight = this.sprite.bitmap.fontSize+8;
                this.drawerY = this.drawerY + (formerTextHeight-currentTextHeight)/2.75;
                this.drawerSkip = this.dest.commands[i].skip;
                break;
            case '}':
                formerTextHeight = this.sprite.bitmap.fontSize+8;
                this.makeFontSmaller();
                currentTextHeight = this.sprite.bitmap.fontSize+8;
                this.drawerY = this.drawerY + (formerTextHeight-currentTextHeight)/2.75;
                this.drawerSkip = this.dest.commands[i].skip;
                break;
            default:
                // nothing
                break;
            }
        } else {
            this.drawNormalCharacterWidthScaled(c);
        }   
    }
    // reset fontsize to start-size
    this.sprite.bitmap.fontSize = this.formerTextSize;
    // reset textColor if changed by \c code
    this.sprite._changeColorNow = null;
}

// Make those functions of Window_Base work with the textprocessor sprite.bitmap
ST0RM.textProcessor.prototype.makeFontBigger = function() {
    if (this.sprite.bitmap.fontSize <= 96) {
        this.sprite.bitmap.fontSize += 6; // maker standard is +12
    }
};

// Adjusted this from min 24 and step size 12 to make more sense with the small space height
ST0RM.textProcessor.prototype.makeFontSmaller = function() {
    if (this.sprite.bitmap.fontSize >= 12) {
        this.sprite.bitmap.fontSize -= 6;
    }
};

ST0RM.textProcessor.prototype.drawNormalCharacterWidthScaled = function(c) {
    const w = this.drawerScaleFactor*this.sprite.bitmap.measureTextWidth(c);
    const h = this.sprite.textHeight();
    this.sprite.bitmap.textColor = this.sprite.labelColor(); // important if changed by \c[]
    this.sprite.bitmap.drawText(c, this.x+this.drawerX, this.y+this.drawerY, w, h, "left");
    this.drawerX += w;
};

ST0RM.textProcessor.prototype.drawIconWidthScaled = function(iconIndex, x, y) {
    var bitmap = ImageManager.loadSystem('IconSet');
    var w = this.drawerScaleFactor*ImageManager.iconWidth;
    var h = this.drawerScaleFactor*ImageManager.iconHeight;
    // there is less space in MZ so max Height should be 26
    // if still bigger, scale it down even more
    const maxIconHeight = 26;
    if (h > maxIconHeight) {
        let iconScale = maxIconHeight/h;
        w = w * iconScale;
        h = h * iconScale;
    }
    var pw = ImageManager.iconWidth;
    var ph = ImageManager.iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.sprite.bitmap.blt(bitmap, sx, sy, pw, ph, x, 2+y-this.sprite.textHeight()/2+(ImageManager.iconHeight-h), w, h);
    this.drawerX = this.drawerX + w;
}

//=============================================================================
// Window_BattleLog (Note: Still exactly the same as in MV)
//=============================================================================

ST0RM.ABHPMPTP.former_Window_BattleLog_makeHpDamageText = Window_BattleLog.prototype.makeHpDamageText;
Window_BattleLog.prototype.makeHpDamageText = function(target) {
    if(target.isActor()) {
        let actorParams = ST0RM.ABHPMPTP.actorParams('HP',target._actorId) || null;
        if(actorParams) {
            return this.makeCustomizedHpDamageText(target, actorParams);
        }
    } //else
    return ST0RM.ABHPMPTP.former_Window_BattleLog_makeHpDamageText.call(this, target);
}

ST0RM.ABHPMPTP.former_Window_BattleLog_makeMpDamageText = Window_BattleLog.prototype.makeMpDamageText;
Window_BattleLog.prototype.makeMpDamageText = function(target) {
    if(target.isActor()) {
        let actorParams = ST0RM.ABHPMPTP.actorParams('MP',target._actorId) || null;
        if(actorParams) {
            return this.makeCustomizedMpDamageText(target, actorParams);
        }
    } //else
    return ST0RM.ABHPMPTP.former_Window_BattleLog_makeMpDamageText.call(this, target);
}

ST0RM.ABHPMPTP.former_Window_BattleLog_makeTpDamageText = Window_BattleLog.prototype.makeTpDamageText;
Window_BattleLog.prototype.makeTpDamageText = function(target) {
    if(target.isActor()) {
        let actorParams = ST0RM.ABHPMPTP.actorParams('TP',target._actorId) || null;
        if(actorParams) {
            return this.makeCustomizedTpDamageText(target, actorParams);
        }
    } //else
    return ST0RM.ABHPMPTP.former_Window_BattleLog_makeTpDamageText.call(this, target);
}

// Introducing a new function
Window_BattleLog.prototype.makeCustomizedHpDamageText = function(target,actorParams) {
    const result = target.result();
    const damage = result.hpDamage;
    const isActor = true;
    let fmt;
    if (damage > 0 && result.drain) {
        fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.hp, damage);
    } else if (damage > 0) {
        fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.hp, damage);
    } else if (damage < 0) {
        fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.hp, -damage);
    } else {
        return '';
    }
};

// Introducing a new function
Window_BattleLog.prototype.makeCustomizedMpDamageText = function(target,actorParams) {
    const result = target.result();
    const damage = result.mpDamage;
    const isActor = true;
    let fmt;
    if (damage > 0 && result.drain) {
        fmt = isActor ? TextManager.actorDrain : TextManager.enemyDrain;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.mp, damage);
    } else if (damage > 0) {
        fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.mp, damage);
    } else if (damage < 0) {
        fmt = isActor ? TextManager.actorRecovery : TextManager.enemyRecovery;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.mp, -damage);
    } else {
        return '';
    }
};

// Introducing a new function
Window_BattleLog.prototype.makeCustomizedTpDamageText = function(target,actorParams) {
    const result = target.result();
    const damage = result.tpDamage;
    const isActor = target.isActor();
    let fmt;
    if (damage > 0) {
        fmt = isActor ? TextManager.actorLoss : TextManager.enemyLoss;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.tp, damage);
    } else if (damage < 0) {
        fmt = isActor ? TextManager.actorGain : TextManager.enemyGain;
        return fmt.format(target.name(), (actorParams.GaugeName !== "") ? actorParams.GaugeName : TextManager.tp, -damage);
    } else {
        return '';
    }
};

//=============================================================================
// End of File
//=============================================================================
