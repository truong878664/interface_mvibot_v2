<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\Stop;
use App\Models\backend\WakeUp;
use Illuminate\Http\Request;

class gpioOtherController extends Controller
{
    public function createWakeUp(Request $request)
    {
        $name_mission = $request->name_mission;
        $out_set = $request->out_set;
        $out_reset = $request->out_reset;
        $in_on = $request->in_on;
        $in_off = $request->in_off;
        $in_pullup = $request->in_pullup;
        $in_pulldown = $request->in_pulldown;

        $dataGpio = [
            "name_mission" => $name_mission,
            "out_set" => $out_set,
            "out_reset" => $out_reset,
            "in_on" => $in_on,
            "in_off" => $in_off,
            "in_pullup" => $in_pullup,
            "in_pulldown" => $in_pulldown,
        ];

        if (WakeUp::where('name_mission', $name_mission)->count() > 0) {
            WakeUp::where('name_mission', $name_mission)->update($dataGpio);
        } else {
            WakeUp::insert($dataGpio);
        }
        return back();
    }
    public function createStop(Request $request)
    {
        $name_mission = $request->name_mission;
        $out_set = $request->out_set;
        $out_reset = $request->out_reset;
        $in_on = $request->in_on;
        $in_off = $request->in_off;
        $in_pullup = $request->in_pullup;
        $in_pulldown = $request->in_pulldown;

        $dataGpio = [
            "name_mission" => $name_mission,
            "out_set" => $out_set,
            "out_reset" => $out_reset,
            "in_on" => $in_on,
            "in_off" => $in_off,
            "in_pullup" => $in_pullup,
            "in_pulldown" => $in_pulldown,
        ];
        if (Stop::where('name_mission', $name_mission)->count() > 0) {
            Stop::where('name_mission', $name_mission)->update($dataGpio);
        } else {
            Stop::insert($dataGpio);
        }

        return back();
    }
}