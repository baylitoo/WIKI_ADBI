import { EmptyState } from '@/components/patterns/empty-state';
import { PageHeader } from '@/components/patterns/page-header';
import { ResultLine } from '@/components/patterns/result-line';
import { Toolbar } from '@/components/patterns/toolbar';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Spaces', href: '/spaces' }];

export default function SpacesIndex() {
    const { spaces } = usePage<SharedData>().props;
    const [search, setSearch] = useState('');

    const filtered = useMemo(
        () => spaces.filter((space) => space.name.toLowerCase().includes(search.toLowerCase())),
        [spaces, search],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Spaces" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <PageHeader
                    title="Spaces"
                    description="Group related pages together."
                    action={
                        <Button asChild>
                            <Link href="/spaces/create">
                                <Plus />
                                New space
                            </Link>
                        </Button>
                    }
                />

                <Toolbar search={search} onSearchChange={setSearch} placeholder="Filter spaces…" />
                <ResultLine shown={filtered.length} total={spaces.length} />

                {filtered.length === 0 ? (
                    <EmptyState
                        title="No spaces found"
                        description={spaces.length === 0 ? 'Create your first space to start writing pages.' : 'Try a different filter.'}
                        action={
                            spaces.length === 0 && (
                                <Button asChild size="sm" className="mt-2">
                                    <Link href="/spaces/create">
                                        <Plus />
                                        New space
                                    </Link>
                                </Button>
                            )
                        }
                    />
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                                    <th className="px-4 py-2.5 font-medium">Name</th>
                                    <th className="px-4 py-2.5 font-medium">Description</th>
                                    <th className="px-4 py-2.5 font-medium">Pages</th>
                                    <th className="px-4 py-2.5 font-medium">Updated</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((space) => (
                                    <tr key={space.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                                        <td className="px-4 py-2.5 font-medium">
                                            <Link href={`/spaces/${space.id}`} className="hover:text-primary">
                                                {space.name}
                                            </Link>
                                        </td>
                                        <td className="max-w-xs truncate px-4 py-2.5 text-muted-foreground">{space.description ?? '—'}</td>
                                        <td className="px-4 py-2.5 font-mono tabular-nums text-muted-foreground">{space.pages.length}</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">{new Date(space.updated_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
