<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequireProduce extends Model
{
    use HasFactory;
    protected $table = "require_produce";
    protected $guarded = [];
    public $timestamps = true;
}
