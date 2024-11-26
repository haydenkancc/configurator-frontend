import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="General" tabs={[{id: "manufacturers"}]}>
            {children}
        </BaseLayout>

    )
}