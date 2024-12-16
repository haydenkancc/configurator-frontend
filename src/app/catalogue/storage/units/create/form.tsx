'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {useReducer, useState} from 'react';
import {PostFormProps} from '@/server/models'
import {StorageDriveType, StorageUnitDbo, StorageUnitLocation, StorageUnitParams} from '@/server/models/components';
import {NumberField} from '@/components/ui/number-field';
import {
    CaseStorageFormFactorComboBox,
    ComponentModule,
    componentModuleReducer,
    IOConnectorComboBox,
    M2ExpansionCardModule,
    m2ExpansionCardModuleReducer,
    PowerSupplyConnectorComboBox,
    SolidStateDriveNandTypeComboBox
} from '@/app/catalogue/_templates/forms';
import {
    StorageDriveInterfaceComboBox,
    StorageDriveTypeSelect,
    StorageUnitLocationSelect
} from '@/app/catalogue/_templates/forms/storage';

export function Form({action, params}: PostFormProps<StorageUnitDbo, StorageUnitParams>) {

    const [componentState, componentDispatch] = useReducer(
        componentModuleReducer, { onSale: false, saleable: true }
    );

    const [ expansionCardState, expansionCardDispatch] = useReducer(
        m2ExpansionCardModuleReducer,  {}
    );

    const [type, setType] = useState<StorageDriveType | undefined>();
    const [location, setLocation] = useState<StorageUnitLocation | undefined>();
    const [capacity, setCapacity] = useState<number | undefined>();
    const [cache, setCache] = useState<number | undefined>();
    const [readSpeed, setReadSpeed] = useState<number | undefined>();
    const [writeSpeed, setWriteSpeed] = useState<number | undefined>();
    const [interfaceID, setInterfaceID] = useState<number | undefined>();

    const [rpm, setRpm] = useState<number | undefined>();
    const [nandTypeID, setNandTypeID] = useState<number | undefined>();

    const [formFactorID, setFormFactorID] = useState<number | undefined>();
    const [ioConnectorID, setIOConnectorID] = useState<number | undefined>();
    const [powerSupplyConnectorID, setPowerSupplyConnectorID] = useState<number | undefined>();


    return (
        <PostBody name="unit"
            submitAction={async () => await action({
                location,
                drive: {
                    type, capacity, cache, readSpeed, writeSpeed, interfaceID,
                    hardDiskDrive: {
                        rpm,
                    },
                    solidStateDrive: {
                        nandTypeID,
                    }
                },
                caseStorageUnit: {
                    component: componentState,
                    formFactorID, ioConnectorID, powerSupplyConnectorID,
                },
                m2StorageUnit: {
                    expansionCard: {...expansionCardState, component: componentState},
                }
            })}
        >
            <ComponentModule state={componentState} dispatch={componentDispatch} params={params?.caseStorageUnit.component} />
            <Module title="Storage unit details" subtitle="Specify details for a new storage unit.">
                <Content>
                    <Row>
                        <StorageDriveTypeSelect grow onSelectionChange={(key) => setType(key as StorageDriveType)}/>
                        <StorageUnitLocationSelect grow onSelectionChange={(key) => setLocation(key as StorageUnitLocation)}/>
                    </Row>
                    <Row>
                        <NumberField value={capacity} onChange={setCapacity} grow isRequired label="Capacity (GB)" />
                        <NumberField value={cache} onChange={setCache} grow isRequired label="Cache size (MB)" />
                    </Row>
                    <Row>
                        <NumberField value={readSpeed} onChange={setReadSpeed} grow isRequired label="Maximum sequential read speed (MB/s)" />
                        <NumberField value={writeSpeed} onChange={setWriteSpeed} grow isRequired label="Maximum sequential write speed (MB/s)" />
                    </Row>
                    <Row>
                        <StorageDriveInterfaceComboBox selectedKey={interfaceID} onSelectionChange={(key) => setInterfaceID(key as number)}   grow defaultItems={params?.drive.interfaces} />
                    </Row>
                    {type == StorageDriveType.SolidStateDrive &&
                        <>
                            <Row>
                                <SolidStateDriveNandTypeComboBox selectedKey={nandTypeID} onSelectionChange={(key) => setNandTypeID(key as number)} grow defaultItems={params?.drive.solidStateDrive.nandTypes} />
                            </Row>
                        </>
                    }
                    {type == StorageDriveType.HardDiskDrive &&
                        <>
                            <Row>
                                <NumberField value={rpm} onChange={setRpm} label="Spindle speed (RPM)" isRequired grow />
                            </Row>
                        </>
                    }
                </Content>
            </Module>

            {location == StorageUnitLocation.Case &&
                <Module title="Case drive details" subtitle="Provide compatibility details for this drive.">
                    <Content>
                        <Row>
                            <CaseStorageFormFactorComboBox selectedKey={formFactorID} onSelectionChange={(key) => setFormFactorID(key as number)} defaultItems={params?.caseStorageUnit.formFactors} grow />
                        </Row>
                        <Row>
                            <IOConnectorComboBox selectedKey={ioConnectorID} onSelectionChange={(key) => setIOConnectorID(key as number)} defaultItems={params?.caseStorageUnit.ioConnectors} grow label="I/O connector"/>
                            <PowerSupplyConnectorComboBox selectedKey={powerSupplyConnectorID} onSelectionChange={(key) => setPowerSupplyConnectorID(key as number)} defaultItems={params?.caseStorageUnit.powerSupplyConnectors} grow label="Power supply connector" />
                        </Row>
                    </Content>
                </Module>
            }
            {location == StorageUnitLocation.M2 &&
                <M2ExpansionCardModule state={expansionCardState} dispatch={expansionCardDispatch} params={params?.m2StorageUnit.expansionCard} />
            }
        </PostBody>
    )
}