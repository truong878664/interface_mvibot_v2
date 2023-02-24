<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusRobot extends Model
{
    use HasFactory;
    protected $table = "robot_status";
    protected $fillable = ['name_seri','status','mode','mode_status','ip_node','ip_master','type_connect'];
    public $timestamps = false;
}

