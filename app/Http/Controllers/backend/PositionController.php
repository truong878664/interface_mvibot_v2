<?php

namespace App\Http\Controllers\backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use App\Models\backend\MissionPosition;
use App\Models\backend\Missions;
use \Carbon\Carbon;

class PositionController extends Controller
{
    public function createPoint(Request $request)
    {
        $name_position = $request->name_position;
        $x = $request->x;
        $y = $request->y;
        $z = $request->z;
        $w = $request->w;
        $time_out = $request->time_out;
        $color_position = $request->color_position;
        $mode_position = $request->mode_position;
        $mode_child = $request->mode_child;
        $created_at = Carbon::now();

        $dataPosition = [
            "name_position" => $name_position,
            "x" => $x,
            "y" => $y,
            "z" => $z,
            "w" => $w,
            "time_out" => $time_out,
            "color_position" => $color_position,
            "mode_position" => $mode_position,
            "mode_child" => $mode_child,
            "created_at" => $created_at,
        ];

        MissionPosition::insert($dataPosition);

        return Redirect::back();
    }
    public function deletePoint(Request $request)
    {

        $deleteId = $request->id;

        $deleteName = MissionPosition::where('id', $deleteId)->get()->toArray()[0]['name_position'];

        $nameStepMissionDelete = "|position#$deleteName";
        $dataStepMission = Missions::all();

        foreach ($dataStepMission as $itemStepMission) {
            $newString = str_replace("$nameStepMissionDelete", "", $itemStepMission->steps_mission_name);
            Missions::where('id', $itemStepMission->id)->update(["steps_mission_name" => $newString]);
        }
        MissionPosition::where('id', $deleteId)->delete();


        return back()->with('msg', 'Successful point deletion');
    }
}