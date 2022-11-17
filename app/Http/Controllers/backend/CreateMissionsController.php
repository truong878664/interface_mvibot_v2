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
        return back()->with('msg', 'Successful point deletion');
    }

    public function addPointToMission(Request $request)
    {
        $name_position = $request->name_position;
        $idMission = $request->current_id_mission;
        $oldStepMission = Missions::find($idMission)->steps_mission_name;

        Missions::where('id', $idMission)->update(['steps_mission_name' => $oldStepMission . '|' . 'position#' . $name_position]);
        return back()->with('msg', 'Save point successfully');
    }
}