import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Power Supply"
                    tabs={[{title: "Units", id: "units"}, {title: "Connectors", id: "connectors"}, {title: "Efficiency Ratings", id: "efficiency-ratings"}, {title: "Form Factors", id: "form-factors"}, {title: "Modularities", id: "modularities"}]}>
            {children}
        </BaseLayout>

    )
}