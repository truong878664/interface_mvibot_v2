<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeMission extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'type', 'data'
    ];
    public $timestamps = false;
}