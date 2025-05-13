// Impor modul dan dependensi yang diperlukan
const pkg = require("./package.json");
const {
    monospace,
    italic,
    quote
} = require("@mengkodingan/ckptw");

// Konfigurasi
global.config = {
    // Informasi bot dasar
    bot: {
        name: "𝙈𝘼𝘿𝘼𝙍𝘼 𝘽𝙊𝙏 (Private Version)", // Nama bot
        prefix: /^[°•π÷×¶∆£¢€¥®™+✓_=|/~!?@#%^&.©^]/i, // Karakter awalan perintah yang diizinkan
        phoneNumber: "5491149158196", // Nomor telepon bot (opsional jika menggunakan QR code)
        thumbnail: "https://i.pinimg.com/736x/56/1e/de/561ede2cbf5b6706108f445b9be55bd8.jpg", // Gambar thumbnail bot
        groupJid: "", // JID untuk group bot (opsional jika tidak menggunakan requireBotGroupMembership)
        newsletterJid: "120363348355703366@newsletter", // JID untuk saluran bot

        // Konfigurasi autentikasi sesi bot
        authAdapter: {
            adapter: "default", // Adapter untuk menyimpan sesi (Pilihan adapter: default, mysql, mongo, firebase)

            // Konfigurasi default
            default: {
                authDir: "state"
            },

            // Konfigurasi MySQL
            mysql: {
                host: "localhost:3306", // Nama host 
                user: "root", // Nama pengguna
                password: "admin123", // Kata sandi
                database: "ckptw-wabot" // Nama database
            },

            // Konfigurasi MongoDB
            mongodb: {
                url: "mongodb://localhost:27017/ckptw-wabot" // URL
            },

            // Konfigurasi Firebase
            firebase: {
                tableName: "ckptw-wabot", // Nama tabel
                session: "state" // Nama sesi
            }
        }
    },

    // Pesan bot yang disesuaikan untuk situasi tertentu
    msg: {
        admin: quote("⛔ ¡Los comandos sólo son accesibles para los administradores del grupo!"), // Pesan saat perintah hanya untuk admin
        banned: quote("⛔ ¡No se puede procesar porque el propietario te ha prohibido!"), // Pesan untuk pengguna yang dibanned
        botAdmin: quote("⛔ ¡No se puede procesar porque el bot no es administrador de este grupo!"), // Pesan jika bot bukan admin di grup
        botGroupMembership: quote(`⛔ ¡No se puede procesar porque no te uniste al grupo de la bot! Escribe: ${monospace("/botgroup")} para obtener el enlace del grupo de la bot`),
        coin: quote("⛔ ¡No se puede procesar porque sus eris no son suficientes!"), // Pesan saat koin tidak cukup
        cooldown: quote("🔄 Este comando está en espera, por favor espere..."), // Pesan saat cooldown perintah
        gamerestrict: quote("⛔ ¡No se puede procesar porque este grupo restringe el juego!"),
        group: quote("⛔ ¡Los comandos solo son accesibles dentro de los grupos!"), // Pesan untuk perintah grup
        owner: quote("⛔ ¡Sólo el propietario puede acceder a los comandos!"), // Pesan untuk perintah yang hanya owner bisa akses
        premium: quote("⛔ ¡No se puede procesar porque no eres un usuario Premium!"), // Pesan jika pengguna bukan Premium
        private: quote("⛔ ¡Los comandos solo son accesibles en el chat privado!"), // Pesan untuk perintah obrolan pribadi
        restrict: quote("⛔ ¡Este comando ha sido restringido por razones de seguridad!"), // Pesan pembatasan perintah

        readmore: "\u200E".repeat(4001), // String read more
        note: "“𝙈𝘼𝘿𝘼𝙍𝘼 𝘽𝙊𝙏”", // Catatan
        footer: italic("𝙙𝙚𝙫𝙚𝙡𝙤𝙥𝙚𝙙 𝙗𝙮 𝙎𝙚𝙗𝙖𝙨-𝙈𝘿"), // Footer di pesan bot

        wait: quote("🔄 Procesando..."), // Pesan loading
        notFound: quote("❎ ¡No se encontró nada! Por favor, inténtelo de nuevo más tarde."), // Pesan item tidak ditemukan
        urlInvalid: quote("❎ Link no válido!") // Pesan jika URL tidak valid
    },

    // Informasi owner bot
    owner: {
        name: "𝙎𝙚𝙗𝙖𝙨-𝙈𝘿", // Nama owner bot
        organization: "𝙈𝘼𝘿𝘼𝙍𝘼 𝘽𝙊𝙏", // Nama organisasi owner bot
        id: "5491166887146", // Nomor telepon owner bot
        co: ["5491166887146"] // Nomor co-owner bot
    },

    // Stiker bot
    sticker: {
        packname: "Created By", // Nama paket stiker
        author: " 𝙈𝘼𝘿𝘼𝙍𝘼 𝘽𝙊𝙏 (PV Version)" // Pembuat stiker
    },

    // Sistem bot
    system: {
        alwaysOnline: true, // Bot selalu berstatus "online"
        antiCall: false, // Bot secara otomatis membanned orang yang menelepon
        autoMention: false, // Bot otomatis mention seseorang dalam pesan yang dikirim
        autoRead: false, // Bot baca pesan otomatis
        autoTypingOnCmd: false, // Tampilkan status "sedang mengetik" saat memproses perintah
        cooldown: 10 * 1000, // Jeda antar perintah (ms)
        maxListeners: 50, // Max listeners untuk events
        port: 3000, // Port (jika pakai server)
        reportErrorToOwner: true, // Laporkan kesalahan ke owner bot
        restrict: false, // Batasi akses perintah
        requireBotGroupMembership: false, // Harus gabung grup bot
        selfOwner: true, // Bot jadi owner sendiri
        selfReply: true, // Bot balas pesan bot sendiri
        timeZone: "America/Buenos_Aires", // Zona waktu bot
        uploaderHost: "Nyxs", // Host uploader untuk menyimpan media (Tersedia: Catbox, Cloudku, Erhabot, FastUrl, IDNet, Litterbox, Nyxs, Pomf, Quax, Ryzen, Shojib, TmpErhabot, Uguu, Videy)
        useCoin: true, // Pakai koin
        usePairingCode: true, // Pakai kode pairing untuk koneksi
        useServer: true // Jalankan bot dengan server
    }
};
