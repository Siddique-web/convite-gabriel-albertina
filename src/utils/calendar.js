// Utilitários de calendário (sem dependências do browser: também usados pelo script de build)

function toIcsUtc(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

export function buildGoogleCalendarUrl({ title, description, location, start, end }, timezone) {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    details: description,
    location,
    dates: `${toIcsUtc(new Date(start))}/${toIcsUtc(new Date(end))}`,
  })
  if (timezone) params.set('ctz', timezone)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function escapeIcs(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

// Linhas do .ics não podem passar de 75 bytes: dobra as linhas longas (RFC 5545)
function foldLine(line) {
  const encoder = new TextEncoder()
  if (encoder.encode(line).length <= 74) return line
  const chunks = []
  let current = ''
  for (const char of line) {
    if (encoder.encode(current + char).length > (chunks.length === 0 ? 74 : 73)) {
      chunks.push(current)
      current = char
    } else {
      current += char
    }
  }
  chunks.push(current)
  return chunks.join('\r\n ')
}

// Gera o conteúdo do ficheiro .ics (funciona no Calendário da Apple, Samsung, Google, Outlook).
// Horas em UTC para não haver erros de fuso horário em nenhum telemóvel.
export function buildIcs({ title, description, location, start, end }, { uid, url } = {}) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Convite Gabriel e Albertina//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Casamento Gabriel e Albertina',
    'BEGIN:VEVENT',
    `UID:${uid || 'casamento-gabriel-albertina-20261219@convite'}`,
    `DTSTAMP:${toIcsUtc(new Date())}`,
    `DTSTART:${toIcsUtc(new Date(start))}`,
    `DTEND:${toIcsUtc(new Date(end))}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    ...(url ? [`URL:${url}`] : []),
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(title)} — amanhã`,
    'TRIGGER:-P1D',
    'END:VALARM',
    'BEGIN:VALARM',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcs(title)} — hoje`,
    'TRIGGER:-PT3H',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.map(foldLine).join('\r\n') + '\r\n'
}

export function formatCountdown(ms) {
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true }
  }

  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, finished: false }
}

function padDisplay(n) {
  return String(n).padStart(2, '0')
}

export { padDisplay }
