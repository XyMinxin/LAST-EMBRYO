//=============================================================================
// Nibelung_EquipMenu_delete_Optimize.js
//=============================================================================
/*:
 * @plugindesc 最強装備削除 ver1.0
 * @author Nibelung
 * @version 1.0 2018/11/20
 *
 * @help
 * 装備画面から「最強装備」を削除します。
 */

//-----------------------------------------------------------------------------
// Window_EquipCommand

Window_EquipCommand.prototype.maxCols = function() {
    return 2;
};

Window_EquipCommand.prototype.makeCommandList = function() {
    this.addCommand(TextManager.equip2,   'equip');
    //this.addCommand(TextManager.optimize, 'optimize');
    this.addCommand(TextManager.clear,    'clear');
};
