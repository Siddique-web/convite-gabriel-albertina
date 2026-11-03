// Gera public/casamento-gabriel-albertina.ics a partir de src/data.js
// (corre automaticamente antes de "npm run dev" e "npm run build")
import { writeFileSync, mkdirSync } from 'node:fs'
import { invite } from '../src/data.js'
import { buildIcs } from '../src/utils/calendar.js'

mkdirSync(new URL('../public/', import.meta.url), { recursive: true })
const content = buildIcs(invite.calendar)
writeFileSync(new URL('../public/casamento-gabriel-albertina.ics', import.meta.url), content)
console.log('ICS gerado: public/casamento-gabriel-albertina.ics')
