<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ErrorSystem extends Model
{
    use HasFactory;
    protected $table = "error_system";
    public $timestamps = true;
    protected $fillable = [
        "name_seri"
    ];
}
