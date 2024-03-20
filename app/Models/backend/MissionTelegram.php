<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionTelegram extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'time_out', 'mode', 'token', 'chat_id', 'msg'];
    public $timestamps = true;
}
