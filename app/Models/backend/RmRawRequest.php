<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class RmRawRequest extends Model
{
    use HasFactory;
    protected $fillable = ["msnv", "productCode", "productName", "comment", "quantityOdd", "quantity", "tripId", "workShift"];
    public function logs(): HasMany
    {
        return $this->hasMany(RmTripLog::class, "rawRequestId");
    }
    public function rm_trip(): HasOne
    {
        return $this->hasOne(RmTrip::class, "id", "tripId");
    }
}