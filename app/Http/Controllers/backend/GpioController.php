<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionGpio;
use App\Models\backend\Missions;
use Illuminate\Http\Request;

class GpioController extends Controller
{
    public function createGpio(Request $request)
    {
        if ($request->time_out) {
            $time_out = $request->time_out;
        } else {
            $time_out = -1;
        }

        $name_gpio = $request->name_gpio;
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

        MissionGpio::insert($dataGpio);

        $idMission = $request->current_id_mission;
        $oldStepMission = Missions::find($idMission)->steps_mission_name;
        // dd( $idMission);

        Missions::where('id', $idMission)->update(['steps_mission_name' => $oldStepMission.'|'.'gpio#'.$name_gpio]);
        return back();
    }
}