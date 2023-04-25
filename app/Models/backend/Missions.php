<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Missions extends Model
{
    use HasFactory;
    public $table = 'missions';
    protected $fillable = ['name', 'steps_mission', 'steps_mission_name', 'mission_shorthand','type', 'wake_up', 'stop'];
    public $timestamps = false;
}