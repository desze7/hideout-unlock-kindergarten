class UnlockHideoutCustomizationMod {
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const databaseServer = container.resolve("DatabaseServer");

        const database = databaseServer.getTables();

        if (!database.hideout || !database.hideout.customisation || !database.hideout.customisation.globals) {
            logger.error("Hideout customization data is missing or improperly structured.");
            return;
        }

        const customisations = database.hideout.customisation.globals;

        const customisationsToUnlock = [
            "675844d50ec1f5ab030c8ff8", // Wall_Kindergarten : Tranquility
            "675844580ec1f5ab030c8ff6", // Floor_Kindergarten : Synthetic Grass
            "675843aef98f37560b029094" // Ceiling_Kindergarten : Sunshine
        ];

        const nameMapping = {
            "Wall_Kindergarten": "Walls - Tranquility",
            "Floor_Kindergarten": "Floor - Synthetic Grass",
            "Ceiling_Kindergarten": "Ceiling - Sunshine"
        };

        let patchedCount = 0;

        for (const itemId of customisationsToUnlock) {
            const item = customisations.find(c => c.itemId === itemId);

            if (item) {
                item.conditions = [];
                item.isEnabled = true;

                const formatName = (systemName) => {
                    if (!systemName) return "Unknown Customization.";
                    const parts = systemName.split("_");
                    if (parts.length === 2) {
                        return `${parts[1]} ${parts[0]}`;
                    }
                    return parts.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                };

                const itemName = nameMapping[item.systemName] || formatName(item.systemName);

                logger.success(`Customization patched: ${itemName}`);
                patchedCount++;
            }
        }

        if (patchedCount > 0) {
            logger.success(`- Successfully patched ${patchedCount} hideout customizations!`);
        } else {
            logger.info("No matching customizations found to patch.");
        }
    }
}

module.exports.mod = new UnlockHideoutCustomizationMod();
