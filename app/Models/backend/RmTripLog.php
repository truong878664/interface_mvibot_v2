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
        "tripId",
        "finishedProductId",
        "rawRequestId",
        "tripId",
        "userId",
        "keyChange",
        "action",
        "from",
        "to",
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "userId");
    }
}