import {BaseLayout} from '@/components/catalogue/views/global-view';

export default function Layout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <BaseLayout title="General Specifications"
                    tabs={[{title: "Manufacturers", id: "manufacturers"}, {title: "Colours", id: "colours"}]}>
            {children}
        </BaseLayout>

    )
}