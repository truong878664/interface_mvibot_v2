<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Controllers\frontend\MissionsController;
use App\Models\backend\Missions;
use App\Models\backend\MissionSleep;
use Illuminate\Http\Request;

class SleepController extends Controller
{
    public function createSleep(Request $request)
    {

        $name_sleep = $request->name_sleep;
        $time_sleep = $request->time_sleep;

        $dataSleep = [
            "name_sleep" => $name_sleep,
            "time_sleep" => $time_sleep,
        ];

        $sleepInsert = MissionSleep::create($dataSleep);

        $idMission = $request->current_id_mission;
        $oldStepMission = Missions::find($idMission)->steps_mission_name;

        $idSleep = $sleepInsert->id;
        Missions::where('id', $idMission)->update(['steps_mission_name' => $oldStepMission . '|sleep#' . $name_sleep . '#' . $idSleep]);
        return back()->with('msg', 'Save sleep successfully');
    }

    public function updateSleep(Request $request)
    {
        $idSleep = $request->id;
        $name_sleep = $request->name_sleep;
        $time_sleep = $request->time_sleep;

        $dataSleep = [
            "name_sleep" => $name_sleep,
            "time_sleep" => $time_sleep,
        ];
        MissionSleep::where('id', $idSleep)->update($dataSleep);

        $idMission = $request->current_id_mission;
        $updateDataSteps = new MissionsController;
        $updateDataSteps->addPointToStepsMission($idMission);
        return back()->with('msg', 'save sleep successfully');
    }
}