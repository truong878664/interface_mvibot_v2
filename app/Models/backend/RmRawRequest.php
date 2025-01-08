<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RmRawRequest extends Model
{
    use HasFactory;
    protected $fillable = ["line", "product_name", "note", "pcs", "quality", "trip_id"];
    public function logs(): HasMany
    {
        return $this->hasMany(RmTripLog::class, "raw_request_id");
    }
}