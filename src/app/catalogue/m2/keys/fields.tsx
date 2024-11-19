'use client'

import {ListBox, ListBoxItem} from '@/components/ui/list-box';
import {Select} from '@/components/ui/select/select';
import SelectItem from '@/components/ui/select-item';
import {Button} from '@/components/ui/button';
import {TrashSimple} from '@phosphor-icons/react';

export function M2KeysListBuilder() {
    return (
        <>
            <ComboBox>
                <SelectItem>hello</SelectItem>
                <SelectItem>2</SelectItem>
                <SelectItem>goodbye</SelectItem>
            </ComboBox>
        <ListBox grow selectionBehavior='replace' selectionMode='single'>
            <ListBoxItem>hello<Button><TrashSimple /></Button></ListBoxItem>
            <ListBoxItem>hello</ListBoxItem>
            <ListBoxItem>hello</ListBoxItem>
            <ListBoxItem>hello</ListBoxItem>
            <ListBoxItem>hello</ListBoxItem>
            <ListBoxItem>hello</ListBoxItem>
            <ListBoxItem>hello</ListBoxItem>
            <ListBoxItem>hello</ListBoxItem>
        </ListBox>
        </>
    )
}

function ComboBox(props) {
    // Setup filter function and state.
    let { contains } = useFilter({ sensitivity: 'base' });
    let state = useComboBoxState({ ...props, defaultFilter: contains });

    // Setup refs and get props for child elements.
    let buttonRef = React.useRef(null);
    let inputRef = React.useRef(null);
    let listBoxRef = React.useRef(null);
    let popoverRef = React.useRef(null);

    let { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
        {
            ...props,
            inputRef,
            buttonRef,
            listBoxRef,
            popoverRef
        },
        state
    );

    return (
        <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
            <label {...labelProps}>{props.label}</label>
            <div>
                <input
                    {...inputProps}
                    ref={inputRef}
                    style={{
                        height: 24,
                        boxSizing: 'border-box',
                        marginRight: 0,
                        fontSize: 16
                    }}
                />
                <Button
                    {...buttonProps}
                    buttonRef={buttonRef}
                    style={{
                        height: 24,
                        marginLeft: 0
                    }}
                >
          <span
              aria-hidden="true"
              style={{ padding: '0 2px' }}
          >
            ▼
          </span>
                </Button>
                {state.isOpen &&
                    (
                        <Popover
                            state={state}
                            triggerRef={inputRef}
                            popoverRef={popoverRef}
                            isNonModal
                            placement="bottom start"
                        >
                            <ListBox
                                {...listBoxProps}
                                listBoxRef={listBoxRef}
                                state={state}
                            />
                        </Popover>
                    )}
            </div>
        </div>
    );
}