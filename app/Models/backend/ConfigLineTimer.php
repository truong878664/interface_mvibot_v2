<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConfigLineTimer extends Model
{
    use HasFactory;
    protected $table = 'config_line_gpio';
    protected $guarded = [];
    public $timestamps = true;
}
