<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionSent extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_seri', 'mission_sent', 'created_at', 'updated_at'
    ];
}
