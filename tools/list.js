// Impor modul dan dependensi yang diperlukan
const api = require("./api.js");
const {
    bold,
    italic,
    quote
} = require("@mengkodingan/ckptw");
const axios = require("axios");
const util = require("node:util");

async function get(type) {
    try {
        let text = "";

        const createList = (data, formatter) => `${data.map(formatter).join(
            "\n" + 
            `${quote("─────")}\n`)}\n` +
            "\n" +
            config.msg.footer;

        switch (type) {
            case "claim": {
                const data = [
                    "daily (Premios diarios)",
                    "weekly (Premios semanales)",
                    "monthly (Regalos mensuales)",
                    "yearly (Regalo anual)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "fixdb": {
                const data = [
                    "user (Datos de usuario)",
                    "group (Datos de grupo)",
                    "menfess (Datos de confesiones)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "group": {
                const data = [
                    "open (abrir grupo)",
                    "close (cerrar grupo)",
                    "lock (bloquear grupo)",
                    "unlock (desbloquear grupo)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "mode": {
                const data = [
                    "group (Modo grupo, solo responder en el chat grupal)",
                    "private (Modo privado, solo responder en chat privado)",
                    "public (Modo público, responder en chats grupales y chats privados)",
                    "self (Modo propio, solo responde a si mismo y a su dueño)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "osettext": {
                const data = [
                    "donate (Variables disponibles: %tag%, %name%, %prefix%, %command%, %footer%, %readmore%) (Establecer texto de donación)",
                    "price (Variables disponibles: %tag%, %name%, %prefix%, %command%, %footer%, %readmore%) (Establecer texto de precio)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "setoption": {
                const data = [
                    "antiaudio (Anti audio)",
                    "Antidocument (Anti Documento)",
                    "Antigif (Anti GIF)",
                    "Antiimage (Anti Imagen)",
                    "antilink (Anti Link)",
                    "antinsfw (Anti NSFW, porn)",
                    "antispam (Anti Spam)",
                    "antisticker (Anti Sticker)",
                    "antivideo (Anti Video)",
                    "antitoxic (Anti toxicos, no malas palabras)",
                    "autokick (Se emite automáticamente si alguien viola alguna de las opciones 'anti...')",
                    "gamerestrict (Los miembros tienen prohibido jugar juegos con el bot)",
                    "welcome (Saludo del miembro)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "setprofile": {
                const data = [
                    "autolevelup (Subida de nivel automática)",
                    "username (Nombre de usuario)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "settext": {
                const data = [
                    "goodbye (Texto de salida, variables disponibles: %tag%, %subject%, %description%) (Establecer un mensaje de despedida)",
                    "intro (Texto de introducción)",
                    "welcome (Texto de bienvenida, variables disponibles: %tag%, %subject%, %description%) (Establecer mensaje de bienvenida)"
                ];
                text = createList(data, d => `${quote(d)}`);
                break;
            }
            case "translate": {
                const data = (await axios.get(api.createUrl("nyxs", "/tools/translate", {})).catch(err => err.response.data.available_languange)) || [];
                text = createList(data, d =>
                    `${quote(`Codigo: ${d.code}`)}\n` +
                    `${quote(`Idioma: ${d.bahasa}`)}`
                );
                break;
            }
            case "tts": {
                const data = (await axios.get(api.createUrl("nyxs", "/tools/tts", {}))).data.available_languange;
                text = createList(data, d =>
                    `${quote(`Codigo: ${d.code}`)}\n` +
                    `${quote(`Idioma: ${d["idioma nacional"]}`)}`
                );
                break;
            }
            default: {
                text = quote(`❎ Tipo desconocido: ${type}`);
                break;
            }
        }

        return text;
    } catch (error) {
        consolefy.error(`Error: ${util.format(error)}`);
        return null;
    }
}

module.exports = {
    get
};