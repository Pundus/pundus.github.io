// ==================================================
// slowerTPB.js
// ==================================================

/*:
 * @target MZ
 * @plugindesc Slow down TPB progression.
 * @author Caethyril
 * @help Intended for use with the TPB (Active or Wait) battle systems.
 * Customise the amount of slow-down via the plugin parameters -->
 * 
 * Terms of use:
 *    Free to use and modify~
 * 
 * @param Slow
 * @type number
 * @min 1
 * @decimals 2
 * @desc All TPB progress will slow down by this much, e.g. 2 = half speed.
 * @default 1.00
 * 
 * @param Input Slow
 * @type number
 * @min 1
 * @decimals 2
 * @desc Active TPB progress will also slow down by this much during the input phase, e.g. 2 = half speed.
 * @default 1.00
 */

(alias => {
'use strict';

    // Parameters
    const PLUGIN_NAME = 'slowerTPB';
    const PARAMS = PluginManager.parameters(PLUGIN_NAME);
    if (!Object.keys(PARAMS).length) throw new Error(PLUGIN_NAME + '.js could not find\
                its parameters! Make sure the file is named correctly then try again.');
    const SAFETY = 1;  // note: default TPB system can behave differently at faster speeds
    const SLOWALL = Math.max(Number(PARAMS['Slow']) || 0, SAFETY);
    const SLOW_IN = Math.max(Number(PARAMS['Input Slow']) || 0, SAFETY);

    // Alias! Increase reference time to slow down TPB progression.
    Game_Unit.prototype.tpbReferenceTime = function() {
        return alias.apply(this, arguments) * SLOWALL *
                (BattleManager.isInputting() ? SLOW_IN : 1);
    };

})(Game_Unit.prototype.tpbReferenceTime);