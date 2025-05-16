<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AmrConfig extends Model
{
    use HasFactory;

    public $table = "amr_config";
    protected $fillable = ["password", "name_seri"];
}
