import s from './layout.module.scss';
import Breadcrumbs from './_components/breadcrumbs';
import Title from './_components/title';
import Tabs from './_components/tabs';
import Navigation from './_components/navigation';

interface LayoutProps {
    children: React.ReactNode;
}

export default function Template({children} : LayoutProps) {
    return (
        <div className={s.layout}>
            <div className={s.navigation}>
                <Navigation></Navigation>
            </div>
            <div className={s.content}>
                <Breadcrumbs />
                {children}
            </div>
        </div>
    )
}