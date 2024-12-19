import { General, PowerSupply, Motherboard, IO, Storage, Pcie, Fan, Cooler } from '..';
import {
    ExpansionSlotAreaDbo,
    ExpansionSlotAreaDto, LayoutDbo,
    LayoutDto,
    MaterialDto, PanelDto,
    SizeDto, UnitIOConnectorDbo,
    UnitIOConnectorDto, UnitPowerSupplyConnectorDbo,
    UnitPowerSupplyConnectorDto
} from '.';

export interface UnitListItem {
    type: string;
    sidePanel: string;
    externalVolume: string;
}

export interface UnitDto {
    component: General.ComponentDto;
    layouts: LayoutDto[];
    ioConnectors?: UnitIOConnectorDto[];
    powerSupplyConnectors?: UnitPowerSupplyConnectorDto[];
    primaryMotherboardFormFactor: Motherboard.FormFactorDto;
    motherboardFormFactors: Motherboard.FormFactorDto[];
    powerSupplyFormFactor: PowerSupply.FormFactorDto;
    expansionSlotAreas?: ExpansionSlotAreaDto[];
    size: SizeDto;
    sidePanelMaterial: MaterialDto;
    externalVolume: number;
    length: number;
    width: number;
    height: number;
}

export interface UnitParams {
    component: General.ComponentParams;
    powerSupplyFormFactors: PowerSupply.FormFactorDto[];
    motherboardFormFactors: Motherboard.FormFactorDto[];
    sizes: SizeDto[];
    materials: MaterialDto[];
    radiatorSizes: Cooler.RadiatorSizeDto[];
    fanSizes: Fan.SizeDto[];
    brackets: Pcie.BracketDto[];
    panels: PanelDto[];
    ioConnectors: IO.ConnectorDto[];
    powerSupplyConnectors: PowerSupply.ConnectorDto[];
    storageFormFactors: Storage.FormFactorDto[];
}

export interface UnitDbo {
    component: General.ComponentDbo;
    powerSupplyFormFactorID: number;
    primaryMotherboardFormFactorID: number;
    sizeID: number;
    sidePanelMaterialID: number;
    externalVolume: number;
    length: number;
    width: number;
    height: number;
    layouts: LayoutDbo[];
    ioConnectors: UnitIOConnectorDbo[];
    powerSupplyConnectors: UnitPowerSupplyConnectorDbo[];
    motherboardFormFactorIDs: number[];
    expansionSlotAreas: ExpansionSlotAreaDbo[];
}