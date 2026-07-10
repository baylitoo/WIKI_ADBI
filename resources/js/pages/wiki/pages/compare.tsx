import { DiffView } from '@/components/wiki/diff-view';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Page, type PageVersion } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function ComparePage({
    page,
    from,
    to,
}: {
    page: Pick<Page, 'id' | 'title' | 'space_id'>;
    from: PageVersion;
    to: PageVersion;
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Spaces', href: '/spaces' },
        { title: page.title, href: `/pages/${page.id}` },
        { title: 'History', href: `/pages/${page.id}/history` },
        { title: 'Compare', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Compare — ${page.title}`} />

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4">
                <h1 className="text-xl font-semibold tracking-tight">Comparing versions</h1>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                        <span className="font-medium text-foreground">{from.author?.name ?? 'Unknown'}</span> ·{' '}
                        {new Date(from.created_at).toLocaleString()}
                    </span>
                    <span>→</span>
                    <span>
                        <span className="font-medium text-foreground">{to.author?.name ?? 'Unknown'}</span> ·{' '}
                        {new Date(to.created_at).toLocaleString()}
                    </span>
                </div>

                <DiffView from={from.content} to={to.content} />

                <Link href={`/pages/${page.id}/history`} className="text-sm text-muted-foreground hover:text-foreground">
                    Back to history
                </Link>
            </div>
        </AppLayout>
    );
}
