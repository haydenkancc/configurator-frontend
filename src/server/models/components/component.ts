import {Manufacturer} from '@/server/models/components';

export interface IComponent {
    component: Component;
    componentID: number;
}

export interface Component {
    id: number,
    sku: string,
    name: string,
    partNumber: string,
    regularPrice: number,
    salePrice: number,
    onSale: boolean,
    saleable: boolean,
    manufacturer: Manufacturer,
}

export interface IComponentDbo {
    component: ComponentDbo;
}

export interface ComponentDbo {
    sku: string,
    name: string,
    partNumber: string,
    regularPrice: number,
    salePrice: number,
    onSale: boolean,
    saleable: boolean,
    manufacturerID: number,
}

export interface IComponentParams {
    component: ComponentParams;
}

export interface ComponentParams {
    manufacturers: Manufacturer[];
}