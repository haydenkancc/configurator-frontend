import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="PCIe Specification"
                    tabs={[{id: "slots"}, {id: "sizes"}, {id: "versions"}, {id: "brackets"}]}>
            {children}
        </BaseLayout>

    )
}