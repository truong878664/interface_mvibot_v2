<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequireDetail extends Model
{
    use HasFactory;
    protected $table = "require_detail";
    protected $guarded = [];
    public $timestamps = true;
}
