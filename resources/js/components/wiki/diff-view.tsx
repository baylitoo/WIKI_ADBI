import { cn } from '@/lib/utils';
import { diffWords } from 'diff';
import { useMemo } from 'react';

export function DiffView({ from, to }: { from: string; to: string }) {
    const parts = useMemo(() => diffWords(from, to), [from, to]);

    if (from === to) {
        return <p className="text-sm text-muted-foreground">No content changes between these versions.</p>;
    }

    return (
        <div className="rounded-md border border-border bg-card p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap">
            {parts.map((part, index) => (
                <span
                    key={index}
                    className={cn(
                        part.added && 'rounded-sm bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
                        part.removed && 'rounded-sm bg-rose-500/15 text-rose-700 line-through dark:text-rose-400',
                    )}
                >
                    {part.value}
                </span>
            ))}
        </div>
    );
}
