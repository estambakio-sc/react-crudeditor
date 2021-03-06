import exceptions from './exceptions/no';

/* eslint-disable max-len */
const common = {
  "crudEditor.create.header": "Opprett {modelName}",
  "crudEditor.edit.header": "Rediger {modelName}",
  "crudEditor.show.header": "Vis {modelName}",
  "crudEditor.duplicate.header": "Lag kopi av {modelName}",
  "crudEditor.cancel.button": "Avbryt",
  "crudEditor.save.button": "Lagre",
  "crudEditor.saveAndNew.button": "Lagre og ny",
  "crudEditor.saveAndNext.button": "Lagre og neste",
  "crudEditor.search.header": "Søk {payload}",
  "crudEditor.search.button": "Søk",
  "crudEditor.reset.button": "Tilbakestill",
  "crudEditor.create.button": "Opprett",
  "crudEditor.select.button": "Velg",
  "crudEditor.close.button": "Lukk",
  "crudEditor.actions.tableHeader": "Handlinger",
  "crudEditor.show.button": "Visning",
  "crudEditor.edit.button": "Rediger",
  "crudEditor.delete.button": "Slett",
  "crudEditor.deleteSelected.button": "Slett valgt",
  "crudEditor.duplicate.button": "Duplikat",
  "crudEditor.refresh.button": "Oppdater",
  "crudEditor.revisions.button": "Revisjoner",
  "crudEditor.delete.confirmation": "Vil du slette denne posten?",
  "crudEditor.deleteSelected.confirmation": "Vil du slette de valgte elementene?",
  "crudEditor.noItemsSelected.alert": "Elementer er ikke valgt!",
  "crudEditor.objectSaved.message": "Objekt opprettet.",
  "crudEditor.objectUpdated.message": "Objekt oppdatert.",
  "crudEditor.objectSaveFailed.message": "Objektet kunne ikke lagres.",
  "crudEditor.objectDeleted.message": "Objekt slettet.",
  "crudEditor.objectsDeleted.message": "Objekter {labels} slettet.",
  "crudEditor.objectsDeleteIsNoAllowed.message": "Noen av objektene kan ikke slettes på grunn av sikkerhetsbegrensninger.",
  "crudEditor.objectDeleteFailed.message": "Kunne ikke slette objektet. Kanskje det er i bruk allerede.",
  "crudEditor.objectsDeleteFailed.message": "Kunne ikke slette objektene {count}. Kanskje de er i bruk allerede.",
  "crudEditor.objectDuplicated.message": "Objektet er kopiert.",
  "crudEditor.noAssociationEntriesFound.message": "Fant ingen poster. Du kan {1} en ny post.",
  "crudEditor.message.ajax.loading": "Vent litt ...",
  "crudEditor.search.result.label": "Søkeresultat",
  "crudEditor.unsaved.confirmation": "Du har foretatt endringer. Endringene går tapt hvis du forlater denne siden.",
  "crudEditor.search.resultsPerPage": "Resultater per side",
  "crudEditor.search.all": "Alle",
  "crudEditor.export.button": "Eksporter",
  "crudEditor.found.items.message": "{count} elementer funnet",
  "crudEditor.range.from": "fra",
  "crudEditor.range.to": "til",
  "crudEditor.pagination.goToPage": "Go"
}
/* eslint-enable max-len */

export default {
  ...common,
  ...exceptions
}
