import {HardDiskDriveDbo, HardDiskDriveDto, NandTypeDto, SolidStateDriveDbo, SolidStateDriveDto} from '.';

export enum DriveType {
    SolidStateDrive = 0,
    HardDiskDrive = 1,
}

export interface DriveDto {
    type: DriveType;
    solidStateDrive: SolidStateDriveDto | null;
    hardDiskDrive: HardDiskDriveDto | null;
}

export interface BaseDriveDto {
    // Add properties shared by all drives here.
}

export interface DriveParams {
    nandTypes: NandTypeDto[];
}

export interface DriveDbo {
    type: DriveType;
    solidStateDrive: SolidStateDriveDbo | null;
    hardDiskDrive: HardDiskDriveDbo | null;
}

export interface BaseDriveDbo {
    // Add properties shared by all drives here.
}