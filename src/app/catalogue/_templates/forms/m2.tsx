import {Select, SelectItem, SelectProps} from '@/components/ui/select';
import {
    ComponentDbo,
    IComponentDbo,
    M2FormFactor,
    M2KeyBase,
    M2SlotParams, M2ExpansionCard,
    M2ExpansionCardDbo, M2ExpansionCardParams
} from '@/server/models/components';
import {ListData} from 'react-stately';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import React, {Dispatch} from 'react';
import {Content, Module, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {PCIeSizeComboBox, PCIeVersionComboBox} from '@/app/catalogue/_templates/forms/pcie';

export function M2KeyComboBox({...props } : ComboBoxProps<M2KeyBase>) {
    return (
        <ComboBox isRequired placeholder="Select a key" label="Keying" {...props}>
            {key => <ComboBoxItem>{key.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function M2FormFactorComboBox({...props} : ComboBoxProps<M2FormFactor>) {
    return (
        <ComboBox isRequired placeholder="Select a form factor" label="Form factor" {...props}>
            {formFactor => <ComboBoxItem>{formFactor.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function M2FormFactorsListBuilder({ gridListItems, comboBoxItems } : { gridListItems: ListData<M2FormFactor>, comboBoxItems: ListData<M2FormFactor> }) {
    return (
        <ListBuilder gridListItems={gridListItems} comboBoxItems={comboBoxItems}>
            <ListBuilderList<M2FormFactor>>
                {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<M2FormFactor>>
                    {item =>
                        <ListBuilderComboBoxItem>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}


export function M2KeysListBuilder({ gridListItems, comboBoxItems } : { gridListItems: ListData<M2KeyBase>, comboBoxItems: ListData<M2KeyBase>}) {
    return (
        <ListBuilder gridListItems={gridListItems} comboBoxItems={comboBoxItems}>
            <ListBuilderList<M2KeyBase> aria-label="selected keys">
                {item =><ListBuilderListItem textValue={item.name}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<M2KeyBase> aria-label="key selector">
                    {item =>
                        <ListBuilderComboBoxItem textValue={item.name}>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}

enum M2_EXPANSION_CARD_MODULE_ACTION {
    SET_KEY_ID,
    SET_FORM_FACTOR_ID,
    SET_LANE_SIZE_ID,
    SET_VERSION_ID,
}

interface M2ExpansionCardModuleAction {
    type: M2_EXPANSION_CARD_MODULE_ACTION;
    payload: M2ExpansionCardDbo[keyof Omit<M2ExpansionCardDbo, keyof IComponentDbo>];
}

export function m2ExpansionCardModuleReducer(state: Partial<Omit<M2ExpansionCardDbo, keyof ComponentDbo>>, action: M2ExpansionCardModuleAction): Partial<Omit<M2ExpansionCardDbo, keyof ComponentDbo>> {
    const { type, payload } = action;

    switch (type) {
        case M2_EXPANSION_CARD_MODULE_ACTION.SET_KEY_ID: {
            return {
                ...state,
                keyID: payload,
            }
        }
        case M2_EXPANSION_CARD_MODULE_ACTION.SET_VERSION_ID: {
            return {
                ...state,
                versionID: payload,
            }
        }
        case M2_EXPANSION_CARD_MODULE_ACTION.SET_LANE_SIZE_ID: {
            return {
                ...state,
                laneSizeID: payload,
            }
        }
        case M2_EXPANSION_CARD_MODULE_ACTION.SET_FORM_FACTOR_ID: {
            return {
                ...state,
                formFactorID: payload,
            }
        }
        default: {
            return state;
        }
    }
}

interface M2ExpansionCardModuleProps {
    state: Omit<Partial<M2ExpansionCardDbo>, 'component'>
    dispatch: Dispatch<M2ExpansionCardModuleAction>
    params?: Omit<M2ExpansionCardParams, 'component'> | null
}

export function TransformM2ExpansionCardToDbo(expansionCard?: Omit<M2ExpansionCard, 'component'>): Omit<Partial<M2ExpansionCardDbo>, 'component'>
{
    return {
        keyID: expansionCard?.key.id,
        versionID: expansionCard?.version.id,
        laneSizeID: expansionCard?.laneSize.laneCount,
        formFactorID: expansionCard?.formFactor.id,
    }
}

export function M2ExpansionCardModule({state, dispatch, params} : M2ExpansionCardModuleProps) {

    return (

        <Module title="M2 expansion card information" subtitle="Provide general information about this expansion card.">
            <Content>
                <Row>
                    <M2KeyComboBox
                        label="Keying"
                        selectedKey={state.keyID}
                        onSelectionChange={(key) => dispatch({ type: M2_EXPANSION_CARD_MODULE_ACTION.SET_KEY_ID, payload: key as number})}
                        defaultItems={params?.keys}
                        grow
                    />
                    <PCIeVersionComboBox
                        label="Version"
                        selectedKey={state.versionID}
                        onSelectionChange={(key) => dispatch({ type: M2_EXPANSION_CARD_MODULE_ACTION.SET_VERSION_ID, payload: key as number})}
                        defaultItems={params?.versions}
                        grow
                    />
                </Row>
                <Row>
                    <PCIeSizeComboBox
                        label="Lane size"
                        selectedKey={state.laneSizeID}
                        onSelectionChange={(key) => dispatch({ type: M2_EXPANSION_CARD_MODULE_ACTION.SET_LANE_SIZE_ID, payload: key as number})}
                        defaultItems={params?.laneSizes}
                        grow
                    />
                </Row>
                <Row>
                    <M2FormFactorComboBox
                        label="Form factor"
                        selectedKey={state.formFactorID}
                        onSelectionChange={(key) => dispatch({ type: M2_EXPANSION_CARD_MODULE_ACTION.SET_FORM_FACTOR_ID, payload: key as number})}
                        defaultItems={params?.formFactors}
                        grow
                    />
                </Row>
            </Content>
        </Module>
    )
}