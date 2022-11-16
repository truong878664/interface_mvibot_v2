<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
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
        MissionSleep::insert($dataSleep);

        $idMission = $request->current_id_mission;
        $oldStepMission = Missions::find($idMission)->steps_mission_name;

        Missions::where('id', $idMission)->update(['steps_mission_name' => $oldStepMission.'|'.'sleep#'.$name_sleep]);
        return back();
    }
}