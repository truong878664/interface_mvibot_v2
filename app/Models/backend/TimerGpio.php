<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimerGpio extends Model
{
    use HasFactory;
    protected $fillable = [
        'name_seri', 'hour', 'minute'
    ];
    protected $table = "timer_gpio";

    public $timestamps = true;
}
