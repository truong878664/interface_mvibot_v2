<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mi extends Model
{
    use HasFactory;
    public $table = 'mis';
    protected $fillable = ['name_mission', 'steps_mission', 'steps_mission_name'];
}