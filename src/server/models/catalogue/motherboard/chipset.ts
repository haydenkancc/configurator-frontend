import { CentralProcessor } from '..';

export interface ChipsetListItem {
    id: number;
    name: string;
    socket: string;
}

export interface ChipsetDto {
    id: number;
    name: string;
    socket: CentralProcessor.SocketDto;
}

export interface ChipsetParams {
    sockets: CentralProcessor.SocketDto[];
}

export interface ChipsetDbo {
    name: string;
    socketID: number;
}