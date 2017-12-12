import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import Section from '../EditSection';
import Field from '../EditField';

const DEFAULT_COLUMNS_COUNT = 1;

const formGrid = ({ model, fieldErrors, toggleFieldErrors }) => {
  let uniqueKey = 1;

  const buildRow = (fields, columnsCnt) => (
    <Row key={'row-' + ++uniqueKey}>
      {
        // Iterating over array [0..(columnsCnt - 1)]
        [...Array(columnsCnt).keys()].map(columnIndex => (
          <Col
            sm={Math.floor(12 / columnsCnt)}
            key={'column-' + uniqueKey + '-' + columnIndex}
          >
            {
              fields.
                filter((_, fieldIndex) => fieldIndex % columnsCnt === columnIndex).
                map((field, fieldIndex) => (
                  <Field
                    model={model}
                    fieldErrors={fieldErrors}
                    toggleFieldErrors={toggleFieldErrors}
                    columns={columnsCnt}
                    key={'field-' + uniqueKey + '-' + columnIndex + '-' + fieldIndex}
                    entry={{
                      name: field.field,
                      readOnly: field.readOnly,
                      component: field.render.component,
                      valuePropName: field.render.valueProp.name
                    }}
                  />
                ))
            }
          </Col>
        ))
      }
    </Row>
  );

  const buildGrid = (entries, tabColumns) => {
    if (!entries.length) {
      return [];
    }

    if (entries[0].section) {
      const [section, ...rest] = entries;

      return [
        <Section title={section.section} model={model} key={'section-' + ++uniqueKey}>
          {
            buildRow(section, section.columns)
          }
        </Section>,
        ...buildGrid(rest, tabColumns)
      ];
    }

    let nextIndex = 1; // Next index after last sequential field.

    while (nextIndex < entries.length && entries[nextIndex].field) {
      nextIndex++;
    }

    return [
      buildRow(entries.slice(0, nextIndex), tabColumns),
      ...buildGrid(entries.slice(nextIndex), tabColumns)
    ]
  }

  return (
    <div>
      {
        buildGrid(model.data.activeEntries, model.data.activeEntries.columns || DEFAULT_COLUMNS_COUNT)
      }
    </div>
  );
}

formGrid.propTypes = {
  model: PropTypes.object,
  fieldErrors: PropTypes.object.isRequired,
  toggleFieldErrors: PropTypes.func.isRequired
}

export default formGrid;
