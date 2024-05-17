<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionLift extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'time_out', 'mode', 'lift_control', 'lift_min', 'lift_max'];
    public $timestamps = true;
}
