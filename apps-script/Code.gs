// Google Apps Script — receber o RSVP e gravar na planilha.
// Cole em Extensões > Apps Script (na planilha), depois:
// Implementar > Nova implementação > Tipo: App da Web
//   Executar como: Eu | Quem tem acesso: Qualquer pessoa
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var d = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Data/Hora', 'Nome Completo', 'Grau de Parentesco', 'Idade', 'E-mail']);
  }
  sheet.appendRow([new Date(), d.nomeCompleto, d.grauParentesco, d.idade, d.email]);

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
