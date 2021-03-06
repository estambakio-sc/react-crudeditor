import exceptions from './exceptions/sv';

/* eslint-disable max-len */
const common = {
  "crudEditor.create.header": "Skapa {modelName}",
  "crudEditor.edit.header": "Redigera {modelName}",
  "crudEditor.show.header": "Visa {modelName0}",
  "crudEditor.duplicate.header": "Kopiera {modelName}",
  "crudEditor.cancel.button": "Avbryt",
  "crudEditor.save.button": "Spara",
  "crudEditor.saveAndNew.button": "Spara och ny",
  "crudEditor.saveAndNext.button": "Spara och nästa",
  "crudEditor.search.header": "Sök {payload}",
  "crudEditor.search.button": "Sök",
  "crudEditor.reset.button": "Återställ",
  "crudEditor.create.button": "Skapa",
  "crudEditor.select.button": "Välj",
  "crudEditor.close.button": "Stäng",
  "crudEditor.actions.tableHeader": "Åtgärder",
  "crudEditor.show.button": "Vy",
  "crudEditor.edit.button": "Redigera",
  "crudEditor.delete.button": "Ta bort",
  "crudEditor.deleteSelected.button": "Ta bort markerade",
  "crudEditor.duplicate.button": "Kopia",
  "crudEditor.refresh.button": "Uppdatera",
  "crudEditor.revisions.button": "Revisioner",
  "crudEditor.delete.confirmation": "Vill du ta bort posten?",
  "crudEditor.deleteSelected.confirmation": "Vill du ta bort de markerade artiklarna?",
  "crudEditor.noItemsSelected.alert": "Inga poster har valts!",
  "crudEditor.objectSaved.message": "Objekt skapat.",
  "crudEditor.objectUpdated.message": "Objekt uppdaterat.",
  "crudEditor.objectSaveFailed.message": "Objektet kunde inte sparas.",
  "crudEditor.objectDeleted.message": "Objekt borttaget.",
  "crudEditor.objectsDeleted.message": "Objekt {labels} borttagna.",
  "crudEditor.objectsDeleteIsNoAllowed.message": "Du kan inte ta bort vissa objekt på grund av säkerhetsbegränsningar.",
  "crudEditor.objectDeleteFailed.message": "Det gick inte att ta bort objektet, eventuell används det redan.",
  "crudEditor.objectsDeleteFailed.message": "Det gick inte att ta bort objekten {count}, eventuellt används de redan.",
  "crudEditor.objectDuplicated.message": "Objektet kopieras.",
  "crudEditor.noAssociationEntriesFound.message": "Inga poster hittades. Du kan {1} en ny post.",
  "crudEditor.message.ajax.loading": "Vänta...",
  "crudEditor.search.result.label": "Sökresultat",
  "crudEditor.unsaved.confirmation": "Du har gjort ändringar. Om du lämnar platsen försvinner ändringarna.",
  "crudEditor.search.resultsPerPage": "Resultat per sida",
  "crudEditor.search.all": "Alla",
  "crudEditor.export.button": "Exportera",
  "crudEditor.found.items.message": "{count} artikel/artiklar hittades",
  "crudEditor.range.from": "fr\u00e5n",
  "crudEditor.range.to": "till",
  "crudEditor.pagination.goToPage": "Go"
}
/* eslint-enable max-len */

export default {
  ...common,
  ...exceptions
}
