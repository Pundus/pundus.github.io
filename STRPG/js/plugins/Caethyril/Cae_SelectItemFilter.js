// ==================================================
// Cae_SelectItemFilter.js
// ==================================================

/**
 * @file Cae_SelectItemFilter.js (RMMZ)
 * Filter items seen in Select Item commands.
 * @author Caethyril
 * @version 1.1
 */

//#region Plugin header
/*:
 * @target MZ
 * @plugindesc v1.1 - Filter items seen in Select Item commands.
 * @author Caethyril
 * @url https://forums.rpgmakerweb.com/index.php?threads/caethyrils-mz-plugins.125657/
 * 
 * @help Features:
 *   Store values in the Select Item filter.
 *   Assign "filter" values to items using notetags.
 *   The filter is active if it has at least one value in it.
 *   When the filter is active, Select Item will hide any item without
 *      at least one matching filter value.
 * 
 * Item Notetag:
 *        <select filter: values>
 *   e.g. <select filter: cheese>
 *        <select filter: croissant duct_tape 123 dodo>
 *   Replace 'values' with any number or text that you want.
 *   - separate multiple values with spaces
 *   - you can apply the same tags to multiple items
 *
 * Example:
 *   The player has four items:
 *    - Cheese, with notetag <select filter:food dairy>
 *    - Apple, with notetag  <select filter:food fruit>
 *    - Milk, with notetag   <select filter:drink dairy>
 *    - Plate, with no SelectItemFilter notetag.
 *   Normally all of these show in a Select Item command.
 *   Now for some plugin commands:
 *    - Select Filter >    Set > [food, drink]
 *      > Select Item now shows Cheese, Apple, Milk.
 *    - Select Filter > Remove > [food]
 *      > Select Item now shows Milk.
 *    - Select Filter >    Add > [fruit]
 *      > Select Item now shows Apple, Milk.
 *    - Select Filter >  Reset
 *      > Select Item now shows all items again (no filter).
 * 
 * Plugin Command:
 *   Select Filter - adjust the Select Item filter values;
 *                 - excludes existing items based on their notetags;
 *                 - filter persists until reset.
 *
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Terms of use:
 *   This plugin is free to use and/or modify, under these conditions:
 *     - None of the original plugin header is removed.
 *     - Credit is given to Caethyril for the original work.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Compatibility:
 *   Aliases:   Window_EventItem:
 *                includes
 *              DataManager:
 *                createGameObjects, makeSaveContents, extractSaveContents
 *   This plugin adds data to save files iff its Add Save Data param is true.
 * 
 *  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changelog:
 *   v1.1 (2020-08-26): Fixed - filter should re-initialise on new game.
 *   v1.0 (2020-08-24): Initial release! Rewrite of RMMV version.
 * 
 * @command Select Filter
 * @desc Adjusts the Select Item filter.
 * Decreases the range of items available for selection.
 * 
 * @arg Values
 * @type string[]
 * @desc A list of values to apply to the filter.
 * (Ignored if Action = Reset.)
 * @default []
 * 
 * @arg Action
 * @type combo
 * @option Set
 * @option Add
 * @option Remove
 * @option Reset
 * @desc Choose how to edit the select filter.
 * @default Set
 * 
 * @param Add Save Data
 * @type boolean
 * @desc If true, the select item filter will be added to save files.
 * @default false
 * 
 * @param --- Advanced ---
 * @type select
 * @desc Advanced internal configuration options.
 * 
 * @param Notetag: Select Filter
 * @parent --- Advanced ---
 * @type string
 * @desc Name of the "select filter" Item notetag
 * Default: select filter
 * @default select filter
 * 
 * @param Save Property Name
 * @parent --- Advanced ---
 * @type string
 * @desc Name under which the select filter is stored in save files.
 * Default: Cae_SelectItemFilter
 * @default Cae_SelectItemFilter
 */
//#endregion

