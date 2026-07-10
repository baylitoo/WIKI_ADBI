import { Button } from '@/components/ui/button';
import { PageEditor } from '@/components/wiki/page-editor';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Page } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, History, Pencil, Plus, Trash2 } from 'lucide-react';

export default function ShowPage({ page, breadcrumbs: ancestors }: { page: Page; breadcrumbs: { id: number; title: string }[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Spaces', href: '/spaces' },
        { title: page.space?.name ?? 'Space', href: `/spaces/${page.space_id}` },
        ...ancestors.map((a) => ({ title: a.title, href: `/pages/${a.id}` })),
        { title: page.title, href: `/pages/${page.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={page.title} />

            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 p-4">
                <div className="flex items-start justify-between gap-4">
                    <h1 className="text-2xl font-semibold tracking-tight">{page.title}</h1>
                    <div className="flex shrink-0 items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/pages/${page.id}/history`}>
                                <History className="size-3.5" />
                                History
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={`/spaces/${page.space_id}/pages/create?parent_id=${page.id}`}>
                                <Plus className="size-3.5" />
                                Subpage
                            </Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href={`/pages/${page.id}/edit`}>
                                <Pencil className="size-3.5" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            asChild
                        >
                            <Link
                                href={`/pages/${page.id}`}
                                method="delete"
                                as="button"
                                onBefore={() => confirm('Delete this page and all its subpages? This cannot be undone.')}
                            >
                                <Trash2 className="size-3.5" />
                            </Link>
                        </Button>
                    </div>
                </div>

                <PageEditor content={page.current_version?.content ?? ''} editable={false} />

                {page.children && page.children.length > 0 && (
                    <div className="space-y-2 border-t border-border pt-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subpages</p>
                        <ul className="space-y-1">
                            {page.children.map((child) => (
                                <li key={child.id}>
                                    <Link
                                        href={`/pages/${child.id}`}
                                        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm hover:bg-muted"
                                    >
                                        <FileText className="size-3.5 text-muted-foreground" />
                                        {child.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
