import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="Fan"
                    tabs={[{title: "Packs", id: "packs"}, {title: "Sizes", id: "sizes"}]}>
            {children}
        </BaseLayout>

    )
}