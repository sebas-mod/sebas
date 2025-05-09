const {
    monospace,
    quote
} = require("@mengkodingan/ckptw");

module.exports = {
    name: "claim",
    category: "profile",
    permissions: {},
    code: async (ctx) => {
        const input = ctx.args.join(" ") || null;

        if (!input) return await ctx.reply(
            `${quote(tools.cmd.generateInstruction(["send"], ["text"]))}\n` +
            `${quote(tools.cmd.generateCommandExample(ctx.used, "daily"))}\n` +
            quote(tools.cmd.generateNotes([`Escribe ${monospace(`${ctx.used.prefix + ctx.used.command} list`)} para ver la lista.`]))
        );

        if (input === "list") {
            const listText = await tools.list.get("claim");
            return await ctx.reply(listText);
        }

        const senderId = tools.general.getID(ctx.sender.jid);
        const userDb = await db.get(`user.${senderId}`) || {};

        if (tools.general.isOwner(senderId, ctx.msg.key.id) || userDb?.premium) return await ctx.reply(quote("❎ Ya tienes eris ilimitadas, no necesitas reclamar más."));

        if (!claimRewards[input]) return await ctx.reply(quote("❎ ¡El regalo no es válido!"));

        if (!userDb || Object.keys(userDb).length === 0) return await ctx.reply(quote("❎ Aún no tienes un perfil o acabas de restablecer tus datos. Debes alcanzar un cierto nivel antes de poder reclamar esta recompensa."));

        if (userDb?.level < claimRewards[input].level) return await ctx.reply(quote(`❎ Necesitas alcanzar el nivel ${claimRewards[input].level} para reclamar este premio. Tu nivel actual es ${userDb?.level || 0}.`));

        const currentTime = Date.now();
        userDb.lastClaim = userDb?.lastClaim || {};
        const lastClaimTime = userDb?.lastClaim[input] || 0;
        const timePassed = currentTime - lastClaimTime;
        const remainingTime = claimRewards[input].cooldown - timePassed;

        if (remainingTime > 0) return await ctx.reply(quote(`⏳ Has reclamado el premio ${input}. Espera ${tools.general.convertMsToDuration(remainingTime)} para reclamar de nuevo.`));

        try {
            const rewardCoin = (userDb?.coin || 0) + claimRewards[input].reward;
            await db.set(`user.${senderId}.coin`, rewardCoin);
            await db.set(`user.${senderId}.lastClaim.${input}`, currentTime);

            return await ctx.reply(quote(`✅ ¡Has reclamado exitosamente una recompensa de ${input} de ${claimRewards[input].reward} eris! Eris actual: ${rewardCoin}.`));
        } catch (error) {
            return await tools.cmd.handleError(ctx, error, false);
        }
    }
};

// Daftar hadiah klaim yang tersedia
const claimRewards = {
    daily: {
        reward: 100,
        cooldown: 24 * 60 * 60 * 1000, // 24 jam (100 koin)
        level: 1
    },
    weekly: {
        reward: 500,
        cooldown: 7 * 24 * 60 * 60 * 1000, // 7 hari (500 koin)
        level: 15
    },
    monthly: {
        reward: 2000,
        cooldown: 30 * 24 * 60 * 60 * 1000, // 30 hari (2000 koin)
        level: 50
    },
    yearly: {
        reward: 10000,
        cooldown: 365 * 24 * 60 * 60 * 1000, // 365 hari (10000 koin)
        level: 75
    }
};