import {BaseDriveDbo, BaseDriveDto, NandTypeDto} from '.';

export interface SolidStateDriveDto extends BaseDriveDto {
    nandType: NandTypeDto;
}

export interface SolidStateDriveDbo extends BaseDriveDbo {
    nandTypeID: number;
}