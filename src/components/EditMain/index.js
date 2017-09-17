import React from 'react';

import Heading from '../EditHeading';
import Tab from '../EditTab';
import Section from '../EditSection';
import Field from '../EditField';

const formatEntry = entry => entry.field ? {
  Entry: Field,
  props: {
    entry: {
      name: entry.field,
      readOnly: entry.readOnly,
      Component: entry.render.Component,
      valuePropName: entry.render.valueProp.name
    }
  }
} : {
  Entry: Section,
  fields: entry.map(formatEntry),  // Section always has at least one field.
  props: {
    title: entry.section.replace(/(^|\s)[a-z]/g, char => char.toUpperCase())
  }
};

export default ({ model }) => {
  const ActiveTabComponent = model.data.activeTab && model.data.activeTab.Component;

  return <div>
    <Heading model={model} />
    {ActiveTabComponent ?
      <ActiveTabComponent viewName={model.data.viewName} instance={model.data.persistentInstance} /> :
      <Tab model={model}>
        {
          model.data.activeEntries.map(formatEntry).map(({ Entry, props, fields }, supIndex) =>
            <Entry key={supIndex} {...props} model={model}>  {/* either Section or top-level Field */}
              {
                fields && fields.map(({ props }, subIndex) =>
                  <Field key={`${supIndex}_${subIndex}`} {...props} model={model} />
                )
              }
            </Entry>
          )
        }
      </Tab>
    }
  </div>;
};