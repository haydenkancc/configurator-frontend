import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Processor"
                    tabs={[{title: "Units", id: "units"}, {title: "Core Families", id: "core-families"}, {title: "Microarchitectures", id: "microarchitectures"}, {title: "Sockets", id: "sockets"}, {title: "Series", id: "series"}]}>
            {children}
        </BaseLayout>

    )
}