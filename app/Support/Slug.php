<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Support\Str;

class Slug
{
    /**
     * Generate a unique slug from a title against the given query scope.
     */
    public static function unique(string $title, Builder|Relation $scope, string $column = 'slug', ?int $ignoreId = null): string
    {
        $base = Str::slug($title) ?: 'untitled';
        $slug = $base;
        $suffix = 2;

        while (
            (clone $scope)
                ->where($column, $slug)
                ->when($ignoreId, fn (Builder|Relation $q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = "{$base}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
