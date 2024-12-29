import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Motherboard"
                    tabs={[{title: "Units", id: "units"}, {title: "Chipsets", id: "chipsets"}, {title: "Form Factors", id: "form-factors"}]}>
            {children}
        </BaseLayout>

    )
}