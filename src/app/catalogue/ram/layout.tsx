import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Memory"
                    tabs={[{title: "Kits", id: "kits"}, {title: "Types", id: "types"}, {title: "Form Factors", id: "form-factors"}]}>
            {children}
        </BaseLayout>

    )
}