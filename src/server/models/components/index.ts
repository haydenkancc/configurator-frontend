import {TableColumn} from '@/server/models';

export interface Component {
    id: number,
    sku: string,
    name: string,
    displayName: string,
    regularPrice: number,
    salePrice: number,
    onSale: boolean,
    saleable: boolean,
    manufacturer: Manufacturer,
}

export interface ComponentDbo {
    sku: string,
    name: string,
    displayName: string,
    regularPrice: number,
    salePrice: number,
    onSale: boolean,
    saleable: boolean,
    manufacturerID: number,
}

export interface ComponentParams {
    manufacturers: Manufacturer[];
}

export const ManufacturerColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface ManufacturerRow {
    id: number;
    name: string;
}

export interface Manufacturer {
    id: number;
    name: string;
}

export interface ManufacturerDbo {
    name: string;
}



export const PCIeBracketColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface PCIeBracketRow {
    id: number;
    name: string;
}

export interface PCIeBracket {
    id: number;
    name: string;
}

export interface PCIeBracketDbo {
    name: string;
}



export const PCIeSizeColumns: TableColumn[] = [
    {name: 'Lane count', id: 'laneCount', isRowHeader: true},
]

export interface PCIeSizeRow {
    id: number;
    laneCount: string;
}

export interface PCIeSize {
    laneCount: number;
}


export interface PCIeSizeDbo {
    laneCount: number;
}


export const PCIeVersionColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Version', id: 'name'},
]

export interface PCIeVersionRow {
    id: number;
    name: string;
}

export interface PCIeVersion {
    id: number;
    name: string;
}

export interface PCIeVersionDbo {
    name: string;
}

export const PCIeSlotColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Version', id: 'version' },
    {name: 'Slot size', id: 'slotSize' },
]

export interface PCIeSlotRow {
    id: number;
    version: string;
    slotSize: string;
}

export interface PCIeSlot {
    id: number;
    version: PCIeVersion;
    physicalSize: PCIeSize;
    laneSize: PCIeSize;
}

export interface PCIeSlotDbo {
    versionID: number;
    physicalSizeID: number;
    laneSizeID: number;
}

export interface PCIeSlotParams {
    sizes: PCIeSize[];
    versions: PCIeVersion[];
}



export const M2KeyColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface M2KeyRow {
    id: number;
    name: string;
}

export interface M2Key extends M2KeyBase {
    compatibleKeys: M2KeyBase[];
}

export interface M2KeyBase {
    id: number;
    name: string;
}

export interface M2KeyDbo {
    name: string;
    compatibleKeyIDs: number[];
}

export interface M2KeyParams {
    keys: M2KeyBase[];
}

export const M2FormFactorColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface M2FormFactorRow {
    id: number;
    name: string;
}

export interface M2FormFactor {
    id: number;
    name: string;
}

export interface M2FormFactorDbo {
    name: string;
}

export const M2SlotColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Key', id: 'key'},
    {name: 'Form factors', id: 'formFactors', size: 'medium'},
    {name: 'Lane size', id: 'laneSize', size: 'small'},
    {name: 'Version', id: 'version', size: 'small'},
]

export interface M2SlotRow {
    id: number;
    key: string;
    formFactors: string;
    laneSize: string;
    version: string;
}

export interface M2Slot {
    id: number;
    key: M2KeyBase;
    formFactors: M2FormFactor[];
    laneSize: PCIeSize;
    version: PCIeVersion;
}

export interface M2SlotDbo {
    keyID: number;
    formFactorIDs: number[];
    laneSizeID: number;
    versionID: number;
}

export interface M2SlotParams {
    keys: M2KeyBase[];
    formFactors: M2FormFactor[];
    laneSizes: PCIeSize[];
    versions: PCIeVersion[];
}

export const IOConnectorColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface IOConnectorRow {
    id: number;
    name: string;
}

export interface IOConnector extends IOConnectorBase {
    compatibleConnectors: IOConnectorBase[];
}

export interface IOConnectorBase {
    id: number;
    name: string;
}

export interface IOConnectorDbo {
    name: string;
    compatibleConnectorIDs: number[];
}

export interface IOConnectorParams {
    connectors: IOConnectorBase[];
}


export const MemoryFormFactorColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface MemoryFormFactorRow {
    id: number;
    name: string;
}

export interface MemoryFormFactor {
    id: number;
    name: string;
}

export interface MemoryFormFactorDbo {
    name: string;
}


export const MemoryTypeColumns: TableColumn[] = [
    {name: 'ID', id: 'id', isRowHeader: true},
    {name: 'Name', id: 'name'},
]

export interface MemoryTypeRow {
    id: number;
    name: string;
}

export interface MemoryType {
    id: number;
    name: string;
}

export interface MemoryTypeDbo {
    name: string;
}

export const MemoryCapacityColumns: TableColumn[] = [
    {name: 'Size', id: 'size', isRowHeader: true},
]

export interface MemoryCapacityRow {
    id: number;
    size: string;
}

export interface MemoryCapacity {
    size: number;
}


export interface MemoryCapacityDbo {
    size: number;
}

export const MemoryKitColumns: TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'medium'},
    {name: 'Modules', id: 'modules', },
    {name: 'Speed', id: 'speed', },
    {name: 'CAS Latency', id: 'casLatency', },
    {name: 'First Word Latency', id: 'firstWordLatency', size: 'small' },
    {name: 'Price', id: 'price'},
]

