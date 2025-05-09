const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "setprofile",
    aliases: ["set", "setp", "setprof"],
    category: "profile",
    permissions: {},
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(`${tools.cmd.generateInstruction(["send"], ["text"])}`)}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "autolevelup"))}\n` +
            quote(tools.cmd.generateNotes([`Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} list`)} para ver la lista.`]))
        );

        if (input === "list") {
            const listText = await tools.list.get("setprofile");
            return await ctx.reply(listText);
        }

        try {
            const senderId = tools.general.getID(ctx.sender.jid);
            const args = ctx.args;
            const command = args[0]?.toLowerCase();

            switch (command) {
                case "username": {
                    const input = args.slice(1).join(" ").trim();
                    if (!input) return await ctx.reply(quote("❎ Por favor, introduzca el nombre de usuario que desea utilizar."));

                    if (/[^a-zA-Z0-9._-]/.test(input)) return await ctx.reply(quote("❎ Los nombres de usuario sólo pueden contener letras, números, puntos (.), guiones bajos (_) y guiones (-)."));

                    const allUsers = await db.get("user") || {};
                    const usernameTaken = Object.values(allUsers).some(user => user.username === input);
                    if (usernameTaken) return await ctx.reply(quote("❎ El nombre de usuario ya está siendo utilizado por otro usuario."));

                    const username = `@${input}`
                    await db.set(`user.${senderId}.username`, username);
                    return await ctx.reply(quote(`✅ El nombre de usuario se cambió correctamente a '${username}'!`));
                }
                case "autolevelup": {
                    const setKey = `user.${senderId}.autolevelup`;
                    const currentStatus = await db.get(setKey) || false;
                    const newStatus = !currentStatus;
                    await db.set(setKey, newStatus);

                    const statusText = newStatus ? "Activado" : "Desactivado";
                    return await ctx.reply(quote(`✅ Funcion de '${command}' fue ${statusText}!`));
                }
                default:
                    return await ctx.reply(quote("❎ Texto inválido."));
            }
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};