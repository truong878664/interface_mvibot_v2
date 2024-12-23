<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionBlock extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'prev',
        'parent',
        'next',
        'isAsync',
        'rootId',
        'opcode',
        'fields',
        'title',
        'setting',
        'topLever',
        'missionId'
    ];
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts =  [
        'setting' => 'array',
        'fields' => 'array'
    ];
}