export interface MemoryKitRow {
    name: string;
    price: string;
    modules: string;
    speed: string;
    casLatency: string;
    firstWordLatency: string;
}

export interface MemoryKit extends Component {
    capacity: number;
    clockFrequency: number;
    height: number;
    isECC: boolean;
    isBuffered: boolean;
    moduleCount: number;
    casLatency: number;
    firstWordLatency: number;
    voltage: number;
    timing: string;
    formFactor: MemoryFormFactor;
    type: MemoryType;
}

export interface MemoryKitDbo extends ComponentDbo {
    formFactorID: number;
    typeID: number;
    capacityID: number;
    clockFrequency: number;
    height: number;
    isECC: boolean;
    isBuffered: boolean;
    moduleCount: number;
    casLatency: number;
    firstWordLatency: number;
    voltage: number;
    timing: string;
}

export interface MemoryKitParams extends ComponentParams {
    types: MemoryType[];
    formFactors: MemoryFormFactor[];
    capacities: MemoryCapacity[];
}

export const CentralProcessorChannelColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true},
    { name: 'Name', id: 'name'}
]

export interface CentralProcessorChannelRow {
    id: number;
    name: string;
}

export interface CentralProcessorChannel {
    id: number;
    name: string;
}

export interface CentralProcessorChannelDbo {
    name: string;
}

export const CentralProcessorSeriesColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true},
    { name: 'Name', id: 'name'}
]

export interface CentralProcessorSeriesRow {
    id: number;
    name: string;
}

export interface CentralProcessorSeries {
    id: number;
    name: string;
}

export interface CentralProcessorSeriesDbo {
    name: string;
}

export const CentralProcessorSocketColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true},
    { name: 'Name', id: 'name'}
]

export interface CentralProcessorSocketRow {
    id: number;
    name: string;
}

export interface CentralProcessorSocket {
    id: number;
    name: string;
}

export interface CentralProcessorSocketDbo {
    name: string;
}

export const CentralProcessorMicroarchitectureColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true},
    { name: 'Name', id: 'name'}
]

export interface CentralProcessorMicroarchitectureRow {
    id: number;
    name: string;
}

export interface CentralProcessorMicroarchitecture {
    id: number;
    name: string;
}

export interface CentralProcessorMicroarchitectureDbo {
    name: string;
}

export const CentralProcessorCoreFamilyColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true},
    { name: 'Name', id: 'name', size: 'small' },
    { name: 'Microarchitecture', id: 'microarchitecture'}
]

export interface CentralProcessorCoreFamilyRow {
    id: number;
    name: string;
    microarchitecture: string;
}

export interface CentralProcessorCoreFamily {
    id: number;
    name: string;
    microarchitecture: CentralProcessorMicroarchitecture;
}

export interface CentralProcessorCoreFamilyDbo {
    name: string;
    microarchitectureID: number;
}

export interface CentralProcessorCoreFamilyParams {
    microarchitectures: CentralProcessorMicroarchitecture[];
}

export const CentralProcessorUnitColumns: TableColumn[] = [
    { name: 'Name', id: 'name', isRowHeader: true },
    { name: 'Core Count', id: 'coreCount' },
    { name: 'Performance Core Clock', id: 'performanceCoreClock' },
    { name: 'Performance Core Boost Clock', id: 'performanceCoreBoostClock' },
    { name: 'Microarchitecture', id: 'microarchitecture' },
    { name: 'TDP', id: 'totalPower' },
    { name: 'Integrated Graphics', id: 'integratedGraphics' },
    { name: 'Price', id: 'price' },
]

export interface CentralProcessorUnitRow {
    name: string;
    coreCount: number;
    performanceCoreClock: string;
    performanceCoreBoostClock: string;
    microarchitecture: string;
    totalPower: string;
    integratedGraphics: string;
    price: string;
}

export interface CentralProcessorUnit extends Component {
    socket: CentralProcessorSocket;
    series: CentralProcessorSeries;
    channel: CentralProcessorChannel;
    maxTotalMemoryCapacity: number;
    totalPower: string;
    hasIntegratedGraphics: boolean;
    coolerIncluded: boolean;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
    coreCount: number;
    performanceCoreClock: number;
    performanceCoreBoostClock: number;
    hasEfficiencyCores: boolean;
    efficiencyCoreClock: number;
    efficiencyCoreBoostClock: number;
    l2Cache: number;
    l3Cache: number;
    simultaneousMultithreading: boolean;
}

export interface CentralProcessorUnitDbo extends ComponentDbo {
    socketID: number;
    seriesID: number;
    channelID: number;
    coreFamilyID: number;
    maxTotalMemoryCapacityID: number;
    totalPower: number;
    hasIntegratedGraphics: boolean;
    coolerIncluded: boolean;
    supportECCMemory: boolean;
    supportNonECCMemory: boolean;
    supportBufferedMemory: boolean;
    supportUnbufferedMemory: boolean;
    coreCount: number;
    performanceCoreClock: number;
    performanceCoreBoostClock: number;
    hasEfficiencyCores: number;
    efficiencyCoreClock: number;
    efficiencyCoreBoostClock: number;
    l2Cache: number;
    l3Cache: number;
    simultaneousMultithreading: boolean;
}

export interface CentralProcessorUnitParams extends ComponentParams {
    sockets: CentralProcessorSocket[];
    series: CentralProcessorSeries[];
    channels: CentralProcessorChannel[];
    coreFamilies: CentralProcessorCoreFamily[];
    memoryCapacities: MemoryCapacity[];
}





