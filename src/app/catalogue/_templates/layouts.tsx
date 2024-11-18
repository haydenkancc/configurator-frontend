import Title from '../_components/title';
import Tabs from '../_components/tabs';

interface ComponentProps {
    children: React.ReactNode;
    title: string;
}

export function BaseLayout({children, title} : ComponentProps) {
    return (
        <>
            <Title title={title} />
            <Tabs/>
            {children}
        </>
    )
}