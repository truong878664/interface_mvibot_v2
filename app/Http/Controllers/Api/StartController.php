<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionPosition;
use App\Models\backend\Missions;
use App\Models\backend\Start;
use Illuminate\Http\Request;

class StartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $dataStart = Start::all()->first();
            if ($dataStart) {
                return ["data" => $dataStart, "error" => false, "message" => "Get data successfully!"];
            } else {
                return ["data" => [], "error" => true, "message" => "Currently no data, please create data start at tab config!"];
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
        try {
            //code...
            switch ($id) {
                case 'get-detail-start':
                    $dataStart = Start::all()->first();
                    $idPositionWithToollift = json_decode($dataStart->position_with_toollift)[0]->id;
                    $idPositionNoToollift = json_decode($dataStart->position_no_toollift)[0]->id;
                    $idMissionToollift = json_decode($dataStart->mission_go_to_toollift)[0]->id;

                    $missionGotoToollift =  Missions::where("id", $idMissionToollift)->first();
                    $positionWithToollift = MissionPosition::where("id", $idPositionWithToollift)->first();
                    $positionNoToollift = MissionPosition::where("id", $idPositionNoToollift)->first();

                    $list_id = array_map(function ($mission) {
                        return $mission->id;
                    }, json_decode($dataStart->missions_send_robot));

                    $dataMissionSendToRobot = array_map(function ($item) {
                        return Missions::where('id', $item)->first();
                    }, $list_id);

                    $data = [
                        "missionGotoToollift" => $missionGotoToollift,
                        "positionWithToollift" => $positionWithToollift,
                        "positionNoToollift" => $positionNoToollift,
                        "dataMissionSendToRobot" => $dataMissionSendToRobot,
                    ];
                    return ["data" => $data, "message" => "get data successfully!", "error" => false];
                    break;
                default:
                    # code...
                    break;
            }
        } catch (\Throwable $th) {
            //throw $th;
            return ["data" => null, "message" => "Error" . $th, "error" => false];
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
        try {
            if (Start::where("id", 1)->first()) {
                Start::where("id", 1)->update($request->all());
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
