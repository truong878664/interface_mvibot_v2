<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionConfig extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'footprint_padding',
        'max_vel_x',
        'min_vel_x',
        'acc_lim_x',
        'max_vel_theta',
        'acc_lim_theta',
        'inflation_radius',
    ];
    public $timestamps = false;
}
