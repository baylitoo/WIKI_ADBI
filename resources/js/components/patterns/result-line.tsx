export function ResultLine({ shown, total }: { shown: number; total: number }) {
    return (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
                Showing {shown} of {total}
            </span>
        </div>
    );
}
