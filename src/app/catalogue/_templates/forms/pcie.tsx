import {
    CentralProcessorCoreFamily,
    CentralProcessorSeries,
    CentralProcessorUnit,
    CentralProcessorUnitSimple,
    ComponentDbo,
    ComponentParams,
    GraphicsProcessorUnitConfigurationListDataItem,
    GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem,
    IComponentDbo,
    M2SlotSimple,
    MotherboardUnitSlotConfigurationListDataItem,
    MotherboardUnitSlotCoreFamilyListDataItem,
    MotherboardUnitSlotPositionListDataItem,
    MotherboardUnitSlotPositionSlotListDataItem,
    MotherboardUnitSlotProcessorListDataItem,
    MotherboardUnitSlotSeriesListDataItem,
    PCIeBracket,
    PCIeExpansionCard,
    PCIeExpansionCardDbo,
    PCIeExpansionCardParams,
    PCIeSize,
    PCIeSlot,
    PCIeSlotSimple,
    PCIeVersion,
    PowerSupplyConnectorBase
} from '@/server/models/components';
import React, {Dispatch} from 'react';
import {Content, Module, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {ListData} from 'react-stately';
import {TreeBuilder, TreeBuilderBranch, TreeBuilderDropdown} from '@/components/ui/tree-builder';
import {PowerSupplyConnectorComboBox} from '@/app/catalogue/_templates/forms/power-supply';
import {Plus, X} from '@phosphor-icons/react/dist/ssr';
import {Button} from '@/components/ui/button';
import {
    CentralProcessorCoreFamilyComboBox,
    CentralProcessorSeriesComboBox,
    CentralProcessorUnitComboBox
} from '@/app/catalogue/_templates/forms/central-processor';
import {Equals, Tree} from '@phosphor-icons/react';
import {TextField} from '@/components/ui/text-field';

enum PCIE_EXPANSION_CARD_MODULE_ACTION {
    SET_BRACKET_ID,
    SET_VERSION_ID,
    SET_LANE_SIZE_ID,
    SET_PHYSICAL_SIZE_ID,
    SET_EXPANSION_SLOT_WIDTH,
}

interface PCIeExpansionCardModuleAction {
    type: PCIE_EXPANSION_CARD_MODULE_ACTION;
    payload: PCIeExpansionCardDbo[keyof Omit<PCIeExpansionCardDbo, keyof IComponentDbo>];
}

export function PCIeExpansionCardModuleReducer(state: Partial<Omit<PCIeExpansionCardDbo, keyof ComponentDbo>>, action: PCIeExpansionCardModuleAction): Partial<Omit<PCIeExpansionCardDbo, keyof ComponentDbo>> {
    const { type, payload } = action;

    switch (type) {
        case PCIE_EXPANSION_CARD_MODULE_ACTION.SET_BRACKET_ID: {
            return {
                ...state,
                bracketID: payload,
            }
        }
        case PCIE_EXPANSION_CARD_MODULE_ACTION.SET_VERSION_ID: {
            return {
                ...state,
                versionID: payload,
            }
        }
        case PCIE_EXPANSION_CARD_MODULE_ACTION.SET_LANE_SIZE_ID: {
            return {
                ...state,
                laneSizeID: payload,
            }
        }
        case PCIE_EXPANSION_CARD_MODULE_ACTION.SET_PHYSICAL_SIZE_ID: {
            return {
                ...state,
                physicalSizeID: payload,
            }
        }
        case PCIE_EXPANSION_CARD_MODULE_ACTION.SET_EXPANSION_SLOT_WIDTH: {
            return {
                ...state,
                expansionSlotWidth: payload,
            }
        }
        default: {
            return state;
        }
    }
}

interface PCIeExpansionCardModuleProps {
    state: Omit<Partial<PCIeExpansionCardDbo>, 'component'>
    dispatch: Dispatch<PCIeExpansionCardModuleAction>
    params?: Omit<PCIeExpansionCardParams, 'component'> | null
}

export function TransformPCIeExpansionCardToDbo(expansionCard?: Omit<PCIeExpansionCard, 'component'>): Omit<Partial<PCIeExpansionCardDbo>, 'component'>
{
    return {
        bracketID: expansionCard?.bracket.id,
        versionID: expansionCard?.version.id,
        laneSizeID: expansionCard?.laneSize.laneCount,
        physicalSizeID: expansionCard?.physicalSize.laneCount,
        expansionSlotWidth: expansionCard?.expansionSlotWidth,
    }
}

export function PCIeExpansionCardModule({state, dispatch, params} : PCIeExpansionCardModuleProps) {

    return (

        <Module title="PCIe expansion card information" subtitle="Provide general information about this expansion card.">
            <Content>
                <Row>
                    <PCIeBracketComboBox
                        label="Bracket"
                        selectedKey={state.bracketID}
                        onSelectionChange={(key) => dispatch({ type: PCIE_EXPANSION_CARD_MODULE_ACTION.SET_BRACKET_ID, payload: key as number})}
                        defaultItems={params?.brackets}
                        grow
                    />
                    <PCIeVersionComboBox
                        label="Version"
                        selectedKey={state.versionID}
                        onSelectionChange={(key) => dispatch({ type: PCIE_EXPANSION_CARD_MODULE_ACTION.SET_VERSION_ID, payload: key as number})}
                        defaultItems={params?.versions}
                        grow
                    />
                </Row>
                <Row>
                    <PCIeSizeComboBox
                        label="Physical size"
                        selectedKey={state.physicalSizeID}
                        onSelectionChange={(key) => dispatch({ type: PCIE_EXPANSION_CARD_MODULE_ACTION.SET_PHYSICAL_SIZE_ID, payload: key as number})}
                        defaultItems={params?.sizes}
                        grow
                    />
                    <PCIeSizeComboBox
                        label="Lane size"
                        selectedKey={state.laneSizeID}
                        onSelectionChange={(key) => dispatch({ type: PCIE_EXPANSION_CARD_MODULE_ACTION.SET_LANE_SIZE_ID, payload: key as number})}
                        defaultItems={params?.sizes}
                        grow
                    />
                </Row>
                <Row>
                    <NumberField
                        label="Expansion slot width"
                        value={state.expansionSlotWidth}
                        onChange={(value) => dispatch({ type: PCIE_EXPANSION_CARD_MODULE_ACTION.SET_EXPANSION_SLOT_WIDTH, payload: value })}
                        grow
                    />
                </Row>
            </Content>
        </Module>
    )
}


export function PCIeBracketComboBox({...props}: ComboBoxProps<PCIeBracket>) {
    return (
        <ComboBox {...props} isRequired placeholder="Select a bracket">
            {bracket => <ComboBoxItem>{bracket.name}</ComboBoxItem>}
        </ComboBox>
    )
}


export function PCIeSizeComboBox({...props}: ComboBoxProps<PCIeSize>) {
    return (
        <ComboBox {...props} isRequired placeholder="Select a size">
            {size => <ComboBoxItem id={size.laneCount} textValue={`x${size.laneCount}`}>x{size.laneCount}</ComboBoxItem>}
        </ComboBox>
    )
}

export function PCIeVersionComboBox({...props}: ComboBoxProps<PCIeVersion>) {
    return (
        <ComboBox {...props} isRequired placeholder="Select a version">
            {version => <ComboBoxItem>{version.name}</ComboBoxItem>}
        </ComboBox>
    )
}


export function PCIeSlotComboBox({ ...props} : ComboBoxProps<PCIeSlotSimple>) {
    return (
        <ComboBox placeholder="Select a slot" {...props}>
            {slot => (
                <ComboBoxItem>{slot.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}
