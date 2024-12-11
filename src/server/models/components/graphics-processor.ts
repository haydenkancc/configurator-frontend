import {
    IPCIeExpansionCard, IPCIeExpansionCardDbo,
    IPCIeExpansionCardParams,
    MemoryCapacity, MemoryType,
    PCIeExpansionCard,
    PCIeExpansionCardDbo,
    PCIeExpansionCardParams, PowerSupplyConnector
} from '@/server/models/components/index';
import {TableColumn} from '@/server/models';
import {ListData} from 'react-stately';

export const GraphicsProcessorChipsetColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Chipset', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface GraphicsProcessorChipsetRow {
    id: number;
    name: string;
}

export interface GraphicsProcessorChipset {
    id: number;
    name: string;
}

export interface GraphicsProcessorChipsetDbo {
    name: string;
}

export const GraphicsProcessorUnitColumns : TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'medium'},
    {name: 'Chipset', id: 'chipset', size: 'small'},
    {name: 'Memory', id: 'memoryCapacity', size: 'small'},
    {name: 'Core clock', id: 'coreClock', size: 'small'},
    {name: 'Boost clock', id: 'boostClock', size: 'small'},
    {name: 'Length', id: 'length', size: 'small'},
    {name: 'Price', id: 'price', size: 'small'},
]

export interface GraphicsProcessorUnitRow {
    name: string;
    chipset: string;
    memoryCapacity: string;
    coreClock: string;
    boostClock: string;
    length: string;
    price: string;
}

export interface GraphicsProcessorUnit extends IPCIeExpansionCard {
    configurations: GraphicsProcessorUnitConfiguration[];
    chipset: GraphicsProcessorChipset;
    memoryType: MemoryType;
    length: number;
    width: number;
    height: number;
    totalSlotWidth: number;
    totalPower: number;
    recommendedPower: number;
    memoryCapacity: number;
    coreClock: number;
    boostClock: number;
}

export interface GraphicsProcessorUnitDbo extends IPCIeExpansionCardDbo {
    configurations: GraphicsProcessorUnitConfigurationDbo[];
    chipsetID: number;
    memoryCapacityID: number;
    memoryTypeID: number;
    length: number;
    width: number;
    height: number;
    totalSlotWidth: number;
    totalPower: number;
    recommendedPower: number;
    coreClock: number;
    boostClock: number;
}

export interface GraphicsProcessorUnitParams extends IPCIeExpansionCardParams {
    chipsets: GraphicsProcessorChipset[];
    memoryTypes: MemoryType[];
    memoryCapacities: MemoryCapacity[];
    powerSupplyConnectors: PowerSupplyConnector[];
}

export interface GraphicsProcessorUnitConfiguration {
    connectors: GraphicsProcessorUnitConfigurationPowerSupplyConnector[];
}


export interface GraphicsProcessorUnitConfigurationDbo {
    connectors: GraphicsProcessorUnitConfigurationPowerSupplyConnector[];
}

export interface GraphicsProcessorUnitConfigurationPowerSupplyConnector {
    connectorID: number;
    connectorCount: number;
}


export interface GraphicsProcessorUnitConfigurationListDataItem {
    id: number;
    name: string;
    open: boolean;
}

export interface GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem {
    id: number;
    configurationID: number;
    connectorID?: number;
    connectorCount?: number;
}