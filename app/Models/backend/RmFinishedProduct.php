<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RmFinishedProduct extends Model
{
    use HasFactory;
    protected $fillable = ["line", "product_name", "note", "pcs", "quality", "trip_id"];
}