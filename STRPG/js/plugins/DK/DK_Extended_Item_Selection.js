/*
Title: Extended Item Selection
Author: DKPlugins
Site: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Version: 1.0.0
Release: 25.09.2023
First release: 25.09.2023
*/

/*ru
Название: Расширенный Выбор Предмета
Автор: DKPlugins
Сайт: https://dk-plugins.ru
E-mail: kuznetsovdenis96@gmail.com
Версия: 1.0.0
Релиз: 25.09.2023
Первый релиз: 25.09.2023
*/

/*:
 * @plugindesc v.1.0.0 [MV|MZ] Allows you to select weapons and armor using the standard item selection command.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Info about plugin ###
 Title: DK_Extended_Item_Selection
 Author: DKPlugins
 Site: https://dk-plugins.ru
 Version: 1.0.0
 Release: 25.09.2023
 First release: 25.09.2023

 ###=========================================================================
 ## Compatibility
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Instructions
 ###=========================================================================
 Use the plugin command to set the item type to select.
 After selecting an item, the type will be automatically reset.

 ###=========================================================================
 ## Plugin commands (RPG Maker MV)
 ###=========================================================================
 1. Set item type to select: SetItemSelectionType type
 type - item type (item, weapon, armor)
 Example: SetItemSelectionType weapon

 ###=========================================================================
 ## Script calls
 ###=========================================================================
 1. Set item type to select: $gameMessage.setItemChoiceType(type)
 type - item type (item, weapon, armor)
 Example: $gameMessage.setItemChoiceType('weapon')

 ###===========================================================================
 ## See also
 ###===========================================================================
 1. Mouse System (https://dk-plugins.ru/mouse-system/)
 Allows you to change the mouse cursor, activate events by clicking, hovering, etc.

 2. Video Player (https://dk-plugins.ru/video-player/)
 Adds video to the title screen, credits, the layers on the map and other.

 3. Events Glow (https://dk-plugins.ru/events-glow/)
 Allows highlighting events on mouse hover.

 4. Pictures Glow (https://dk-plugins.ru/pictures-glow/)
 Allows highlighting pictures on mouse hover.

 ###=========================================================================
 ## Graphics
 ###=========================================================================
 Additional graphics for your project: https://dk-plugins.ru/resources/

 ###=========================================================================
 ## License and terms of use
 ###=========================================================================
 You can:
 -To use the plugin for your non-commercial projects
 -Change code of the plugin

 You cannot:
 -Delete or change any information about the plugin
 -Distribute the plugin and its modifications

 ## Commercial license ##
 Visit the page: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Support
 ###=========================================================================
 Become a subscriber on boosty: https://boosty.to/dkplugins
 Become a subscriber on patreon: https://patreon.com/dkplugins



 * @command SetItemSelectionType
 * @desc Set item type to select
 *
 * @arg type
 * @text Type
 * @desc Type
 * @type select
 * @option item
 * @option weapon
 * @option armor
 * @default item

*/

