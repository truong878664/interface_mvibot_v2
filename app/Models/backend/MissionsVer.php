<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionsVer extends Model
{
    use HasFactory;
    public $table = 'missions_ver';
    protected $fillable = ['name','version', 'steps_mission', 'steps_mission_name', 'mission_shorthand','type', 'wake_up', 'stop'];
    // public $timestamps = false;
}
