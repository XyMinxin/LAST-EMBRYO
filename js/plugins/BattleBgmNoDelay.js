(function() {
    'use strict';

    var _Scene_Map_updateEncounterEffect = Scene_Map.prototype.updateEncounterEffect;
    Scene_Map.prototype.updateEncounterEffect = function() {
        if (this._encounterEffectDuration === this.encounterEffectSpeed()) {
            BattleManager.playBattleBgm();
        }
        _Scene_Map_updateEncounterEffect.apply(this, arguments);
    }
})();