/*:ru
 * @plugindesc v.1.0.0 [MV|MZ] Позволяет выбирать оружие и броню с помощью стандартной команды выбора предмета.
 * @author DKPlugins
 * @url https://dk-plugins.ru
 * @target MZ
 * @help

 ### Информация о плагине ###
 Название: DK_Extended_Item_Selection
 Автор: DKPlugins
 Сайт: https://dk-plugins.ru
 Версия: 1.0.0
 Релиз: 25.09.2023
 Первый релиз: 25.09.2023

 ###=========================================================================
 ## Совместимость
 ###=========================================================================
 RPG Maker MV: 1.5+
 RPG Maker MZ: 1.0+

 ###=========================================================================
 ## Инструкции
 ###=========================================================================
 Используйте команду плагина, чтобы установить тип предмета для выбора.
 После выбора предмета тип будет автоматически сброшен.

 ###=========================================================================
 ## Команды плагина (RPG Maker MV)
 ###=========================================================================
 1.  Установить тип предмета для выбора: SetItemSelectionType type
 type - тип предмета (item, weapon, armor)
 Пример: SetItemSelectionType weapon

 ###=========================================================================
 ## Вызовы скриптов
 ###=========================================================================
 1. Установить тип предмета для выбора: $gameMessage.setItemChoiceType(type)
 type - тип предмета (item, weapon, armor)
 Пример: $gameMessage.setItemChoiceType('weapon')

 ###=========================================================================
 ## Смотрите также
 ###=========================================================================
 1. Система Мыши (https://dk-plugins.ru/mouse-system/)
 Позволяет изменять курсор мыши, активировать события нажатием, наведением и др.

 2. Видео плеер (https://dk-plugins.ru/video-player/)
 Добавляет видео перед титульным экраном, титры, слои на карте и другое.

 3. Свечение Событий (https://dk-plugins.ru/events-glow/)
 Позволяет подсвечивать события при наведении мыши.

 4. Свечение Изображений (https://dk-plugins.ru/pictures-glow/)
 Позволяет подсвечивать изображения при наведении мыши.

 ###=========================================================================
 ## Графика
 ###=========================================================================
 Дополнительная графика для вашего проекта: https://dk-plugins.ru/resources/

 ###=========================================================================
 ## Лицензия и правила использования плагина
 ###=========================================================================
 Вы можете:
 -Использовать плагин в некоммерческих проектах
 -Изменять код плагина

 Вы не можете:
 -Удалять или изменять любую информацию о плагине
 -Распространять плагин и его модификации

 ## Коммерческая лицензия ##
 Посетите страницу: https://dk-plugins.ru/commercial-license/

 ###=========================================================================
 ## Поддержка
 ###=========================================================================
 Стать подписчиком на boosty: https://boosty.to/dkplugins
 Стать подписчиком на patreon: https://patreon.com/dkplugins



 * @command SetItemSelectionType
 * @desc Установить тип предмета для выбора
 *
 * @arg type
 * @text Тип
 * @desc Тип
 * @type select
 * @option Предмет
 * @value item
 * @option Оружие
 * @value weapon
 * @option Броня
 * @value armor
 * @default item

*/

'use strict';

var Imported = Imported || {};
Imported['DK_Extended_Item_Selection'] = '1.0.0';

//=============================================================================
// Game_Interpreter
//=============================================================================

const ExtendedItemSelection_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    ExtendedItemSelection_Game_Interpreter_pluginCommand.apply(this, arguments);

    switch(command) {
        case 'SetItemSelectionType':
            $gameMessage.setItemChoiceType(args[0]);
            break;
    }
};

if (Utils.RPGMAKER_NAME === 'MZ') {

    PluginManager.registerCommand('DK_Extended_Item_Selection', 'SetItemSelectionType', (args) => {
        $gameMessage.setItemChoiceType(args.type);
    });

}

//===========================================================================
// Game_Message
//===========================================================================

const ExtendedItemSelection_Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
    ExtendedItemSelection_Game_Message_clear.apply(this, arguments);
    this._itemChoiceType = null;
};

Game_Message.prototype.itemChoiceType = function() {
    return this._itemChoiceType || 'item';
};

Game_Message.prototype.setItemChoiceType = function(type) {
    this._itemChoiceType = type;
};

//===========================================================================
// Window_EventItem
//===========================================================================

const ExtendedItemSelection_Window_EventItem_includes = Window_EventItem.prototype.includes;
Window_EventItem.prototype.includes = function(item) {
    switch ($gameMessage.itemChoiceType()) {
        case 'weapon':
            return DataManager.isWeapon(item);
        case 'armor':
            return DataManager.isArmor(item);
    }

    return ExtendedItemSelection_Window_EventItem_includes.apply(this, arguments);
};

const ExtendedItemSelection_Window_EventItem_needsNumber = Window_EventItem.prototype.needsNumber;
Window_EventItem.prototype.needsNumber = function() {
    if (['weapon', 'armor'].includes($gameMessage.itemChoiceType())) {
        return true;
    }

    return ExtendedItemSelection_Window_EventItem_needsNumber.apply(this, arguments);
};
