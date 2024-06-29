<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionPosition;
use App\Models\backend\Missions;
use App\Models\backend\Start;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\MiController;
use App\Models\backend\MissionsVer;

class StartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            $dataStart = Start::all()->first();
            switch ($request->type) {
                case 'all':
                    $allMission = MissionsVer::all();
                    $allPosition = MissionPosition::all();
                    return [
                        "missionList" => $allMission,
                        "positionList" => $allPosition,
                        'selectedList' => $dataStart
                    ];
                    break;
                default:
                    if ($dataStart) {
                        return ["data" => $dataStart, "error" => false, "message" => "Get data successfully!"];
                    } else {
                        return ["data" => [], "error" => true, "message" => "Currently no data, please create data start at tab config!"];
                    }
                    break;
            }
        } catch (\Throwable $th) {
            return ["data" => [], "error" => true, "message" => $th];
        }
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

        return null;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // if(!$data->count()) {
        //     // $data_s = Start::insert(["name_seri"=> $id]);
        //     return [123];
        // };
        // return $data;
        //         // if()
        //         return [$data]; 

        //code...
        // switch ($id) {
        //     case 'get-detail-start':
        //         $dataStart = Start::all()->first();
        //         if ($dataStart) {
        //             $data_position_with_toollift = $dataStart->position_with_toollift !== null ? json_decode($dataStart->position_with_toollift) : [];
        //             $data_position_no_toollift = $dataStart->position_no_toollift !== null ? json_decode($dataStart->position_no_toollift) : [];
        //             $data_mission_go_to_toollift = $dataStart->mission_go_to_toollift !== null ? json_decode($dataStart->mission_go_to_toollift) : [];


        //             $idPositionWithToollift = count($data_position_with_toollift) > 0 ?  $data_position_with_toollift[0]->id : null;
        //             $idPositionNoToollift = count($data_position_no_toollift) > 0 ? $data_position_no_toollift[0]->id : null;
        //             $idMissionToollift = count($data_mission_go_to_toollift) > 0 ? $data_mission_go_to_toollift[0]->id : null;

        //             $miController = new MissionV4Controller();

        //             $missionGotoToollift = $miController->dataRobotEnd($idMissionToollift);
        //             $positionWithToollift = MissionPosition::where("id", $idPositionWithToollift)->first();
        //             $positionNoToollift = MissionPosition::where("id", $idPositionNoToollift)->first();

        //             $dataMissionSendToRobots = array_map(function ($mission) use ($miController) {
        //                 $mission = $miController->dataRobotEnd($mission->id);
        //                 return $mission;
        //             }, json_decode($dataStart->missions_send_robot));

        //             $data = [
        //                 "missionGotoToollift" => $missionGotoToollift,
        //                 "positionWithToollift" => $positionWithToollift,
        //                 "positionNoToollift" => $positionNoToollift,
        //                 "dataMissionSendToRobot" => implode("", $dataMissionSendToRobots),
        //             ];
        //             return ["data" => $data, "message" => "get data successfully!", "error" => false];
        //             break;
        //         } else {
        //             return ["data" => null, "message" => "data empty", "error" => true];
        //         }
        //     default:
        //         $data = Start::where("name_seri", $id)->get();
        //         // if()
        //         return [$data]; 
        //         break;
        // }
        // } catch (\Throwable $th) {
        //     return ["data" => null, "message" => "Error" . $th, "error" => false];
        // }
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
        try {
            if (Start::all()->first()) {
                Start::all()->first()->update($request->all());
            } else {
                Start::insert($request->all());
            }
            return ["message" => "save data start successfully!", "error" => false];
        } catch (\Throwable $th) {
            return ["message" => "Error!" . $th, "error" => true];
        }
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
}
