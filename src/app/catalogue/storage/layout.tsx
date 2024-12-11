import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Storage" tabs={[{id: "case-drives"}, {id: "m.2-drives"}, {id: "form-factors"}]}>
            {children}
        </BaseLayout>

    )
}