import {ListData, useListData} from 'react-stately';
import { IO, Fan } from '@/server/models/catalogue';
import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {useFilter} from '@react-aria/i18n';
import {Row} from '@/components/catalogue/views/item-view';
import {Button} from '@/components/ui/button';
import {Plus, X} from '@phosphor-icons/react/dist/ssr';
import {TableBuilder, TableBuilderDeleteButton, TableBuilderRow} from '@/components/ui/table-builder';
import {ComboBox, ComboBoxItem} from '@/components/ui/combo-box';
import {NumberField} from '@/components/ui/number-field';
import {RecursiveNullable} from '@/server/models';

export function IOConnectorsListBuilder({compatibleConnectors, connectors, connectorID} : { compatibleConnectors : ListData<IO.ConnectorDtoSimple>, connectors?: IO.ConnectorDtoSimple[], connectorID?: number }) {

    let { contains } = useFilter({ sensitivity: 'base' });

    const comboBoxItems = useListData({
        initialItems: connectors?.filter((({ id }) => !(compatibleConnectors.getItem(id) || id === connectorID))),
        filter: (k, filterText) => contains(k.name, filterText)
    });


    return (
        <ListBuilder gridListItems={compatibleConnectors} comboBoxItems={comboBoxItems}>
            <ListBuilderList<IO.ConnectorDtoSimple>>
                {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<IO.ConnectorDtoSimple>>
                    {item =>
                        <ListBuilderComboBoxItem>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}

export function transformIOConnectorsTableToDbo(rows: ListData<{ id: number } & RecursiveNullable<Fan.PackConnectorDbo>>) {
    return rows.items.map(({id, ...props}) => ({...props}))
}

export function transformIOConnectorsDtoToDbo(rows: Fan.PackConnectorDto[] | null, rowIdRef: React.MutableRefObject<number>): ({id: number} & Fan.PackConnectorDbo)[] | undefined {
    return rows ? rows.map(({connector, connectorCount}) => ({ id: ++rowIdRef.current, connectorID: connector.id, connectorCount})) : undefined;
}

export function IOConnectorsTableBuilder({ rows, rowIdRef, connectors } : { rows: ListData<{ id: number } & RecursiveNullable<Fan.PackConnectorDbo>>, connectors?: IO.ConnectorDtoSimple[], rowIdRef: React.MutableRefObject<number> }) {

    return (
        <>
            <Row justify="end">
                <Button variant="primary" onPress={() => rows.prepend({ id: rowIdRef.current++, connectorID: null, connectorCount: null, })}>
                    <Plus weight="bold"/>Add connector
                </Button>
            </Row>
            <TableBuilder items={rows.items} emptyState="Add a connector to get started">
                {item =>
                    <TableBuilderRow id={item.id}>
                        <ComboBox
                            placeholder="Select a connector"
                            defaultItems={connectors}
                            grow isRequired
                            selectedKey={item.connectorID}
                            onSelectionChange={(connectorID) => rows.update(item.id, { id: item.id, connectorCount: item.connectorCount, connectorID: connectorID})}>
                            {connector =>
                                <ComboBoxItem id={connector.id}>
                                    {connector.name}
                                </ComboBoxItem>
                            }
                        </ComboBox>
                        <X weight="bold" />
                        <NumberField placeholder="..." grow isRequired value={item.connectorCount} onChange={(value) => rows.update(item.id, {...item, connectorCount: value})} />
                        <TableBuilderDeleteButton onPress={() => rows.remove(item.id)}/>
                    </TableBuilderRow>
                }
            </TableBuilder>
        </>
    )
}