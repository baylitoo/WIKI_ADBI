<?php

use App\Http\Controllers\Wiki\PageController;
use App\Http\Controllers\Wiki\PageVersionController;
use App\Http\Controllers\Wiki\SearchController;
use App\Http\Controllers\Wiki\SpaceController;
use App\Http\Controllers\Wiki\TrashController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::resource('spaces', SpaceController::class);

    Route::get('spaces/{space}/pages/create', [PageController::class, 'create'])->name('pages.create');
    Route::post('spaces/{space}/pages', [PageController::class, 'store'])->name('pages.store');

    Route::get('pages/{page}', [PageController::class, 'show'])->name('pages.show');
    Route::get('pages/{page}/edit', [PageController::class, 'edit'])->name('pages.edit');
    Route::put('pages/{page}', [PageController::class, 'update'])->name('pages.update');
    Route::delete('pages/{page}', [PageController::class, 'destroy'])->name('pages.destroy');

    Route::get('pages/{page}/history', [PageVersionController::class, 'index'])->name('pages.history');
    Route::get('pages/{page}/compare', [PageVersionController::class, 'compare'])->name('pages.compare');

    Route::get('search', SearchController::class)->name('search');

    Route::get('trash', [TrashController::class, 'index'])->name('trash.index');
    Route::post('trash/{page}/restore', [TrashController::class, 'restore'])->name('trash.restore');
    Route::delete('trash/{page}', [TrashController::class, 'forceDestroy'])->name('trash.forceDestroy');
});
