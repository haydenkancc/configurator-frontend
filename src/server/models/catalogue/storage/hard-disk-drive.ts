import { BaseDriveDto, BaseDriveDbo } from '.';

export interface HardDiskDriveDto extends BaseDriveDto {
    rpm: number;
}

export interface HardDiskDriveDbo extends BaseDriveDbo {
    rpm: number;
}