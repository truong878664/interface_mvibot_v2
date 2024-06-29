<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reset extends Model
{
    use HasFactory;
    protected $table = "reset";
    protected $fillable = [
        "name_seri",
        "position_no_toollift",
        "mission_go_to_toollift",
        "missions_send_robot",
        "created_at",
        "updated_at",
    ];
    public $timestamps = true;
}
