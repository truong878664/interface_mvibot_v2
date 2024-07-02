<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RawMaterial extends Model
{
    use HasFactory;
    protected $table = "raw_material";
    // protected $fillable = ['id', 'created_at', 'updated_at', 'line',  'cancel', 'require', 'done', 'note'];
    // protected $fillable = array('*');
    protected $guarded = [];
    public $timestamps = true;
}
