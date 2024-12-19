export interface KeyListItem {
    id: number;
    name: string;
}

export interface KeyParams {
    keys: KeyDtoSimple[];
}

export interface KeyDto {
    id: number;
    name: string;
    compatibleKeys: KeyDtoSimple[];
}

export interface KeyDtoSimple {
    id: number;
    name: string;
}

export interface KeyDbo {
    name: string;
    compatibleKeyIDs: number[];
}
