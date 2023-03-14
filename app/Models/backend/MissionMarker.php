<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionMarker extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'time_out',
        'mode',
        'marker_type',
        'marker_dir',
        'off_set_x1',
        'off_set_x2',
        'off_set_y1',
        'off_set_y2',
        'off_set_dis',
        'off_set_angle',
        'sx1',
        'sx2',
        'sy1',
        'sy2',
    ];
    public $timestamps = false;
}