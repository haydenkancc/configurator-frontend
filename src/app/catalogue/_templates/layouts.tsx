import Title from '../_components/title';
import Tabs from '../_components/tabs';

interface ComponentProps {
    children: React.ReactNode;
    title: string;
    tabs: {id: string}[]
}

export function BaseLayout({children, title, tabs} : ComponentProps) {
    return (
        <>
            <Title title={title} />
            <Tabs items={tabs} />
            {children}
        </>
    )
}