<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $query = trim((string) $request->string('q'));

        $results = [];

        if ($query !== '') {
            $results = Page::query()
                ->with(['space:id,name', 'currentVersion:id,page_id,content'])
                ->where(function ($q) use ($query) {
                    $q->where('title', 'ILIKE', "%{$query}%")
                        ->orWhereHas('currentVersion', function ($q2) use ($query) {
                            $q2->where('content', 'ILIKE', "%{$query}%");
                        });
                })
                ->limit(30)
                ->get(['id', 'space_id', 'title', 'current_version_id'])
                ->map(function (Page $page) use ($query) {
                    return [
                        'id' => $page->id,
                        'title' => $page->title,
                        'space' => $page->space,
                        'snippet' => $this->snippet($page->currentVersion?->content ?? '', $query),
                    ];
                });
        }

        return Inertia::render('wiki/search', [
            'query' => $query,
            'results' => $results,
        ]);
    }

    private function snippet(string $content, string $query): string
    {
        $plain = trim(preg_replace('/\s+/', ' ', strip_tags($content)) ?? '');

        $position = mb_stripos($plain, $query);

        if ($position === false) {
            return Str::limit($plain, 160);
        }

        $start = max(0, $position - 60);
        $excerpt = mb_substr($plain, $start, 200);

        return ($start > 0 ? '…' : '').trim($excerpt).'…';
    }
}
