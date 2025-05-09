const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "reset",
    category: "profile",
    permissions: {
        private: true
    },
    code: async (ctx) => {
        await ctx.reply(quote(`🤖 ¿Estás seguro de que deseas restablecer tus datos? Este paso borrará todos los datos almacenados y no podrán restaurarse. Escriba ${monospace("y")} para continuar o ${monospace("n")} para finalizar..`));

        try {
            const collector = ctx.MessageCollector({
                time: 60000
            });

            collector.on("collect", async (m) => {
                const message = m.content.trim().toLowerCase();
                const senderId = tools.general.getID(ctx.sender.jid);

                if (message === "y") {
                    await db.delete(`user.${senderId}`);
                    await ctx.reply(quote("✅ Sus datos se han restablecido correctamente. ¡Todos los datos han sido eliminados!"));
                    collector.stop();
                } else if (message === "n") {
                    await ctx.reply(quote("❌ Se ha cancelado el proceso de restablecimiento de datos."));
                    collector.stop();
                }
            });

            collector.on("end", async () => {});
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};