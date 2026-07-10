<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\PageVersion;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PageVersionController extends Controller
{
    public function index(Page $page): Response
    {
        $versions = $page->versions()
            ->with('author:id,name')
            ->get(['id', 'page_id', 'title', 'author_id', 'created_at']);

        return Inertia::render('wiki/pages/history', [
            'page' => $page->only(['id', 'title', 'space_id', 'current_version_id']),
            'versions' => $versions,
        ]);
    }

    public function compare(Request $request, Page $page): Response
    {
        $validated = $request->validate([
            'from' => ['required', 'integer', 'exists:page_versions,id'],
            'to' => ['required', 'integer', 'exists:page_versions,id'],
        ]);

        $from = PageVersion::where('page_id', $page->id)->findOrFail($validated['from']);
        $to = PageVersion::where('page_id', $page->id)->findOrFail($validated['to']);

        return Inertia::render('wiki/pages/compare', [
            'page' => $page->only(['id', 'title', 'space_id']),
            'from' => $from->load('author:id,name'),
            'to' => $to->load('author:id,name'),
        ]);
    }
}
