<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionPosition extends Model
{
    use HasFactory;
    public $table = 'mission_positions';
    protected $fillable = ['name_position', 'time_out', 'mode', 'x', 'y', 'z', 'w', 'color_position', 'map', 'mode_position', 'mode_child'];
    public $timestamps = true;
}