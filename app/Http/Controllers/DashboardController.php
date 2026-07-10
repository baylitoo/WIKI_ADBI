<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Space;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $recentPages = Page::query()
            ->with('space:id,name')
            ->latest('updated_at')
            ->limit(8)
            ->get(['id', 'space_id', 'title', 'updated_at']);

        return Inertia::render('dashboard', [
            'recentPages' => $recentPages,
            'stats' => [
                'spaces' => Space::count(),
                'pages' => Page::count(),
            ],
        ]);
    }
}
