<?php

namespace App\Http\Controllers\Wiki;

use App\Http\Controllers\Controller;
use App\Http\Requests\Wiki\StoreSpaceRequest;
use App\Http\Requests\Wiki\UpdateSpaceRequest;
use App\Models\Space;
use App\Support\Slug;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SpaceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('wiki/spaces/index');
    }

    public function create(): Response
    {
        return Inertia::render('wiki/spaces/create');
    }

    public function store(StoreSpaceRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $space = Space::create([
            ...$data,
            'slug' => Slug::unique($data['name'], Space::query()),
            'created_by' => $request->user()->id,
        ]);

        return to_route('spaces.show', $space);
    }

    public function show(Space $space): Response
    {
        $space->load(['rootPages']);

        return Inertia::render('wiki/spaces/show', [
            'space' => $space,
        ]);
    }

    public function edit(Space $space): Response
    {
        return Inertia::render('wiki/spaces/edit', [
            'space' => $space,
        ]);
    }

    public function update(UpdateSpaceRequest $request, Space $space): RedirectResponse
    {
        $space->update($request->validated());

        return to_route('spaces.show', $space);
    }

    public function destroy(Space $space): RedirectResponse
    {
        $space->delete();

        return to_route('spaces.index');
    }
}
