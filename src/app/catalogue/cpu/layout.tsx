import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Processor" tabs={[{id: "units"}, {id: "sockets"}, {id: "series"}, {id: "channels"}]}>
            {children}
        </BaseLayout>

    )
}