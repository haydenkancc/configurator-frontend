import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {GraphicsCard} from '@/server/models/catalogue';
import {TreeBuilder, TreeBuilderBranch, TreeBuilderDropdown} from '@/components/ui/tree-builder';
import {ListData} from 'react-stately';
import {PowerSupplyConnectorComboBox} from '@/components/catalogue/views/forms/power-supply';
import {NumberField} from '@/components/ui/number-field';
import {Row} from '@/components/catalogue/views/item-view';
import {Button} from '@/components/ui/button';
import {Plus, X} from '@phosphor-icons/react/dist/ssr';

export function GraphicsCardChipsetComboBox({...props } : ComboBoxProps<GraphicsCard.ChipsetDto>) {
    return (
        <ComboBox grow label="Chipset" isRequired {...props}>
            {chipset => (
                <ComboBoxItem>{chipset.name}</ComboBoxItem>
            )}
        </ComboBox>
    )
}

interface GraphicsProcessorPowerConnectorConfigurationTreeBuilderProps {
    configurations: ListData<GraphicsProcessorUnitConfigurationListDataItem>
    connections: ListData<GraphicsProcessorUnitConfigurationPowerSupplyConnectorListDataItem>
    powerSupplyConnectors?: PowerSupplyConnectorBase[];
    configurationIdRef: React.MutableRefObject<number>
    connectionIdRef: React.MutableRefObject<number>
}

export function GraphicsProcessorPowerConnectorConfigurationTreeBuilder({configurations, powerSupplyConnectors, connections, configurationIdRef, connectionIdRef} : GraphicsProcessorPowerConnectorConfigurationTreeBuilderProps) {
    return (
        <>
            <TreeBuilder list={configurations.items}>
                {configuration => (
                    <TreeBuilderDropdown
                        newMessage="Add new connector"
                        isRoot
                        open={configuration.open}
                        openAction={(open) => configurations.update(configuration.id, {...configuration, open})}
                        removeAction={() => configurations.remove(configuration.id)}
                        addAction={() => connections.append({
                                id: connectionIdRef.current++,
                                configurationID: configuration.id,
                            }
                        )}
                        branches={connections.items.filter(e => e.configurationID === configuration.id)}
                        branch={(connector) =>
                            <TreeBuilderBranch
                                indent={1}
                                removeAction={() => connections.remove(connector.id)}
                            >
                                <PowerSupplyConnectorComboBox grow defaultItems={powerSupplyConnectors}
                                                              selectedKey={connector.connectorID}
                                                              onSelectionChange={
                                                                  (key) => {connections.update(connector.id, {
                                                                      ...connector,
                                                                      connectorID: key as number,
                                                                  })}
                                                              } />
                                <X weight="bold" />
                                <NumberField placeholder="..." grow value={connector.connectorCount} onChange={value => connections.update(connector.id, {...connector, connectorCount: value})}/>
                            </TreeBuilderBranch>
                        }>
                        {configuration.name}
                    </TreeBuilderDropdown>
                )}
            </TreeBuilder>
            <Row justify="center"><Button variant="primary" onPress={() => configurations.append({
                id: ++configurationIdRef.current,
                name: 'Configuration ' + String.fromCharCode(configurationIdRef.current + 65),
                open: true,
            })}><Plus weight="bold" />New configuration</Button></Row>
        </>
    )
}