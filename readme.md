# LFPP — Liga Peruana (La Cueva Zuazua)

Sitio web de la liga: tabla de posiciones, estadísticas, equipos, jugadores,
calendario, fichajes, disciplina, galería y reglamento. Los datos se cargan
desde Google Sheets, así que **cualquiera con acceso a la hoja de cálculo
puede actualizar todo sin tocar código**.

## Archivos

- `index.html` — estructura de la página
- `style.css` — estilos (colores, tipografía)
- `app.js` — lógica (no lo necesitas tocar para actualizar datos)
- `config.js` — **el único archivo que sueles tocar**: aquí van los links de tus Google Sheets

## 1. Probarlo ya (sin configurar nada)

Abre `index.html` en el navegador (doble clic) y verás el sitio funcionando
con datos de ejemplo. Así puedes ver el diseño completo antes de conectar
tus datos reales.

## 2. Conectar tus datos reales con Google Sheets

1. Crea una Google Sheet nueva.
2. Crea una pestaña (hoja) por cada tipo de dato, con estos nombres exactos
   de columnas en la primera fila:

   | Pestaña | Columnas |
   |---|---|
   | Tabla | `Posicion,Equipo,PJ,PG,PE,PP,GF,GC,Pts,Zona` (Zona: `clasifica`, `descenso` o vacío) |
   | Goleadores | `Jugador,Equipo,Goles` |
   | Asistencias | `Jugador,Equipo,Asistencias` |
   | Vallas | `Portero,Equipo,VallasInvictas` |
   | Tarjetas | `Jugador,Equipo,Amarillas,Rojas` |
   | Equipos | `Equipo,Ciudad,DT,Fundacion` |
   | Jugadores | `Jugador,Equipo,Posicion,PJ,Goles,Asistencias` |
   | Calendario | `Jornada,Local,Visita,Fecha,GolesLocal,GolesVisita,Jugado` (Fecha formato `2026-09-20 20:00`, Jugado: `si`/`no`) |
   | Fichajes | `Jugador,SaleDe,LlegaA,Fecha,Estado` (Estado: `confirmado`, `rumor`, `cumplida`) |
   | Disciplina | `Jugador,Equipo,Motivo,Jornadas,Estado` (Estado: `activa`, `cumplida`) |
   | Galeria | `ImagenURL,Descripcion` |
   | Campeones | `Temporada,Equipo` |
   | Mvp | `Jugador,Equipo,Jornada,Motivo` |

3. Para cada pestaña: **Archivo → Compartir → Publicar en la web**
   → elige esa pestaña → formato **CSV** → **Publicar** → copia el link.
4. Pega cada link en `config.js`, dentro del objeto `sheets`. Ejemplo:
   ```js
   sheets: {
     tabla: "https://docs.google.com/spreadsheets/d/e/TU_ID/pub?gid=0&single=true&output=csv",
     ...
   }
   ```
5. Comparte la hoja (con permiso de **editor**) con quien vaya a actualizar
   los datos. No necesitan saber nada de código.
6. Los cambios en la hoja tardan entre 1 y 5 minutos en reflejarse en la web
   (la web también se refresca sola cada 2 minutos).

## 3. Personalizar

- **Colores / nombre / Discord**: edita `LFPP_CONFIG` al inicio de `config.js`.
- **Reglamento**: por ahora edita el texto `REGLAMENTO_DEMO` en `app.js`
  (línea marcada claramente). Si prefieres editarlo desde Sheets también,
  dilo y lo conectamos igual que las demás tablas.

## 4. Publicarlo gratis (para que esté siempre abierto)

### Opción recomendada: GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público).
2. Sube estos archivos (`index.html`, `style.css`, `app.js`, `config.js`, `README.md`)
   a la raíz del repositorio — desde VSCode: `Source Control` → *Publish to GitHub*,
   o con Git:
   ```bash
   git init
   git add .
   git commit -m "LFPP sitio inicial"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Source: main → carpeta `/root`** → Save.
4. En 1-2 minutos tu sitio estará disponible en:
   `https://TU_USUARIO.github.io/TU_REPO/`

Esa URL queda **siempre abierta**, gratis, y se actualiza sola cada vez que
subas cambios al repositorio (el código) o alguien edite la Google Sheet
(los datos).

### Alternativas también gratis
- **Netlify** (arrastra la carpeta del proyecto a app.netlify.com)
- **Vercel** (conecta el repo de GitHub)

## 5. Ideas para seguir sumando

- Página de detalle por partido (alineación, minuto a minuto)
- Notificaciones/webhook a Discord cuando se actualiza un resultado
- Votación de la comunidad para el MVP de cada jornada
- Historial de enfrentamientos directos entre dos equipos