import { General } from '@/server/models/catalogue';
import {Dispatch} from 'react';
import {RecursiveNullable } from '@/server/models';
import {Content, Module, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {NumberField} from '@/components/ui/number-field';
import {Checkbox} from '@/components/ui/checkbox';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';

enum ComponentModuleActionType {
    SET_MANUFACTURER_ID = "manufacturerID",
    SET_SKU = "sku",
    SET_PART_NUMBER = "partNumber",
    SET_NAME = "name",
    SET_REGULAR_PRICE = "regularPrice",
    SET_SALE_PRICE = "salePrice",
    SET_ON_SALE = "onSale",
    SET_SALEABLE = "saleable",
    SET_IS_COLOURED = "isColoured",
    SET_COLOUR_ID = "colourID",
}

const record: Record<ComponentModuleActionType, keyof General.ComponentDbo> = {
    [ComponentModuleActionType.SET_MANUFACTURER_ID]: "manufacturerID",
    [ComponentModuleActionType.SET_SKU]: "sku",
    [ComponentModuleActionType.SET_PART_NUMBER]: "partNumber",
    [ComponentModuleActionType.SET_NAME]: "name",
    [ComponentModuleActionType.SET_REGULAR_PRICE]: "regularPrice",
    [ComponentModuleActionType.SET_SALE_PRICE]: "salePrice",
    [ComponentModuleActionType.SET_ON_SALE]: "onSale",
    [ComponentModuleActionType.SET_SALEABLE]: "saleable",
    [ComponentModuleActionType.SET_IS_COLOURED]: "isColoured",
    [ComponentModuleActionType.SET_COLOUR_ID]: "colourID",
}

type ComponentModuleAction<K extends ComponentModuleActionType> = {
    type: K,
    payload: General.ComponentDbo[typeof record[K]]
}

export function componentModuleReducer<K extends ComponentModuleActionType>(state: RecursiveNullable<General.ComponentDbo>, action: ComponentModuleAction<K>): RecursiveNullable<General.ComponentDbo> {
    const { type, payload } = action;

    return {
        ...state,
        [type]: payload,
    }
}

interface ComponentModuleProps<K extends ComponentModuleActionType> {
    state: RecursiveNullable<General.ComponentDbo>
    dispatch: Dispatch<ComponentModuleAction<K>>
    params: General.ComponentParams | undefined | null
}

export function transformComponentToDbo(component?: General.ComponentDto): RecursiveNullable<General.ComponentDbo> {
    return {
        sku: component?.sku ?? null,
        name: component?.name ?? null,
        partNumber: component?.partNumber ?? null,
        regularPrice: component?.regularPrice ?? null,
        salePrice: component?.salePrice ?? null,
        onSale: component?.onSale ?? false,
        saleable: component?.saleable ?? true,
        manufacturerID: component?.manufacturer.id ?? null,
        isColoured: component?.isColoured ?? false,
        colourID: component?.colour?.id ?? null,
    }
}

export function ComponentModule({state, dispatch, params} : ComponentModuleProps<ComponentModuleActionType>) {


    return (
        <Module title="General component information" subtitle="Provide general information about this component.">
            <Content>
                <Row>
                    <TextField
                        label="Part #"
                        value={state.partNumber}
                        onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_PART_NUMBER, payload: value })}
                        grow isRequired
                    />
                </Row>
                <Row>
                    <TextField
                        label="SKU"
                        value={state.sku}
                        onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_SKU, payload: value })}
                        grow isRequired
                    />
                </Row>
                <Row>
                    <TextField
                        label="Name"
                        value={state.name}
                        onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_NAME, payload: value })}
                        grow
                        isRequired
                    />
                </Row>
                <Row>
                    <ManufacturerComboBox
                        selectedKey={state.manufacturerID}
                        onSelectionChange={(key) => dispatch({ type: ComponentModuleActionType.SET_MANUFACTURER_ID, payload: key})}
                        defaultItems={params?.manufacturers}
                        grow
                    />
                </Row>
                <Row>
                    <Checkbox
                        isSelected={state.saleable}
                        onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_SALEABLE, payload: value })}>
                        Saleable
                    </Checkbox>
                    <Checkbox
                        isSelected={state.onSale}
                        onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_ON_SALE, payload: value })}>
                        On sale
                    </Checkbox>
                    <Checkbox
                        isSelected={state.isColoured}
                        onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_IS_COLOURED, payload: value })}>
                        Coloured
                    </Checkbox>
                </Row>
                <Row>
                    <NumberField
                        label="Price ($)"
                        value={state.regularPrice}
                        onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_REGULAR_PRICE, payload: value })}
                        formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                        grow isRequired />
                    {state.onSale &&
                        <NumberField
                            label="Sale price ($)"
                            value={state.salePrice}
                            onChange={(value) => dispatch({ type: ComponentModuleActionType.SET_SALE_PRICE, payload: value })}
                            formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                            grow
                        />
                    }
                </Row>
                {state.isColoured &&
                    <Row>
                        <ColourComboBox grow selectedKey={state.colourID} onSelectionChange={(key) => dispatch({type: ComponentModuleActionType.SET_COLOUR_ID, payload: key})} defaultItems={params?.colours} />
                    </Row>
                }
            </Content>
        </Module>
    )
}

export function ManufacturerComboBox({...props } : ComboBoxProps<General.ManufacturerDto>) {
    return (
        <ComboBox label="Manufacturer" placeholder="Select a manufacturer" isRequired {...props}>
            {manufacturer => <ComboBoxItem>{manufacturer.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function ColourComboBox({...props} : ComboBoxProps<General.ColourDto>) {
    return (
        <ComboBox label="Colour" placeholder="Select a colour" isRequired {...props}>
            {colour => <ComboBoxItem>{colour.name}</ComboBoxItem>}
        </ComboBox>
    )
}