// Impor modul dan dependensi yang diperlukan
const middleware = require("./middleware.js");
const events = require("./events/handler.js");
const {
    Client,
    CommandHandler
} = require("@mengkodingan/ckptw");
const path = require("node:path");
const util = require("node:util");

// Konfigurasi bot dari file 'config.js'
const {
    bot: botConfig,
    system
} = config;
const {
    authAdapter
} = botConfig;

// Pilih adapter autentikasi sesuai dengan konfigurasi
const adapters = {
    mysql: () => require("baileys-mysql").useSqlAuthState(authAdapter.mysql),
    mongodb: () => require("baileys-mongodb").useMongoAuthState(authAdapter.mongodb.url),
    firebase: () => require("baileys-firebase").useFireAuthState(authAdapter.firebase)
};
const selectedAuthAdapter = adapters[authAdapter.adapter] ? adapters[authAdapter.adapter]() : null;

consolefy.log("Conectando..."); // Logging proses koneksi

// Buat instance bot dengan pengaturan yang sesuai
const bot = new Client({
    prefix: botConfig.prefix,
    phoneNumber: botConfig.phoneNumber,
    authAdapter: selectedAuthAdapter,
    authDir: authAdapter.adapter === "default" ? path.resolve(__dirname, authAdapter.default.authDir) : null,
    readIncommingMsg: system.autoRead,
    printQRInTerminal: !system.usePairingCode,
    markOnlineOnConnect: system.alwaysOnline,
    usePairingCode: system.usePairingCode,
    selfReply: system.selfReply,
    autoMention: system.autoMention
});

// Inisialisasi event dan middleware
events(bot);
middleware(bot);

// Muat dan jalankan command handler
const cmd = new CommandHandler(bot, path.resolve(__dirname, "commands"));
cmd.load();

bot.launch().catch(error => consolefy.error(`Error: ${util.format(error)}`)); // Luncurkan bot