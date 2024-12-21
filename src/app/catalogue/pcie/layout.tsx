import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="PCIe Specification"
                    tabs={[{title: "Slots", id: "slots"}, {title: "Sizes", id: "sizes"}, {title: "Versions", id: "versions"}, {title: "Brackets", id: "brackets"}]}>
            {children}
        </BaseLayout>

    )
}