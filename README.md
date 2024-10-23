# Fluent Combobox PCF

## Details
Multiselect combobox based on fluent component and contains end-to-end configuration with property type Object and integration with Canvas app

 ## Input
For this specific case an array of objects can be added as an input:

> { array: "[{ ""key"": key, ""text"": ""value"" }, { ""key"": key, ""text"": ""value"" }]" }
 
 ## Component used

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

