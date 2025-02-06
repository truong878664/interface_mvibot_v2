<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RmFinishedProduct extends Model
{
    use HasFactory;
    protected $fillable = ["msnv", "productCode", "comment", "quantityOdd", "quantity", "tripId", "workShift"];
    public function logs(): HasMany
    {
        return $this->hasMany(RmTripLog::class, "finishedProductId");
    }
}