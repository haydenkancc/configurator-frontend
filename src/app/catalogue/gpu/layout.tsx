import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Graphics Card"
                    tabs={[{title: "Units", id: "units"}, {title: "Chipsets", id: "chipsets"}]}>
            {children}
        </BaseLayout>

    )
}