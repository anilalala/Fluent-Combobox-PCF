import * as ReactDOM from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { IComboBoxOption } from "@fluentui/react";
import { fluentComboboxPcf } from "./fluentComboboxPcf";
import { json } from "stream/consumers";
import { IfluentComboboxPcfProps } from "./IfluentComboboxPcfProps";

export class fluentComboboxPcfControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private _context: ComponentFramework.Context<IInputs>;
    private _notifyOutputChanged: () => void;
    private _parentContainer: HTMLDivElement;
    private _selectedKeys: string[];
	private props: IfluentComboboxPcfProps = {
        selectionChanged: this.selectionChanged.bind(this)
    };
    /**
     * Empty constructor.
     */
    constructor()
    {

    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init(
        context: ComponentFramework.Context<IInputs>, 
        notifyOutputChanged: () => void, 
        state: ComponentFramework.Dictionary, 
        container:HTMLDivElement): void
    {
        this._context = context;
        this._parentContainer = container;
        this._notifyOutputChanged = notifyOutputChanged
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public updateView(context: ComponentFramework.Context<IInputs>): void
    {
        const _data: IComboBoxOption[] = [];

        const items = this._context.parameters.items.raw.array;

        if (items && isJsonString(items)) {
            JSON.parse(items).forEach((item: { key: any; text: any; }) => {
               _data.push({key: item.key, text: item.text});
            });
        } else {
            console.log("Items array is undefined.");
        }

        ReactDOM.render(
            React.createElement(
                fluentComboboxPcf, {context: this._context, records: _data, selectionChanged: this.props.selectionChanged?.bind(this)} 
            ), 
            this._parentContainer
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs
    {
        return {
            selectedItems: this._selectedKeys.map(String).join(','),
        }
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void
    {
        // Add code to cleanup control if necessary
    }
    
    /**
     * 
     * @param selectedItems This is the list or articles that is returned back to CanvasApp and set as property so it can be accessed
     */
    public selectionChanged (selectedItems: string[]) {
        this._selectedKeys = selectedItems;
        this._notifyOutputChanged(); 
    }
}

function isJsonString(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
