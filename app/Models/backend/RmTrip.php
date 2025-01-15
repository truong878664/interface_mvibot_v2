<?php

namespace App\Models\backend;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RmTrip extends Model
{
    use HasFactory;
    protected $fillable = [
        "userId",
        "rawMaterialStatus",
        "finishedProductStatus",
        "cancelRawRequestReason",
        "isRecorded"
    ];
    protected $attributes = [
        "finishedProductStatus" => "unconfirmed",
        "rawMaterialStatus" => "requesting",
        "cancelRawRequestReason" => null,
        "isRecorded" => false
    ];

    public function rmRawRequests(): HasMany
    {
        return $this->hasMany(RmRawRequest::class, "tripId");
    }

    public function rmFinishedProducts(): HasMany
    {
        return $this->hasMany(RmFinishedProduct::class, "tripId");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "userId");
    }
    public function processingTripsWithUnRecorded()
    {
        return $this->where("isRecorded", false)->orWhere(function ($query) {
            $query
                ->where(function ($query) {
                    $query->where("finishedProductStatus", "!=", "confirmed")
                    ->where("finishedProductStatus", "!=", "wrongAndConfirmed");
                })
                ->orWhere(function ($query) {
                    $query->where("rawMaterialStatus", "!=", "done")
                    ->where("rawMaterialStatus", "!=", "cancel");
                });
        });
    }

    public function processingTrips()
    {

        return $this->where(function ($query) {
            $query
                ->where(function ($query) {
                $query->where("finishedProductStatus", "!=", "confirmed")
                    ->where("finishedProductStatus", "!=", "wrongAndConfirmed");
                })
                ->orWhere(function ($query) {
                $query->where("rawMaterialStatus", "!=", "done")
                    ->where("rawMaterialStatus", "!=", "cancel");
                });
        });
    }
    public function historicalTrips()
    {

        return $this->where(function ($query) {
            $query
                ->where(function ($query) {
                $query->where("rawMaterialStatus", "=", "done")
                    ->orWhere("rawMaterialStatus", "=", "cancel");
                })
                ->where(function ($query) {
                $query->where("finishedProductStatus", "=", "confirmed")
                    ->orWhere("finishedProductStatus", "=", "wrongAndConfirmed");
                });
        });
    }
    public function logs(): HasMany
    {
        return $this->hasMany(RmTripLog::class, "tripId");
    }
}