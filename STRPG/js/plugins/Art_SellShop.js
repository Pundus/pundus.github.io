//=============================================================================
// Arthran Sell Shop
// Art_SellShop.js
//=============================================================================

var Imported = Imported || {};
Imported.Art_SellShop = true;

var Arthran = Arthran || {};
Arthran.SellShop = Arthran.SellShop || {};
Arthran.SellShop.version = 1.10;

/*:
* @target MZ
* @plugindesc [Version 1.10] Sell Shop
* @author Arthran
* @url https://arthran2.itch.io/sell-shop
*
* @command createSellShop
* @text Create Sell Shop
* @desc Creates a shop where the player can only sell items.
*
* @arg multiplier
* @text Price Multiplier
* @desc The multiplier that will be applied to the sell price of items.
* @type string
* @default 0.5
*
* @arg showCategories
* @text Show Categories
* @desc Whether or not to categorize items in the shop.
* @type boolean
* @on Show Categories
* @off Combine Into One Category
* @default true
*
* @help
*
* ------------------------------------------------------------------------
* Information
* ------------------------------------------------------------------------
* This plugin allows you to create a shop where the player can only sell
* items. You can define which items can be sold in the shop, and you can
* also specify the price multiplier that will be applied to the items.
*
* To use it, simply use the plugin command "Create Sell Shop" right before
* using a normal shop processing event command. Whatever items you specify
* in the shop processing event command will be the items that can be sold.
* You can specify the multiplier to be applied to the items in the plugin
* command. The multiplier will only be applied to the items that use the
* "Standard" price type in the shop processing event command. If you use
* the "Specify" price type, then the sell price will be exactly what you 
* specify, rather than using the multiplier.
*
* Make sure to place this plugin below any other plugins that modify the
* shop scene (i.e. VisuStella Items and Equips Core).
*
* ------------------------------------------------------------------------
* Terms of Use
* ------------------------------------------------------------------------
* Can be used in commercial and non-commercial projects. Credit is not
* required, but is appreciated. You may edit the plugin to suit your needs, 
* so long as you do not claim ownership of the plugin. Please do not distribute
* the plugin outside of your game. If you wish to share the plugin, please
* provide a link to the plugin's page on itch.io or the RPG Maker forums.
*
* Copyright (c) 2023 Arthran
*/

//-----------------------------------------------------------------------------
// Initial Setup
//-----------------------------------------------------------------------------

Arthran.SellShop.isSellShop = false;

//-----------------------------------------------------------------------------
// Plugin Commands
//-----------------------------------------------------------------------------

PluginManager.registerCommand('Art_SellShop', 'createSellShop', function(args) {
    Arthran.SellShop.isSellShop = true;
    Arthran.SellShop.multiplier = parseFloat(args.multiplier);
    Arthran.SellShop.showCategories = args.showCategories === 'true';
    if (Number.isNaN(Arthran.SellShop.multiplier)) {
        throw new Error('Invalid multiplier: ' + args.multiplier);
    }
});


//-----------------------------------------------------------------------------
// Scene_Shop
//-----------------------------------------------------------------------------

Arthran.SellShop.Scene_Shop_initialize = Scene_Shop.prototype.initialize;
Scene_Shop.prototype.initialize = function() {
    Arthran.SellShop.Scene_Shop_initialize.call(this);
    this._sellOnly = Arthran.SellShop.isSellShop;
};

Arthran.SellShop.Scene_Shop_popScene = Scene_Shop.prototype.popScene;
Scene_Shop.prototype.popScene = function() {
    Arthran.SellShop.isSellShop = false;
    Arthran.SellShop.Scene_Shop_popScene.call(this);
};

Arthran.SellShop.Scene_Shop_prepare = Scene_Shop.prototype.prepare;
Scene_Shop.prototype.prepare = function(goods, purchaseOnly) {
    Arthran.SellShop.Scene_Shop_prepare.call(this, goods, purchaseOnly);
    if (this._sellOnly) {
        this._purchaseOnly = false;
    }
};

Arthran.SellShop.Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
Scene_Shop.prototype.createSellWindow = function() {
    Arthran.SellShop.Scene_Shop_createSellWindow.call(this);
    if (this._sellOnly) {
        this._sellWindow.setupGoods(this._goods);
    }
};

Arthran.SellShop.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
Scene_Shop.prototype.sellingPrice = function() {
    if (this._sellOnly) {
        return this._sellWindow.price(this._item);
    } else {
        return Arthran.SellShop.Scene_Shop_sellingPrice.call(this);
    }
};

Arthran.SellShop.Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
Scene_Shop.prototype.categoryWindowRect = function() {
    const rect = Arthran.SellShop.Scene_Shop_categoryWindowRect.call(this);
    if (this._sellOnly && !Arthran.SellShop.showCategories) {
        rect.height = 0;
    }
    return rect;
};

Arthran.SellShop.Scene_Shop_sellWindowRectItemsEquipsCore = Scene_Shop.prototype.sellWindowRectItemsEquipsCore;
Scene_Shop.prototype.sellWindowRectItemsEquipsCore = function() {
    const rect = Arthran.SellShop.Scene_Shop_sellWindowRectItemsEquipsCore.call(this);
    if (this._sellOnly && !Arthran.SellShop.showCategories) {
        rect.y = this._commandWindow.y + this._commandWindow.height;
        rect.height = this.mainAreaHeight() - this._commandWindow.height;
    }
    return rect;
};

