<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\backend\Missions;
use App\Models\backend\MissionPosition;
use \Carbon\Carbon;

class CreateMissionsController extends Controller
{

    public function getMissions()
    {
        $allMissions = Missions::all();
        return $allMissions;
    }
    public function createMissions(Request $request)
    {
        $name_mission = $request->input('name_mission');
        $created_at = Carbon::now();

        $data = [
            "name_mission" => $name_mission,
            "created_at" => $created_at
        ];

        Missions::insert($data);
        return back();
    }

    public function deleteMissions(Request $request)
    {
        $deleteId = $request->id;
        Missions::where('id', $deleteId)->delete();
        return back();
    }

    public function deletePoint(Request $request)
    {
        $deleteId = $request->id;
        MissionPosition::where('id', $deleteId)->delete();
        return back();
    }
}
