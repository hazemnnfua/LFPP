/* ============================================================
   LFPP — app.js
   ============================================================ */

// Equipos que tienen mucho padding en su logo y necesitan zoom
const ZOOM_LOGOS = new Set([
  "Sporting Cristal",
  "Los Chankas CyC",
]);

const LOGOS = {
  "Universitario":        "assets/universitario.png",
  "Sporting Cristal":     "assets/sporting-cristal.png",
  "AD Cantolao":          "assets/cantolao.png",
  "Cienciano":            "assets/cienciano.png",
  "FBC Melgar":           "assets/melgar.png",
  "Sport Huancayo":       "assets/sport-huancayo.png",
  "Los Chankas CyC":      "assets/los chankas.png",
  "Sport Boys":           "assets/sport-boys.png",
  "Comerciantes Unidos":  "assets/comerciantes-unidos.png",
};

function teamLogoUrl(nombre){ return LOGOS[nombre] || null; }
const needsZoom = nombre => ZOOM_LOGOS.has(nombre);

// Avatares personalizados por jugador (ej. skin de Roblox) que tienen prioridad
// sobre el logo del club en tarjetas como el MVP.
//
// IMPORTANTE sobre estas URLs: son las que devuelve la propia API de Roblox
// (thumbnails.roblox.com/v1/users/avatar-headshot) para ese userId. No se
// pueden generar solo con el userId al vuelo desde el navegador porque esa
// API no tiene CORS habilitado y además bloquea trafico que no venga de un
// navegador real (bloqueo anti-bot) — por eso el intento anterior de
// resolverlo dinamicamente con un proxy no funcionaba. La URL de abajo, en
// cambio, es la imagen final ya resuelta en el CDN de Roblox (tr.rbxcdn.com),
// que si se puede usar directo en un <img src="..."> sin ningun problema.
//
// Esta URL se mantiene valida mientras el usuario no cambie su avatar/skin
// en Roblox. Si en algun momento deja de verse, hay que volver a sacarla:
// abre en el navegador
//   https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=<ID>&size=180x180&format=Png&isCircular=false
// y copia el valor de "imageUrl" de ahi.
const PLAYER_AVATARS = {
  "sayallyn502": "https://tr.rbxcdn.com/30DAY-AvatarHeadshot-A168205D53E9EBBB3A0E8465432EE2E4-Png/180/180/AvatarHeadshot/Png/noFilter",
};

function playerAvatarUrl(jugador){ return PLAYER_AVATARS[jugador] || null; }

function logoHtml(nombre, size='sm'){
  const url = teamLogoUrl(nombre);
  if(!url) return `<span class="logo-txt logo-${size}">${initials(nombre)}</span>`;
  const zoomClass = needsZoom(nombre) ? 'logo-zoom' : 'logo-normal';
  return `<span class="logo-circle logo-${size} ${zoomClass}"><img src="${url}" alt="${nombre}"></span>`;
}

