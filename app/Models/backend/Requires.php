<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Requires extends Model
{
    use HasFactory;
    protected $table = "require";
    protected $guarded = [];
    public $timestamps = true;
}
