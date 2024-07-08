<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModulePinMaterial extends Model
{
    use HasFactory;
    protected $table = "pin_io_material";
    protected $guarded = [];
    public $timestamps = true;

}
