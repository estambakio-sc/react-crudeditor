import exceptions from './exceptions/de';

/* eslint-disable max-len */
const common = {
  "crudEditor.new.title": "Neu",
  "crudEditor.create.header": "{modelName} anlegen",
  "crudEditor.edit.header": "{modelName} bearbeiten",
  "crudEditor.show.header": "{modelName} ansehen",
  "crudEditor.duplicate.header": "{modelName} duplizieren",
  "crudEditor.cancel.button": "Abbrechen",
  "crudEditor.save.button": "Speichern",
  "crudEditor.saveAndNew.button": "Speichern und Neu",
  "crudEditor.saveAndNext.button": "Speichern und Weiter",
  "crudEditor.search.header": "{payload} suchen",
  "crudEditor.search.button": "Suchen",
  "crudEditor.reset.button": "Zurücksetzen",
  "crudEditor.create.button": "Hinzufügen",
  "crudEditor.select.button": "Auswählen",
  "crudEditor.export.button": "Export",
  "crudEditor.close.button": "Schließen",
  "crudEditor.actions.tableHeader": "Aktionen",
  "crudEditor.show.button": "Ansehen",
  "crudEditor.edit.button": "Bearbeiten",
  "crudEditor.delete.button": "Löschen",
  "crudEditor.deleteSelected.button": "Ausgewählte löschen",
  "crudEditor.duplicate.button": "Duplizieren",
  "crudEditor.refresh.button": "Aktualisieren",
  "crudEditor.revisions.button": "Revisionen",
  "crudEditor.delete.confirmation": "Möchten Sie diesen Eintrag wirklich löschen?",
  "crudEditor.deleteSelected.confirmation": "Möchten Sie wirklich alle markierten Einträge löschen?",
  "crudEditor.noItemsSelected.alert": "Keine Elemente ausgewählt!",
  "crudEditor.objectSaved.message": "Objekt angelegt.",
  "crudEditor.objectUpdated.message": "Objekt aktualisiert.",
  "crudEditor.objectSaveFailed.message": "Speichern von Objekten fehlgeschlagen.",
  "crudEditor.objectDeleted.message": "Objekt gelöscht.",
  "crudEditor.objectsDeleted.message": "Objekte {labels} gelöscht.",
  "crudEditor.objectsDeleteIsNoAllowed.message": "Aus Sicherheitsgründen lassen sich einige Objekte nicht löschen.",
  "crudEditor.objectDeleteFailed.message": "Das Objekt kann nicht gelöscht werden, vielleicht ist es bereits im Einsatz.",
  "crudEditor.objectsDeleteFailed.message": "Objekte {count} konnten nicht gelöscht werden, vielleicht sind sie bereits im Einsatz.",
  "crudEditor.objectDuplicated.message": "Das Objekt wird kopiert.",
  "crudEditor.noAssociationEntriesFound.message": "Keine Einträge gefunden. Sie können einen neuen Eintrag {1}",
  "crudEditor.message.ajax.loading": "Bitte warten...",
  "crudEditor.search.result.label": "Suchergebnis",
  "crudEditor.unsaved.confirmation": "Sie haben Änderungen vorgenommen. Wenn Sie diese Seite verlassen, werden die Änderungen nicht gespeichert.",
  "crudEditor.search.resultsPerPage": "Ergebnisse pro Seite",
  "crudEditor.search.all": "Alles",
  "crudEditor.found.items.message": "{count} Datens\u00E4tze gefunden",
  "crudEditor.range.from": "von",
  "crudEditor.range.to": "bis",
  "crudEditor.confirm.action": "Bestätigen",
  "crudEditor.pagination.goToPage": "Öffnen"
}
/* eslint-enable max-len */

export default {
  ...common,
  ...exceptions
}