(function() {
'use strict';

    const NAMESPACE   = 'SelectItemFilter';
    const PLUGIN_NAME = 'Cae_' + NAMESPACE;
    const ERR_PRE     = PLUGIN_NAME + '.js ';
    const ERR_NOPARAM = ERR_PRE + 'could not find its parameters!\nCheck the plugin file is named correctly and try again.';
    const WARN_BADKEY = ERR_PRE + 'encountered invalid "%1" parameter value: "%2".\nReverting to default: "%3".';

    window.CAE = window.CAE || {};      // Author namespace

    (($, U) => {

        Object.defineProperty($, 'VERSION', { value: 1.1 });    // Version declaration
        window.Imported = window.Imported || {};                // Import namespace
        Imported[PLUGIN_NAME] = $.VERSION;                      // Import declaration

    // ======== Utility (share) ======== //
    // ======== Parameter stuff ======== //

        void (p => {

            if (!p) { SceneManager.showDevTools(); throw new Error(ERR_NOPARAM); };

            // ((Restructure: global namespace/name vars => methods like this on shared NS.)) //
            /**
             * String validation for notetag names via plugin parameters.
             * @param {String} paramName - Plugin parameter name without "Notetag: " prefix
             * @returns {String} Validated notetag name.
             */
            $.parseTagKey = function(paramName) {
                const dFault = (paramName || '').toLowerCase();
                const key = String(p['Notetag: ' + paramName] || '').trim();
                if (!key || key.includes('>')) {
                    console.warn(WARN_BADKEY.format(paramName, key, dFault));
                    return dFault;
                }
                return key;
            };

            $.save = p['Add Save Data'] === 'true';
            Object.defineProperty($, 'SAVE_PROP', { value: String(p['Save Property Name'] || '').trim() || PLUGIN_NAME });

            $.tags = {
                filter: $.parseTagKey('Select Filter')
            };

        })($.params = PluginManager.parameters(PLUGIN_NAME));

    // ======== Utility (local) ======== //

        // Array adjustment operations
        $.adjust = {
            /**
             * @param {String[]} [a] - Original array (not referenced)
             * @param {String[]} [b] - Values to set
             * @returns {String[]} New array!
             */
            set: function(a, b) {
                return b ? (Array.isArray(b) ? b : [String(b)]) : [];
            },
            /**
             * @param {String[]} a - Original array
             * @param {String[]} b - Values to add, if not already present
             * @returns {String[]} New array.
             */
            add: function(a, b) {
                if (!Array.isArray(b)) b = [b];
                b.forEach(c => { if (!a.includes(c)) a.push(c); });
                return a;
            },
            /**
             * @param {String[]} a - Original array
             * @param {String[]} b - Values to remove, if present
             * @returns {String[]} New array.
             */
            rem: function(a, b) {
                if (!Array.isArray(a)) b = [b];
                b.forEach(c => {
                    const i = a.indexOf(c);
                    if (i >= 0) a.splice(i, 1);
                });
                return a;
            },
            /** @returns {String[]} Initialised (empty) array. */
            init: function(a, b) { return $.adjust.set(); }
        };
        $.filter = $.adjust.init();

        /**
         * @param {Object} obj - Database object with meta property
         * @param {String} key - This plugin's key for the notetag name
         * @returns {String} Trimmed notetag value, else empty string.
         */
        $.getTag = function(obj, key) { return String(obj?.meta?.[$.tags[key]] || '').trim(); }

        /**
         * Searches given string for matching filter subtypes.
         * @param {String} [tag] - Notetag to check against
         * @returns {Boolean} True iff tag exists and includes at least one filtered subtype.
         */
        $.matchFilterTag = function(tag) {
            return tag && String(tag).split(' ').some(type => $.filter.includes(type));
        };

        /**
         * Checks whether an item should be excluded based on the current select item filter.
         * @param {Object} [item] - Database item entry
         * @returns {Boolean} True iff filter not empty, item exists, and item notetag doesn't match filter.
         */
        $.filterExclude = function(item) {
            return $.filter.length && item && !$.matchFilterTag($.getTag(item, 'filter'));
        };

        /**
         * @param {Object} contents - Aggregate save data
         * @returns {Object} Save data including the select filter.
         */
        $.makeSave = function(contents) {
            if ($.save) contents[$.SAVE_PROP] = $.filter;
            return contents;
        };

        /**
         * Extracts this plugin's data from provided save contents.
         * @param {Object} contents - Save file contents
         */
        $.extractSave = function(contents) {
            const f = contents[$.SAVE_PROP];
            $.filter = ($.save && f) ? f : [];
        };

    // ======== Plugin Commands ======== //

        $.com = {
            /**
             * Applies given values to given array according to specified operator.
             * @param {String[]} arr - Reference array
             * @param {String[]} values - New values to apply to the array
             * @param {String} act - Determines how the values are applied to the array: SET, ADD, REMOVE, RESET.
             */
            adjust: function(arr, values, act = 'SET') {
                const M = $.adjust;
                switch (act.toUpperCase()) {
                    case 'SET':    return M.set(arr, values);
                    case 'ADD':    return M.add(arr, values);
                    case 'REMOVE': return M.rem(arr, values);
                    case 'RESET':  return M.init();
                }
                return arr;
            },
            /**
             * Plugin command! Adjust the Select Item filter.
             * @param {{Values:String[],Action:String}} args - Plugin command arguments object
             * @returns {Number} Length of the adjusted filter array.
             */
            filter: function(args) {
                const values = JSON.parse(args.Values || '[]');
                $.filter = $.com.adjust($.filter, values, args.Action);
                return $.filter.length;
            }
        };
        PluginManager.registerCommand(PLUGIN_NAME, 'Select Filter', $.com.filter);

    // ============ Extends ============ //
    // ========== Alterations ========== //

        $.alias = $.alias || {};        // This plugin's alias namespace

        // Alias! Apply Select Item filter to exclude items from the category.
        void (alias => {
            Window_EventItem.prototype.includes = function(item) {
                return alias.apply(this, arguments) && !$.filterExclude(item);
            };
        })($.alias.Window_EventItem_includes = Window_EventItem.prototype.includes);

        // Alias! Initialise filter on new game.
        void (alias => {
            DataManager.createGameObjects = function() {
                alias.apply(this, arguments);
                $.filter = $.adjust.init();
            };
        })($.alias.DataManager_createGameObjects = DataManager.createGameObjects);

        // Alias! Include select filter in save files.
        void (alias => {
            DataManager.makeSaveContents = function() {
                return $.makeSave(alias.apply(this, arguments));
            };
        })($.alias.DataManager_makeSaveContents = DataManager.makeSaveContents);

        // Alias! Extract select filter from save files.
        void (alias => {
            DataManager.extractSaveContents = function(contents) {
                alias.apply(this, arguments);
                $.extractSave(contents);
            };
        })($.alias.DataManager_extractSaveContents = DataManager.extractSaveContents);

    })(CAE[NAMESPACE] = CAE[NAMESPACE] || {}, CAE.Utils = CAE.Utils || {});

})();