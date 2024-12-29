import { CentralProcessor } from '..';
import {TableColumn} from '@/server/models';

export const ChipsetColumns: TableColumn[] = [
    { name: 'ID', id: 'id', isRowHeader: true, size: 'small'},
    { name: 'Chipset', id: 'name', size: 'medium'},
    { name: 'Socket', id: 'socket', size: 'medium'},
    { name: '', id: 'SPACER'},
]

export interface ChipsetListItem {
    id: number;
    name: string;
    socket: string;
}

export interface ChipsetDtoSimple {
    id: number;
    name: string;
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