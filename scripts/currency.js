const denominations = new Map([
    ["Chip", 0.2],
    ["Mark", 1],
    ["Broam", 4]
]);

export function getCurrenciesManual() {
    const toItems = (gems, baseValue) => {
        const items = [];
        for(const gem of gems) {
            denominations.forEach((value, key) => {
                const name = `${gem} ${key}`;
                const img = `systems/cosmere-rpg/assets/icons/stormlight/items/spheres/sphere_${gem.toLowerCase()}_${key.toLowerCase()}.webp`;
                const val = value * baseValue;
                items.push({
                    type: "item",
                    name: name,
                    img: img,
                    abbreviation: "{#}mk",
                    data: {
                        item: {
                            "name": name,
                            "type": "loot",
                            "img": img,
                            "system": {
                                "quantity": 1,
                                "isMoney": true,
                                "price": {
                                    "value": val,
                                    "currency": "spheres",
                                    "denomination": {
                                        "primary": "mark",
                                        "secondary": "none"
                                    },
                                    "unit": "spheres.mark",
                                    "baseValue": val
                                }
                            }
                        }
                    },
                    primary: false,
                    exchangeRate: val
                });
            });
        }
        return items;
    };
    const currencies = toItems(["Diamond"], 1)
        .concat(toItems(["Garnet", "Heliodor", "Topaz"], 5))
        .concat(toItems(["Ruby", "Smokestone", "Zircon"], 10))
        .concat(toItems(["Amethyst", "Sapphire"], 25))
        .concat(toItems(["Emerald"], 50));

    currencies.find(value => value.name === "Diamond Mark").primary = true;

    return currencies;
}
