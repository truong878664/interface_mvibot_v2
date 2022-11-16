<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\backend\MissionFootprint;
use App\Models\backend\Missions;

class FootprintController extends Controller
{
    public function createFootprint(Request $request)
    {
        $name_footprint = $request->name_footprint;
        $x1 = $request->x1;
        $x2 = -$request->x2;
        $y1 = $request->y1;
        $y2 = -$request->y2;

        $dataFootprint = [
            "name_footprint" => $name_footprint,
            "x1" => $x1,
            "x2" => $x2,
            "y1" => $y1,
            "y2" => $y2,
        ];
        MissionFootprint::insert($dataFootprint);

        $idMission = $request->current_id_mission;

        $oldStepMission = Missions::find($idMission)->steps_mission_name;
        Missions::where('id', $idMission)->update(['steps_mission_name' => $oldStepMission.'|'.'footprint#'.$name_footprint]);
        return back();
    }
}