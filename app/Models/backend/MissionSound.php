<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionSound extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'time_out', 'mode', 'music_mode', 'music_start'];
    public $timestamps = false;
}
