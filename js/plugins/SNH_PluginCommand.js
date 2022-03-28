//=============================================================================
// SNH_PluginCommand.js
//=============================================================================
//更新履歴
// v1.0.0 2019/03/12 初版
// v1.0.1 2019/03/17 天候の色について本プラグイン導入前のセーブデータでエラーになる不具合を修正
// v1.0.2 2019/03/19 英語コマンドを追加
//
/*:
 * @plugindesc Change something.
 * @author SotoNoHito
 *
 * @help OMG! Sory. I can not write a English. Because I am Japanese! 
 *
 * This plugin is released under the MIT License.
 */
 
/*:ja
 * @plugindesc プラグインコマンド追加(v1.02)
 * @author ガバチョ（そとの人）(https://star-write-dream.com)
 * @help このプラグインはMITライセンスです。
 *  ----------------------------------------------------------------------------
 *
 * プラグインコマンドを追加します。
 *「↓」の次の文字をプラグインコマンドで入力してください
 * 
 * ----------------------------------------------------------------------------
 * 
 * ■■■■■■■■■■■■■■■■■■■■■
 * ■「全回復」関連
 * ○ステータス全快＋HPとMPは最大値の半分回復
 * ↓
 * テント
 * Tent
 *
 * ○HPとMPは最大値のX%回復
 * ↓
 * 割合回復 X
 * PercentageRecovery X
 *   補足：Xを数字に置き換えてください（30だと30%回復）
 *
 * 
 * ■■■■■■■■■■■■■■■■■■■■■
 * ■「天候の設定」関連
 * ○色を変える
 * ↓
 * 天候の色 X
 * WeatherColor X
 *   補足：Xは色の名前に置き換えてください。
 *        WEBカラーとして定義されている英語名が有効です。
 *       （red,blue,green,tomato,aliceblue,indigo...）
 *        デフォルトは「white」ですので、
 *        変えた色をもどしたい時は「white」で実行してください。
 *        なお変な色名を入れると「black」あつかいになります。
 *
*/

(function() {
    //独自データのセーブ用
    window.$gameSnhPluginCommand = {};

    var _createGameObjects = DataManager.createGameObjects;
        DataManager.createGameObjects = function() {
        _createGameObjects.call(this);
        $gameSnhPluginCommand = new Game_SnhPluginCommand();
    };

    var _makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _makeSaveContents.call(this);
        contents.gameSnhPluginCommand = $gameSnhPluginCommand;
        return contents;
    };
    
    var _extractSaveContents = DataManager.extractSaveContents;
        DataManager.extractSaveContents = function(contents) {
        _extractSaveContents.call(this, contents);
        $gameSnhPluginCommand = contents.gameSnhPluginCommand;
    };

    function Game_SnhPluginCommand(){
        this.saveWeatherColor = 'white';
    }

    //テント
    let executeTent = function() {
        $gameParty.members().forEach(function(actor) {
            actor.clearStates();
            actor._hp += actor.mhp / 2;
            if (actor._hp > actor.mhp) actor._hp = actor.mhp;
            actor._mp += actor.mmp / 2;
            if (actor._mp > actor.mmp) actor._mp = actor.mmp;
        });
    }
    
    //割合回復
    let executeHealth = function(value) {
        if (!value || isNaN(value)) {
            console.log('プラグインコマンド「割合回復」の引数が不正です');
            return;
        }
        let w = value / 100;

        $gameParty.members().forEach(function(actor) {
            actor._hp += actor.mhp * w;
            if (actor._hp > actor.mhp) actor._hp = actor.mhp;
            actor._mp += actor.mmp * w;
            if (actor._mp > actor.mmp) actor._mp = actor.mmp;
        });
    }

    //天候の色変更
    let changeWeatherColor = function(weather) {
        if ($gameSnhPluginCommand) {
            weather._rainBitmap.fillAll($gameSnhPluginCommand.saveWeatherColor);
            weather._stormBitmap.fillAll($gameSnhPluginCommand.saveWeatherColor);
            weather._snowBitmap.drawCircle(4, 4, 4, $gameSnhPluginCommand.saveWeatherColor);
        }
    }
    
    var _Weather_createBitmaps = Weather.prototype._createBitmaps;
    Weather.prototype._createBitmaps = function() {
        _Weather_createBitmaps.call(this);

        //本プラグイン中ではいらない処理。バトルシーンからここをcallするプラグインもあるので
        changeWeatherColor(this);
    };
    
    let executeWeatherColorChange = function(value) {
        if (!value || value.length === 0) {
            console.log('プラグインコマンド「天候の色」の引数が不正です');
            return;
        }
        
        if (!$gameSnhPluginCommand) {
            $gameSnhPluginCommand = new Game_SnhPluginCommand();
        }
        $gameSnhPluginCommand.saveWeatherColor = value;
        if (SceneManager._scene._spriteset._weather == null) {
            return;
        }
        changeWeatherColor(SceneManager._scene._spriteset._weather);
    }

    
    //コマンド定義
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function( command, args ) {
        _Game_Interpreter_pluginCommand.call( this, command, args );
        let name = 'SNH_' + command;

        switch(name) {
            case 'SNH_テント':
            case 'SNH_Tent':
                executeTent();
                break;
            case 'SNH_割合回復':
            case 'SNH_PercentageRecovery':
                executeHealth(args[0]);
                break;
            case 'SNH_天候の色':
            case 'SNH_WeatherColor':
                executeWeatherColorChange(args[0]);
                break;
        } 
        
        
        
    }
    
    
    
})();


