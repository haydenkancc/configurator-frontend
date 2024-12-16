import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Storage" tabs={[{id: "units"}, {id: "NAND-types"}, {id: "form-factors"}, {id: "interfaces"}]}>
            {children}
        </BaseLayout>

    )
}