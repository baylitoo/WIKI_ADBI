import { EmptyState } from '@/components/patterns/empty-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import { PageTree } from '@/components/wiki/page-tree';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData, type Space } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Pencil, Plus } from 'lucide-react';

export default function ShowSpace({ space }: { space: Space }) {
    const { spaces } = usePage<SharedData>().props;
    const tree = spaces.find((s) => s.id === space.id);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Spaces', href: '/spaces' },
        { title: space.name, href: `/spaces/${space.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={space.name} />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <PageHeader
                    title={space.name}
                    description={space.description ?? undefined}
                    action={
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href={`/spaces/${space.id}/edit`}>
                                    <Pencil className="size-3.5" />
                                    Edit
                                </Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href={`/spaces/${space.id}/pages/create`}>
                                    <Plus className="size-3.5" />
                                    New page
                                </Link>
                            </Button>
                        </div>
                    }
                />

                {!tree || tree.pages.length === 0 ? (
                    <EmptyState
                        title="No pages yet"
                        description="Create the first page in this space."
                        action={
                            <Button asChild size="sm" className="mt-2">
                                <Link href={`/spaces/${space.id}/pages/create`}>
                                    <Plus className="size-3.5" />
                                    New page
                                </Link>
                            </Button>
                        }
                    />
                ) : (
                    <div className="max-w-2xl rounded-xl border border-border p-2">
                        <PageTree pages={tree.pages} />
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
