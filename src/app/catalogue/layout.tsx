import s from './layout.module.scss';
import Breadcrumbs from '../../components/catalogue/global/breadcrumbs';
import Navigation from '../../components/catalogue/global/navigation';
import {ToastProvider} from '@/app/providers';

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
                <ToastProvider>
                    {children}
                </ToastProvider>
            </div>
        </div>
    )
}