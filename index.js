// Impor modul dan dependensi yang diperlukan
require("./config.js");
const pkg = require("./package.json");
const tools = require("./tools/exports.js");
const {
    Consolefy
} = require("@mengkodingan/consolefy");
const CFonts = require("cfonts");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const SimplDB = require("simpl.db");

// Inisialisasi Consolefy untuk logging
const c = new Consolefy({
    tag: pkg.name
});

// Inisialisasi SimplDB untuk Database
const dbFile = path.join(__dirname, "database.json");
if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, "{}", "utf8");
const db = new SimplDB();

// Hapus folder autentikasi jika kosong (untuk bot dengan adapter default)
if (config.bot.authAdapter.adapter === "default") {
    const authDir = path.resolve(__dirname, config.bot.authAdapter.default.authDir);
    if (fs.existsSync(authDir) && !fs.readdirSync(authDir).length) {
        fs.rmSync(authDir, {
            recursive: true,
            force: true
        });
    }
}

// Tetapkan konfigurasi dan alat ke variabel global
Object.assign(global, {
    config,
    tools,
    consolefy: c,
    db
});

c.log("Starting..."); // Logging proses awal

// Tampilkan nama proyek
CFonts.say(pkg.name, {
    font: "chrome",
    align: "center",
    gradient: ["red", "magenta"]
});

// Tampilkan deskripsi dan informasi pengembang
CFonts.say(
    `'${pkg.description}'\n` +
    `By ${pkg.author}`, {
        font: "console",
        align: "center",
        gradient: ["red", "magenta"]
    }
);

// Jalankan server jika diaktifkan dalam konfigurasi
if (config.system.useServer) {
    const {
        port
    } = config.system;
    http.createServer((_, res) => res.end(`${pkg.name} berjalan di port ${port}`)).listen(port, () => c.success(`${pkg.name} runs on port ${port}`));
}

require("./main.js"); // Jalankan modul utama