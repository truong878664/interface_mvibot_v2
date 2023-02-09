<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionVariable extends Model
{
    use HasFactory;
    protected $fillable = ['name_function_variable', 'time_out', 'mode', 'command_action', 'name_variable', 'focus_value'];
    public $timestamps = false;

}
