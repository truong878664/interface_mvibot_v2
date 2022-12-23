<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\backend\mapController;
use App\Http\Controllers\Controller;
use App\Models\backend\Map;
use Illuminate\Http\Request;
use App\Models\backend\Missions;
use App\Models\backend\MissionPosition;
use App\Models\backend\StatusRobot;
use App\Models\backend\Stop;
use App\Models\backend\WakeUp;
use App\Models\Robot;
use Illuminate\Support\Facades\DB;

class MissionsController extends Controller
{
    public function index()
    {
        return redirect('/dashboard/missions/create-point');
    }

    public function createPoint()
    {
        $map = new mapController();
        $mapActive = $map->mapActive();
        return view('frontend.pages.missions.createPoint', compact('mapActive'));
    }

    public function createMissions()
    {
        $allMissions = Missions::all();
        return view('frontend.pages.missions.createMissions', compact('allMissions'));
    }

    public function trackingMission()
    {
        $robotNavigate = StatusRobot::where('mode', 'navigation')->get();

        return view('frontend.pages.missions.trackingMission', compact('robotNavigate'));
    }

    public function createStepsMissions(Request $request)
    {

        if (Map::all()->count() > 0) {
            $mapActive = Map::all()[0]['name_map_active'];
        } else {
            $mapActive = "";
        }
        $idRender = $request->id;
        $itemRender = Missions::find($idRender);

        $allPoints = MissionPosition::where('map', $mapActive)->orderBy('id', 'desc')->get();

        $allRobot = Robot::all()->toArray();

        $currentWakeUp = json_encode(WakeUp::where('name_mission', $itemRender->name_mission)->get());
        $currentStop = json_encode(Stop::where('name_mission', $itemRender->name_mission)->get());

        $this->addPointToStepsMission($idRender);
        return view('frontend.pages.missions.createStepMissions', compact('itemRender', 'allPoints', 'allRobot', 'currentWakeUp', 'currentStop'));
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
            $item = DB::table("mission_$datas[0]s")->where("id", $datas[2])->get()->all();
            array_push($stepMissionData, $item);
        };
        $stepMission = array_map(function ($items) {
            $item = $items[0];

            switch ($item->mode) {

                case 'position':
                    $name_position = $item->name_position;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $x_position = $item->x;
                    $y_position = $item->y;
                    $z_position = $item->z;
                    $w_position = $item->w;
                    $mode_position = $item->mode_position;
                    return "(name:$name_position|time_out:$time_out|mode:$mode|data:~x=$x_position~~y=$y_position~~z=$z_position~~w=$w_position~~mode=$mode_position~)";
                    break;
                case 'sleep':
                    $name_sleep = $item->name_sleep;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $time_sleep = $item->time_sleep;
                    return "(name:$name_sleep|time_out:$time_out|mode:$mode|data:~time_sleep=$time_sleep~)";
                    break;
                case 'footprint':
                    $name_footprint = $item->name_footprint;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $x1 = $item->x1;
                    $x2 = $item->x2;
                    $y1 = $item->y1;
                    $y2 = $item->y2;
                    return "(name:$name_footprint|time_out:$time_out|mode:$mode|data:~x1=$x1~~y1=$y1~~x2=$x2~~y2=$y2~)";
                    break;
                case 'gpio':
                    $name_gpio = $item->name_gpio;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $out_set = $item->out_set;
                    $out_reset = $item->out_reset;
                    $in_on = $item->in_on;
                    $in_off = $item->in_off;
                    $in_pullup = $item->in_pullup;
                    $in_pulldown = $item->in_pulldown;

                    strlen($out_set) ? $data_out_set = "~out_set=$out_set~" : $data_out_set = "";
                    strlen($out_reset) ? $data_out_reset = "~out_reset=$out_reset~" : $data_out_reset = "";
                    strlen($in_on) ? $data_in_on = "~in_on=$in_on~" : $data_in_on = "";
                    strlen($in_off) ? $data_in_off = "~in_off=$in_off~" : $data_in_off = "";
                    strlen($in_pullup) ? $data_in_pullup = "~in_pullup=$in_pullup~" : $data_in_pullup = "";
                    strlen($in_pulldown) ? $data_in_pulldown = "~in_pulldown=$in_pulldown~" : $data_in_pulldown = "";
                    return "(name:$name_gpio|time_out:$time_out|mode:$mode|data:$data_out_set$data_out_reset$data_in_on$data_in_off$data_in_pullup$data_in_pulldown)";

                    break;
                case 'marker':
                    $name_marker = $item->name_marker;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $marker_type = $item->marker_type;
                    $marker_dir = $item->marker_dir;
                    $off_set_x1 = $item->off_set_x1;
                    $off_set_x2 = $item->off_set_x2;
                    $off_set_y1 = $item->off_set_y1;
                    $off_set_y2 = $item->off_set_y2;
                    $off_set_dis = $item->off_set_dis;
                    $off_set_angle = $item->off_set_angle;
                    $sx1 = $item->sx1;
                    $sx2 = $item->sx2;
                    $sy1 = $item->sy1;
                    $sy2 = $item->sy2;

                    strlen($marker_dir) ? $data_marker_dir = "~marker_dir=$marker_dir~" : $data_marker_dir = "";
                    strlen($off_set_x1) ? $data_off_set_x1 = "~off_set_x1=$off_set_x1~" : $data_off_set_x1 = "";
                    strlen($off_set_x2) ? $data_off_set_x2 = "~off_set_x2=$off_set_x2~" : $data_off_set_x2 = "";
                    strlen($off_set_y1) ? $data_off_set_y1 = "~off_set_y1=$off_set_y1~" : $data_off_set_y1 = "";
                    strlen($off_set_y2) ? $data_off_set_y2 = "~off_set_y2=$off_set_y2~" : $data_off_set_y2 = "";
                    strlen($off_set_dis) ? $data_off_set_dis = "~off_set_dis=$off_set_dis~" : $data_off_set_dis = "";
                    strlen($off_set_angle) ? $data_off_set_angle = "~off_set_angle=$off_set_angle~" : $data_off_set_angle = "";
                    strlen($sx1) ? $data_sx1 = "~sx1=$sx1~" : $data_sx1 = "";
                    strlen($sx2) ? $data_sx2 = "~sx2=$sx2~" : $data_sx2 = "";
                    strlen($sy1) ? $data_sy1 = "~sy1=$sy1~" : $data_sy1 = "";
                    strlen($sy2) ? $data_sy2 = "~sy2=$sy2~" : $data_sy2 = "";

                    return "(name:$name_marker|time_out:$time_out|mode:$mode|data:~marker_type=$marker_type~$data_marker_dir$data_off_set_x1$data_off_set_x2$data_off_set_y1$data_off_set_y2$data_off_set_dis$data_off_set_angle$data_sx1$data_sx2$data_sy1$data_sy2)";

                    break;
            }
        }, $stepMissionData);

        $dataStepMission = trim(implode($stepMission), " ");

        Missions::where('id', $idMission)->update(['steps_mission' => $dataStepMission]);
    }
}