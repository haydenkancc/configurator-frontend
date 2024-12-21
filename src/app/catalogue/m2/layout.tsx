import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="M.2 Specification"
                    tabs={[{title: "Slots", id: "slots"}, {title: "Keys", id: "keys"}, {title: "Form Factors", id: "form-factors"}]}>
            {children}
        </BaseLayout>

    )
}