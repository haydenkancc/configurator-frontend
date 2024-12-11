import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Motherboards" tabs={[{id: "units"}, {id: "chipsets"}, {id: "form-factors"}]}>
            {children}
        </BaseLayout>

    )
}