<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\v4\StepController;
use App\Http\Controllers\Controller;
use App\Models\backend\MissionsVer;
use App\Models\backend\v4\BlockStep;
use App\Models\backend\v4\Step;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

class MissionV4Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MissionsVer::all();;
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
        $name = $request->name;
        $type = $request->type;
        $mission = MissionsVer::create([
            "name" => $name,
            "type" => $type
        ]);
        return $mission;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {

        $kind = $request->kind;

        switch ($kind) {
            case 'get':
                $data = MissionsVer::where('id', $id)->first();
                if (!$data) {
                    return [];
                };
                return $data;
            case "get_by_type":
                $type = $request->type;
                if ($type) {
                    $data = MissionsVer::where('type', $type)->get();
                    return $data;
                } else return null;


            case 'get_by_name':
                $data = MissionsVer::where('name', $id)->first();
                if (!$data) {
                    return ["error" => true, "message" => "not found data!", "data" => []];
                };
                return ["error" => false, "message" => "get data successfully!", "data" => $data];

            case 'get_by_id':
                $data = MissionsVer::where('id', $id)->first();
                if (!$data) {
                    return ["error" => true, "message" => "not found data!", "data" => []];
                };
                return ["error" => false, "message" => "get data successfully!", "data" => $data];
                return 123;
            case "convert_data_robot":
                $html = json_decode($request->html);
                $mission = $this->translateDataRobot($id, $html);
                return $mission;
            case "convert_data_robot_multiple":
                $ids = explode(",", $request->ids);
                $dataMissions = array_map(function ($id) {
                    return $this->translateDataRobot($id, false);
                }, $ids);
                return $dataMissions;
                // return ["data" => $dataMissions, "error" => false, "message" => "get missions successfully!"];
            default:
                # code...
                break;
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
        MissionsVer::where('id', $id)->update($request->all());
        return ['ms' => $request->mission_shorthand];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            MissionsVer::where('id', $id)->delete();
            return ['message' => "Delete mission successfully!", "error" => false];
        } catch (\Throwable $th) {
            return ['message' => "ERR!" . $th, "error" => true];
        }
    }

    public function translateDataRobot($id, $html)
    {
        try {
            $dataMission = MissionsVer::where("id", $id)->first();
            $dataJson = $dataMission->mission_shorthand;
            $BlockStep = new BlockStep();
            $mission = json_decode($dataJson);
            $dataTranslateEndMission = array_map(function ($mission) use ($BlockStep, $html) {
                return $BlockStep->translate($mission, $html);
            }, $mission);
            $dataWakeup = $this->translateConfiguration($dataMission->wake_up, "wake_up");
            $dataStop = $this->translateConfiguration($dataMission->stop, "stop");
            $dataContinue = $this->translateConfiguration($dataMission->continue, "continue");

            $data = [
                "data" => implode("", $dataTranslateEndMission),
                "wakeup" => $dataWakeup,
                "stop" => $dataStop,
                "continue" => $dataContinue,
                "name" => $dataMission->name,
                "id" => $dataMission->id
            ];
        } catch (\Throwable $th) {
            $data = [
                "data" => null,
                "wakeup" => null,
                "stop" => null,
                "name" => null,
                "id" => null,
            ];
        }
        return $data;
    }

    public function translateConfiguration($data, $type)
    {
        try {
            $dataConfiguration = json_decode($data);
            $normalConfiguration = $dataConfiguration->normal;
            $moduleConfiguration = $dataConfiguration->module;

            $stringDataNormalConfiguration = $this->toStringConfiguration($normalConfiguration);
            $stringDataModuleConfiguration = $this->toStringConfiguration($moduleConfiguration);

            $dataNormal = $this->checkDataConfiguration($normalConfiguration) ? "(name:$type|time_out:-1|mode:gpio|data:$stringDataNormalConfiguration)" : null;
            $dataModule =  $this->checkDataConfiguration($moduleConfiguration) ? "(name:$type|time_out:-1|mode:gpio_module|data:$stringDataModuleConfiguration)" : null;
            return $dataNormal . $dataModule;
        } catch (\Throwable $th) {
            return "(name:wake_up|time_out:-1|mode:gpio|data:'')";
        }
    }
    public function toStringConfiguration($data)
    {
        $dataTranslate = [];
        foreach ($data as $key => $value) {
            if ($value || $value == 0) {
                array_push($dataTranslate, "~$key=$value~");
            }
        }
        $stringDataWakeup = implode("", $dataTranslate);
        return $stringDataWakeup;
    }
    public function checkDataConfiguration($data)
    {
        foreach ($data as $key => $value) {
            if ($key !== "not_set_out" && $key !== "name_seri") {
                if ($value === "0" || !empty($value)) {
                    return true;
                }
            }
        }
        return false;
    }
    public function dataRobotEnd($id)
    {
        try {
            $data = $this->translateDataRobot($id, false);
            $name = $data['name'];
            $idMission = $data['id'];
            $continue = $data['continue'];
            $wakeup = $data['wakeup'];
            $stop = $data['stop'];
            $dataMission = $data['data'];
            return "&/name_mission>$name//id_mission>$idMission//data_configuration>$continue$wakeup$stop/*$dataMission@";
        } catch (\Throwable $th) {
            return "";
        }
    }
}
