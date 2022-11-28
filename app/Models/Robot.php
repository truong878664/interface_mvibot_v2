<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Robot extends Model
{
    use HasFactory;
    protected $table = 'my_robot';
    protected $fillable = [
        'name_seri',
    ];
    public $timestamps = false;
}