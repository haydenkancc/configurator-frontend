import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="I/O Specification"
                    tabs={[{title: "Connectors", id: "connectors"}]}>
            {children}
        </BaseLayout>

    )
}