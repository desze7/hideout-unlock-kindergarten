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
            "675844d50ec1f5ab030c8ff8",
            "675844580ec1f5ab030c8ff6",
            "675843aef98f37560b029094"
        ];

        let patchedCount = 0;

        for (const item of customisations) {
            if (customisationsToUnlock.includes(item.itemId)) {
                item.conditions = [];
                item.isEnabled = true;
                logger.success(`Hideout Customization Patched: ${item.itemId}`);
                patchedCount++;
            }
        }

        if (patchedCount > 0) {
            logger.success(`Successfully patched ${patchedCount} hideout customizations!`);
        } else {
            logger.info("No matching customizations found to patch.");
        }
    }
}

module.exports.mod = new UnlockHideoutCustomizationMod();
