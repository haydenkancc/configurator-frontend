import { IO, General } from '..';
import {PackConnectorDbo, PackConnectorDto, SizeDto} from '.';

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
    sizeId: number;
    rpm: string;
    airflow: string;
    noiseLevel: string;
    staticPressure: string;
    pwm: boolean;
    connectors: PackConnectorDbo[];
}