Arthran.SellShop.Scene_Shop_commandSellItemsEquipsCore = Scene_Shop.prototype.commandSellItemsEquipsCore;
Scene_Shop.prototype.commandSellItemsEquipsCore = function() {
    Arthran.SellShop.Scene_Shop_commandSellItemsEquipsCore.call(this);
    if (this._sellOnly && !Arthran.SellShop.showCategories) {
        this._commandWindow.show();
    }
};

//-----------------------------------------------------------------------------
// Window_ShopCommand
//-----------------------------------------------------------------------------

Arthran.SellShop.Window_ShopCommand_maxCols = Window_ShopCommand.prototype.maxCols;
Window_ShopCommand.prototype.maxCols = function() {
    if (Arthran.SellShop.isSellShop) {
        return 2;
    } else {
        return Arthran.SellShop.Window_ShopCommand_maxCols.call(this);
    }
};

Arthran.SellShop.Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
Window_ShopCommand.prototype.makeCommandList = function() {
    if (Arthran.SellShop.isSellShop) {
        if (Imported.VisuMZ_1_ItemsEquipsCore) {
            this.addSellCommand(),
            this.addCancelCommand();
        } else {
            this.addCommand(TextManager.sell, "sell");
            this.addCommand(TextManager.cancel, "cancel");
        }
    } else {
        Arthran.SellShop.Window_ShopCommand_makeCommandList.call(this);
    }
};

Arthran.SellShop.Window_ShopCommand_setHandler = Window_ShopCommand.prototype.setHandler;
Window_ShopCommand.prototype.setHandler = function(symbol, method) {
    if (Arthran.SellShop.isSellShop && symbol === "buy") {
        return;
    }
    Arthran.SellShop.Window_ShopCommand_setHandler.call(this, symbol, method);
};


//-----------------------------------------------------------------------------
// Window_ShopSell
//-----------------------------------------------------------------------------

Arthran.SellShop.Window_ShopSell_initialize = Window_ShopSell.prototype.initialize;
Window_ShopSell.prototype.initialize = function(rect) {
    Arthran.SellShop.Window_ShopSell_initialize.call(this, rect);
    if (Arthran.SellShop.isSellShop && !Arthran.SellShop.showCategories) {
        this._category = "all";
    }
};

Arthran.SellShop.Window_ShopSell_setCategory = Window_ShopSell.prototype.setCategory;
Window_ShopSell.prototype.setCategory = function(category) {
    if (Arthran.SellShop.isSellShop && !Arthran.SellShop.showCategories) {
        category = "all";
    }
    Arthran.SellShop.Window_ShopSell_setCategory.call(this, category);
};

Window_ShopSell.prototype.setupGoods = function(goods) {
    this._sellableItems = [];
    this._price = [];
    for (const good of goods) {
        const item = this.goodsToItem(good);
        if (item) {
            this._sellableItems.push(item);
            if (good[2] === 0) {
                this._price.push(Math.floor(item.price * Arthran.SellShop.multiplier));
            } else {
                this._price.push(good[3]);
            }
        }
    }
};

Window_ShopSell.prototype.goodsToItem = function(goods) {
    switch (goods[0]) {
        case 0:
            return $dataItems[goods[1]];
        case 1:
            return $dataWeapons[goods[1]];
        case 2:
            return $dataArmors[goods[1]];
        default:
            return null;
    }
};

Arthran.SellShop.Window_ShopSell_includes = Window_ShopSell.prototype.includes;
Window_ShopSell.prototype.includes = function(item) {
    if (Arthran.SellShop.isSellShop && !Arthran.SellShop.showCategories) {
        return !!item;
    }
    return Arthran.SellShop.Window_ShopSell_includes.call(this, item);
};

Arthran.SellShop.Window_ShopSell_makeItemList = Window_ShopSell.prototype.makeItemList;
Window_ShopSell.prototype.makeItemList = function() {
    Arthran.SellShop.Window_ShopSell_makeItemList.call(this);
    if (Arthran.SellShop.isSellShop) {
        this._data = this._data.filter(item => this._sellableItems.includes(item));
    }
};

Window_ShopSell.prototype.price = function(item) {
    const index = this._sellableItems.indexOf(item);
    return this._price[index];
};

//-----------------------------------------------------------------------------
// Window_ItemCategory
//-----------------------------------------------------------------------------

Arthran.SellShop.Window_ItemCategory_needsSelection = Window_ItemCategory.prototype.needsSelection;
Window_ItemCategory.prototype.needsSelection = function() {
    if (
        SceneManager._scene instanceof Scene_Shop &&
        Arthran.SellShop.isSellShop &&
        !Arthran.SellShop.showCategories
    ) {
        return false;
    }
    return Arthran.SellShop.Window_ItemCategory_needsSelection.call(this);
};

//-----------------------------------------------------------------------------
// Window_ShopBuy
//-----------------------------------------------------------------------------

Arthran.SellShop.Window_ShopBuy_makeItemList = Window_ShopBuy.prototype.makeItemList;
Window_ShopBuy.prototype.makeItemList = function() {
    if (Arthran.SellShop.isSellShop) {
        this._data = [];
        this._price = [];
    } else {
        Arthran.SellShop.Window_ShopBuy_makeItemList.call(this);
    }
};