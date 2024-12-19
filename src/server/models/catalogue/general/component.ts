import {ColourDto, ManufacturerDto} from '.';

export interface ComponentListItem {
    id: number;
    name: string;
    price: string;
    colour: string;
}

export interface ComponentParams {
    manufacturers: ManufacturerDto[];
    colours: ColourDto[];
}

export interface ComponentDto {
    id: number;
    sku: string;
    partNumber: string;
    name: string;
    regularPrice: number;
    salePrice: number;
    onSale: boolean;
    saleable: boolean;
    manufacturer: ManufacturerDto;
    isColoured: boolean;
    colour: ColourDto | null;
}

export interface ComponentDbo {
    manufacturerID: number;
    sku: string;
    partNumber: string;
    name: string;
    regularPrice: number;
    salePrice: number;
    onSale: boolean;
    saleable: boolean;
    isColoured: boolean;
    colourID: number | null;
}
