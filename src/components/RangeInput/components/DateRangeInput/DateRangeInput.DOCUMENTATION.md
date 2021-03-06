# DateRangeInput

## Synopsis

Date range input component.

### Props Reference

| Name                           | Type                     | Description                                                                                             |
| ------------------------------ | :----------------------  | -----------------------------------------------------------                                             |
| readOnly                       | bool                     | true/false                                                                                              |
| onChange                       | func                     |                                                                                                         |
| onBlur                         | func                     |                                                                                                         |
| onFocus                        | func                     |                                                                                                         |
| value                          | Object                   | { from: <Date>, to: <Date> }                                                                        |

## Details

...

## Code Example

```js
<DateRangeInput
  onChange={_scope.handleChange.bind(_scope)}
  onFocus={_scope.handleFocus.bind(_scope)}
  onBlur={_scope.handleBlur.bind(_scope)}
  value={_scope.state.value}
/>
```

## Contributors

Egor Stambakio

## Component Name

DateRangeInput

## License

Licensed by © 2017 OpusCapita