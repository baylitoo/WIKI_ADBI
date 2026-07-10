<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Http\Requests\Wiki\StorePageRequest;
use App\Http\Requests\Wiki\UpdatePageRequest;
use App\Models\Page;
use App\Models\PageVersion;
use App\Models\Space;
use App\Support\Slug;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function create(Request $request, Space $space): Response
    {
        $parent = null;

        if ($request->filled('parent_id')) {
            $parent = $space->pages()->findOrFail($request->integer('parent_id'));
        }

        return Inertia::render('wiki/pages/create', [
            'space' => $space,
            'parent' => $parent,
        ]);
    }

    public function store(StorePageRequest $request, Space $space): RedirectResponse
    {
        $data = $request->validated();

        $page = DB::transaction(function () use ($data, $space, $request) {
            $page = Page::create([
                'space_id' => $space->id,
                'parent_id' => $data['parent_id'] ?? null,
                'title' => $data['title'],
                'slug' => Slug::unique($data['title'], $space->pages()),
                'created_by' => $request->user()->id,
            ]);

            $version = PageVersion::create([
                'page_id' => $page->id,
                'title' => $data['title'],
                'content' => $data['content'] ?? '',
                'author_id' => $request->user()->id,
            ]);

            $page->update(['current_version_id' => $version->id]);

            return $page;
        });

        return to_route('pages.show', $page);
    }

    public function show(Page $page): Response
    {
        $page->load(['space', 'currentVersion', 'children', 'creator']);

        return Inertia::render('wiki/pages/show', [
            'page' => $page,
            'breadcrumbs' => $this->breadcrumbs($page),
        ]);
    }

    public function edit(Page $page): Response
    {
        $page->load('currentVersion');

        return Inertia::render('wiki/pages/edit', [
            'page' => $page,
        ]);
    }

    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $page, $request) {
            $version = PageVersion::create([
                'page_id' => $page->id,
                'title' => $data['title'],
                'content' => $data['content'] ?? '',
                'author_id' => $request->user()->id,
            ]);

            $page->update([
                'title' => $data['title'],
                'current_version_id' => $version->id,
            ]);
        });

        return to_route('pages.show', $page);
    }

    public function destroy(Page $page): RedirectResponse
    {
        $space = $page->space;

        $this->deleteWithDescendants($page);

        return to_route('spaces.show', $space);
    }

    private function deleteWithDescendants(Page $page): void
    {
        foreach ($page->children()->get() as $child) {
            $this->deleteWithDescendants($child);
        }

        $page->delete();
    }

    /**
     * @return array<int, array{id: int, title: string}>
     */
    private function breadcrumbs(Page $page): array
    {
        $chain = [];
        $current = $page->parent;

        while ($current) {
            $chain[] = ['id' => $current->id, 'title' => $current->title];
            $current = $current->parent;
        }

        return array_reverse($chain);
    }
}
