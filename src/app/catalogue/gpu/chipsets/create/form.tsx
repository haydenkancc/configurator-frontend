'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {forwardRef, useState} from 'react';
import {PostFormProps} from '@/server/models'
import { GraphicsCard } from '@/server/models/catalogue';
import {
    RichTreeView,
    TreeItem2,
    TreeItem2Checkbox, TreeItem2Content,
    TreeItem2DragAndDropOverlay,
    TreeItem2GroupTransition,
    TreeItem2Icon,
    TreeItem2IconContainer,
    TreeItem2Label, TreeItem2Props,
    TreeItem2Provider,
    TreeItem2Root,
    TreeViewBaseItem,
    useTreeItem2,
    UseTreeItem2Parameters, useTreeItem2Utils
} from '@mui/x-tree-view';
import {Avatar, Box, styled} from '@mui/material';
import {Button} from '@/components/ui/button';

export function Form({action}: PostFormProps<GraphicsCard.ChipsetDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="chipset" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Chipset details" subtitle="Specify details for a new chipset.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}