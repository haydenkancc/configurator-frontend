import Title from '../global/title';
import Tabs from '../global/tabs';

interface ComponentProps {
    children: React.ReactNode;
    title: string;
    tabs: {title: string, id: string}[]
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