import {
    CaseStorageFormFactor,
    CaseStorageUnitDbo,
    CaseStorageUnitParams, ComponentDbo,
    HardDiskDriveDbo,
    HardDiskDriveParams,
    M2StorageUnitDbo,
    M2StorageUnitParams,
    SolidStateDriveDbo,
    SolidStateDriveNandType,
    SolidStateDriveParams,
    StorageDriveDbo,
    StorageDriveInterface,
    StorageDriveType,
    StorageUnitDbo,
    StorageUnitLocation,
    StorageUnitParams
} from '@/server/models/components';
import React, {Dispatch} from 'react';
import {Content, Module, Row} from '@/app/catalogue/_templates/view';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {Select, SelectItem, SelectProps} from '@/components/ui/select';
import {NumberField} from '@/components/ui/number-field';
import {IOConnectorComboBox} from '@/app/catalogue/_templates/forms/io';
import {PowerSupplyConnectorComboBox} from '@/app/catalogue/_templates/forms/power-supply';
import {M2ExpansionCardModule} from '@/app/catalogue/_templates/forms/m2';
import {RecursivePartial} from '@/server/models';


export function StorageDriveInterfaceComboBox({...props} : ComboBoxProps<StorageDriveInterface>)
{
    return (
        <ComboBox label="Interface" placeholder="Select an interface" isRequired {...props} >
            {driveInterface => <ComboBoxItem>{driveInterface.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function CaseStorageFormFactorComboBox({...props} : ComboBoxProps<CaseStorageFormFactor>)
{
    return (
        <ComboBox label="Form factor" placeholder="Select a form factor" isRequired {...props}>
            {formFactor => <ComboBoxItem>{formFactor.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function SolidStateDriveNandTypeComboBox({...props} : ComboBoxProps<SolidStateDriveNandType>) {
    return (
        <ComboBox label="NAND type" placeholder="Select a type" isRequired {...props} >
            {type => <ComboBoxItem>{type.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function StorageDriveTypeSelect({items, children, ...props} : SelectProps<object>) {
    return (
        <Select label="Type" placeholder="Select a type" isRequired {...props}>
            <SelectItem id={StorageDriveType.SolidStateDrive}>SSD</SelectItem>
            <SelectItem id={StorageDriveType.HardDiskDrive}>HDD</SelectItem>
        </Select>
    )
}

export function StorageUnitLocationSelect({items, children, ...props} : SelectProps<object>) {
    return (
        <Select label="Location" placeholder="Select a location" isRequired {...props}>
            <SelectItem id={StorageUnitLocation.Case}>Drive bay</SelectItem>
            <SelectItem id={StorageUnitLocation.M2}>M.2 slot</SelectItem>
        </Select>
    )
}
