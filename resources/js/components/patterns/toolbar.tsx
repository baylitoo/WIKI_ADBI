import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

export function Toolbar({
    search,
    onSearchChange,
    placeholder = 'Filter…',
    className,
}: {
    search: string;
    onSearchChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}) {
    return (
        <div className={cn('flex items-center gap-2', className)}>
            <div className="relative max-w-xs flex-1">
                <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={placeholder}
                    className="h-9 pl-8"
                />
            </div>
            {search && (
                <Button variant="outline" size="sm" onClick={() => onSearchChange('')}>
                    <X className="size-3.5" />
                    Reset
                </Button>
            )}
        </div>
    );
}
