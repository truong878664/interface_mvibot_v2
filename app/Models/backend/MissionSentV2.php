<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionSentV2 extends Model
{
    use HasFactory;

    public $table = 'mission_sents_v2';
    protected $fillable = [
        'id_mission', 'name', 'data'
    ];
    public $timestamps = true;
}
