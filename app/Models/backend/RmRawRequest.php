<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RmRawRequest extends Model
{
    use HasFactory;
    protected $fillable = ["workerId", "productId", "comment", "qualityOdd", "quality", "tripId", "workShift"];
    public function logs(): HasMany
    {
        return $this->hasMany(RmTripLog::class, "rawRequestId");
    }
}