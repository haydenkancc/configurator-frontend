import {TableColumn} from '@/server/models';
import {IM2ExpansionCard, IM2ExpansionCardDbo, IM2ExpansionCardParams} from '@/server/models/components/m2';
import {IComponent, IComponentDbo, IComponentParams} from '@/server/models/components/component';
import {IOConnector} from '@/server/models/components/io';
import {PowerSupplyConnector} from '@/server/models/components/power-supply';

export const SolidStateDriveNandTypeColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Type', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface SolidStateDriveNandTypeRow {
    id: number;
    name: string;
}

export interface SolidStateDriveNandType {
    id: number;
    name: string;
}

export interface SolidStateDriveNandTypeDbo {
    name: string;
}

export const StorageDriveInterfaceColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Form Factor', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface StorageDriveInterfaceRow {
    id: number;
    name: string;
}

export interface StorageDriveInterface {
    id: number;
    name: string;
}

export interface StorageDriveInterfaceDbo {
    name: string;
}

export enum StorageDriveType {
    SolidStateDrive = 0,
    HardDiskDrive = 1,
}

export interface HardDiskDrive {
    rpm: number;
}

export interface SolidStateDrive {
    nandType: SolidStateDriveNandType
}

export interface StorageDrive {
    interface: StorageDriveInterface;
    capacity: number;
    cache: number;
    readSpeed: number;
    writeSpeed: number;

    type: StorageDriveType
    hardDiskDrive?: HardDiskDrive
    solidStateDrive?: SolidStateDrive
}

export interface HardDiskDriveDbo {
    rpm: number;
}

export interface SolidStateDriveDbo {
    nandTypeID: number;
}

export interface StorageDriveDbo {
    interfaceID: number;
    capacity: number;
    cache: number;
    readSpeed: number;
    writeSpeed: number;
    type: StorageDriveType;
    hardDiskDrive?: HardDiskDriveDbo
    solidStateDrive?: SolidStateDriveDbo
}

export interface HardDiskDriveParams {

}

export interface SolidStateDriveParams {
    nandTypes: SolidStateDriveNandType[];
}

export interface StorageDriveParams {
    hardDiskDrive: HardDiskDriveParams;
    solidStateDrive: SolidStateDriveParams;
    interfaces: StorageDriveInterface[];
}

export const CaseStorageFormFactorColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Type', id: 'name', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface CaseStorageFormFactorRow {
    id: number;
    name: string;
}

export interface CaseStorageFormFactor {
    id: number;
    name: string;
}

export interface CaseStorageFormFactorDbo {
    name: string;
}



export interface M2StorageUnit extends IM2ExpansionCard {

}

export interface M2StorageUnitDbo extends IM2ExpansionCardDbo {

}

export interface M2StorageUnitParams extends IM2ExpansionCardParams {

}

export interface CaseStorageUnit extends IComponent {
    formFactor: CaseStorageFormFactor
    ioConnector: IOConnector
    powerSupplyConnector: PowerSupplyConnector
}

export interface CaseStorageUnitDbo extends IComponentDbo {
    formFactorID: number;
    ioConnectorID: number;
    powerSupplyConnectorID: number;
}

export interface CaseStorageUnitParams extends IComponentParams {
    formFactors: CaseStorageFormFactor[];
    ioConnectors: IOConnector[];
    powerSupplyConnectors: PowerSupplyConnector[];
}

export const StorageUnitColumns : TableColumn[] = [
    {name: 'Name', id: 'name', isRowHeader: true, size: 'medium'},
    {name: 'Capacity', id: 'capacity', size: 'small'},
    {name: 'Cache', id: 'cache', size: 'small'},
    {name: 'Form factor', id: 'formFactor', size: 'small'},
    {name: 'Interface', id: 'interface', size: 'small'},
    {name: 'Type', id: 'type', size: 'small'},
    {name: 'Price', id: 'price', size: 'small'},
]

export interface StorageUnitRow {
    name: string;
    capacity: string;
    cache: string;
    formFactor: string;
    interface: string;
    type: string;
    price: string;
}

export enum StorageUnitLocation {
    Case = 0,
    M2 = 1,
}

export interface StorageUnit {
    drive: StorageDrive;
    location: StorageUnitLocation;
    m2StorageUnit?: M2StorageUnit;
    caseStorageUnit?: CaseStorageUnit;
}

export interface StorageUnitDbo {
    drive: StorageDriveDbo;
    location: StorageUnitLocation;
    m2StorageUnit?: M2StorageUnitDbo;
    caseStorageUnit?: CaseStorageUnitDbo;
}

export interface StorageUnitParams {
    drive: StorageDriveParams;
    m2StorageUnit: M2StorageUnitParams;
    caseStorageUnit: CaseStorageUnitParams;
}

