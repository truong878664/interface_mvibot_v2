<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequireRaw extends Model
{
    use HasFactory;
    protected $table = "require_raw";
    // protected $guarded = [];
    protected $fillable = ["line", "produceName", "pcs", "note", "quality", "requireID"];
    protected $guarded = ['created_at', 'updated_at'];
}