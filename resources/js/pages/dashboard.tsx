import { EmptyState } from '@/components/patterns/empty-state';
import { PageHeader } from '@/components/patterns/page-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type RecentPage } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { FileText, Library, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: '/dashboard' }];

export default function Dashboard({ recentPages, stats }: { recentPages: RecentPage[]; stats: { spaces: number; pages: number } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-1 flex-col gap-4 p-4">
                <PageHeader
                    title="Dashboard"
                    description="Where the team's knowledge lives."
                    action={
                        <Button asChild>
                            <Link href="/spaces/create">
                                <Plus />
                                New space
                            </Link>
                        </Button>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-5">
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Spaces</p>
                        <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">{stats.spaces}</p>
                    </div>
                    <div className="rounded-xl border border-border bg-card p-5">
                        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Pages</p>
                        <p className="mt-1 font-mono text-2xl font-semibold tabular-nums">{stats.pages}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Recently updated</p>

                    {recentPages.length === 0 ? (
                        <EmptyState
                            title="No pages yet"
                            description="Create a space, then start writing."
                            action={
                                <Button asChild size="sm" className="mt-2">
                                    <Link href="/spaces">
                                        <Library className="size-3.5" />
                                        Go to spaces
                                    </Link>
                                </Button>
                            }
                        />
                    ) : (
                        <div className="overflow-x-auto rounded-xl border border-border">
                            <table className="w-full text-sm">
                                <tbody>
                                    {recentPages.map((page) => (
                                        <tr key={page.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                                            <td className="px-4 py-2.5">
                                                <Link href={`/pages/${page.id}`} className="flex items-center gap-2 font-medium hover:text-primary">
                                                    <FileText className="size-3.5 shrink-0 text-muted-foreground" />
                                                    {page.title}
                                                </Link>
                                            </td>
                                            <td className="px-4 py-2.5 text-muted-foreground">{page.space?.name}</td>
                                            <td className="px-4 py-2.5 text-right text-muted-foreground">
                                                {new Date(page.updated_at).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
