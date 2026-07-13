import { EmptyState } from '@/components/patterns/empty-state';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SearchResult } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { FileText, Search } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Search', href: '/search' }];

export default function WikiSearch({ query, results }: { query: string; results: SearchResult[] }) {
    const [value, setValue] = useState(query);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        router.get('/search', { q: value }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={query ? `Search — ${query}` : 'Search'} />

            <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-4 p-4">
                <form onSubmit={submit} className="relative">
                    <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Search pages…"
                        className="h-11 pl-10 text-base"
                        autoFocus
                    />
                </form>

                {query === '' ? (
                    <p className="text-sm text-muted-foreground">Search across every page's title and content.</p>
                ) : results.length === 0 ? (
                    <EmptyState title="No results" description={`Nothing matches "${query}".`} />
                ) : (
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">
                            {results.length} result{results.length === 1 ? '' : 's'} for "{query}"
                        </p>
                        <ul className="divide-y divide-border rounded-xl border border-border">
                            {results.map((result) => (
                                <li key={result.id}>
                                    <Link href={`/pages/${result.id}`} className="block px-4 py-3 hover:bg-muted/40">
                                        <div className="flex items-center gap-1.5 font-medium">
                                            <FileText className="size-3.5 shrink-0 text-muted-foreground" />
                                            {result.title}
                                            {result.space && <span className="text-xs font-normal text-muted-foreground">— {result.space.name}</span>}
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">{result.snippet}</p>
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
