<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Start extends Model
{
    use HasFactory;
    protected $table = "start";
    protected $fillable = [
        "name_seri",
        "position_with_toollift",
        "position_no_toollift",
        "mission_go_to_toollift",
        "missions_send_robot",
        "created_at",
        "updated_at",
    ];
    public $timestamps = false;
}
