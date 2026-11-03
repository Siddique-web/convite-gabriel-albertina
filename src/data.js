// ============================================================
// Convite Digital — Gabriel & Albertina
// Edita aqui todos os dados do convite. Não precisas de tocar
// em mais nenhum ficheiro para mudar nomes, data, locais ou links.
// ============================================================

export const invite = {
  monogram: 'G · A',
  couple: {
    bride: 'Albertina',
    groom: 'Gabriel',
  },
  coupleNames: 'Gabriel & Albertina',
  greeting: 'Com a bênção de Deus',
  weekday: 'SÁBADO',
  month: 'DEZEMBRO',
  day: '19',
  year: '2026',
  dateDisplay: '19.12.2026',
  time: '13H00',
  closingLine: 'Seremos gratos em ter a sua presença!',

  // Data/hora exacta do evento (countdown + calendário)
  // Fuso horário de Moçambique (CAT, UTC+2)
  eventDate: '2026-12-19T13:00:00+02:00',
  eventTimezone: 'Africa/Maputo',

  // Música de fundo — ficheiro em public/music/ (nome deve coincidir com musicSrc)
  musicSrc: '/music/wedding.mp3',

  // Dados para adicionar ao calendário (iPhone + Android)
  calendar: {
    title: 'Casamento — Gabriel & Albertina',
    description:
      'Cerimónia civil às 13h00 no Macuti Oasis Garden.\nCerimónia religiosa às 15h00 na Catedral.\nCopo de água às 18h00 no Oasis Garden.',
    location: 'Macuti Oasis Garden, Beira',
    start: '2026-12-19T13:00:00+02:00',
    end: '2026-12-19T23:00:00+02:00',
  },
  // Ficheiro de calendário gerado automaticamente no build a partir dos dados acima (public/)
  icsFile: '/casamento-gabriel-albertina.ics',

  // Texto de convite (logo a seguir ao início)
  intro: [
    'Temos a honra e a imensa alegria de convidá-lo(a) a partilhar connosco este momento tão especial.',
    'Venha unir-se a nós e celebrar o nosso enlace matrimonial, conforme a programação a seguir.',
  ],

  // Os noivos e as suas famílias
  families: {
    photo: '/images/casal-circulo.jpg',
    groom: { name: 'Gabriel', label: 'Filho de', parents: ['Joaquim Muzambue', 'Fátima Zélia'] },
    bride: { name: 'Albertina', label: 'Filha de', parents: ['Sabino de Castro Nombora', 'Macretina Mandjaze'] },
  },

  // Passagem bíblica
  verse: {
    title: 'União abençoada',
    text: 'Deus mudou o teu caminho até juntares com o meu e guardou a tua vida separando-a para mim. Para onde fores, irei; onde tu repousares, repousarei. Teu Deus será o meu Deus. Teu caminho o meu será.',
    reference: 'Rute 1:16,17',
  },

  // Parte de presente
  gifts: {
    title: 'Parte de presente',
    highlightTitle: 'Os noivos gostariam de receber os presentes desta forma',
    highlightText:
      'A sua presença é o nosso maior presente. Com muito carinho, pedimos que a sua oferta seja feita por uma destas opções, escolhendo a que for mais conveniente para si.',
    envelope: { option: 'Opção 1', title: 'Envelope', note: 'Entregue aos noivos no dia do casamento' },
    bank: {
      option: 'Opção 2',
      title: 'Transferência bancária',
      bank: 'Millennium BIM',
      account: '270367616',
      nib: '000100000027036761657',
    },
    emola: { option: 'Opção 3', title: 'Emola', number: '865795825', holder: 'Albertina Sabino' },
    thanks: 'Agradecemos de coração o seu carinho.',
  },

  // Programa do dia. `icon`: rings | church | glass
  // Troca o `mapsUrl` pelo link exacto do Google Maps (botão "Partilhar") quando quiseres.
  schedule: [
    {
      time: '13:00',
      icon: 'rings',
      title: 'Cerimónia Civil',
      location: 'Macuti Oasis Garden',
      note: 'Início da celebração',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Macuti+Oasis+Garden+Beira+Mozambique',
    },
    {
      time: '15:00',
      icon: 'church',
      title: 'Cerimónia Religiosa',
      location: 'Catedral',
      note: 'Bênção do nosso matrimónio',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Catedral+Beira+Mozambique',
    },
    {
      time: '18:00',
      icon: 'glass',
      title: 'Copo de Água',
      location: 'Oasis Garden',
      note: 'Brinde e convívio com família e amigos',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Macuti+Oasis+Garden+Beira+Mozambique',
    },
  ],

  // Fotos do casal (public/images/)
  heroPhoto: '/images/foto1.jpg',
  backgroundPhoto: '/images/foto4.jpg',
  gallery: [
    { src: '/images/foto1.jpg', alt: 'Gabriel e Albertina — retrato de estúdio' },
    { src: '/images/foto5.jpg', alt: 'Gabriel e Albertina — testa com testa' },
    { src: '/images/foto2.jpg', alt: 'Gabriel e Albertina — sorrisos' },
    { src: '/images/foto4.jpg', alt: 'Gabriel e Albertina — de mãos dadas' },
    { src: '/images/foto3.jpg', alt: 'Gabriel e Albertina — cumplicidade' },
    { src: '/images/foto6.jpg', alt: 'Gabriel e Albertina — abraço' },
  ],

  // ---------- Confirmação de presença (formulário -> Google Sheets) ----------
  // URL do Web App do Google Apps Script que grava as respostas na planilha.
  rsvpEndpoint:
    'https://script.google.com/macros/s/AKfycbwCXlYiAGJLs1ZOhwaAwlKawJFQWVzCou-qK8j5KI0n8lWTOkYVE2lE76DBJSlBhSth/exec',

  // ---------- (Opcional) Confirmação de presença por WhatsApp ----------
  // Número do WhatsApp que recebe as confirmações, com indicativo e SEM "+" nem espaços.
  // Ex.: Moçambique 84 123 4567  ->  '258841234567'
  // Se ficar vazio, o WhatsApp abre a lista de contactos para escolher o destinatário.
  whatsappNumber: '',
  whatsappMessage: 'Eu confirmo a minha presença',

  rsvpNotice:
    'A confirmação de presença somente será válida se recebeu este convite diretamente dos noivos',
}
