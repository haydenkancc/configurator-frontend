'use client'
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {useReducer, useState} from 'react';
import {PutFormProps} from '@/server/models'
import {
    StorageDriveType,
    StorageUnit,
    StorageUnitDbo,
    StorageUnitLocation,
    StorageUnitParams
} from '@/server/models/components';
import {NumberField} from '@/components/ui/number-field';
import {
    CaseStorageFormFactorComboBox,
    ComponentModule,
    componentModuleReducer,
    IOConnectorComboBox,
    M2ExpansionCardModule,
    m2ExpansionCardModuleReducer,
    PowerSupplyConnectorComboBox,
    SolidStateDriveNandTypeComboBox,
    StorageDriveInterfaceComboBox,
    StorageDriveTypeSelect,
    StorageUnitLocationSelect,
    TransformComponentToDbo, TransformM2ExpansionCardToDbo
} from '@/app/catalogue/_templates/forms';

export function Form({item, action, params}: PutFormProps<StorageUnit, StorageUnitDbo, StorageUnitParams>) {

    const [componentState, componentDispatch] = useReducer(
        componentModuleReducer, item?.location == StorageUnitLocation.Case ? TransformComponentToDbo(item?.caseStorageUnit?.component) : TransformComponentToDbo(item?.m2StorageUnit?.expansionCard.component)
    );

    const [ expansionCardState, expansionCardDispatch] = useReducer(
        m2ExpansionCardModuleReducer, TransformM2ExpansionCardToDbo(item?.m2StorageUnit?.expansionCard)
    );


    const [type, setType] = useState<StorageDriveType | undefined>(item?.drive.type);
    const [location, setLocation] = useState<StorageUnitLocation | undefined>(item?.location);
    const [capacity, setCapacity] = useState<number | undefined>(item?.drive.capacity);
    const [cache, setCache] = useState<number | undefined>(item?.drive.cache);
    const [readSpeed, setReadSpeed] = useState<number | undefined>(item?.drive.readSpeed);
    const [writeSpeed, setWriteSpeed] = useState<number | undefined>(item?.drive.writeSpeed);
    const [interfaceID, setInterfaceID] = useState<number | undefined>(item?.drive.interface.id);

    const [rpm, setRpm] = useState<number | undefined>(item?.drive.hardDiskDrive?.rpm);
    const [nandTypeID, setNandTypeID] = useState<number | undefined>(item?.drive.solidStateDrive?.nandType.id);

    const [formFactorID, setFormFactorID] = useState<number | undefined>(item?.caseStorageUnit?.formFactor.id);
    const [ioConnectorID, setIOConnectorID] = useState<number | undefined>(item?.caseStorageUnit?.ioConnector.id);
    const [powerSupplyConnectorID, setPowerSupplyConnectorID] = useState<number | undefined>(item?.caseStorageUnit?.powerSupplyConnector.id);


    return (
        <PutBody name="unit"
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
                        <StorageDriveTypeSelect grow selectedKey={type} onSelectionChange={(key) => setType(key as StorageDriveType)}/>
                        <StorageUnitLocationSelect grow selectedKey={location} onSelectionChange={(key) => setLocation(key as StorageUnitLocation)}/>
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
        </PutBody>
    )
}