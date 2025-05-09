module.exports = {
    name: "tagme",
    category: "group",
    permissions: {
        group: true
    },
    code: async (ctx) => {
        try {
            const senderJid = ctx.sender.jid;
            const senderId = tools.general.getID(senderJid);

            return await ctx.reply({
                text: `@${senderId}`,
                mentions: [senderJid]
            });
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};
////////