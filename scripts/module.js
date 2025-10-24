import getCurrency from "./currency.js";

Hooks.once('item-piles-ready', async function() {
	const currencies =  await getCurrency();
    const config = {
		"VERSION": "1.2.0",
        "ACTOR_CLASS_TYPE": "adversary",
        "ITEM_CLASS_LOOT_TYPE": "loot",
        "ITEM_CLASS_WEAPON_TYPE": "weapon",
        "ITEM_CLASS_EQUIPMENT_TYPE": "equipment",
        "ITEM_QUANTITY_ATTRIBUTE": "system.quantity",
        "ITEM_PRICE_ATTRIBUTE": "system.price.value",
        "ITEM_SIMILARITIES": ["name", "type"],
		"CURRENCIES": currencies,
        "ITEM_FILTERS": [
            {
                "path": "type",
                "filters": "action,ancestry,connection,culture,goal,injury,path,power,specialty,talent,trait,talent_tree"
            }
        ],
		"UNSTACKABLE_ITEM_TYPES": ["weapon", "armor"],

		"SHEET_OVERRIDES": () => {
			const sheetOverrides = Object.keys(CONFIG.Actor.sheetClasses).map(str => {
			    return Object.keys(CONFIG.Actor.sheetClasses[str]).map(sheet => {
			        return `CONFIG.Actor.sheetClasses.${str}["${sheet}"].cls.prototype.render`;
			    })
			}).flat()

			const method = function (wrapped, forced, options, ...args) {
				const renderItemPileInterface = Hooks.call(game.itempiles.CONSTANTS.HOOKS.PRE_RENDER_SHEET, this.document, forced, options) === false;
				if (this._state > Application.RENDER_STATES.NONE) {
					if (renderItemPileInterface) {
						wrapped(forced, options, ...args)
					} else {
						return wrapped(forced, options, ...args)
					}
				}
				if (renderItemPileInterface) return;
				return wrapped(forced, options, ...args);
			};

			for(const override of sheetOverrides){
				libWrapper.register("item-piles-cosmere-rpg", override, method, libWrapper.MIXED);
			}
		}
    };
    game.itempiles.API.addSystemIntegration(config, 'latest')
});
