const videos = [
  'https://telegra.ph/file/9243544e7ab350ce747d7.mp4',
  'https://telegra.ph/file/fadc180ae9c212e2bd3e1.mp4',
  'https://telegra.ph/file/79a5a0042dd8c44754942.mp4',
  'https://telegra.ph/file/035e84b8767a9f1ac070b.mp4',
  'https://telegra.ph/file/0103144b636efcbdc069b.mp4',
  'https://telegra.ph/file/4d97457142dff96a3f382.mp4',
  'https://telegra.ph/file/b1b4c9f48eaae4a79ae0e.mp4',
  'https://telegra.ph/file/5094ac53709aa11683a54.mp4',
  'https://telegra.ph/file/90ad889125a3ba40bceb8.jpg',
  'https://telegra.ph/file/dc279553e1ccfec6783f3.mp4',
  'https://telegra.ph/file/acdb5c2703ee8390aaf33.mp4'
];

export const command = {
  name: "cum",
  aliases: [],
  description: "cum",
  category: "games",
  use: "@usuario",
  async code(m, { conn }) {
    const mention = m.quoted?.sender || m.mentions?.[0];
    if (!mention) return m.reply("Etiqueta o responde a alguien.");

    const name1 = await conn.getName(m.sender);
    const name2 = await conn.getName(mention);

    await conn.sendMessage(m.chat, {
      react: { text: "💦", key: m.key }
    });

    const caption = `${name1} se vino dentro de ${name2}`;
    const mediaUrl = videos[Math.floor(Math.random() * videos.length)];

    await conn.sendMessage(m.chat, {
      video: { url: mediaUrl },
      caption,
      mentions: [m.sender, mention],
    }, { quoted: m });
  }
};
