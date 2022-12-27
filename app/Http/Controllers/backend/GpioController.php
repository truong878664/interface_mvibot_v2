<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Http\Controllers\frontend\MissionsController;
use App\Models\backend\MissionFootprint;
use App\Models\backend\MissionGpio;
use App\Models\backend\Missions;
use Illuminate\Http\Request;

class GpioController extends Controller
{
    function updateGpio(Request $request)
    {
        $idGpio = $request->id;
        $name_gpio = $request->name_gpio;
        $time_out = $request->time_out ? $request->time_out : -1;
        $out_set = $request->out_set;
        $out_reset = $request->out_reset;
        $in_on = $request->in_on;
        $in_off = $request->in_off;
        $in_pullup = $request->in_pullup;
        $in_pulldown = $request->in_pulldown;

        $dataGpio = [
            "name_gpio" => $name_gpio,
            "time_out" => $time_out,
            "out_set" => $out_set,
            "out_reset" => $out_reset,
            "in_on" => $in_on,
            "in_off" => $in_off,
            "in_pullup" => $in_pullup,
            "in_pulldown" => $in_pulldown,
        ];
        MissionGpio::where('id', $idGpio)->update($dataGpio);

        $idMission = $request->current_id_mission;

        $updateDataSteps = new MissionsController;
        $updateDataSteps->addPointToStepsMission($idMission);

        return back()->with('msg', 'save GPIO successfully');
    }
}