# Convite Digital — Gabriel & Albertina

Convite de casamento interativo: capa com a foto do casal que "abre" em duas metades,
contagem decrescente, programa do dia com mapas, galeria de fotos, adicionar ao calendário
e **confirmação de presença por WhatsApp** (botão com mensagem automática).

## Testar localmente

```bash
npm install
npm run dev
```

## Publicar

```bash
npm run build
```

Ou liga o repositório do GitHub ao Vercel (Framework: Vite, Output: `dist`).

## O que editar (tudo em `src/data.js`)

- **`whatsappNumber`** — número que recebe as confirmações, com indicativo e sem "+" nem espaços
  (ex.: `'258841234567'`). Se ficar vazio, o WhatsApp abre a lista de contactos.
- **`whatsappMessage`** — texto automático ("Eu confirmo a minha presença").
- **`schedule`** — horas, locais e links do Google Maps. Troca os links de pesquisa pelo
  link exacto do local (Google Maps → Partilhar → Copiar link).
- **Calendário** — o ficheiro `public/casamento-gabriel-albertina.ics` é gerado sozinho a partir de `calendar` em `data.js`
  sempre que corres `npm run dev` ou `npm run build` (o Vercel faz isto automaticamente).
- **`calendar.end`** — hora de fim usada ao guardar no calendário (por defeito 23:00).
- **`greeting`, `intro`** — frase de abertura ("Com a bênção de Deus") e o texto de convite.
- **`families`** — nomes dos noivos, filiação (pais) e a foto circular.
- **`verse`** — passagem bíblica.
- **`gifts`** — envelope, conta bancária (conta e NIB) e Emola, com botão "Copiar".
- **`gallery`, `heroPhoto`, `backgroundPhoto`** — fotos em `public/images/`.
- **Música** — `public/music/wedding.mp3`.

## Fontes

Kaushan Script (nomes) · Great Vibes (destaques em manuscrito) · Playfair Display (títulos) · Lora (texto) · Montserrat (etiquetas e botões).

## Muitos convidados

O convite é um site estático: o Vercel serve-o por CDN, por isso suporta milhares de acessos ao mesmo tempo sem configuração.
A música foi comprimida e só carrega quando o convidado abre o convite. As imagens têm cache (ver `vercel.json`).
O site tem `noindex` para não aparecer no Google (contém dados bancários).

## Confirmação de presença (formulário → Google Sheets)

O componente `src/components/RSVPForm.jsx` envia `nomeCompleto`, `grauParentesco`, `idade` e `email`
por `POST` (JSON, `mode: 'no-cors'`) para o Web App do Google Apps Script definido em `rsvpEndpoint` (`src/data.js`).

- O script recetor de exemplo está em `apps-script/Code.gs` (lê `e.postData.contents`).
- O Web App tem de estar implementado com acesso **"Qualquer pessoa"**; ao alterar o script, cria uma **nova versão** da implementação.
- Com `no-cors` o browser não consegue ler a resposta: o convidado vê "sucesso" quando o pedido é enviado; só falha se não houver rede.
