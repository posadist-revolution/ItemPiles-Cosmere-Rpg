import getCurrency from "./currency.js";

Hooks.once('item-piles-ready', async function() {
	const currencies =  await getCurrency();
    const config = {
		"VERSION": "1.1.2",
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
    };
    game.itempiles.API.addSystemIntegration(config, 'latest')
});
