import { PageTree } from '@/components/wiki/page-tree';
import { SidebarGroup, SidebarGroupAction, SidebarGroupLabel } from '@/components/ui/sidebar';
import { type SpaceWithTree } from '@/types';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export function NavSpaces({ spaces }: { spaces: SpaceWithTree[] }) {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel className="uppercase tracking-wide">Spaces</SidebarGroupLabel>
            <SidebarGroupAction asChild title="New space">
                <Link href="/spaces/create">
                    <Plus />
                </Link>
            </SidebarGroupAction>

            {spaces.length === 0 && <p className="px-2 py-1 text-xs text-sidebar-foreground/60">No spaces yet</p>}

            <div className="space-y-3">
                {spaces.map((space) => (
                    <div key={space.id}>
                        <Link
                            href={`/spaces/${space.id}`}
                            className="block truncate px-2 py-1 text-xs font-semibold text-sidebar-foreground/80 hover:text-sidebar-accent-foreground"
                        >
                            {space.name}
                        </Link>
                        <PageTree pages={space.pages} />
                    </div>
                ))}
            </div>
        </SidebarGroup>
    );
}
