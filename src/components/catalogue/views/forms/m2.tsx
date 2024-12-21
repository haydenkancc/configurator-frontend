import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderProps, ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import { M2 } from '@/server/models/catalogue';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {ListData, useListData} from 'react-stately';
import {useFilter} from '@react-aria/i18n';


export function M2KeyComboBox({...props } : ComboBoxProps<M2.KeyDtoSimple>) {
    return (
        <ComboBox isRequired placeholder="Select a key" label="Key" {...props}>
            {key => <ComboBoxItem>{key.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function M2FormFactorComboBox({...props} : ComboBoxProps<M2.FormFactorDto>) {
    return (
        <ComboBox isRequired placeholder="Select a form factor" label="Form factor" {...props}>
            {formFactor => <ComboBoxItem>{formFactor.name}</ComboBoxItem>}
        </ComboBox>
    )
}

export function M2FormFactorsListBuilder({ compatibleFormFactors, formFactors} : { compatibleFormFactors : ListData<M2.FormFactorDto>, formFactors?: M2.FormFactorDto[] }) {
    let { contains } = useFilter({ sensitivity: 'base' });

    const comboBoxItems = useListData({
        initialItems: formFactors?.filter((({ id }) => !(compatibleFormFactors.getItem(id))),),
        filter: (k, filterText) => contains(k.name, filterText)
    });

    return (
        <ListBuilder gridListItems={compatibleFormFactors} comboBoxItems={comboBoxItems}>
            <ListBuilderList<M2.FormFactorDto>>
                {item =><ListBuilderListItem>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<M2.FormFactorDto>>
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


export function M2KeysListBuilder({ compatibleKeys, keys, keyID} : { compatibleKeys : ListData<M2.KeyDtoSimple>, keys?: M2.KeyDtoSimple[], keyID?: number }) {


    let { contains } = useFilter({ sensitivity: 'base' });

    const comboBoxItems = useListData({
        initialItems: keys?.filter((({ id }) => !(compatibleKeys.getItem(id) || id === keyID)),),
        filter: (k, filterText) => contains(k.name, filterText)
    });

    return (
        <ListBuilder gridListItems={compatibleKeys} comboBoxItems={comboBoxItems}>
            <ListBuilderList<M2.KeyDtoSimple> aria-label="selected keys">
                {item =><ListBuilderListItem textValue={item.name}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<M2.KeyDtoSimple> aria-label="key selector">
                    {item =>
                        <ListBuilderComboBoxItem textValue={item.name}>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}