// ============================================================
// DATOS DEMO — Tabla actualizada a Jornada 3
// ============================================================
const DEMO = {
  tabla: [
    {Posicion:1, Equipo:"Universitario",       PJ:3, PG:3, PE:0, PP:0, DG:13,  Pts:9,  Zona:"clasifica"},
    {Posicion:2, Equipo:"Los Chankas CyC",      PJ:3, PG:2, PE:0, PP:1, DG:6,   Pts:6,  Zona:"clasifica"},
    {Posicion:3, Equipo:"Sport Boys",           PJ:3, PG:2, PE:0, PP:1, DG:6,   Pts:6,  Zona:"clasifica"},
    {Posicion:4, Equipo:"Sport Huancayo",       PJ:3, PG:1, PE:0, PP:2, DG:0,   Pts:3,  Zona:""},
    {Posicion:5, Equipo:"Cienciano",            PJ:3, PG:1, PE:1, PP:1, DG:2,   Pts:4,  Zona:""},
    {Posicion:6, Equipo:"Sporting Cristal",     PJ:3, PG:0, PE:1, PP:2, DG:-3,  Pts:1,  Zona:""},
    {Posicion:7, Equipo:"Comerciantes Unidos",  PJ:3, PG:0, PE:1, PP:2, DG:-6,  Pts:1,  Zona:""},
    {Posicion:8, Equipo:"FBC Melgar",           PJ:3, PG:0, PE:1, PP:2, DG:-6,  Pts:1,  Zona:"descenso"},
    {Posicion:9, Equipo:"AD Cantolao",          PJ:3, PG:0, PE:1, PP:2, DG:-13, Pts:1,  Zona:"descenso"},
  ],
  // Calendario simulado con jornadas 1-3 para que el gráfico de evolución funcione
  calendario: [
    // Jornada 1 — 5 de septiembre
    {Jornada:"1", Local:"Universitario",      Visita:"AD Cantolao",         GolesLocal:"10", GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-05"},
    {Jornada:"1", Local:"Los Chankas CyC",    Visita:"FBC Melgar",           GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-05"},
    {Jornada:"1", Local:"Sport Boys",         Visita:"Comerciantes Unidos",  GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-05"},
    {Jornada:"1", Local:"Sport Huancayo",     Visita:"Cienciano",            GolesLocal:"1",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-05"},
    {Jornada:"1", Local:"Sporting Cristal",   Visita:"Sin rival",            GolesLocal:"0",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-05"},
    // Jornada 2 — 12 de septiembre (Universitario ganó por default 3-0 a Melgar; el resto son partidos aproximados, pendientes de confirmar)
    {Jornada:"2", Local:"Universitario",      Visita:"FBC Melgar",           GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-12"},
    {Jornada:"2", Local:"AD Cantolao",        Visita:"Sporting Cristal",     GolesLocal:"0",  GolesVisita:"1",  Jugado:"si", Fecha:"2026-09-12"},
    {Jornada:"2", Local:"Sport Boys",          Visita:"Sport Huancayo",       GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-12"},
    {Jornada:"2", Local:"Comerciantes Unidos",Visita:"Los Chankas CyC",      GolesLocal:"0",  GolesVisita:"3",  Jugado:"si", Fecha:"2026-09-12"},
    {Jornada:"2", Local:"Cienciano",          Visita:"Sin rival",            GolesLocal:"0",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-12"},
    // Jornada 3 — 13 de septiembre (partidos reales de la fecha)
    {Jornada:"3", Local:"Comerciantes Unidos", Visita:"Universitario",      GolesLocal:"0",  GolesVisita:"3",  Jugado:"si", Fecha:"2026-09-13"},
    {Jornada:"3", Local:"Cienciano",           Visita:"Sport Boys",          GolesLocal:"2",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-09-13"},
    {Jornada:"3", Local:"FBC Melgar",          Visita:"AD Cantolao",         GolesLocal:"1",  GolesVisita:"1",  Jugado:"si", Fecha:"2026-09-13"},
    {Jornada:"3", Local:"Los Chankas CyC",     Visita:"Sport Huancayo",      GolesLocal:"",   GolesVisita:"",   Jugado:"no", Fecha:"2026-09-13"},
  ],
  // Evolución jornada a jornada: Pts y DG acumulados al término de cada fecha.
  // Mismo formato que tendría la hoja de Sheets: una fila por equipo por jornada.
  // Cienciano no tiene fila en Jornada 1 (no aparecía aún en la tabla de esa fecha).
  evolucion: [
    {Equipo:"Universitario",       Jornada:"1", Pts:"3", DG:"10"},
    {Equipo:"Universitario",       Jornada:"2", Pts:"6", DG:"13"},
    {Equipo:"Universitario",       Jornada:"3", Pts:"9", DG:"13"},
    {Equipo:"Los Chankas CyC",     Jornada:"1", Pts:"3", DG:"3"},
    {Equipo:"Los Chankas CyC",     Jornada:"2", Pts:"6", DG:"6"},
    {Equipo:"Los Chankas CyC",     Jornada:"3", Pts:"6", DG:"6"},
    {Equipo:"Sport Boys",          Jornada:"1", Pts:"3", DG:"3"},
    {Equipo:"Sport Boys",          Jornada:"2", Pts:"6", DG:"6"},
    {Equipo:"Sport Boys",          Jornada:"3", Pts:"6", DG:"6"},
    {Equipo:"Sport Huancayo",      Jornada:"1", Pts:"3", DG:"3"},
    {Equipo:"Sport Huancayo",      Jornada:"2", Pts:"3", DG:"0"},
    {Equipo:"Sport Huancayo",      Jornada:"3", Pts:"3", DG:"0"},
    {Equipo:"Cienciano",           Jornada:"2", Pts:"1", DG:"0"},
    {Equipo:"Cienciano",           Jornada:"3", Pts:"4", DG:"2"},
    {Equipo:"Sporting Cristal",    Jornada:"1", Pts:"0", DG:"-3"},
    {Equipo:"Sporting Cristal",    Jornada:"2", Pts:"1", DG:"-3"},
    {Equipo:"Sporting Cristal",    Jornada:"3", Pts:"1", DG:"-3"},
    {Equipo:"Comerciantes Unidos", Jornada:"1", Pts:"0", DG:"-3"},
    {Equipo:"Comerciantes Unidos", Jornada:"2", Pts:"1", DG:"-3"},
    {Equipo:"Comerciantes Unidos", Jornada:"3", Pts:"1", DG:"-6"},
    {Equipo:"FBC Melgar",          Jornada:"1", Pts:"0", DG:"-3"},
    {Equipo:"FBC Melgar",          Jornada:"2", Pts:"0", DG:"-6"},
    {Equipo:"FBC Melgar",          Jornada:"3", Pts:"1", DG:"-6"},
    {Equipo:"AD Cantolao",         Jornada:"1", Pts:"0", DG:"-10"},
    {Equipo:"AD Cantolao",         Jornada:"2", Pts:"0", DG:"-13"},
    {Equipo:"AD Cantolao",         Jornada:"3", Pts:"1", DG:"-13"},
  ],
  goleadores:[
    {Jugador:"excalibursitosq3", Equipo:"Universitario", Goles:"3"},
    {Jugador:"sayallyn502",       Equipo:"Universitario", Goles:"3"},
  ],
  asistencias:[
    {Jugador:"excalibursitosq3", Equipo:"Universitario", Asistencias:"1"},
    {Jugador:"sayallyn502",       Equipo:"Universitario", Asistencias:"2"},
  ],
  vallas:[
    {Portero:"ggls1", Equipo:"Universitario", VallasInvictas:"3"},
  ],
  tarjetas:[
    {Jugador:"sebas97100", Equipo:"Sport Huancayo", Amarillas:"0", Rojas:"1"},
  ],
  equipos:[
    {Equipo:"Universitario",       Ciudad:"Lima",        DT:"", Fundacion:"2026"},
    {Equipo:"Los Chankas CyC",     Ciudad:"Andahuaylas", DT:"martin990272", Fundacion:"2026"},
    {Equipo:"Sport Boys",          Ciudad:"Lima",        DT:"xxmanuuxx_", Fundacion:"2026"},
    {Equipo:"Sport Huancayo",      Ciudad:"Huancayo",    DT:"chris077192", Fundacion:"2026"},
    {Equipo:"Sporting Cristal",    Ciudad:"Lima",        DT:"doue0430", Fundacion:"2026"},
    {Equipo:"Comerciantes Unidos", Ciudad:"Cutervo",     DT:"chino.918_", Fundacion:"2026"},
    {Equipo:"Cienciano",           Ciudad:"Cusco",       DT:"stefab3001_", Fundacion:"2026"},
    {Equipo:"FBC Melgar",          Ciudad:"Arequipa",    DT:"_fragger._.", Fundacion:"2026"},
    {Equipo:"AD Cantolao",         Ciudad:"Callao",      DT:"gagamaru_2010", Fundacion:"2026"},
  ],
  jugadores:[
    {Jugador:"excalibursitosq3", Equipo:"Universitario",  Posicion:"", PJ:"3", Goles:"3", Asistencias:"1"},
    {Jugador:"sayallyn502",       Equipo:"Universitario",  Posicion:"", PJ:"3", Goles:"3", Asistencias:"2"},
    {Jugador:"sebas97100",        Equipo:"Sport Huancayo", Posicion:"", PJ:"3", Goles:"0", Asistencias:"0"},
    {Jugador:"martin990272",      Equipo:"Los Chankas CyC",     Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
    {Jugador:"xxmanuuxx_",        Equipo:"Sport Boys",          Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
    {Jugador:"chris077192",       Equipo:"Sport Huancayo",      Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
    {Jugador:"doue0430",          Equipo:"Sporting Cristal",    Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
    {Jugador:"chino.918_",        Equipo:"Comerciantes Unidos", Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
    {Jugador:"stefab3001_",       Equipo:"Cienciano",           Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
    {Jugador:"_fragger._.",       Equipo:"FBC Melgar",          Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
    {Jugador:"gagamaru_2010",     Equipo:"AD Cantolao",         Posicion:"DT", PJ:"", Goles:"", Asistencias:""},
  ],
  fichajes:[],
  disciplina:[
    {Jugador:"sebas97100", Equipo:"Sport Huancayo", Motivo:"Tarjeta roja", Jornadas:"1", Estado:"activa"},
  ],
  galeria:[
    {ImagenURL:"assets/uni.png", Descripcion:"Universitario"},
    {ImagenURL:"assets/uni2.png", Descripcion:"Universitario"},
  ], campeones:[],
  mvp:[
    {Jugador:"sayallyn502", Equipo:"Universitario", Jornada:"1", Motivo:"Hat-trick y 2 asistencias"},
    {Jugador:"xxxvxrnnn", Equipo:"", Jornada:"3", Motivo:"Golazo de mitad de cancha"},
  ],
};

const REGLAMENTO_DEMO = `⚽ REGLAMENTO DE PARTIDO — LFPP (1/6)
2.1 Formato del partido

N1. El máximo de jugadores en cancha por equipo es 7. El mínimo para poder disputar el partido es 5. Si un equipo no reúne el mínimo de 5 jugadores a la hora pactada, se aplica protocolo de W.O.

Duración del partido: dos tiempos (definir minutos según formato del torneo/liga) con descanso intermedio.

En caso de empate en fases eliminatorias: tiempo extra y, de persistir el empate, definición por penales (5 por equipo, luego muerte súbita).

N2 / N23 — Pase al portero
Si un jugador realiza un pase intencionado hacia atrás al portero y este lo controla con las manos → penal.
Si el balón llega al portero por un rechace, despeje o desvío no intencionado (propio o rival) → saque de meta, sin sanción.

N3 — Entrada con equipo completo
Si un jugador entra a la cancha con el equipo ya completo (7 en cancha): amonestación (amarilla). Si con su entrada interfiere en una jugada clara de gol: tarjeta roja directa + gol si el árbitro lo determina (regla de ventaja).

N4 — Jugadores en banca
Todo jugador suplente debe permanecer en la banca designada. Incumplirlo: tarjeta amarilla.

N5 — Insultos al árbitro
El árbitro puede amonestar o expulsar según la gravedad, a su criterio, dejando constancia por escrito del motivo.

N6 — Gol lag
Si por problemas de lag el balón entra a portería en una jugada anómala, se marca gol anulado y saque de meta para el equipo afectado. El árbitro decide con base en su visión directa o clip de evidencia; en caso de duda, se recurre a VAR.

⚽ REGLAMENTO DE PARTIDO — LFPP (2/6)
N7 — Uniforme
Todos los jugadores deben portar el uniforme/skin oficial del club. Incumplirlo puede derivar en detención del partido o amonestación.

N8 — Morphs
Se permite 1 morph por equipo como máximo. 2 morphs: amonestación a los jugadores involucrados. 3 o más: amonestación + posible sanción al club.

N9 — Abandono
Abandono sin avisar: el partido continúa normalmente. Abandono avisado: el juego se detiene y se otorgan 30 segundos para reanudar antes de continuar.

N10 — Saque inicial
En el saque inicial el balón debe pasarse (no puede dispararse directo a portería). Si no se cumple, se repite el saque; si vuelve a ocurrir, tarjeta amarilla al jugador que ejecuta el saque.

N11 — Bugs/glitches
Si un jugador se "buguea" (queda atascado por error del juego), se detiene el partido y se otorga balón libre al equipo afectado en el punto donde ocurrió el bug.

N12 — Cambios de jugador
Los cambios de jugador deben anunciarse al instante en el chat/voz, indicando claramente quién sale y quién entra.

⚽ REGLAMENTO DE PARTIDO — LFPP (3/6)
N13 — Sin rol asignado
Participar sin rol asignado por la liga implica autowin (derrota automática) para el equipo infractor.

N19 — Interrupción de jugadas
Patear el balón durante la ejecución de un tiro libre, penal o córner del equipo rival: tarjeta amarilla por interrupción de jugada.

N20 — Suplente en jugada de gol
Un suplente que entra a la cancha durante una jugada clara de gol: tarjeta roja directa + posible sanción de liga de hasta 3 partidos.

N21 — Invasión de cancha
Si un espectador/aficionado invade la cancha: el árbitro detiene el juego, puede aplicar smite o ban al invasor, y se otorgan 2 tiros de esquina (botes) a favor del equipo afectado.

N22 — Invasión en penal
Invasión del área durante ejecución de un penal por más de 10 segundos: tarjeta amarilla a los infractores.

Accesorios prohibidos
Prohibido el uso de accesorios que cubran o dificulten la visibilidad de las piernas. El jugador debe cambiarlos/quitarlos antes del partido oficial; de lo contrario, tarjeta amarilla y posible sanción al club si el partido se disputó con la infracción.

🟨🟥 FALTAS Y TARJETAS — LFPP (4/6)
3.1 Criterio de tackle (fusión N14 + N24)

N24. Si un jugador realiza un tackle y alcanza a tocar el balón primero, no se sanciona como falta, ni como penal si ocurre dentro del área.

N14. Si el tackle no toca el balón y sí al rival, se considera falta y puede sancionarse con tarjeta amarilla según la intensidad y riesgo de la jugada.

N18 — Acumulación de tackles
Se cuentan los tackles por jugador durante todo el partido: al segundo tackle que resulte en falta, advertencia verbal del árbitro; al tercer tackle-falta, tarjeta amarilla obligatoria (o roja si la jugada fue temeraria/violenta).

N16 — Falta en el área
Falta cometida dentro del área propia: penal.

N15 — Último defensor
Si un atacante va solo hacia portería (sin más defensores entre él y el arco) y el último defensor comete falta para evitarlo: tarjeta roja directa.

N17 — Rebote en pared
Si el balón rebota en una pared del mapa y el portero lo toma con las manos, no se considera ni indirecto ni penal.

🎯 DOGSO
Se sanciona cuando: el atacante avanza hacia la portería con control del balón, está cerca del área o de la portería, y no hay defensores entre él y la portería (excepto el infractor).

Siempre tarjeta roja + falta, sin importar amarillas previas. Puede sancionarse aunque el sistema marque "no foul". Dentro del área: penal + roja. Fuera del área: libre + roja.

3.3 — Escala de tarjetas
2 amarillas en el mismo partido = expulsión, sin reemplazo, respetando el mínimo de 5.
3 amarillas acumuladas en partidos distintos de la misma fase/jornada = 1 partido de sanción automática.
Roja directa = expulsión inmediata + mínimo 1 partido de sanción.
El jugador expulsado no puede ser sustituido; el equipo sigue con uno menos si no baja del mínimo de 5.

📐🔍 OFFSIDE, VAR Y ADMINS — LFPP (5/6)
4. Fuera de juego (Offside)
Un jugador está en fuera de juego si se encuentra 2 cuadros (studs/tiles) o más adelantado respecto al último defensor rival (sin contar al portero) al momento del pase.
No hay offside en saque de meta, banda, córner, o en campo propio.
Sanción: tiro libre indirecto en el punto del offside.
No hay offside pasivo: si interfiere en la jugada (bloquea visión, disputa balón, etc.), se sanciona igual.

5. Sistema VAR
5.1 Cada equipo dispone de 2 solicitudes de VAR por partido. Acierto: no se descuenta. Error: se pierde una solicitud.
5.2 Solo para: goles, penales, tarjetas rojas y errores de identidad de jugador.
5.3 Se basa en clips grabados o repetición del árbitro. Sin evidencia clara, se mantiene la decisión original.
5.4 El árbitro principal tiene la decisión final; no apelable en el momento, solo por ticket post-partido con evidencia adicional.

6.1-6.4 — Jerarquía y árbitro
Árbitro principal > Árbitro asistente/VAR > Admin de liga > Moderador de Discord.
El árbitro debe estar presente antes del inicio; si no hay árbitro 15 min después de la hora pactada, los capitanes acuerdan uno neutral o reagendan con aprobación de un Admin.
Debe grabar el partido completo.
Ningún árbitro puede dirigir un partido de su propio club o uno con intereses declarados.

6.5-6.8 — Potestades de admins
Revisar decisiones arbitrales solo ante evidencia clara de error grave o mala fe.
Aplicar sanciones disciplinarias fuera de cancha.
Suspender temporalmente a un árbitro con parcialidad reiterada.
Los admins no pueden dirigir partidos de su propio club salvo excepción del CEO.
Toda sanción se registra en el canal correspondiente. Tickets: respuesta en 24-48h, si no, escalar al CEO.

⚖️🧩 SANCIONES Y PROTOCOLOS ESPECIALES — LFPP (6/6)
Tabla de sanciones
• Amarilla (acumulación de 3): 1 partido de suspensión
• Roja directa (falta de juego): 1-2 partidos
• Roja por DOGSO: 2 partidos
• Interferencia en jugada de gol (N20): hasta 3 partidos
• Insultos al árbitro (leve): amonestación
• Insultos al árbitro (grave): expulsión + 1-3 partidos
• Insultos/burlas post-partido: sanción al club; reincidencia = expulsión del club
• Más de 2 morphs: amonestación + posible sanción al club
• Sin rol asignado: autowin en contra
• Falsificación de contratos/ofertas: nulidad + sanción al club
• Multicuenta: ban permanente + sanción al club
• No presentarse (W.O.): derrota 3-0 administrativa
• Fraude comprobado: pérdida del partido + posible expulsión del club

10.1 — Lag individual
Ver N6. Duda sobre gol por lag → se aplica VAR.

10.2 — Caída general del servidor
Si afecta a ambos equipos, el partido se reanuda desde el marcador y minuto exacto, en nuevo servidor, dentro de [definir, ej. 24h].

10.3 — Walkover (W.O.)
Tolerancia: 10-15 min. Sin mínimo de 5 jugadores → W.O. a favor del rival (ej. 3-0). Reincidencia: resta de puntos o expulsión.

10.4 — Grabación obligatoria
El árbitro o un jugador designado por equipo debe grabar el partido completo. Conservar mínimo 72 horas.

10.5 — Suplantación (smurfing)
Jugar con cuenta ajena sin autorización: autowin en contra + posible expulsión del jugador.

Números entre corchetes deben ser fijados oficialmente por la liga. Última actualización: [fecha].

(Reemplaza este texto editando la hoja "Reglamento" en Google Sheets)`;

// ============================================================
// CARGA DE DATOS
// ============================================================
function loadSheet(key){
  const url = LFPP_CONFIG.sheets[key];
  return new Promise(resolve => {
    if(!url){ resolve(DEMO[key]||[]); return; }
    Papa.parse(url,{
      download:true, header:true, skipEmptyLines:true,
      complete:res=>resolve(res.data),
      error:()=>resolve(DEMO[key]||[]),
    });
  });
}
const DATA = {};
async function loadAll(){
  await Promise.all(Object.keys(LFPP_CONFIG.sheets).map(async k=>{ DATA[k]=await loadSheet(k); }));
  render();
}

// ============================================================
// HELPERS
// ============================================================
const num = v => Number(String(v).replace(/[^\d.-]/g,''))||0;
const initials = name => (name||'?').slice(0,2).toUpperCase();
function setText(id,t){ const e=document.getElementById(id); if(e) e.textContent=t; }

function animateIn(selector, delayStep=35){
  document.querySelectorAll(selector).forEach((el,i)=>{
    el.style.animationDelay = `${i*delayStep}ms`;
    el.style.animationFillMode = 'both';
  });
}

// ============================================================
// RENDER: TABLA
// ============================================================
function renderTabla(){
  const rows = [...DATA.tabla].sort((a,b)=>num(a.Posicion)-num(b.Posicion));
  document.querySelector('#tabla-completa tbody').innerHTML = rows.map(r=>{
    const zonaClass = r.Zona==='clasifica'?'pos-clasifica':r.Zona==='descenso'?'pos-descenso':'';
    const dg = num(r.DG);
    return `<tr>
      <td><span class="pos-num ${zonaClass}">${r.Posicion}</span></td>
      <td class="al"><div class="equipo-cell">${logoHtml(r.Equipo,'xs')}<strong>${r.Equipo}</strong></div></td>
      <td>${r.PJ}</td><td>${r.PG}</td><td>${r.PE}</td><td>${r.PP}</td>
      <td>${dg>0?'+'+dg:dg}</td>
      <td><strong>${r.Pts}</strong></td>
    </tr>`;
  }).join('') || '<tr><td colspan="8">Sin datos aún.</td></tr>';
  animateIn('#tabla-completa tbody tr');

  document.getElementById('home-tabla-mini').innerHTML = rows.slice(0,5).map(r=>`
    <div class="result-row">
      <div class="result-teams">
        <span class="pos-num ${r.Zona==='clasifica'?'pos-clasifica':r.Zona==='descenso'?'pos-descenso':''}">${r.Posicion}</span>
        ${logoHtml(r.Equipo,'xs')} ${r.Equipo}
      </div>
      <div class="result-score">${r.Pts} pts</div>
    </div>`).join('') || 'Sin datos aún.';
  animateIn('#home-tabla-mini .result-row');

  const select = document.getElementById('evo-equipo-select');
  select.innerHTML = rows.map(r=>`<option value="${r.Equipo}">${r.Equipo}</option>`).join('');
  select.onchange = ()=>renderEvoChart(select.value);
  if(rows.length){
    try{ renderEvoChart(rows[0].Equipo); }
    catch(err){ console.error('Error renderizando el gráfico de evolución:', err); }
  }
}

// ============================================================
// RENDER: EVOLUCIÓN DE EQUIPO (gráfico mejorado)
// ============================================================
let evoChartInstance = null;
function renderEvoChart(equipo, intentos=0){
  if(typeof Chart === 'undefined'){
    // Chart.js puede tardar en cargar (o estar usando el CDN de respaldo).
    // Reintentamos por unos segundos antes de mostrar un aviso.
    if(intentos < 20){
      setTimeout(()=>renderEvoChart(equipo, intentos+1), 250);
      return;
    }
    console.warn('Chart.js no se pudo cargar (revisa tu conexión o si algo está bloqueando los CDN).');
    const wrap = document.querySelector('#panel-tabla .chart-wrap');
    if(wrap) wrap.innerHTML = '<p style="padding:1rem;color:var(--texto-suave);">No se pudo cargar el gráfico (problema de conexión). Intenta recargar la página.</p>';
    return;
  }
  // DATA.evolucion es un arreglo plano (Equipo,Jornada,Pts,DG) -- mismo
  // formato que tendría la hoja de Sheets. Filtramos por equipo y ordenamos.
  const historial = (DATA.evolucion||[])
    .filter(h => h.Equipo === equipo)
    .sort((a,b) => num(a.Jornada) - num(b.Jornada));

  const labels = historial.map(h => 'J'+h.Jornada);
  const puntosData = historial.map(h => num(h.Pts));
  const dgData = historial.map(h => num(h.DG));

  const ctx = document.getElementById('evo-chart');
  if(evoChartInstance) evoChartInstance.destroy();

  evoChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Puntos',
          data: puntosData,
          borderColor: '#C8102E',
          backgroundColor: 'rgba(200,16,46,.08)',
          fill: true,
          tension: .35,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointBackgroundColor: '#C8102E',
          yAxisID: 'y',
        },
        {
          label: 'Diferencia de gol',
          data: dgData,
          borderColor: '#C9A227',
          backgroundColor: 'rgba(201,162,39,.08)',
          borderDash: [5,4],
          fill: false,
          tension: .35,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointBackgroundColor: '#C9A227',
          yAxisID: 'y1',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration:700, easing:'easeInOutQuart' },
      plugins: {
        legend: { display: true, position:'bottom' },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y > 0 ? '+' : ''}${ctx.parsed.y}`
          }
        }
      },
      scales: {
        y:  { position:'left',  beginAtZero:true, ticks:{precision:0}, grid:{color:'rgba(128,128,128,.1)'}, title:{display:true,text:'Puntos'} },
        y1: { position:'right', ticks:{precision:0}, grid:{display:false}, title:{display:true,text:'Dif. de gol'} },
        x:  { grid:{display:false} }
      }
    }
  });
}

// ============================================================
// RANKING FIFA (sistema tipo Elo)
// ============================================================
const ELO_INICIAL = 1000;
const ELO_K = 32;

function factorGol(dif){
  if(dif<=1) return 1;
  if(dif===2) return 1.5;
  return 1.75 + (dif-3)/8;
}

// Recorre todos los partidos jugados en orden cronológico y devuelve:
// { historial: {Equipo: [{jornada, fecha, rating}, ...]}, actual: {Equipo: rating}, cambios: {Equipo: delta desde la última jornada jugada} }
function calcularEloRanking(){
  const equipos = (DATA.tabla||[]).map(r=>r.Equipo);
  const rating = {};
  equipos.forEach(eq => rating[eq] = ELO_INICIAL);

  const historial = {};
  equipos.forEach(eq => historial[eq] = [{ jornada:'0', fecha:null, rating:ELO_INICIAL }]);

  const jugados = (DATA.calendario||[])
    .filter(p => p.Jugado==='si' && p.Local!=='Sin rival' && p.Visita!=='Sin rival' && rating.hasOwnProperty(p.Local) && rating.hasOwnProperty(p.Visita))
    .sort((a,b)=> new Date(a.Fecha) - new Date(b.Fecha));

  const cambios = {}; // delta de la última jornada jugada, por equipo
  let ultimaJornada = null;

  jugados.forEach(p=>{
    const golesLocal = num(p.GolesLocal), golesVisita = num(p.GolesVisita);
    const ratingLocal = rating[p.Local], ratingVisita = rating[p.Visita];

    const eLocal = 1 / (1 + Math.pow(10, (ratingVisita - ratingLocal) / 400));
    const eVisita = 1 - eLocal;

    let sLocal;
    if(golesLocal > golesVisita) sLocal = 1;
    else if(golesLocal < golesVisita) sLocal = 0;
    else sLocal = 0.5;
    const sVisita = 1 - sLocal;

    const dif = Math.abs(golesLocal - golesVisita);
    const fg = factorGol(dif);

    const deltaLocal = ELO_K * fg * (sLocal - eLocal);
    const deltaVisita = ELO_K * fg * (sVisita - eVisita);

    rating[p.Local] += deltaLocal;
    rating[p.Visita] += deltaVisita;

    historial[p.Local].push({ jornada:p.Jornada, fecha:p.Fecha, rating: rating[p.Local] });
    historial[p.Visita].push({ jornada:p.Jornada, fecha:p.Fecha, rating: rating[p.Visita] });

    if(ultimaJornada===null || p.Jornada===ultimaJornada || new Date(p.Fecha) >= new Date(jugados[jugados.length-1].Fecha)){
      // se recalcula abajo con más precisión
    }
    ultimaJornada = p.Jornada;
  });

  // Cambio = diferencia entre el rating actual y el que tenía ANTES de la última jornada jugada
  const jornadasOrdenadas = [...new Set(jugados.map(p=>p.Jornada))].sort((a,b)=>num(a)-num(b));
  const ultimaJ = jornadasOrdenadas[jornadasOrdenadas.length-1];
  equipos.forEach(eq=>{
    const h = historial[eq];
    const antes = [...h].reverse().find(pt => pt.jornada !== ultimaJ);
    const ahora = rating[eq];
    cambios[eq] = antes ? (ahora - antes.rating) : 0;
  });

  return { historial, actual: rating, cambios };
}

let rankingChartInstance = null;
function renderRanking(){
  const { historial, actual, cambios } = calcularEloRanking();
  const equipos = Object.keys(actual);
  const ordenado = equipos.map(eq => ({ equipo:eq, rating: actual[eq], cambio: cambios[eq]||0 }))
    .sort((a,b) => b.rating - a.rating);

  document.querySelector('#tabla-ranking tbody').innerHTML = ordenado.map((r,i)=>{
    const cambioTxt = Math.round(r.cambio*10)/10;
    const flecha = cambioTxt > 0.05 ? `▲ ${cambioTxt}` : cambioTxt < -0.05 ? `▼ ${Math.abs(cambioTxt)}` : '=';
    const flechaClass = cambioTxt > 0.05 ? 'pos-clasifica' : cambioTxt < -0.05 ? 'pos-descenso' : '';
    return `<tr>
      <td>${i+1}</td>
      <td class="al"><div class="equipo-cell">${logoHtml(r.equipo,'xs')}<strong>${r.equipo}</strong></div></td>
      <td><strong>${Math.round(r.rating)}</strong></td>
      <td><span class="pos-num ${flechaClass}">${flecha}</span></td>
    </tr>`;
  }).join('') || '<tr><td colspan="4">Sin datos aún.</td></tr>';
  animateIn('#tabla-ranking tbody tr');

  // Gráfico de evolución: una línea por equipo, eje X = jornadas jugadas
  if(typeof Chart === 'undefined') return;
  const jornadas = [...new Set(
    Object.values(historial).flat().map(pt=>pt.jornada)
  )].sort((a,b)=>num(a)-num(b));

  const paleta = ['#C8102E','#C9A227','#2E6F40','#2D5DA1','#8E44AD','#D97706','#0E7490','#A3A3A3','#DB2777'];
  const datasets = equipos.map((eq,i)=>{
    const porJornada = {};
    historial[eq].forEach(pt => porJornada[pt.jornada] = pt.rating);
    // rellenar huecos (jornadas donde el equipo no jugó, ej. jornada con "Sin rival") con el último valor conocido
    let ultimo = ELO_INICIAL;
    const data = jornadas.map(j=>{
      if(porJornada.hasOwnProperty(j)) ultimo = porJornada[j];
      return Math.round(ultimo);
    });
    return {
      label: eq,
      data,
      borderColor: paleta[i % paleta.length],
      backgroundColor: 'transparent',
      tension: .3,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: 2,
    };
  });

  const ctx = document.getElementById('ranking-chart');
  if(rankingChartInstance) rankingChartInstance.destroy();
  rankingChartInstance = new Chart(ctx, {
    type: 'line',
    data: { labels: jornadas.map(j => j==='0' ? 'Inicio' : 'J'+j), datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration:700, easing:'easeInOutQuart' },
      plugins: { legend: { display:true, position:'bottom' } },
      scales: {
        y: { beginAtZero:false, ticks:{precision:0}, grid:{color:'rgba(128,128,128,.1)'}, title:{display:true,text:'Puntos Elo'} },
        x: { grid:{display:false} }
      }
    }
  });
}

// ============================================================
// RENDER: STATS
// ============================================================
function renderStats(){
  const goleadores=[...DATA.goleadores].sort((a,b)=>num(b.Goles)-num(a.Goles));
  document.querySelector('#tabla-goleadores tbody').innerHTML=goleadores.map((r,i)=>
    `<tr><td>${i+1}</td><td class="al"><div class="equipo-cell">${logoHtml(r.Equipo,'xs')} ${r.Jugador}</div></td><td class="al">${r.Equipo}</td><td><strong>${r.Goles}</strong></td></tr>`
  ).join('')||'<tr><td colspan="4">Sin datos aún.</td></tr>';
  animateIn('#tabla-goleadores tbody tr');

  document.getElementById('home-goleadores-mini').innerHTML=goleadores.slice(0,5).map((r,i)=>
    `<div class="result-row"><div class="result-teams">${i+1}. ${r.Jugador} <span style="color:var(--texto-suave);font-weight:400">(${r.Equipo})</span></div><div class="result-score">${r.Goles}</div></div>`
  ).join('')||'Sin datos aún.';

  const asist=[...DATA.asistencias].sort((a,b)=>num(b.Asistencias)-num(a.Asistencias));
  document.querySelector('#tabla-asistencias tbody').innerHTML=asist.map((r,i)=>
    `<tr><td>${i+1}</td><td class="al">${r.Jugador}</td><td class="al">${r.Equipo}</td><td><strong>${r.Asistencias}</strong></td></tr>`
  ).join('')||'<tr><td colspan="4">Sin datos aún.</td></tr>';

  const vallas=[...DATA.vallas].sort((a,b)=>num(b.VallasInvictas)-num(a.VallasInvictas));
  document.querySelector('#tabla-vallas tbody').innerHTML=vallas.map((r,i)=>
    `<tr><td>${i+1}</td><td class="al"><div class="equipo-cell">${logoHtml(r.Equipo,'xs')} ${r.Portero}</div></td><td class="al">${r.Equipo}</td><td><strong>${r.VallasInvictas}</strong></td></tr>`
  ).join('')||'<tr><td colspan="4">Sin datos aún.</td></tr>';

  const tarjetas=[...DATA.tarjetas].sort((a,b)=>(num(b.Rojas)*10+num(b.Amarillas))-(num(a.Rojas)*10+num(a.Amarillas)));
  document.querySelector('#tabla-tarjetas tbody').innerHTML=tarjetas.map(r=>
    `<tr><td class="al"><div class="equipo-cell">${logoHtml(r.Equipo,'xs')} ${r.Jugador}</div></td><td class="al">${r.Equipo}</td><td>${r.Amarillas||0}</td><td>${r.Rojas||0}</td></tr>`
  ).join('')||'<tr><td colspan="4">Sin datos aún.</td></tr>';
}

// ============================================================
// RENDER: EQUIPOS Y JUGADORES
// ============================================================
function renderEquipos(filtro=''){
  const f=filtro.toLowerCase();
  const equipos=DATA.equipos.filter(e=>e.Equipo.toLowerCase().includes(f));
  document.getElementById('equipos-grid').innerHTML=equipos.map(e=>{
    const logo=teamLogoUrl(e.Equipo);
    const zoom=needsZoom(e.Equipo);
    const imgHtml=logo
      ? `<div class="logo-wrap${zoom?'':' no-zoom'}"><img src="${logo}" alt="${e.Equipo}"></div>`
      : `<div class="logo-fallback">${initials(e.Equipo)}</div>`;
    return `<div class="team-card">${imgHtml}<h3>${e.Equipo}</h3>
      <div class="team-meta">${e.Ciudad?e.Ciudad+' · ':''}DT ${e.DT||'—'}</div>
      <div class="team-meta">Fundado en ${e.Fundacion||'—'}</div>
    </div>`;
  }).join('')||'<p>No se encontraron equipos.</p>';
  animateIn('#equipos-grid .team-card',55);
}

function renderJugadores(filtro=''){
  const f=filtro.toLowerCase();
  const jugadores=DATA.jugadores.filter(j=>j.Jugador.toLowerCase().includes(f)||(j.Equipo||'').toLowerCase().includes(f));
  document.querySelector('#tabla-jugadores tbody').innerHTML=jugadores.map(j=>
    `<tr><td class="al">${j.Jugador}</td><td class="al"><div class="equipo-cell">${logoHtml(j.Equipo,'xs')} ${j.Equipo}</div></td><td class="al">${j.Posicion||'—'}</td><td>${j.PJ||0}</td><td>${j.Goles||0}</td><td>${j.Asistencias||0}</td></tr>`
  ).join('')||'<tr><td colspan="6">No se encontraron jugadores.</td></tr>';
}

// ============================================================
// RENDER: CALENDARIO / RESULTADOS / PRÓXIMO PARTIDO
// ============================================================
function renderCalendario(){
  const porJornada={};
  DATA.calendario.forEach(p=>{ (porJornada[p.Jornada]=porJornada[p.Jornada]||[]).push(p); });
  document.getElementById('calendario-jornadas').innerHTML=
    Object.keys(porJornada).sort((a,b)=>num(a)-num(b)).map(j=>{
      const partidos=porJornada[j].map(p=>{
        const jugado=p.Jugado==='si';
        return `<div class="partido-row">
          <div class="eq-local">${p.Local}</div>
          <div class="marcador">${jugado?`${p.GolesLocal} - ${p.GolesVisita}`:'vs'}</div>
          <div class="eq-visita">${p.Visita}</div>
          <div class="fecha">${formatFecha(p.Fecha)}</div>
        </div>`;
      }).join('');
      return `<div class="jornada-block"><div class="jornada-title">Jornada ${j}</div>${partidos}</div>`;
    }).join('')||'Aún no hay calendario cargado.';

  const jugados=DATA.calendario.filter(p=>p.Jugado==='si').sort((a,b)=>new Date(b.Fecha)-new Date(a.Fecha)).slice(0,5);
  document.getElementById('ultimos-resultados').innerHTML=jugados.map(p=>`
    <div class="result-row">
      <div class="result-teams">${logoHtml(p.Local,'xs')} ${p.Local} vs ${p.Visita} ${logoHtml(p.Visita,'xs')}</div>
      <div class="result-score">${p.GolesLocal} - ${p.GolesVisita}</div>
    </div>`).join('')||'Sin resultados aún.';

  const proximo=DATA.calendario.filter(p=>p.Jugado!=='si'&&p.Fecha).sort((a,b)=>new Date(a.Fecha)-new Date(b.Fecha))[0];
  if(proximo){
    document.getElementById('hero-matchup').innerHTML=
      `${logoHtml(proximo.Local,'sm')} ${proximo.Local}
       <span style="opacity:.45;margin:0 .4rem">vs</span>
       ${proximo.Visita} ${logoHtml(proximo.Visita,'sm')}`;
    setText('topbar-next',`Próximo: ${proximo.Local} vs ${proximo.Visita} — ${formatFecha(proximo.Fecha)}`);
    startCountdown(new Date(proximo.Fecha));
  } else {
    document.getElementById('hero-matchup').textContent='Sin partidos programados';
    setText('topbar-next','Sin próximos partidos programados');
  }
}

function formatFecha(f){
  if(!f) return '';
  const d=new Date(f);
  if(isNaN(d)) return f;
  return d.toLocaleString('es-PE',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});
}

let countdownInterval=null;
function startCountdown(target){
  if(countdownInterval) clearInterval(countdownInterval);
  const tick=()=>{
    const diff=target-new Date();
    if(diff<=0){ setText('cd-d','00');setText('cd-h','00');setText('cd-m','00');setText('cd-s','00'); clearInterval(countdownInterval); return; }
    setText('cd-d',String(Math.floor(diff/86400000)).padStart(2,'0'));
    setText('cd-h',String(Math.floor(diff%86400000/3600000)).padStart(2,'0'));
    setText('cd-m',String(Math.floor(diff%3600000/60000)).padStart(2,'0'));
    setText('cd-s',String(Math.floor(diff%60000/1000)).padStart(2,'0'));
  };
  tick(); countdownInterval=setInterval(tick,1000);
}

// ============================================================
// RENDER: FICHAJES / DISCIPLINA
// ============================================================
function renderFichajes(){
  document.querySelector('#tabla-fichajes tbody').innerHTML=DATA.fichajes.map(f=>
    `<tr><td class="al">${f.Jugador}</td><td class="al">${f.SaleDe}</td><td class="al">${f.LlegaA}</td>
     <td class="al">${formatFecha(f.Fecha)||f.Fecha}</td>
     <td class="al"><span class="badge badge-${f.Estado}">${f.Estado}</span></td></tr>`
  ).join('')||'<tr><td colspan="5">Sin movimientos en el mercado.</td></tr>';
}
function renderDisciplina(){
  document.querySelector('#tabla-disciplina tbody').innerHTML=DATA.disciplina.map(d=>
    `<tr><td class="al">${d.Jugador}</td><td class="al">${d.Equipo}</td><td class="al">${d.Motivo}</td>
     <td>${d.Jornadas}</td><td class="al"><span class="badge badge-${d.Estado}">${d.Estado}</span></td></tr>`
  ).join('')||'<tr><td colspan="5">No hay sanciones activas.</td></tr>';
}

// ============================================================
// RENDER: GALERIA / CAMPEONES / MVP / REGLAMENTO
// ============================================================
function renderGaleria(){
  document.getElementById('galeria-grid').innerHTML=DATA.galeria.map(g=>
    `<div class="gallery-item"><img src="${g.ImagenURL}" alt="${g.Descripcion||''}" loading="lazy"><div class="gallery-caption">${g.Descripcion||''}</div></div>`
  ).join('')||'Aún no hay imágenes en la galería.';
}
function renderCampeones(){
  document.getElementById('campeones').innerHTML=DATA.campeones.map(c=>{
    const logo=teamLogoUrl(c.Equipo);
    const zoom=needsZoom(c.Equipo);
    return `<div class="campeon-chip">
      <div class="anio">${c.Temporada}</div>
      ${logo?`<div class="logo-wrap${zoom?'':' no-zoom'}" style="width:38px;height:38px;margin:.4rem auto 0;"><img src="${logo}" alt="${c.Equipo}"></div>`:''}
      <div class="equipo">🏆 ${c.Equipo}</div>
    </div>`;
  }).join('')||'Aún no hay campeones registrados.';
}
function renderMvp(){
  const ultimos = [...DATA.mvp].slice(-3).reverse(); // los 3 más recientes, del más nuevo al más viejo
  const el=document.getElementById('mvp-card');
  if(!ultimos.length){ el.innerHTML='Sin MVP registrado aún.'; return; }
  el.innerHTML = ultimos.map(mvp=>{
    const avatar = playerAvatarUrl(mvp.Jugador);
    const logo = teamLogoUrl(mvp.Equipo);
    const imgSrc = avatar || logo;
    const onerrorFallback = logo ? `this.onerror=null;this.src='${logo}';` : `this.style.display='none';`;
    return `<div class="mvp-card">
      <div class="mvp-avatar">${imgSrc?`<img src="${imgSrc}" alt="${mvp.Jugador}" style="width:100%;height:100%;object-fit:cover;" onerror="${onerrorFallback}">`:initials(mvp.Jugador)}</div>
      <div><div class="mvp-name">${mvp.Jugador}</div><div class="mvp-meta">${mvp.Equipo} · Jornada ${mvp.Jornada}</div><div class="mvp-meta">${mvp.Motivo||''}</div></div>
    </div>`;
  }).join('<hr style="border:none;border-top:1px solid var(--linea);margin:.9rem 0;">');
}
function renderReglamento(){
  const url=LFPP_CONFIG.sheets.reglamento;
  const el=document.getElementById('reglamento-content');
  if(!url){ el.textContent=REGLAMENTO_DEMO; return; }
  Papa.parse(url,{download:true,header:true,skipEmptyLines:true,
    complete:res=>{ el.textContent=(res.data[0]&&res.data[0].Texto)?res.data[0].Texto:REGLAMENTO_DEMO; },
    error:()=>{ el.textContent=REGLAMENTO_DEMO; }
  });
}

// ============================================================
// RENDER GENERAL
// ============================================================
function render(){
  setText('temporada-actual',LFPP_CONFIG.temporada);
  document.getElementById('discord-link').href=LFPP_CONFIG.discordUrl;
  // Cada sección se renderiza en su propio try/catch para que un error en
  // una (p.ej. si Chart.js tarda en cargar) no deje "Cargando…" al resto.
  const secciones = [
    ['tabla', renderTabla], ['ranking', renderRanking], ['stats', renderStats], ['equipos', ()=>renderEquipos()],
    ['jugadores', ()=>renderJugadores()], ['calendario', renderCalendario],
    ['fichajes', renderFichajes], ['disciplina', renderDisciplina],
    ['galeria', renderGaleria], ['campeones', renderCampeones],
    ['mvp', renderMvp], ['reglamento', renderReglamento],
  ];
  secciones.forEach(([nombre, fn])=>{
    try{ fn(); }catch(err){ console.error(`Error renderizando "${nombre}":`, err); }
  });
}

// ============================================================
// TABS
// ============================================================
function initTabs(){
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>activateTab(btn.dataset.tab));
  });
  document.querySelectorAll('[data-goto]').forEach(el=>{
    el.addEventListener('click',()=>activateTab(el.dataset.goto));
  });
}
function activateTab(tab){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.toggle('active',p.id==='panel-'+tab));
  window.scrollTo({top:0,behavior:'smooth'});
  // El gráfico de evolución se crea mientras su panel está oculto (display:none),
  // así que Chart.js lo calcula con tamaño 0 y queda en blanco para siempre.
  // Al entrar a la pestaña "Tabla" forzamos un resize (y si aún no se creó, lo creamos).
  if(tab==='tabla'){
    const select=document.getElementById('evo-equipo-select');
    if(evoChartInstance){
      requestAnimationFrame(()=>evoChartInstance.resize());
    } else if(select && select.value){
      renderEvoChart(select.value);
    }
  }
  if(tab==='ranking'){
    if(rankingChartInstance){
      requestAnimationFrame(()=>rankingChartInstance.resize());
    } else {
      try{ renderRanking(); }catch(err){ console.error('Error renderizando el ranking FIFA:', err); }
    }
  }
}

// ============================================================
// BUSCADORES
// ============================================================
function initSearch(){
  document.getElementById('buscador-equipos').addEventListener('input',e=>renderEquipos(e.target.value));
  document.getElementById('buscador-jugadores').addEventListener('input',e=>renderJugadores(e.target.value));
}

// ============================================================
// TEMA
// ============================================================
function initTheme(){
  const btn=document.getElementById('theme-toggle');
  if(localStorage.getItem('lfpp-theme')==='dark')
    document.documentElement.setAttribute('data-theme','dark');
  btn.addEventListener('click',()=>{
    const isDark=document.documentElement.getAttribute('data-theme')==='dark';
    if(isDark){ document.documentElement.removeAttribute('data-theme'); localStorage.setItem('lfpp-theme','light'); }
    else { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('lfpp-theme','dark'); }
  });
}

// ============================================================
// INIT
// ============================================================
document.addEventListener('DOMContentLoaded',()=>{
  initTabs(); initSearch(); initTheme();
  loadAll();
  setInterval(loadAll,120000);
});
