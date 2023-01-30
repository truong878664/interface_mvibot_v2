<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionFootprint extends Model
{
    use HasFactory;
    protected $fillable = ['name_footprint','x1', 'y1', 'x2', 'y2'];
    public $timestamps = false;
}