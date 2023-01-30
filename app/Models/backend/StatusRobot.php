<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusRobot extends Model
{
    use HasFactory;
    protected $table = "robot_status";
    // protected $fillable = ['name_map_active'];
    public $timestamps = false;
}