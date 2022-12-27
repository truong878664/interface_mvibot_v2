<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\backend\MissionFootprint;
use App\Models\backend\Missions;
use App\Http\Controllers\frontend\MissionsController;


class FootprintController extends Controller
{

    public function updateFootprint(Request $request)
    {
        $name_footprint = $request->name_footprint;
        $x1 = -$request->x1;
        $x2 = $request->x2;
        $y1 = -$request->y1;
        $y2 = $request->y2;
        $idMission = $request->current_id_mission;

        $dataFootprint = [
            "name_footprint" => $name_footprint,
            "x1" => $x1,
            "y1" => $y1,
            "x2" => $x2,
            "y2" => $y2,
        ];

        MissionFootprint::where('id', $request->id)->update($dataFootprint);

        $updateDataSteps = new MissionsController;
        $updateDataSteps->addPointToStepsMission($idMission);
        return back()->with('msg', 'Save footprint successfully');
    }
}