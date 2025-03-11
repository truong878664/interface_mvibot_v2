<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RmFinishedProduct extends Model
{
    use HasFactory;
    protected $fillable = ["msnv", "productCode", "productName", "comment", "quantityOdd", "quantity", "tripId", "workShift"];
    public function logs(): HasMany
    {
        return $this->hasMany(RmTripLog::class, "finishedProductId");
    }

    public function rm_trip(): HasOne
    {
        return $this->hasOne(RmTrip::class, "id", "tripId");
    }
}