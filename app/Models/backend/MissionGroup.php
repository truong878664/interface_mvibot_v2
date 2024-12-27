<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MissionGroup extends Model
{
    use HasFactory;
    protected $table = "mission_groups";
    protected $fillable = ["name", "type"];

    public function missions(): HasMany
    {
        return $this->hasMany(Mission::class, "groupId");
    }
}