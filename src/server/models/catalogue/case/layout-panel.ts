import {LayoutPanelFanDbo, LayoutPanelFanDto, LayoutPanelRadiatorDbo, LayoutPanelRadiatorDto} from '.';

export interface LayoutPanelDto {
    radiators: LayoutPanelRadiatorDto[];
    fans: LayoutPanelFanDto[];
}

export interface LayoutPanelDbo {
    panelID: number;
    radiators: LayoutPanelRadiatorDbo[];
    fans: LayoutPanelFanDbo[];
}