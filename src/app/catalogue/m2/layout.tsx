import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="M.2 Specification" tabs={[{id: "slots"}, {id: "form-factors"}, {id: "keys"}]}>
            {children}
        </BaseLayout>

    )
}