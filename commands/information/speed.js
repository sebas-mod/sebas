const {
    quote
} = require("@mengkodingan/ckptw");
const {
    performance
} = require("node:perf_hooks");

module.exports = {
    name: "speed",
    category: "information",
    permissions: {},
    code: async (ctx) => {
        try {
            const startTime = performance.now();
            const testMsg = await ctx.reply(quote("🚀 Probando la velocidad..."));
            const responseTime = (performance.now() - startTime).toFixed(2);
            await ctx.editMessage(testMsg.key, quote(`🚀 Velocidad de respuesta ${responseTime} ms.`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};