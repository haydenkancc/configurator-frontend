import {Component, ComponentDbo, ComponentParams} from '@/server/models/components';
import React, {Dispatch} from 'react';
import {Content, Module, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {ManufacturerComboBox} from './manufacturer'

enum COMPONENT_MODULE_ACTION {
    SET_SKU,
    SET_PART_NUMBER,
    SET_NAME,
    SET_MANUFACTURER_ID,
    SET_SALEABLE,
    SET_ON_SALE,
    SET_REGULAR_PRICE,
    SET_SALE_PRICE,
}

interface ComponentModuleAction {
    type: COMPONENT_MODULE_ACTION;
    payload: ComponentDbo[keyof ComponentDbo];
}

export function componentModuleReducer(state: Partial<ComponentDbo>, action: ComponentModuleAction): Partial<ComponentDbo> {
    const { type, payload } = action;

    switch (type) {
        case COMPONENT_MODULE_ACTION.SET_SKU: {
            return {
                ...state,
                sku: payload as string,
            }
        }
        case COMPONENT_MODULE_ACTION.SET_PART_NUMBER: {
            return {
                ...state,
                partNumber: payload as string,
            }
        }
        case COMPONENT_MODULE_ACTION.SET_NAME: {
            return {
                ...state,
                name: payload as string,
            }
        }
        case COMPONENT_MODULE_ACTION.SET_MANUFACTURER_ID: {
            return {
                ...state,
                manufacturerID: payload as number,
            }
        }
        case COMPONENT_MODULE_ACTION.SET_ON_SALE: {
            return {
                ...state,
                onSale: payload as boolean,
            }
        }
        case COMPONENT_MODULE_ACTION.SET_SALEABLE: {
            return {
                ...state,
                saleable: payload as boolean,
            }
        }
        case COMPONENT_MODULE_ACTION.SET_REGULAR_PRICE: {
            return {
                ...state,
                regularPrice: payload as number,
            }
        }
        case COMPONENT_MODULE_ACTION.SET_SALE_PRICE: {
            return {
                ...state,
                salePrice: payload as number,
            }
        }
        default: {
            return state;
        }
    }
}

interface ComponentModuleProps {
    state: Partial<ComponentDbo>
    dispatch: Dispatch<ComponentModuleAction>
    params?: ComponentParams | null
}

export function TransformComponentToDbo(component?: Component): Partial<ComponentDbo>
{
    return {
        sku: component?.sku,
        name: component?.name,
        partNumber: component?.partNumber,
        regularPrice: component?.regularPrice,
        salePrice: component?.salePrice,
        onSale: component?.onSale,
        saleable: component?.saleable,
        manufacturerID: component?.manufacturer.id,
    }
}

export function ComponentModule({state, dispatch, params} : ComponentModuleProps) {

    return (
        <Module title="General component information" subtitle="Provide general information about this component.">
            <Content>
                <Row>
                    <TextField
                        label="Part #"
                        value={state.partNumber}
                        onChange={(value) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_PART_NUMBER, payload: value })}
                        grow isRequired
                    />
                </Row>
                <Row>
                    <TextField
                        label="SKU"
                        value={state.sku}
                        onChange={(value) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_SKU, payload: value })}
                        grow isRequired
                    />
                </Row>
                <Row>
                    <TextField
                        label="Name"
                        value={state.name}
                        onChange={(value) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_NAME, payload: value })}
                        grow
                        isRequired
                    />
                </Row>
                <Row>
                    <ManufacturerComboBox
                        selectedKey={state.manufacturerID}
                        onSelectionChange={(key) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_MANUFACTURER_ID, payload: key as number})}
                        defaultItems={params?.manufacturers}
                        grow
                    />
                </Row>
                <Row>
                    <Checkbox
                        isSelected={state.saleable}
                        onChange={(value) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_SALEABLE, payload: value })}                     >Saleable
                    </Checkbox>
                    <Checkbox
                        isSelected={state.onSale}
                        onChange={(value) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_ON_SALE, payload: value })}                     >On sale
                    </Checkbox>
                </Row>
                <Row>
                    <NumberField
                        label="Price ($)"
                        value={state.regularPrice}
                        onChange={(value) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_REGULAR_PRICE, payload: value })}
                        formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                        grow isRequired />
                    {state.onSale &&
                        <NumberField
                            label="Sale price ($)"
                            value={state.salePrice}
                            onChange={(value) => dispatch({ type: COMPONENT_MODULE_ACTION.SET_SALE_PRICE, payload: value })}
                            formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                            grow
                        />
                    }
                </Row>
            </Content>
        </Module>
    )
}
