import {TableColumn} from '@/server/models';
import {
    Component,
    ComponentDbo,
    ComponentParams,
    IComponent, IComponentDbo,
    IComponentParams,
    IOConnectorBase
} from '@/server/models/components';

export const FanSizeColumns : TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Size', id: 'size', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface FanSizeRow {
    id: number;
    size: string;
}

export interface FanSize {
    id: number;
    size: number;
}

export interface FanSizeDbo {
    size: number;
}

export const FanPackColumns : TableColumn[] = [
    { name: 'Name', id: 'name', isRowHeader: true, size: 'medium'},
    { name: '', id: 'SPACER'},
    { name: 'Size', id: 'size', size: 'small'},
    { name: 'RPM', id: 'rpm', size: 'small'},
    { name: 'Airflow', id: 'airflow', size: 'small'},
    { name: 'Noise Level', id: 'noiseLevel', size: 'small'},
    { name: 'PWM', id: 'pwm', size: 'small'},
    { name: 'Price', id: 'price'},
]

export interface FanPackRow {
    name: string;
    size: string;
    rpm: string;
    airflow: string;
    noiseLevel: string;
    pwm: string;
    price: string;
}

export interface FanPack extends IComponent {
    size: FanSize;
    quantity: number;
    rpm: string;
    airflow: string;
    noiseLevel: string;
    staticPressure: string;
    pwm: boolean;
    connectors: FanPackIOConnector[]
}

export interface FanPackDbo extends IComponentDbo {
    quantity: number;
    sizeID: number;
    rpm: string;
    airflow: string;
    noiseLevel: string;
    staticPressure: string;
    pwm: boolean;
    connectors: FanPackIOConnector[]
}

export interface FanPackParams extends IComponentParams {
    sizes: FanSize[];
    connectors: IOConnectorBase[];
}

export interface FanPackIOConnector {
    connectorID: number,
    connectorCount: number,
}