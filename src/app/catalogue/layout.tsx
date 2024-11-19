import s from './layout.module.scss';
import Breadcrumbs from './_components/breadcrumbs';
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