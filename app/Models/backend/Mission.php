<?php

namespace App\Models\backend;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Mission extends Model
{
    use HasFactory;
    protected $table = "missions";
    protected $fillable = ["name", "type", "groupId"];
    public function group(): BelongsTo
    {
        return $this->belongsTo(MissionGroup::class, "groupId");
    }
}