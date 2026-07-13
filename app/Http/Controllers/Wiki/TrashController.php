<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TrashController extends Controller
{
    public function index(): Response
    {
        $trashed = Page::onlyTrashed()
            ->with('space:id,name')
            ->orderByDesc('deleted_at')
            ->get(['id', 'space_id', 'parent_id', 'title', 'deleted_at']);

        return Inertia::render('wiki/trash/index', [
            'trashed' => $trashed,
        ]);
    }

    public function restore(int $page): RedirectResponse
    {
        $trashedPage = Page::onlyTrashed()->findOrFail($page);

        $this->restoreWithDescendants($trashedPage);

        return to_route('trash.index');
    }

    public function forceDestroy(int $page): RedirectResponse
    {
        $trashedPage = Page::onlyTrashed()->findOrFail($page);

        $this->forceDeleteWithDescendants($trashedPage);

        return to_route('trash.index');
    }

    private function restoreWithDescendants(Page $page): void
    {
        $page->restore();

        foreach (Page::onlyTrashed()->where('parent_id', $page->id)->get() as $child) {
            $this->restoreWithDescendants($child);
        }
    }

    private function forceDeleteWithDescendants(Page $page): void
    {
        foreach (Page::withTrashed()->where('parent_id', $page->id)->get() as $child) {
            $this->forceDeleteWithDescendants($child);
        }

        $page->forceDelete();
    }
}
