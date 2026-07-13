import { EmptyState } from '@/components/patterns/empty-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type TrashedPage } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { RotateCcw, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Trash', href: '/trash' }];

export default function TrashIndex({ trashed }: { trashed: TrashedPage[] }) {
    function forceDelete(page: TrashedPage) {
        if (!confirm(`Permanently delete "${page.title}"? This cannot be undone.`)) return;
        router.delete(`/trash/${page.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Trash" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <PageHeader title="Trash" description="Deleted pages. Restore them or remove them for good." />

                {trashed.length === 0 ? (
                    <EmptyState title="Trash is empty" description="Deleted pages show up here." />
                ) : (
                    <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                                    <th className="px-4 py-2.5 font-medium">Title</th>
                                    <th className="px-4 py-2.5 font-medium">Space</th>
                                    <th className="px-4 py-2.5 font-medium">Deleted</th>
                                    <th className="px-4 py-2.5 font-medium"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {trashed.map((page) => (
                                    <tr key={page.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                                        <td className="px-4 py-2.5 font-medium">{page.title}</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">{page.space?.name ?? '—'}</td>
                                        <td className="px-4 py-2.5 text-muted-foreground">{new Date(page.deleted_at).toLocaleString()}</td>
                                        <td className="px-4 py-2.5">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/trash/${page.id}/restore`} method="post" as="button">
                                                        <RotateCcw className="size-3.5" />
                                                        Restore
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-destructive hover:text-destructive"
                                                    onClick={() => forceDelete(page)}
                                                >
                                                    <Trash2 className="size-3.5" />
                                                </Button>
                                            </div>
                                        </td>
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
