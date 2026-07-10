import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { type PageTreeNode } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';

function buildTree(pages: PageTreeNode[]): Map<number | null, PageTreeNode[]> {
    const byParent = new Map<number | null, PageTreeNode[]>();

    for (const page of pages) {
        const key = page.parent_id;
        const siblings = byParent.get(key) ?? [];
        siblings.push(page);
        byParent.set(key, siblings);
    }

    return byParent;
}

export function PageTree({ pages }: { pages: PageTreeNode[] }) {
    const byParent = useMemo(() => buildTree(pages), [pages]);
    const roots = byParent.get(null) ?? [];

    if (roots.length === 0) {
        return <p className="px-2 py-1 text-xs text-sidebar-foreground/60">No pages yet</p>;
    }

    return (
        <ul className="space-y-0.5">
            {roots.map((page) => (
                <PageTreeItem key={page.id} page={page} byParent={byParent} depth={0} />
            ))}
        </ul>
    );
}

function PageTreeItem({ page, byParent, depth }: { page: PageTreeNode; byParent: Map<number | null, PageTreeNode[]>; depth: number }) {
    const { url } = usePage();
    const children = byParent.get(page.id) ?? [];
    const hasChildren = children.length > 0;
    const isActive = url === `/pages/${page.id}`;
    const [open, setOpen] = useState(isActive || children.some((c) => url === `/pages/${c.id}`));

    return (
        <li>
            <Collapsible open={open} onOpenChange={setOpen}>
                <div
                    className={cn(
                        'group flex items-center rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        isActive && 'bg-sidebar-accent font-medium text-sidebar-accent-foreground',
                    )}
                    style={{ paddingLeft: `${depth * 12}px` }}
                >
                    <CollapsibleTrigger
                        className={cn('flex size-7 shrink-0 items-center justify-center', !hasChildren && 'invisible')}
                    >
                        <ChevronRight className={cn('size-3.5 transition-transform', open && 'rotate-90')} />
                    </CollapsibleTrigger>
                    <Link href={`/pages/${page.id}`} className="flex min-w-0 flex-1 items-center gap-1.5 py-1.5 pr-2">
                        <FileText className="size-3.5 shrink-0 text-sidebar-foreground/60" />
                        <span className="truncate">{page.title}</span>
                    </Link>
                </div>
                {hasChildren && (
                    <CollapsibleContent>
                        <ul className="space-y-0.5">
                            {children.map((child) => (
                                <PageTreeItem key={child.id} page={child} byParent={byParent} depth={depth + 1} />
                            ))}
                        </ul>
                    </CollapsibleContent>
                )}
            </Collapsible>
        </li>
    );
}
