<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionPosition;
use App\Models\backend\MissionsVer;
use App\Models\backend\Reset;
use Illuminate\Http\Request;
use Spatie\FlareClient\Api;

class ResetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {}

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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $userId = auth("api")->user()->id;

        $data = Reset::where("name_seri", $id)->where("user_id", $userId)->first();
        $allMission = MissionsVer::where("deleted", false)->get();
        $allPosition = MissionPosition::all();
        if (!$data) {
            $data = Reset::create([
                "name_seri" => $id,
                "user_id" => $userId,
                "position_no_toollift" => null,
                "mission_go_to_toollift" => null,
                "missions_send_robot" => null,
            ]);
        }
        return [
            "missionList" => $allMission,
            "positionList" => $allPosition,
            'data' => $data
        ];
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
        $userId = auth("api")->user()->id;
        $data = [
            "mission_go_to_toollift" => $request->mission_go_to_toollift,
            "missions_send_robot" => $request->missions_send_robot,
            "position_no_toollift" => $request->position_no_toollift
        ];
        Reset::where("name_seri", $id)->where("user_id", $userId)->update($data);
        return $request->all();
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