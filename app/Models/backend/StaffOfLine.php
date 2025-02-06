<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffOfLine extends Model
{
    public $table = "staff_of_line";
    protected $fillable = ["msnv", "name", "userId"];
    use HasFactory;

    protected $casts =  [
        'userId' => 'int'
    ];
}