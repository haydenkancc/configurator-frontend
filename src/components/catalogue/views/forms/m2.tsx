import {
    ListBuilder, ListBuilderAddButton, ListBuilderComboBox, ListBuilderComboBoxItem,
    ListBuilderList,
    ListBuilderListItem,
    ListBuilderProps, ListBuilderRow,
    ListBuilderTrashButton
} from '@/components/ui/list-builder';
import {IO, M2} from '@/server/models/catalogue';
import {ComboBox, ComboBoxItem, ComboBoxProps} from '@/components/ui/combo-box';
import {ListData, useListData} from 'react-stately';
import {useFilter} from '@react-aria/i18n';
import {RecursiveMap} from '@/server/models';
import {Updater, useImmer} from 'use-immer';
import {useCallback} from 'react';


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

export function transformM2KeysDtoToMap(compatibleKeys: M2.KeyDtoSimple[] | null) {
    const map: RecursiveMap<M2.KeyDtoSimple> = new Map();
    if (compatibleKeys === null) {
        return map;
    }
    compatibleKeys.map((key) => {
        map.set(key.id, key);
    })
    return map;
}

export function transformM2KeysMapToDbo(compatibleKeys: RecursiveMap<M2.KeyDtoSimple>) {
    const arr : number[] = [];
    for (const key of compatibleKeys) {
        arr.push(key[1].id);
    }
    return arr;
}

interface M2KeysListBuilderProps {
    compatibleKeys: RecursiveMap<M2.KeyDtoSimple>;
    setCompatibleKeys: Updater<RecursiveMap<M2.KeyDtoSimple>>;
    keys: M2.KeyDtoSimple[] | undefined;
    keyID?: number;
}

export function M2KeysListBuilder({compatibleKeys, setCompatibleKeys, keys, keyID} : M2KeysListBuilderProps) {

    const [comboBoxItems, setComboBoxItems] = useImmer(() => {
        const map : Map<number, M2.KeyDtoSimple> = new Map();
        if (keys) {
            for (const connector of keys) {
                if (!(compatibleKeys.has(connector.id) || connector.id === keyID)) {
                    map.set(connector.id, connector)
                }
            }
        }
        return map;
    })

    const handleAdd = useCallback((key: number | null) => {
        if (key === null) { return; }

        const m2Key = comboBoxItems.get(key);

        if (m2Key) {
            setCompatibleKeys((draft) => {
                draft.set(key, m2Key)
            })
            setComboBoxItems((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems])

    const handleRemove = useCallback((key: number) => {
        const m2Key = compatibleKeys.get(key);

        if (m2Key) {
            setComboBoxItems((draft) => {
                draft.set(key, m2Key)
            })
            setCompatibleKeys((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems]);


    return (
        <ListBuilder gridListItems={compatibleKeys} comboBoxItems={comboBoxItems} handleAdd={handleAdd} handleRemove={handleRemove}>
            <ListBuilderList<[number, M2.KeyDtoSimple]>>
                {([key, item]) =><ListBuilderListItem id={key}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<[number, M2.KeyDtoSimple]>>
                    {([key, item]) =>
                        <ListBuilderComboBoxItem id={key}>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}

export function transformM2FormFactorsDtoToMap(compatibleFormFactors: M2.FormFactorDto[] | null) {
    const map: RecursiveMap<M2.FormFactorDto> = new Map();
    if (compatibleFormFactors === null) {
        return map;
    }
    compatibleFormFactors.map((key) => {
        map.set(key.id, key);
    })
    return map;
}

export function transformM2FormFactorsMapToDbo(compatibleFormFactors: RecursiveMap<M2.FormFactorDto>) {
    const arr : number[] = [];
    for (const key of compatibleFormFactors) {
        arr.push(key[1].id);
    }
    return arr;
}

interface M2FormFactorsListBuilderProps {
    compatibleFormFactors: RecursiveMap<M2.FormFactorDto>;
    setCompatibleFormFactors: Updater<RecursiveMap<M2.FormFactorDto>>;
    formFactors: M2.FormFactorDto[] | undefined;
}

export function M2FormFactorsListBuilder({compatibleFormFactors, setCompatibleFormFactors, formFactors} : M2FormFactorsListBuilderProps) {

    const [comboBoxItems, setComboBoxItems] = useImmer(() => {
        const map : Map<number, M2.FormFactorDto> = new Map();
        if (formFactors) {
            for (const formFactor of formFactors) {
                if (!compatibleFormFactors.has(formFactor.id)) {
                    map.set(formFactor.id, formFactor)
                }
            }
        }
        return map;
    })

    const handleAdd = useCallback((key: number | null) => {
        if (key === null) { return; }

        const formFactor = comboBoxItems.get(key);

        if (formFactor) {
            setCompatibleFormFactors((draft) => {
                draft.set(key, formFactor)
            })
            setComboBoxItems((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems])

    const handleRemove = useCallback((key: number) => {
        const formFactor = compatibleFormFactors.get(key);

        if (formFactor) {
            setComboBoxItems((draft) => {
                draft.set(key, formFactor)
            })
            setCompatibleFormFactors((draft) => {
                draft.delete(key);
            })
        }
    }, [comboBoxItems]);


    return (
        <ListBuilder gridListItems={compatibleFormFactors} comboBoxItems={comboBoxItems} handleAdd={handleAdd} handleRemove={handleRemove}>
            <ListBuilderList<[number, M2.FormFactorDto]>>
                {([key, item]) =><ListBuilderListItem id={key}>{item.name}<ListBuilderTrashButton /></ListBuilderListItem>}
            </ListBuilderList>
            <ListBuilderRow>
                <ListBuilderComboBox<[number, M2.FormFactorDto]>>
                    {([key, item]) =>
                        <ListBuilderComboBoxItem id={key}>
                            {item.name}
                        </ListBuilderComboBoxItem>
                    }
                </ListBuilderComboBox>
                <ListBuilderAddButton />
            </ListBuilderRow>
        </ListBuilder>
    )
}