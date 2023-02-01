<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutputGpio extends Model
{
    use HasFactory;
    protected $table = "output_user_status";
    public $timestamps = false;
}
