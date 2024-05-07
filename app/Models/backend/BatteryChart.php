<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BatteryChart extends Model
{
    use HasFactory;
    protected $table = "battery_status_chart";
    public $timestamps = true;
    protected $fillable = [
        "name_seri", "created_at", "soc"
    ];
}
