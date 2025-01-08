<?php

namespace App\Models\backend;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RmTripLog extends Model
{
    use HasFactory;
    protected $fillable = [
        "trip_id",
        "finished_product_id",
        "raw_request_id",
        "trip_id",
        "user_id",
        "key_change",
        "action",
        "from",
        "to",
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id");
    }
}