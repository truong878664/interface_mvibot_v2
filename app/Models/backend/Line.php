<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Line extends Model
{
    use HasFactory;
    protected $table = 'line';
    protected $keyType = 'string';
    protected $guarded = [];
    public $timestamps = true;
}
