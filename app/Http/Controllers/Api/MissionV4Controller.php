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
        $mission = $this->translateDataRobot(25, false);
        return $mission;
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
    public function show(Request $request, $id)
    {
        $kind = $request->kind;

        switch ($kind) {
            case 'get':
                return MissionsVer::where('id', $id)->first();
                break;
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
            $dataWakeup = $this->translateWakeupStop($dataMission->wake_up, "wake_up");
            $dataStop = $this->translateWakeupStop($dataMission->stop, "stop");

            $data = [
                "data" => implode("", $dataTranslateEndMission),
                "wakeup" => $dataWakeup,
                "stop" => $dataStop,
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

    public function translateWakeupStop($data, $type)
    {
        try {
            $dataWakeupStop = json_decode($data);
            $normalWakeupStop = $dataWakeupStop->normal;
            $moduleWakeupStop = $dataWakeupStop->module;

            $stringDataNormalWakeupStop = $this->toStringWakeupStop($normalWakeupStop);
            $stringDataModuleWakeupStop = $this->toStringWakeupStop($moduleWakeupStop);

            $dataNormal = $stringDataNormalWakeupStop ? "(name:$type|time_out:-1|mode:gpio|data:$stringDataNormalWakeupStop)" : null;
            $dataModule =  $stringDataModuleWakeupStop ? "(name:$type|time_out:-1|mode:gpio_module|data:$stringDataModuleWakeupStop)" : null;
            return $dataNormal . $dataModule;
        } catch (\Throwable $th) {
            return "(name:wake_up|time_out:-1|mode:gpio|data:'')";
        }
    }
    public function toStringWakeupStop($data)
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
}
