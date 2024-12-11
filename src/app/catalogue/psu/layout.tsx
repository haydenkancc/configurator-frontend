import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Power Supplies" tabs={[{id: "units"}, {id: "connectors"}, {id: "efficiency-ratings"}, {id: "form-factors"}, {id: "modularities"}]}>
            {children}
        </BaseLayout>

    )
}