module.exports = {
  name: "todos",
  category: "group",
  desc: "Menciona a todos los participantes del grupo con imagen",
  async run(client, message) {
    // Verifica si es un grupo
    if (!message.from.endsWith("@g.us")) {
      return client.sendMessage(message.from, { text: '❌ Este comando solo puede usarse en grupos.' }, { quoted: message });
    }

    // Obtener miembros del grupo
    const groupMetadata = await client.groupMetadata(message.from);
    const participants = groupMetadata.participants;

    const mentions = participants.map(p => p.id);
    const tags = participants.map(p => `🔥 @${p.id.split("@")[0]}`).join('\n');

    // Texto del mensaje
    const caption = `👥 Total: ${participants.length} participantes.\nActivarse gente!\n─────\n${tags}\n\nby sebas - MD`;

    // URL de imagen (puedes cambiarla por otra si quieres)
    const imageUrl = 'https://i.imgur.com/2Z8bdeN.jpg';

    // Enviar imagen con pie de foto y menciones
    await client.sendMessage(message.from, {
      image: { url: imageUrl },
      caption: caption,
      mentions: mentions
    }, { quoted: message });
  }
};