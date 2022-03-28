//=============================================================================
// BattleStatusWindowAlwaysOpen.js
// ----------------------------------------------------------------------------
// (C) 2018 astral
// This software is released under the MIT License.
// https://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2019/01/05 初版
/*:
 * 
 * @plugindesc 戦闘中、文章の表示とステータスウィンドウを併用させます
 * @author astral
 * 
 * @help
 * 戦闘中、文章の表示や選択肢の表示、数値入力、アイテム選択の処理を行った場合でも、
 * ステータスウィンドウを表示したままにします。
 * 
 * 処理を上書きしているので、同様の機能をもつプラグインと併用にはご注意ください。
 * 
 * 
 * MIT License.
 * 
 */

(function () {
    'use strict';

    var _Scene_Battle_updateStatusWindow = Scene_Battle.prototype.updateStatusWindow;
    Scene_Battle.prototype.updateStatusWindow = function() {
        if ($gameMessage.isBusy()) {
            //this._statusWindow.close();
            this._partyCommandWindow.close();
            this._actorCommandWindow.close();
        } else if (this.isActive() && !this._messageWindow.isClosing()) {
            //this._statusWindow.open();
        }
    };

})();
