import {StorageUnit, StorageUnitParams} from '@/server/models/components';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Storage/StorageUnits'

    const unit = (await getComponent<StorageUnit>(endpoint, id, ['StorageUnits'])).data;

    const action = await putComponentAction(endpoint, id, ['StorageUnits'])

    const unitParams = (await getComponentParams<StorageUnitParams>(endpoint, ['Manufacturers', 'StorageDriveInterfaces', 'SolidStateDriveNandTypes', 'StorageCapacities', 'CaseStorageFormFactors', 'IOConnectors', 'PowerSupplyConnectors', 'M2Keys', 'PCIeVersions', 'PCIeSizes', 'M2FormFactors'])).data

    return (
        <Form item={unit} action={action} params={unitParams} />
    )
}