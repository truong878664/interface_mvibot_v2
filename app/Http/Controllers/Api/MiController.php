<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\TypeMission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function show(Request $request, $type)
    {

        switch ($type) {
            case "get-mission":
                $list_id = explode(",", $request->list_id);
                $dataMission = array_map(function ($item) {
                    return Mi::where('id', $item)->first();
                }, $list_id);

                return $dataMission;

            default:
                return Mi::where('id', $type)->first();
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return $this->translateData($id);
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
            case "add":
                $old_mission_shorthand = Mi::where('id', $id)->first()->mission_shorthand;
                $mission_shorthand = $request->mission_shorthand;
                if (trim($old_mission_shorthand, " ") !== "") {
                    $new_mission_shorthand = $old_mission_shorthand . "+" . $mission_shorthand;
                } else {
                    $new_mission_shorthand = $mission_shorthand;
                }
                Mi::where('id', $id)->update(['mission_shorthand' => $new_mission_shorthand]);
                break;
            case "update":
                $update_mission_shorthand = $request->mission_shorthand;
                Mi::where('id', $id)->update(['mission_shorthand' => $update_mission_shorthand]);
                break;
            case "move":
                $mission_shorthand = Mi::where('id', $id)->first()->mission_shorthand;
                $arrayIdBlockStep = explode("+", $mission_shorthand);
                switch ($request->type) {
                    case 'left':
                        $indexItemMove = array_search($request->id_move, $arrayIdBlockStep);

                        $out = array_splice($arrayIdBlockStep, $indexItemMove, 1);
                        array_splice($arrayIdBlockStep, $indexItemMove - 1, 0, $out);

                        Mi::where('id', $id)->update(['mission_shorthand' => implode("+", $arrayIdBlockStep)]);
                        break;
                    case 'right':
                        $indexItemMove = array_search($request->id_move, $arrayIdBlockStep);

                        $out = array_splice($arrayIdBlockStep, $indexItemMove, 1);
                        array_splice($arrayIdBlockStep, $indexItemMove + 1, 0, $out);

                        Mi::where('id', $id)->update(['mission_shorthand' => implode("+", $arrayIdBlockStep)]);
                        break;
                }
                break;
            case "update-type-mission":
                break;
        }

        $this->translateStepMissionName($id);
        $this->translateData($id);
        return ['message' => 'save data success', "status " => 200];
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

    public function translateStepMissionName($id)
    {
        $dataMission = Mi::where('id', $id)->first();
        $mission_shorthand = $dataMission->mission_shorthand;
        if ($mission_shorthand != "") {
            $split_mission_shorthand = explode("+", $mission_shorthand);

            $data = array_map(function ($item) {
                $itemStep = TypeMission::where('id', $item)->first();
                return $itemStep->name . "^" . $itemStep->type . "^|" . $itemStep->data;
            }, $split_mission_shorthand);
            Mi::where("id", $id)->update(['steps_mission_name' => implode("+", $data)]);
        } else {
            Mi::where("id", $id)->update(['steps_mission_name' => NULL]);
        }
    }
    public function translateData($id)
    {

        $dataMission = Mi::where('id', $id)->first();
        $step_name = $dataMission->steps_mission_name;
        if ($step_name != "") {

            $splitSteps = explode("+", $step_name);
            $dataChange = [];
            foreach ($splitSteps as $splitStep) {
                array_push($dataChange, explode("^", $splitStep));
            }

            $data = [];
            foreach ($dataChange as $dataItem) {
                switch ($dataItem[1]) {
                    case "normal":
                        $head = "&name>$dataItem[0]/time_out>-1/mode>normal/data>%normal_step#";
                        $body = $this->translateStepItem($dataItem[2]);
                        array_push($data, $head . $body);
                        break;
                    case "ifelse":
                        $head = "&name>$dataItem[0]/time_out>-1/mode>if_else/data>%condition#";

                        $changeDataIfelse = explode('?', $dataItem[2]);

                        $dataIf = $this->translateStepItem($changeDataIfelse[0]);
                        $dataThen = $changeDataIfelse[1] == "|" ? "" : $this->translateStepItem($changeDataIfelse[1]);
                        $dataElse = $changeDataIfelse[2] == "|" ? "" : $this->translateStepItem($changeDataIfelse[2]);


                        $dataStringIf = "$dataIf%";
                        $dataStringThen = $dataThen ? "%if_step#$dataThen%" : "";
                        $dataStringElse = $dataElse ? "%else_step#$dataElse%" : "";

                        $body =  "$dataStringIf$dataStringThen$dataStringElse@";
                        array_push($data, $head . $body);
                        break;
                }
            }

            $dataStepMission = "[" . trim(implode('][', $data), " ") . "]";
            Mi::where("id", $id)->update(['steps_mission' => $dataStepMission]);
        } else {
            Mi::where("id", $id)->update(['steps_mission' => NULL]);
        }
    }
    public function translateStepItem($arrayStepMissionName)
    {
        $currentMissionToArray = explode('|', $arrayStepMissionName);

        $arrayStepMissionName = array_map(function ($item) {
            return explode('#', $item);
        }, $currentMissionToArray);
        array_shift($arrayStepMissionName);

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
        return $dataStepMission;
    }
    public function moveArray($array, $from, $to)
    {
        $out = array_splice($array, $from, 1);
        array_splice($array, $to, 0, $out);
    }
}