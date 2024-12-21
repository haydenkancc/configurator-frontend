import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Storage"
                    tabs={[{title: "Units", id: "kits"}, {title: "NAND Types", id: "nand-types"}, {title: "Form Factors", id: "form-factors"}, {title: "Interfaces", id: "interfaces"}]}>
            {children}
        </BaseLayout>

    )
}