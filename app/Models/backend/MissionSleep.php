<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionSleep extends Model
{
    use HasFactory;
    protected $fillable = ['name','time_out','mode','time_sleep'];
    public $timestamps = false;
}