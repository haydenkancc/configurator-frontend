import {Form} from './form';
import {getComponentParams, postComponentAction} from '@/server/controllers/test';
import {StorageUnitParams} from '@/server/models/components';

export default async function Page() {

    const endpoint = '/api/Storage/StorageUnits'

    const submitAction = await postComponentAction(endpoint, ['StorageUnits'])

    const unitParams = (await getComponentParams<StorageUnitParams>(endpoint, ['Manufacturers', 'StorageDriveInterfaces', 'SolidStateDriveNandTypes', 'StorageCapacities', 'CaseStorageFormFactors', 'IOConnectors', 'PowerSupplyConnectors', 'M2Keys', 'PCIeVersions', 'PCIeSizes', 'M2FormFactors'])).data

    console.log(unitParams);

    return (
        <Form params={unitParams} action={submitAction}/>
    )
}