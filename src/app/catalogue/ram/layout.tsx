import {BaseLayout} from '@/app/catalogue/_templates/layouts';

export default function Layout({ children } : Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Memory" tabs={[{id: "kits"}, {id: "form-factors"}, {id: "types"}, {id: "capacities"}]}>
            {children}
        </BaseLayout>

    )
}