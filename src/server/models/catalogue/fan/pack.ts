import { IO, General } from '..';
import {PackConnectorDbo, PackConnectorDto, SizeDto} from '.';
import {TableColumn} from '@/server/models';

export const PackColumns : TableColumn[] = [
    { name: 'Name', id: 'name', isRowHeader: true, size: 'medium'},
    { name: '', id: 'SPACER'},
    { name: 'Size', id: 'size', size: 'small'},
    { name: 'RPM', id: 'rpm', size: 'small'},
    { name: 'Airflow', id: 'airflow', size: 'small'},
    { name: 'Noise Level', id: 'noiseLevel', size: 'small'},
    { name: 'PWM', id: 'pwm', size: 'small'},
    { name: 'Colour', id: 'colour', size: 'small'},
    { name: 'Price', id: 'price'},
]

export interface PackListItem extends General.ComponentListItem {
    size: string;
    rpm: string;
    airflow: string;
    noiseLevel: string;
    pwm: string;
}

export interface PackParams {
    component: General.ComponentParams; // Assuming ComponentParams is defined elsewhere
    sizes: SizeDto[];
    connectors: IO.ConnectorDtoSimple[];
}

export interface PackDto {
    component: General.ComponentDto;
    size: SizeDto;
    quantity: number;
    rpm: string;
    airflow: string;
    noiseLevel: string;
    staticPressure: string;
    pwm: boolean;
    connectors: PackConnectorDto[];
}

export interface PackDbo {
    component: General.ComponentDbo;
    quantity: number;
    sizeID: number;
    rpm: string;
    airflow: string;
    noiseLevel: string;
    staticPressure: string;
    pwm: boolean;
    connectors: PackConnectorDbo[];
}