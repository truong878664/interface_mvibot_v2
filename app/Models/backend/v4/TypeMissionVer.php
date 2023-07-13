<?php

namespace App\Models\backend\v4;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeMissionVer extends Model
{
    use HasFactory;
    protected $table = "type_mission_ver";
    protected $fillable = [
        'name', 'type', 'data', "type_mission"
    ];
}
