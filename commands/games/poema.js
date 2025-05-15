const poemas = [
  `🌹 *Poema 1*
Tu mirada, un faro en mi oscuridad,  
tu voz, la paz de mi tempestad.  
En cada latido grita mi verdad:  
te amo con toda intensidad.`,

  `🌹 *Poema 2*
Tus besos son fuego, dulce pasión,  
encienden mi alma, mi corazón.  
Con solo un roce, me haces volar,  
a un mundo donde quiero habitar.`,

  `🌹 *Poema 3*
En tus abrazos encuentro el hogar,  
la calma que me vuelve a respirar.  
Eres mi luna, mi sol, mi canción,  
la dueña eterna de mi corazón.`,

  `🌹 *Poema 4*
Cada palabra tuya es melodía,  
que llena mis noches de poesía.  
No hay verso más bello que tu existir,  
ni sueño más dulce que verte sonreír.`,

  `🌹 *Poema 5*
Tus ojos son estrellas al mirar,  
un universo donde quiero habitar.  
Amarte es arte, es fe, es razón,  
es escribir juntos nuestra canción.`,

  `🌹 *Poema 6*
A tu lado el tiempo deja de correr,  
se detiene el mundo al verte aparecer.  
Eres mi paz, mi risa, mi emoción,  
mi eterno suspiro, mi inspiración.`,

  `🌹 *Poema 7*
Mi amor por ti no tiene final,  
ni medida, ni razón terrenal.  
Es infinito, puro, sin condición,  
es alma, es fuego, es devoción.`,

  `🌹 *Poema 8*
Tu amor es lluvia en mi desierto,  
una promesa que siento cierto.  
Con solo tu nombre late mi ser,  
como un poema que vuelve a nacer.`,

  `🌹 *Poema 9*
Quisiera detener el amanecer,  
para contigo siempre amanecer.  
En cada aurora quiero decir,  
que eres mi todo, mi porvenir.`,

  `🌹 *Poema 10*
Si me pierdo, que sea en tu abrazo,  
si respiro, que sea en tu paso.  
Eres principio, eres final,  
mi amor eterno, mi bien total.`
];

module.exports = {
  name: "poema",
  category: "games",
  permissions: {
    group: true
  },
  code: async (ctx) => {
    const poema = poemas[Math.floor(Math.random() * poemas.length)];
    return await ctx.reply(poema);
  }
};
