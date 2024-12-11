import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Processors" tabs={[{id: "units"}, {id: "sockets"}, {id: "series"}, {id: "core-families"}, {id: "microarchitectures"}, {id: "channels"}]}>
            {children}
        </BaseLayout>

    )
}