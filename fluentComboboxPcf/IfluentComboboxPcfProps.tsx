import { IComboBoxOption } from "@fluentui/react";
import { IInputs } from "./generated/ManifestTypes";

export interface IfluentComboboxPcfProps {
    context?: ComponentFramework.Context<IInputs>,
    records?: IComboBoxOption[],
    selectionChanged?: (newValue: string[]) => void;
}