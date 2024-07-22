<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequireRaw extends Model
{
    use HasFactory;
    protected $table = "require_raw";
    protected $guarded = [];
    public $timestamps = true;
}
