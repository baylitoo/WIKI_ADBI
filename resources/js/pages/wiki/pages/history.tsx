import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Page, type PageVersion } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

type VersionRow = Pick<PageVersion, 'id' | 'page_id' | 'title' | 'created_at'> & { author?: { id: number; name: string } };

export default function PageHistory({ page, versions }: { page: Pick<Page, 'id' | 'title' | 'space_id'>; versions: VersionRow[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Spaces', href: '/spaces' },
        { title: page.title, href: `/pages/${page.id}` },
        { title: 'History', href: `/pages/${page.id}/history` },
    ];

    const [selected, setSelected] = useState<number[]>([]);

    function toggle(id: number) {
        setSelected((current) => {
            if (current.includes(id)) {
                return current.filter((v) => v !== id);
            }
            if (current.length === 2) {
                return [current[1], id];
            }
            return [...current, id];
        });
    }

    function compare() {
        if (selected.length !== 2) return;
        const [from, to] = [...selected].sort((a, b) => a - b);
        router.get(route('pages.compare', page.id), { from, to });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`History — ${page.title}`} />

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold tracking-tight">Version history</h1>
                    <Button size="sm" disabled={selected.length !== 2} onClick={compare}>
                        Compare selected
                    </Button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border text-left text-xs text-muted-foreground">
                                <th className="w-10 px-4 py-2.5"></th>
                                <th className="px-4 py-2.5 font-medium">Title</th>
                                <th className="px-4 py-2.5 font-medium">Author</th>
                                <th className="px-4 py-2.5 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {versions.map((version) => (
                                <tr key={version.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                                    <td className="px-4 py-2.5">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(version.id)}
                                            onChange={() => toggle(version.id)}
                                            className="size-4 rounded-sm border-input accent-primary"
                                        />
                                    </td>
                                    <td className="px-4 py-2.5 font-medium">{version.title}</td>
                                    <td className="px-4 py-2.5 text-muted-foreground">{version.author?.name ?? '—'}</td>
                                    <td className="px-4 py-2.5 text-muted-foreground">{new Date(version.created_at).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Link href={`/pages/${page.id}`} className="text-sm text-muted-foreground hover:text-foreground">
                    Back to page
                </Link>
            </div>
        </AppLayout>
    );
}
