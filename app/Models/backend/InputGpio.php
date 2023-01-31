<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InputGpio extends Model
{
    use HasFactory;
    protected $table = "input_user_status";
    public $timestamps = false;
}
