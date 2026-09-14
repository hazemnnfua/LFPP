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
    // Jornada 1
    {Jornada:"1", Local:"Universitario",      Visita:"AD Cantolao",         GolesLocal:"10", GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-01"},
    {Jornada:"1", Local:"Los Chankas CyC",    Visita:"FBC Melgar",           GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-01"},
    {Jornada:"1", Local:"Sport Boys",         Visita:"Comerciantes Unidos",  GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-01"},
    {Jornada:"1", Local:"Sport Huancayo",     Visita:"Cienciano",            GolesLocal:"1",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-01"},
    {Jornada:"1", Local:"Sporting Cristal",   Visita:"Sin rival",            GolesLocal:"0",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-01"},
    // Jornada 2 (Universitario ganó por default 3-0 a Melgar; el resto son partidos aproximados, pendientes de confirmar)
    {Jornada:"2", Local:"Universitario",      Visita:"FBC Melgar",           GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-08"},
    {Jornada:"2", Local:"AD Cantolao",        Visita:"Sporting Cristal",     GolesLocal:"0",  GolesVisita:"1",  Jugado:"si", Fecha:"2026-08-08"},
    {Jornada:"2", Local:"Sport Boys",          Visita:"Sport Huancayo",       GolesLocal:"3",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-08"},
    {Jornada:"2", Local:"Comerciantes Unidos",Visita:"Los Chankas CyC",      GolesLocal:"0",  GolesVisita:"3",  Jugado:"si", Fecha:"2026-08-08"},
    {Jornada:"2", Local:"Cienciano",          Visita:"Sin rival",            GolesLocal:"0",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-08"},
    // Jornada 3 — partidos reales de la fecha
    {Jornada:"3", Local:"Comerciantes Unidos", Visita:"Universitario",      GolesLocal:"0",  GolesVisita:"3",  Jugado:"si", Fecha:"2026-08-15"},
    {Jornada:"3", Local:"Cienciano",           Visita:"Sport Boys",          GolesLocal:"2",  GolesVisita:"0",  Jugado:"si", Fecha:"2026-08-15"},
    {Jornada:"3", Local:"FBC Melgar",          Visita:"AD Cantolao",         GolesLocal:"1",  GolesVisita:"1",  Jugado:"si", Fecha:"2026-08-15"},
    {Jornada:"3", Local:"Los Chankas CyC",     Visita:"Sport Huancayo",      GolesLocal:"",   GolesVisita:"",   Jugado:"no", Fecha:"2026-08-15"},
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
  goleadores:[], asistencias:[],
  vallas:[],
  tarjetas:[
    {Jugador:"sebas97100", Equipo:"Sport Huancayo", Amarillas:"0", Rojas:"1"},
  ],
  equipos:[
    {Equipo:"Universitario",       Ciudad:"Lima",        DT:"", Fundacion:""},
    {Equipo:"Los Chankas CyC",     Ciudad:"Andahuaylas", DT:"", Fundacion:""},
    {Equipo:"Sport Boys",          Ciudad:"Lima",        DT:"", Fundacion:""},
    {Equipo:"Sport Huancayo",      Ciudad:"Huancayo",    DT:"", Fundacion:""},
    {Equipo:"Sporting Cristal",    Ciudad:"Lima",        DT:"", Fundacion:""},
    {Equipo:"Comerciantes Unidos", Ciudad:"Cutervo",     DT:"", Fundacion:""},
    {Equipo:"Cienciano",           Ciudad:"Cusco",       DT:"", Fundacion:""},
    {Equipo:"FBC Melgar",          Ciudad:"Arequipa",    DT:"", Fundacion:""},
    {Equipo:"AD Cantolao",         Ciudad:"Callao",      DT:"", Fundacion:""},
  ],
  jugadores:[], fichajes:[],
  disciplina:[
    {Jugador:"sebas97100", Equipo:"Sport Huancayo", Motivo:"Tarjeta roja", Jornadas:"1", Estado:"activa"},
  ],
  galeria:[], campeones:[],
  mvp:[
    {Jugador:"xxxvxrnnn", Equipo:"", Jornada:"3", Motivo:"Golazo de mitad de cancha"},
  ],
};

const REGLAMENTO_DEMO = `FORMATO: todos contra todos a una vuelta. Puntuación: victoria 3 pts, empate 1 pt, derrota 0 pts.

SANCIONES: doble amarilla o roja directa = mínimo 1 jornada de suspensión.

FICHAJES: el mercado abre 48h antes de cada jornada y cierra 2h antes del primer partido.

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
  if(rows.length) renderEvoChart(rows[0].Equipo);
}

// ============================================================
// RENDER: EVOLUCIÓN DE EQUIPO (gráfico mejorado)
// ============================================================
let evoChartInstance = null;
function renderEvoChart(equipo){
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
    `<tr><td>${i+1}</td><td class="al">${r.Portero}</td><td class="al">${r.Equipo}</td><td><strong>${r.VallasInvictas}</strong></td></tr>`
  ).join('')||'<tr><td colspan="4">Sin datos aún.</td></tr>';

  const tarjetas=[...DATA.tarjetas].sort((a,b)=>(num(b.Rojas)*10+num(b.Amarillas))-(num(a.Rojas)*10+num(a.Amarillas)));
  document.querySelector('#tabla-tarjetas tbody').innerHTML=tarjetas.map(r=>
    `<tr><td class="al">${r.Jugador}</td><td class="al">${r.Equipo}</td><td>${r.Amarillas||0}</td><td>${r.Rojas||0}</td></tr>`
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
    `<tr><td class="al">${j.Jugador}</td><td class="al">${j.Equipo}</td><td class="al">${j.Posicion||'—'}</td><td>${j.PJ||0}</td><td>${j.Goles||0}</td><td>${j.Asistencias||0}</td></tr>`
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
  const mvp=DATA.mvp[DATA.mvp.length-1];
  const el=document.getElementById('mvp-card');
  if(!mvp){ el.innerHTML='Sin MVP registrado aún.'; return; }
  const logo=teamLogoUrl(mvp.Equipo);
  el.innerHTML=`<div class="mvp-card">
    <div class="mvp-avatar">${logo?`<img src="${logo}" alt="${mvp.Equipo}" style="width:100%;height:100%;object-fit:contain;">`:initials(mvp.Jugador)}</div>
    <div><div class="mvp-name">${mvp.Jugador}</div><div class="mvp-meta">${mvp.Equipo} · Jornada ${mvp.Jornada}</div><div class="mvp-meta">${mvp.Motivo||''}</div></div>
  </div>`;
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
  renderTabla(); renderStats(); renderEquipos(); renderJugadores();
  renderCalendario(); renderFichajes(); renderDisciplina();
  renderGaleria(); renderCampeones(); renderMvp(); renderReglamento();
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
