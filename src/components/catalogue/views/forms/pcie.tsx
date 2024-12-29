import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {General, Pcie} from '@/server/models/catalogue'
import {Combo} from 'next/dist/compiled/@next/font/dist/google';
import {RecursiveNullable} from '@/server/models';
import {Dispatch} from 'react';
import {Content, Module, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {Checkbox} from '@/components/ui/checkbox';
import {NumberField} from '@/components/ui/number-field';
import {ColourComboBox, ManufacturerComboBox} from '@/components/catalogue/views/forms/general';

export function PcieBracketComboBox({...props} : ComboBoxProps<Pcie.BracketDto>) {
    return (
        <ComboBox label="Bracket" placeholder="Select a bracket" isRequired {...props}>
            {bracket => <ComboBoxItem id={bracket.id}>{bracket.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function PcieVersionComboBox({...props} : ComboBoxProps<Pcie.VersionDto>) {
    return (
        <ComboBox label="Version" placeholder="Select a version" isRequired {...props}>
            {version => <ComboBoxItem id={version.id}>{version.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function PcieSizeComboBox({...props} : ComboBoxProps<Pcie.SizeDto>) {
    return (
        <ComboBox label="Size" placeholder="Select a size" isRequired {...props}>
            {size => <ComboBoxItem id={size.id}>{`x${size.laneCount}`}</ComboBoxItem>}
        </ComboBox>
    )
}

enum PcieExpansionCardModuleActionType {
    SET_BRACKET_ID = "bracketID",
    SET_LANE_SIZE_ID = "laneSizeID",
    SET_VERSION_ID = "versionID",
    SET_PHYSICAL_SIZE_ID = "physicalSizeID",
    SET_EXPANSION_SLOT_WIDTH = "expansionSlotWidth",
}

type PcieExpansionCardDboMapping = {
    [K in PcieExpansionCardModuleActionType]: keyof Pcie.ExpansionCardDbo;
};

type PcieExpansionCardModuleAction<K extends PcieExpansionCardModuleActionType> = {
    type: K,
    payload: Pcie.ExpansionCardDbo[PcieExpansionCardDboMapping[K]]
}

export function pcieExpansionCardModuleReducer<K extends PcieExpansionCardModuleActionType>(state: RecursiveNullable<Pcie.ExpansionCardDbo>, action: PcieExpansionCardModuleAction<K>): RecursiveNullable<Pcie.ExpansionCardDbo> {
    const { type, payload } = action;

    return {
        ...state,
        [type]: payload,
    }
}

interface PcieExpansionModuleProps<K extends PcieExpansionCardModuleActionType> {
    state: RecursiveNullable<Pcie.ExpansionCardDbo>
    dispatch: Dispatch<PcieExpansionCardModuleAction<K>>
    params: Pcie.ExpansionCardParams | undefined | null
}

export function transformPcieExpansionCardToDbo(expansionCard?: Pcie.ExpansionCardDto): RecursiveNullable<Pcie.ExpansionCardDbo> {
    return {
        bracketID: expansionCard?.bracket.id ?? null,
        expansionSlotWidth: expansionCard?.expansionSlotWidth ?? null,
        laneSizeID: expansionCard?.laneSize.id ?? null,
        physicalSizeID: expansionCard?.physicalSize.id ?? null,
        versionID: expansionCard?.version.id ?? null,
    }
}

export function PcieExpansionCardModule({state, dispatch, params} : PcieExpansionModuleProps<PcieExpansionCardModuleActionType>) {
    return (
        <Module title="PCIe expansion card information" subtitle="Provide general information about this expansion card.">
            <Content>
                <Row>
                    <PcieBracketComboBox
                        label="Bracket"
                        selectedKey={state.bracketID}
                        onSelectionChange={(key) => dispatch({ type: PcieExpansionCardModuleActionType.SET_BRACKET_ID, payload: key as number})}
                        defaultItems={params?.brackets}
                        grow
                    />
                    <PcieVersionComboBox
                        label="Version"
                        selectedKey={state.versionID}
                        onSelectionChange={(key) => dispatch({ type: PcieExpansionCardModuleActionType.SET_VERSION_ID, payload: key as number})}
                        defaultItems={params?.versions}
                        grow
                    />
                </Row>
                <Row>
                    <PcieSizeComboBox
                        label="Physical size"
                        selectedKey={state.physicalSizeID}
                        onSelectionChange={(key) => dispatch({ type: PcieExpansionCardModuleActionType.SET_PHYSICAL_SIZE_ID, payload: key as number})}
                        defaultItems={params?.sizes}
                        grow
                    />
                    <PcieSizeComboBox
                        label="Lane size"
                        selectedKey={state.laneSizeID}
                        onSelectionChange={(key) => dispatch({ type: PcieExpansionCardModuleActionType.SET_LANE_SIZE_ID, payload: key as number})}
                        defaultItems={params?.sizes}
                        grow
                    />
                </Row>
                <Row>
                    <NumberField
                        label="Expansion slot width"
                        value={state.expansionSlotWidth}
                        onChange={(value) => dispatch({ type: PcieExpansionCardModuleActionType.SET_EXPANSION_SLOT_WIDTH, payload: value })}
                        grow
                    />
                </Row>
            </Content>
        </Module>
    )
}