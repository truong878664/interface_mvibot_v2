<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionMarker;
use App\Models\backend\Missions;
use Illuminate\Http\Request;

class markerController extends Controller
{
    public function createMarker(Request $request)
    {

        $name_marker = $request->name_marker;
        $marker_type = $request->marker_type;
        $marker_dir = $this->checkDataMarker($request->marker_dir);
        $off_set_x1 = $this->checkDataMarker($request->off_set_x1);
        $off_set_x2 = $this->checkDataMarker($request->off_set_x2);
        $off_set_y1 = $this->checkDataMarker($request->off_set_y1);
        $off_set_y2 = $this->checkDataMarker($request->off_set_y2);
        $off_set_dis = $this->checkDataMarker($request->off_set_dis);
        $off_set_angle = $this->checkDataMarker($request->off_set_angle);


        $dataMarker = [
            'name_marker' => $name_marker,
            'marker_type' => $marker_type,
            'marker_dir' => $marker_dir,
            'off_set_x1' => $off_set_x1,
            'off_set_x2' => $off_set_x2,
            'off_set_y1' => $off_set_y1,
            'off_set_y2' => $off_set_y2,
            'off_set_dis' => $off_set_dis,
            'off_set_angle' => $off_set_angle,
        ];
        $markerInsert = MissionMarker::create($dataMarker);
        $idMission = $request->current_id_mission;
        $oldStepMission = Missions::find($idMission)->steps_mission_name;
        $idMarker = $markerInsert->id;
        Missions::where('id', $idMission)->update(['steps_mission_name' => $oldStepMission . '|marker#' . $name_marker . '#' . $idMarker]);
        return back()->with('msg', 'Save marker successfully');
    }

    public function checkDataMarker($dataCheck)
    {
        if ($dataCheck) {
            $data = $dataCheck;
        } else {
            $data = null;
        }
        return $data;
    }
}