# Fluent Combobox PCF

## Summary
Multiselect combobox based on fluent component and contains end-to-end configuration with property type Object and integration with Canvas app.
The code uses React functional component fluentComboboxPcf that uses Fluent UI's VirtualizedComboBox. 
It allows for multiple selections and communicates these selections back to the parent component through a callback function passed in the props. 

The component also maintains local state to keep track of selected keys and values, and handles user input via the onChange event handler.


 ## Input
For this specific case an array of objects can be added as an input:

> { array: "[{ ""key"": key, ""text"": ""value"" }, { ""key"": key, ""text"": ""value"" }]" }
 
 ## Component

VirtualizedComboBox is rendered: 
```
  return (
    <VirtualizedComboBox
      allowFreeform
      autoComplete="on"
      options={props.records || []}
      dropdownMaxWidth={200}
      useComboBoxAsMenuWidth
      multiSelect
      onChange={onChange}
      selectedKey={selectedKeys}
      placeholder='Select article'
    />
  );
};
```

 ## 

