<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionsVer;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MissionsVerController extends Controller
{
    public function createMissions(Request $request)
    {
        $name = $request->name;
        $type = $request->type;
        $created_at = Carbon::now();

        $data = [
            "name" => $name,
            "created_at" => $created_at,
            "type" => $type
        ];
        MissionsVer::insert($data);
        return back();
    }
}
