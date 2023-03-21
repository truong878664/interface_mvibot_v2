<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\backend\Missions;
use App\Models\backend\MissionPosition;
use \Carbon\Carbon;
use App\Http\Controllers\frontend\MissionsController;
use App\Models\backend\Stop;
use App\Models\backend\WakeUp;
use Illuminate\Support\Facades\DB;

class CreateMissionsController extends Controller
{

    public function getMissions()
    {
        $allMissions = Missions::all();
        return $allMissions;
    }
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
        Missions::insert($data);
        return back();
    }

    public function deleteMissions(Request $request)
    {
        $deleteId = $request->id;
        Missions::where('id', $deleteId)->delete();
        DB::table('bookmark')->where('link', "/dashboard/missions/create-missions/".$deleteId)->delete();

        Stop::where('id_mission', $deleteId)->delete();
        WakeUp::where('id_mission', $deleteId)->delete();
        return back()->with('');
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