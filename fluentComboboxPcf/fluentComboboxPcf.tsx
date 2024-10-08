import * as React from 'react';
import { IComboBox, IComboBoxOption, IComboBoxStyles, VirtualizedComboBox } from '@fluentui/react';
import { IfluentComboboxPcfProps } from './IfluentComboboxPcfProps';

const customStyle: Partial<IComboBoxStyles> = { 
  root: { 
    maxWidth: 300, 
    minWidth: 200, 
    minHeight: 38, 
    borderRadius: 5
  }, 
  rootPressed: {
    borderColor: "FFFFFF" 
  }, 
  input: { 
    minWidth: 200, 
    minHeight: 38, 
    borderRadius: 5
  }, 
  optionsContainerWrapper: { 
    minWidth: 180 
  },
  optionsContainer: {
    minWidth: 180
  }
}
export const fluentComboboxPcf: React.FunctionComponent<IfluentComboboxPcfProps> = (props) => {

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (props.selectionChanged) {
      props.selectionChanged(selectedValues)
    }
  }, [selectedValues]);
  const onChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {
    const selected = option?.selected;
      if (option) {
        setSelectedKeys(prevSelectedKeys =>
          selected ? [...prevSelectedKeys, option!.key as string] : prevSelectedKeys.filter(k => k !== option!.key),
        );
  
        setSelectedValues(prevSelectedKeys =>
          selected ? [...prevSelectedKeys, option!.text as string] : prevSelectedKeys.filter(k => k !== option!.text),
        );
      }
  }
  return (
    <VirtualizedComboBox
      allowFreeform
      autoComplete="on"
      options={props.records || []}
      dropdownMaxWidth={200}
      useComboBoxAsMenuWidth
      styles={customStyle}
      multiSelect
      onChange={onChange}
      selectedKey= {selectedKeys}
    />
  );
};
