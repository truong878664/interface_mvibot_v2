<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LogRequire extends Model
{
    use HasFactory;
    protected $table = "log_require";
    protected $guarded = [];
    public $timestamps = true;
}
