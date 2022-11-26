<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\backend\Missions;
use App\Models\backend\MissionPosition;
use \Carbon\Carbon;
use App\Http\Controllers\frontend\MissionsController;

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

    public function addPointToMission(Request $request)
    {
        $name_position = $request->name_position;
        $idMission = $request->current_id_mission;
        $id_position = $request->id_position;
        $this->addPointToStepsMissionName($idMission, $name_position, $id_position);
        return back()->with('msg', 'Save point successfully');
    }

    public function addPointToStepsMissionName($idMission, $name_position, $id_position)
    {
        $currentMission = Missions::find($idMission);
        $oldStepMissionName = $currentMission->steps_mission_name;
        Missions::where('id', $idMission)->update(['steps_mission_name' => $oldStepMissionName . '|position#' . $name_position . '#' . $id_position]);
    }

    public function updateStepMission(Request $request)
    {
        $idMission = $request->id_mission;
        $dataStepsMissionName = $request->steps_mission_name;
        $dataStepsMissionName == "|" ?    $dataStepsMissionName = "" : $dataStepsMissionName;
        Missions::where('id', $idMission)->update(['steps_mission_name' => $dataStepsMissionName]);

        $updateDataSteps = new MissionsController;
        $updateDataSteps->addPointToStepsMission($idMission);
        $test = Missions::where('id', $idMission)->get()->toArray();
        return back()->with('data', $test);
    }
}