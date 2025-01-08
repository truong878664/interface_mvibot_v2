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
        "user_id",
        "raw_material_status",
        "finished_product_status",
        "cancel_raw_request_reason"
    ];
    protected $attributes = [
        "finished_product_status" => "unconfirmed",
        "raw_material_status" => "requesting",
        "cancel_raw_request_reason" => null
    ];

    public function rm_raw_requests(): HasMany
    {
        return $this->hasMany(RmRawRequest::class, "trip_id");
    }

    public function rm_finished_products(): HasMany
    {
        return $this->hasMany(RmFinishedProduct::class, "trip_id");
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function processing_trips()
    {

        return $this->where(function ($query) {
            $query
                ->where(function ($query) {
                    $query->where("finished_product_status", "!=", "confirmed")
                        ->where("finished_product_status", "!=", "wrong_and_confirmed");
                })
                ->orWhere(function ($query) {
                    $query->where("raw_material_status", "!=", "done")
                        ->where("raw_material_status", "!=", "cancel");
                });
        });
    }
    public function historical_trips()
    {

        return $this->where(function ($query) {
            $query
                ->where(function ($query) {
                    $query->where("raw_material_status", "=", "done")
                    ->orWhere("raw_material_status", "=", "cancel");
                })
                ->where(function ($query) {
                    $query->where("finished_product_status", "=", "confirmed")
                    ->orWhere("finished_product_status", "=", "wrong_and_confirmed");
                });
        });
    }
    public function logs(): HasMany
    {
        return $this->hasMany(RmTripLog::class, "trip_id");
    }
}