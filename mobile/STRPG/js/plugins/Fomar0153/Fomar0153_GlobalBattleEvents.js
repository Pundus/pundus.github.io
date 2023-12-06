//=============================================================================
// RPG Maker MZ - Global Battle Events
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows you to include one set of battle events in all other troops.
 * @author Fomar0153
 *
 * @param Troop Id
 * @type integer
 * @desc Enter the Id of the troop whose battle events you'd like to use in every battle.
 * @default 1
 *
 * @help Fomar0153_GlobalBattleEvents.js
 *
 * Once you have set your global battle event troop id, you're done!
 *
 */

var Fomar = Fomar || {};
Fomar.GlobalBattleEvents = {};

Fomar.GlobalBattleEvents.parameters = PluginManager.parameters('Fomar0153_GlobalBattleEvents');

Fomar.GlobalBattleEvents.troopIds = Fomar.GlobalBattleEvents.parameters["Troop Id"].split(",").map(function(item) {
    return parseInt(item);
});

(() => {

  Fomar.GlobalBattleEvents.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (Fomar.GlobalBattleEvents.DataManager_isDatabaseLoaded.call(this)) {
      this.loadGlobalBattleEvents();
      return true;
    } else {
      return false;
    }
  };

  DataManager.loadGlobalBattleEvents = function() {
    var allEvents = []; // Array to store all battle events from selected troops

    for (var i = 0; i < Fomar.GlobalBattleEvents.troopIds.length; i++) {
      var troopId = Fomar.GlobalBattleEvents.troopIds[i];
      if (troopId >= 1 && troopId < $dataTroops.length) {
        allEvents = allEvents.concat($dataTroops[troopId].pages);
      } else {
        console.error("Invalid troop ID: " + troopId);
      }
    }

    // Merge all battle events into the target troop's pages
    for (var j = 1; j < $dataTroops.length; j++) {
      if (Fomar.GlobalBattleEvents.troopIds.includes(j)) {
        continue; // Skip selected troops
      }
      $dataTroops[j].pages = $dataTroops[j].pages.concat(allEvents);
    }
  };

})();