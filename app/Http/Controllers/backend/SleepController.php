<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Controllers\frontend\MissionsController;
use App\Models\backend\Missions;
use App\Models\backend\MissionSleep;
use Illuminate\Http\Request;

class SleepController extends Controller
{
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