<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Missions;
use App\Models\backend\MissionsVer;
use App\Models\backend\Stop;
use App\Models\backend\TypeMission;
use App\Models\backend\WakeUp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MiController extends Controller
{
    public $missionClone;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return Missions::select(["id", "name", "type"])->get();
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
        switch ($request->method) {
            case 'clone':
                $idMission = $request->id;
                $v = $request->version;

                if($v ===  "v3") {
                    $missionClass= new Missions();
                } else if($v ===  "v4") {
                    $missionClass= new MissionsVer();

                }

                $data = ($missionClass->where('id', $idMission)->first());
                $dataClone = [
                    "mission_shorthand" => $data->mission_shorthand,
                    "name" => $data->name . "(copy)",
                    "steps_mission" => $data->steps_mission,
                    "steps_mission_name" => $data->steps_mission_name,
                    "stop" => $data->stop,
                    "wake_up" => $data->wake_up,
                    "type" => $data->type,
                ];
                $this->missionClone = $missionClass->create($dataClone);

                $this->cloneWakeUp($idMission);
                $this->cloneStop($idMission);

                return  $dataClone;

                break;
            default:
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $type)
    {
        try {
            //code...
            switch ($type) {
                case "get-mission":
                    $list_id = explode(",", $request->list_id);
                    $dataMission = array_map(function ($item) {
                        return Missions::where('id', $item)->first();
                    }, $list_id);
                    return $dataMission;
                case "get-column-mission":
                    $column = json_decode($request->column);
                    return Missions::select($column)->where("type", "normal")->get();
                default:
                    return Missions::where('id', $type)->first();
            }
        } catch (\Throwable $th) {
            return ["message" => "ERROR", "error" => $th];
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
        // return $this->translateData($id);
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
        
        $v = $request->version;
        if($v ===  "v3") {
            $missionClass= new Missions();
        } else if($v ===  "v4") {
            $missionClass= new MissionsVer();
        } else {
            $missionClass= new Missions();
        }

        switch ($request->method) {
            case "add":
                $old_mission_shorthand = $missionClass->where('id', $id)->first()->mission_shorthand;
                $mission_shorthand = $request->mission_shorthand;
                if (trim($old_mission_shorthand, " ") !== "") {
                    $new_mission_shorthand = $old_mission_shorthand . "+" . $mission_shorthand;
                } else {
                    $new_mission_shorthand = $mission_shorthand;
                }
                $missionClass->where('id', $id)->update(['mission_shorthand' => $new_mission_shorthand]);

                $this->translateStepMissionName($id);
                return ['message' => 'Add mission success!', "status" => 200];
            case "update":
                $update_mission_shorthand = $request->mission_shorthand;
                $missionClass->where('id', $id)->update(['mission_shorthand' => $update_mission_shorthand]);
                $this->translateStepMissionName($id);
                return ['message' => 'Update mission success!', "status" => 200];
            case "move":
                $mission_shorthand = $missionClass->where('id', $id)->first()->mission_shorthand;
                $arrayIdBlockStep = explode("+", $mission_shorthand);
                switch ($request->type) {
                    case 'left':
                        $indexItemMove = array_search($request->id_move, $arrayIdBlockStep);

                        $out = array_splice($arrayIdBlockStep, $indexItemMove, 1);
                        array_splice($arrayIdBlockStep, $indexItemMove - 1, 0, $out);

                        $missionClass->where('id', $id)->update(['mission_shorthand' => implode("+", $arrayIdBlockStep)]);
                        break;
                    case 'right':
                        $indexItemMove = array_search($request->id_move, $arrayIdBlockStep);

                        $out = array_splice($arrayIdBlockStep, $indexItemMove, 1);
                        array_splice($arrayIdBlockStep, $indexItemMove + 1, 0, $out);

                        $missionClass->where('id', $id)->update(['mission_shorthand' => implode("+", $arrayIdBlockStep)]);
                        break;
                }

                $this->translateStepMissionName($id);
                return ['message' => 'Move mission success!', "status" => 200];
            case "update-name":
                $missionClass->where('id', $id)->update(['name' => $request->name]);
                break;
            case "update-type-mission":
                $this->translateStepMissionName($id);
                break;
            case "translate-data-mission-end":
                $this->translateStepMissionName($id);
                $this->translateData($id);
                return $missionClass->where('id', $id)->first();
            case "translate-multi-mission-end":
                try {
                    $idsMission = $request->idsMission;
                    for ($i = 0; $i < count($idsMission); $i++) {
                        $this->translateStepMissionName($idsMission[$i]);
                        $this->translateData($idsMission[$i]);
                    }
                    return ['translated' => true];
                } catch (\Throwable $th) {
                    return ['translated' => false];
                }
        }
        return ['message' => 'Mission data is ready2', "status" => 200];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $type)
    {
        try {
            $v = $request->version;
            if($v ===  "v3") {
                $missionClass= new Missions();
            } else if($v ===  "v4") {
                $missionClass= new MissionsVer();
            }

            switch ($type) {
                case 'delete-multi':
                    if (count($request->idDelete)) {
                        foreach ($request->idDelete as $id) {
                            $missionClass->where('id', $id)->delete();
                            Stop::where('id_mission', $id)->delete();
                            WakeUp::where('id_mission', $id)->delete();
                            DB::table('bookmark')->where('link', "/dashboard/missions/create-missions/" . $id)->delete();
                        }
                        return ['message' => 'Delete missions success', 'status' => 200];
                    } else {
                        return ['message' => 'No mission selected', 'status' => 100];
                    }
                case 'delete':
                    $idDelete = $request->idDelete;
                   
                    $missionClass->where('id', $idDelete)->delete();
                    Stop::where('id_mission', $idDelete)->delete();
                    WakeUp::where('id_mission', $idDelete)->delete();
                    DB::table('bookmark')->where('link', "/dashboard/missions/create-missions/" . $idDelete)->delete();
                    return ['message' => 'Delete mission success', 'deleted' => true];
                default:
                    return 123;
            }
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function translateStepMissionName($id)
    {
        $dataMission = Missions::where('id', $id)->first();
        $mission_shorthand = $dataMission->mission_shorthand;
        if ($mission_shorthand != "") {
            $split_mission_shorthand = explode("+", $mission_shorthand);

            $data = array_map(function ($item) {
                $itemStep = TypeMission::where('id', $item)->first();
                if ($itemStep) {
                    return $itemStep->id . "^" . $itemStep->name . "^" . $itemStep->type . "^|" . $itemStep->data;
                }
            }, $split_mission_shorthand);

            $dataNew = $this->filterItemNull($data);
            Missions::where("id", $id)->update(['steps_mission_name' => implode("+", $dataNew)]);
        } else {
            Missions::where("id", $id)->update(['steps_mission_name' => NULL]);
        }
    }
    public function translateData($id)
    {
        $dataMission = Missions::where('id', $id)->first();
        $step_name = $dataMission->steps_mission_name;
        if ($step_name != "") {
            $splitSteps = explode("+", $step_name);
            $dataChange = [];
            foreach ($splitSteps as $splitStep) {
                array_push($dataChange, explode("^", $splitStep));
            }

            $data = [];
            foreach ($dataChange as $index => $dataItem) {
                switch ($dataItem[2]) {
                    case "normal":
                        $head = "&name>$dataItem[1]_$index/time_out>-1/mode>normal/data>%normal_step#";
                        $body = $this->translateStepItem($dataItem[3]);
                        array_push($data, $head . $body . '%@');
                        break;
                    case "ifelse":
                        $head = "&name>$dataItem[1]_$index/time_out>-1/mode>if_else/data>%condition#";

                        $changeDataIfelse = explode('?', $dataItem[3]);

                        $dataIf = $this->translateStepItem($changeDataIfelse[0]);
                        $dataThen = $changeDataIfelse[1] == "|" ? "" : $this->translateStepItem($changeDataIfelse[1]);
                        $dataElse = $changeDataIfelse[2] == "|" ? "" : $this->translateStepItem($changeDataIfelse[2]);


                        $dataStringIf = "$dataIf%";
                        $dataStringThen = $dataThen ? "%if_step#$dataThen%" : "";
                        $dataStringElse = $dataElse ? "%else_step#$dataElse%" : "";

                        $body =  "$dataStringIf$dataStringThen$dataStringElse@";
                        array_push($data, $head . $body);
                        break;
                    case "trycatch":
                        $head = "&name>$dataItem[1]_$index/time_out>-1/mode>try_catch/data>";

                        $changeTryCatch = explode('?', $dataItem[3]);

                        $dataTry = $changeTryCatch[0] === "|" ? "" : $this->translateStepItem($changeTryCatch[0]);
                        $dataCatch = $changeTryCatch[1] === "|" ? "" : $this->translateStepItem($changeTryCatch[1]);

                        $dataStringTry = $dataTry ? "%try_step#$dataTry%" : "";
                        $dataStringCatch = $dataCatch ? "%catch_step#$dataCatch%" : "";

                        $body =  "$dataStringTry$dataStringCatch@";
                        array_push($data, $head . $body);
                        break;
                }
            }

            $dataStepMission = trim(implode('', $data), " ");

            $arrayNew = [];
            $oldArray = explode('--+', $dataStepMission);

            foreach ($oldArray as $item) {
                if (substr($item, 0, 6) !== "/front" || !in_array($item, $arrayNew)) {
                    $arrayNew[] = $item;
                }
            }

            $dataStepMissionRemoveVar = implode("--+", $arrayNew);


            $addFrontVar = str_replace("--+/front/", "(name:new_variable|time_out:-1|mode:variable|data:~command_action=new~~name_variable=", $dataStepMissionRemoveVar);
            $addBackVar = str_replace("/back/--+", "~~focus_value=0~)",  $addFrontVar);
            $fullStep = str_replace("--+", "",  $addBackVar);

            Missions::where("id", $id)->update(['steps_mission' => $fullStep]);
        } else {
            Missions::where("id", $id)->update(['steps_mission' => NULL]);
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
            if ($item) {
                array_push($stepMissionData, $item);
            }
        };


        $stepMission = array_map(function ($items) {
            $item = $items[0];
            switch ($item->mode) {
                case 'position':
                    $name_position = $item->name;
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
                    $name_sleep = $item->name;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $time_sleep = $item->time_sleep;
                    return "(name:$name_sleep|time_out:$time_out|mode:$mode|data:~time_sleep=$time_sleep~)";
                    break;
                case 'footprint':
                    $name_footprint = $item->name;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $x1 = $item->x1;
                    $x2 = $item->x2;
                    $y1 = $item->y1;
                    $y2 = $item->y2;
                    return "(name:$name_footprint|time_out:$time_out|mode:$mode|data:~x1=$x1~~y1=$y1~~x2=$x2~~y2=$y2~)";
                    break;
                case 'gpio':
                    $name_gpio = $item->name;
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
                case 'gpio_module':
                    $name_function_gpio_module = $item->name;

                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $out_set = $item->out_set;
                    $out_reset = $item->out_reset;
                    $in_on = $item->in_on;
                    $in_off = $item->in_off;
                    $in_pullup = $item->in_pullup;
                    $in_pulldown = $item->in_pulldown;

                    $name_seri = "~name_seri=$item->name_gpio_module~";

                    strlen($out_set) ? $data_out_set = "~out_set=$out_set~" : $data_out_set = "";
                    strlen($out_reset) ? $data_out_reset = "~out_reset=$out_reset~" : $data_out_reset = "";
                    strlen($in_on) ? $data_in_on = "~in_on=$in_on~" : $data_in_on = "";
                    strlen($in_off) ? $data_in_off = "~in_off=$in_off~" : $data_in_off = "";
                    strlen($in_pullup) ? $data_in_pullup = "~in_pullup=$in_pullup~" : $data_in_pullup = "";
                    strlen($in_pulldown) ? $data_in_pulldown = "~in_pulldown=$in_pulldown~" : $data_in_pulldown = "";
                    return "(name:$name_function_gpio_module|time_out:$time_out|mode:$mode|data:$name_seri$data_out_set$data_out_reset$data_in_on$data_in_off$data_in_pullup$data_in_pulldown)";

                    break;
                case 'marker':
                    $name_marker = $item->name;
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
                case 'variable':
                    $name_function_variable = $item->name;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $command_action = $item->command_action;
                    $name_variable = $item->name_variable;
                    $focus_value = $item->focus_value;

                    $newVarMission = "--+/front/$name_variable/back/--+";

                    if ($focus_value  !== "0" && (int)$focus_value === 0) {
                        $newFocusMission = "--+/front/$focus_value/back/--+";
                    } else {
                        $newFocusMission = "";
                    }

                    $varMission = "(name:$name_function_variable|time_out:$time_out|mode:$mode|data:~command_action=$command_action~~name_variable=$name_variable~~focus_value=$focus_value~)";
                    return $newVarMission . $newFocusMission . $varMission;
                    break;

                case 'sound':
                    $name_sound = $item->name;
                    $time_out = $item->time_out;
                    $mode = $item->mode;
                    $music_start = $item->music_start;
                    $music_mode = $item->music_mode;

                    return "(name:$name_sound|time_out:$time_out|mode:$mode|data:~music_start=$music_start~~music_mode=$music_mode~)";
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
    public function cloneWakeUp($idMission)
    {
        $wakeUp =  WakeUp::where('id_mission', $idMission)->get()->toArray();
        $wakeUpNew = array_map(function ($item) {
            unset($item['id']);
            $item['id_mission'] = $this->missionClone->id;
            return $item;
        }, $wakeUp);

        foreach ($wakeUpNew as $wakeUpItem) {
            WakeUp::insert($wakeUpItem);
        }
    }

    public function cloneStop($idMission)
    {
        $stop =  Stop::where('id_mission', $idMission)->get()->toArray();
        $stopNew = array_map(function ($item) {
            unset($item['id']);
            $item['id_mission'] = $this->missionClone->id;
            return $item;
        }, $stop);

        foreach ($stopNew as $stopItem) {
            Stop::insert($stopItem);
        }
    }
    public function filterItemNull($array)
    {
        $arrayNoNull = array_filter($array, function ($item) {
            if ($item) {
                return $item;
            };
        });
        return $arrayNoNull;
    }
}
