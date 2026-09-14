/* ============================================================
   CONFIGURACIÓN DE LA LFPP
   ------------------------------------------------------------
   Este es el ÚNICO archivo que normalmente vas a tocar.

   CÓMO CONECTAR TU GOOGLE SHEETS (para que cualquiera sin acceso
   al código pueda actualizar datos):

   1. Crea una Google Sheet con una pestaña (hoja) por cada tabla:
      Tabla, Goleadores, Asistencias, Vallas, Tarjetas, Equipos,
      Jugadores, Calendario, Fichajes, Disciplina, Galeria,
      Campeones, Reglamento, Config
      (más abajo tienes las columnas exactas que debe llevar cada una)

   2. En Google Sheets: Archivo → Compartir → Publicar en la web.
      - Elige la pestaña específica (ej. "Tabla")
      - Formato: "Valores separados por comas (.csv)"
      - Publica y copia el link que te da.

   3. Pega ese link abajo en el campo correspondiente.
      Repite para cada pestaña.

   4. Cualquiera con permiso de edición en la hoja podrá actualizar
      resultados, stats, etc. y la web se actualizará sola
      (puede tardar 1-5 min en reflejarse por el caché de Google).

   Mientras no pongas un link real, la web usa datos de EJEMPLO
   para que puedas ver cómo se ve todo.
   ============================================================ */

const LFPP_CONFIG = {

  // Nombre de la temporada que se muestra arriba
  temporada: "2026 — Apertura",

  // Link a tu servidor de Discord
  discordUrl: "https://discord.gg/tGXSPfXG3T",

  // ---- LINKS DE GOOGLE SHEETS (CSV publicado) ----
  // Deja vacío ("") para usar datos de ejemplo mientras armas tu hoja.
  sheets: {
    tabla:        "", // Columnas: Posicion,Equipo,PJ,PG,PE,PP,GF,GC,Pts,Zona
                       //   Zona = "clasifica" | "descenso" | "" (vacío = normal)
    goleadores:   "", // Columnas: Jugador,Equipo,Goles
    asistencias:  "", // Columnas: Jugador,Equipo,Asistencias
    vallas:       "", // Columnas: Portero,Equipo,VallasInvictas
    tarjetas:     "", // Columnas: Jugador,Equipo,Amarillas,Rojas
    equipos:      "", // Columnas: Equipo,Ciudad,DT,Fundacion
    jugadores:    "", // Columnas: Jugador,Equipo,Posicion,PJ,Goles,Asistencias
    calendario:   "", // Columnas: Jornada,Local,Visita,Fecha,GolesLocal,GolesVisita,Jugado
                       //   Jugado = "si" | "no". Si "no", GolesLocal/Visita pueden ir vacíos.
    fichajes:     "", // Columnas: Jugador,SaleDe,LlegaA,Fecha,Estado
                       //   Estado = "confirmado" | "rumor" | "cumplida"
    disciplina:   "", // Columnas: Jugador,Equipo,Motivo,Jornadas,Estado
                       //   Estado = "activa" | "cumplida"
    galeria:      "", // Columnas: ImagenURL,Descripcion
    campeones:    "", // Columnas: Temporada,Equipo
    mvp:          "", // Columnas: Jugador,Equipo,Jornada,Motivo
    evolucion:    "", // Columnas: Equipo,Jornada,Pts,DG  (una fila por equipo por jornada)
  },

  // Próximo partido (si no usas la hoja de Calendario para esto,
  // se calcula automáticamente del primer partido no jugado)
};