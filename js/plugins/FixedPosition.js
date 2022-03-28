//=============================================================================
// FixedPosition.js
// ----------------------------------------------------------------------------
// <利用規約>
//  利用はRPGツクールMV/RPGMakerMVの正規ユーザーに限られます。
//  商用、非商用、ゲームの内容を問わず利用可能です。
//  ゲームへの利用の際、報告や出典元の記載等は必須ではありません。
//  二次配布や転載は禁止します。
//  ソースコードURL、ダウンロードURLへの直接リンクも禁止します。
//  不具合対応以外のサポートやリクエストは受け付けておりません。
//  スクリプト利用により生じたいかなる問題においても、一切責任を負いかねます。
//  不具合報告は https://twitter.com/koma_neko まで。
// ----------------------------------------------------------------------------
//  Ver1.00  2016/03/01  初版
//=============================================================================

/*:
 * @plugindesc サイドビューバトルにおけるアクターの各種移動を制限します。
 * @author こま
 *
 * @param Fixed Start Position
 * @desc バトル開始に画面外から登場せず、最初から並んでいる状態にする場合はtrueを指定してください。（true/false）
 * @default true
 *
 * @param Fixed Input Position
 * @desc 行動選択時に一歩前に出ないようにする場合はtrueを指定してください。（true/false）
 * @default true
 *
 * @param Fixed Attack Position
 * @desc 攻撃時に一歩前に出ないようにする場合はtrueを指定してください。（true/false）
 * @default true
 *
 * @help *このプラグインには、プラグインコマンドはありません。
 */

(function(){
    var plugin = 'FixedPosition';
    
    var params = PluginManager.parameters(plugin);
    var fixedStartPosition = params['Fixed Start Position'].toLowerCase() === 'true';
    var fixedInputPosition = params['Fixed Input Position'].toLowerCase() === 'true';
    var fixedAttackPosition = params['Fixed Attack Position'].toLowerCase() === 'true';

    // Object Property for Plugin
    function pprop(obj) {
        return (obj[plugin] = obj[plugin] || {});
    }
    
    //=========================================================================
    // Sprite_Actor
    //=========================================================================

    var _alias_Sprite_Actor_moveToStartPosition = Sprite_Actor.prototype.moveToStartPosition;
    Sprite_Actor.prototype.moveToStartPosition = function() {
        _alias_Sprite_Actor_moveToStartPosition.call(this);
        if (fixedStartPosition) {
            this.startMove(0, 0, 0);
        }
    }
    
    var _alias_Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
    Sprite_Actor.prototype.updateTargetPosition = function() {
        _alias_Sprite_Actor_updateTargetPosition.call(this);
        if ((this._actor.isInputting() && fixedInputPosition) || 
            (this._actor.isActing()) && fixedAttackPosition) {
            this.startMove(0, 0, 0);
        }
    };
}());
