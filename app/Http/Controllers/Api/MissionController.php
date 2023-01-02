<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Missions;
use Illuminate\Http\Request;
use App\Models\backend\MissionFootprint;
use App\Models\backend\MissionGpio;
use App\Models\backend\MissionMarker;
use App\Models\backend\MissionSleep;
use Illuminate\Support\Facades\DB;

class MissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Missions::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Missions::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        switch ($request->method) {
            case 'update':
                Missions::where('id', $id)->update(['steps_mission_name' => $request->steps_mission_name]);
                break;
            case 'add':
                switch ($request->type) {
                    case 'position':
                        $currentMission = Missions::find($id);
                        $oldStepMissionName = $currentMission->steps_mission_name;
                        Missions::where('id', $id)->update(['steps_mission_name' => $oldStepMissionName . '|' . $request->type . '#' . $request->name_type . '#' . $request->id_type]);
                        break;
                    case 'footprint':
                        $name_type = $request->name_type;
                        $x1 = -$request->x1;
                        $x2 = $request->x2;
                        $y1 = -$request->y1;
                        $y2 = $request->y2;

                        $dataFootprint = [
                            "name_footprint" => $name_type,
                            "x1" => $x1,
                            "y1" => $y1,
                            "x2" => $x2,
                            "y2" => $y2,
                        ];

                        $currentMission = Missions::find($id);
                        $oldStepMission = $currentMission->steps_mission_name;

                        $footprintInsert = MissionFootprint::create($dataFootprint);
                        $id_type = $footprintInsert->id;
                        Missions::where('id', $id)->update(['steps_mission_name' => $oldStepMission . '|footprint#' . $name_type . '#' . $id_type]);
                        break;
                    case 'gpio':
                        if ($request->time_out) {
                            $time_out = $request->time_out;
                        } else {
                            $time_out = -1;
                        }

                        $name_type = $request->name_type;
                        $out_set = $request->out_set;
                        $out_reset = $request->out_reset;
                        $in_on = $request->in_on;
                        $in_off = $request->in_off;
                        $in_pullup = $request->in_pullup;
                        $in_pulldown = $request->in_pulldown;

                        $dataGpio = [
                            "name_gpio" => $name_type,
                            "time_out" => $time_out,
                            "out_set" => $out_set,
                            "out_reset" => $out_reset,
                            "in_on" => $in_on,
                            "in_off" => $in_off,
                            "in_pullup" => $in_pullup,
                            "in_pulldown" => $in_pulldown,
                        ];

                        $gpioInsert = MissionGpio::create($dataGpio);

                        $oldStepMission = Missions::find($id)->steps_mission_name;

                        $id_type = $gpioInsert->id;

                        Missions::where('id', $id)->update(['steps_mission_name' => $oldStepMission . '|gpio#' . $name_type . '#' . $id_type]);
                        break;
                    case 'sleep':
                        $name_type = $request->name_type;
                        $time_sleep = $request->time_sleep;

                        $dataSleep = [
                            "name_sleep" => $name_type,
                            "time_sleep" => $time_sleep,
                        ];

                        $sleepInsert = MissionSleep::create($dataSleep);
                        $oldStepMission = Missions::find($id)->steps_mission_name;

                        $id_type = $sleepInsert->id;
                        Missions::where('id', $id)->update(['steps_mission_name' => $oldStepMission . '|sleep#' . $name_type . '#' . $id_type]);
                        break;

                    case 'marker':
                        $name_type = $request->name_type;
                        $marker_type = $request->marker_type;
                        $marker_dir = $this->checkDataMarker($request->marker_dir);
                        $off_set_x1 = $this->checkDataMarker($request->off_set_x1);
                        $off_set_x2 = $this->checkDataMarker($request->off_set_x2);
                        $off_set_y1 = $this->checkDataMarker($request->off_set_y1);
                        $off_set_y2 = $this->checkDataMarker($request->off_set_y2);
                        $off_set_dis = $this->checkDataMarker($request->off_set_dis);
                        $off_set_angle = $this->checkDataMarker($request->off_set_angle);
                        $sx1 = $request->sx1;
                        $sx2 = $request->sx2;
                        $sy1 = $request->sy1;
                        $sy2 = $request->sy2;


                        $dataMarker = [
                            'name_marker' => $name_type,
                            'marker_type' => $marker_type,
                            'marker_dir' => $marker_dir,
                            'off_set_x1' => $off_set_x1,
                            'off_set_x2' => $off_set_x2,
                            'off_set_y1' => $off_set_y1,
                            'off_set_y2' => $off_set_y2,
                            'off_set_dis' => $off_set_dis,
                            'off_set_angle' => $off_set_angle,
                            'sx1' => $sx1,
                            'sx2' => $sx2,
                            'sy1' => $sy1,
                            'sy2' => $sy2,
                        ];
                        $markerInsert = MissionMarker::create($dataMarker);
                        $oldStepMission = Missions::find($id)->steps_mission_name;
                        $id_type = $markerInsert->id;
                        Missions::where('id', $id)->update(['steps_mission_name' => $oldStepMission . '|marker#' . $name_type . '#' . $id_type]);
                        break;
                    default:
                        return 'incorrect type';
                }
                break;
            case "update-step-value":
                break;
        }

        $this->changeData($id);
        return ['message' => "update success", "status" => 200];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function changeData($id)
    {
        function toArray($id)
        {
            $currentMission = Missions::find($id)->steps_mission_name;
            $currentMissionToArray = explode('|', $currentMission);
            $arrayStepMissionName = array_map(function ($item) {
                return explode('#', $item);
            }, $currentMissionToArray);
            array_shift($arrayStepMissionName);
            return $arrayStepMissionName;
        };

        $arrayStepMissionName = toArray($id);
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
                    // return $data_off_set_dis;
                    break;
            }
        }, $stepMissionData);

        $dataStepMission = trim(implode($stepMission), " ");

        Missions::where('id', $id)->update(['steps_mission' => $dataStepMission]);
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