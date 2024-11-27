export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export interface PutFormProps<T, R, Q = {}> {
    item: T | null;
    action: (body: Partial<R>) => Promise<boolean>;
    params?: Q | null;
}

export interface PostFormProps<R, Q = {}> {
    action: (body: Partial<R>) => Promise<number | null>
    params?: Q | null;
}



export interface PaginatedList<T> {
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    items: Array<T>
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface TableColumn {
    name: string,
    id: string;
    isRowHeader?: boolean;
    size?: 'small' | 'medium' | 'large';
}

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

export const MemorySizeColumns: TableColumn[] = [
    {name: 'Size', id: 'size', isRowHeader: true},
]

export interface MemorySizeRow {
    id: number;
    size: string;
}

export interface MemorySize {
    size: number;
}


export interface MemorySizeDbo {
    size: number;
}

export const MemoryKitColumns: TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'medium'},
    {name: 'Modules', id: 'modules', },
    {name: 'Speed', id: 'speed', },
    {name: 'CAS Latency', id: 'casLatency', },
    {name: 'First Word Latency', id: 'firstWordLatency', size: 'small' },
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
    size: number;
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
    size: number;
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
    sizes: MemorySize[];
}
