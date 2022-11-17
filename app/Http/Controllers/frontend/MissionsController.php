<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\backend\Missions;
use App\Models\backend\MissionPosition;
use Illuminate\Support\Facades\DB;

class MissionsController extends Controller
{
    public function index()
    {
        return redirect('/dashboard/missions/create-point');
    }

    public function createPoint()
    {
        return view('frontend.pages.missions.createPoint');
    }

    public function createMissions()
    {
        $allMissions = Missions::all();
        return view('frontend.pages.missions.createMissions', compact('allMissions'));
    }

    public function trackingMission()
    {
        return view('frontend.pages.missions.trackingMission');
    }

    public function createStepsMissions(Request $request)
    {
        $idRender = $request->id;
        $itemRender = Missions::find($idRender);

        $allPoints = MissionPosition::orderBy('id', 'desc')->get();

        $this->addPointToStepsMission($idRender);
        return view('frontend.pages.missions.createStepMissions', compact('itemRender', 'allPoints'));
    }


    public function addPointToStepsMission($idMission)
    {
        function missionStepNameToArray($idMission)
        {
            $currentMission = Missions::find($idMission)->steps_mission_name;
            $currentMissionToArray = explode('|', $currentMission);
            $arrayStepMissionName = array_map(function ($item) {
                return explode('#', $item);
            }, $currentMissionToArray);
            array_shift($arrayStepMissionName);
            return $arrayStepMissionName;
        };
        $arrayStepMissionName = missionStepNameToArray($idMission);

        $stepMissionData = [];
        foreach ($arrayStepMissionName as $datas) {
            $item = DB::table("mission_$datas[0]s")->where("name_$datas[0]", $datas[1])->get()->all();
            array_push($stepMissionData, $item);
        };

        $stepMission = array_map(function ($items) {
            $item = $items[0];
            if ($item->mode == 'position') {
                $name_position = $item->name_position;
                $time_out = $item->time_out;
                $mode = $item->mode;
                $x_position = $item->x;
                $y_position = $item->y;
                $z_position = $item->z;
                $w_position = $item->w;
                $mode_position = $item->mode_position;
                return "(name:$name_position|time_out:$time_out|mode:$mode|data:~x=$x_position~~y=$y_position~~z=$z_position~~z=$z_position~~w=$w_position~~mode=$mode_position~)";
            } elseif ($item->mode == 'sleep') {
                $name_sleep = $item->name_sleep;
                $time_out = $item->time_out;
                $mode = $item->mode;
                $time_sleep = $item->time_sleep;
                return "(name:$name_sleep|time_out:$time_out|mode:$mode|data:~time_sleep=$time_sleep~)";
            } elseif ($item->mode == 'footprint') {
                $name_footprint = $item->name_footprint;
                $time_out = $item->time_out;
                $mode = $item->mode;
                $x1 = $item->x1;
                $x2 = $item->x2;
                $y1 = $item->y1;
                $y2 = $item->y2;
                return "(name:$name_footprint|time_out:$time_out|mode:$mode|data:~x1=$x1~~y1=$y1~~x2=$x2~~y2=$y2~)";
            } elseif ($item->mode == 'gpio') {
                $name_gpio = $item->name_gpio;
                $time_out = $item->time_out;
                $mode = $item->mode;
                $out_set = $item->out_set;
                $out_reset = $item->out_reset;
                $in_on = $item->in_on;
                $in_off = $item->in_off;
                $in_pullup = $item->in_pullup;
                $in_pulldown = $item->in_pulldown;

                $out_set ? $data_out_set = "~out_set=$out_set~" : $data_out_set = "";
                $out_reset ? $data_out_reset = "~out_reset=$out_reset~" : $data_out_reset = "";
                $in_on ? $data_in_on = "~in_on=$in_on~" : $data_in_on = "";
                $in_off ? $data_in_off = "~in_off=$in_off~" : $data_in_off = "";
                $in_pullup ? $data_in_pullup = "~in_pullup=$in_pullup~" : $data_in_pullup = "";
                $in_pulldown ? $data_in_pulldown = "~in_pulldown=$in_pulldown~" : $data_in_pulldown = "";
                return "(name:$name_gpio|time_out:$time_out|mode:$mode|data:$data_out_set$data_out_reset$data_in_on$data_in_off$data_in_pullup$data_in_pulldown)";
            }
        }, $stepMissionData);

        $dataStepMission = implode($stepMission);

        Missions::where('id', $idMission)->update(['steps_mission' => $dataStepMission]);
    }
}