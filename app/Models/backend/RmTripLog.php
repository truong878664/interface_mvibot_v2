<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}