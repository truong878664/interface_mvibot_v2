<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionPosition;
use App\Models\backend\Missions;
use Illuminate\Http\Request;

class PositionController extends Controller
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
        // $name_position = $request->name_position;
        // $x = $request->x;
        // $y = $request->y;
        // $z = $request->z;
        // $w = $request->w;
        // $time_out = $request->time_out;
        // $color_position = $request->color_position;
        // $mode_position = $request->mode_position;
        // $mode_child = $request->mode_child;
        // $created_at = Carbon::now();
        // $map = $request->map;


        // MissionPosition::create($dataPosition);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        MissionPosition::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $deleteName = MissionPosition::where('id', $id)->get()->toArray()[0]['name_position'];
        // $nameStepMissionDelete = "|position#$deleteName";
        // $missions = Missions::all();
        // foreach ($missions as $mission) {
        //     $newString = str_replace("$nameStepMissionDelete", "", $mission->steps_mission_name);
        //     Missions::where('id', $mission->id)->update(["steps_mission_name" => $newString]);
        // }
        // MissionPosition::where('id', $id)->delete();


        $deleteName = MissionPosition::where('id', $id)->get()->toArray()[0]['name_position'];
        $nameStepMissionDelete = "|position#$deleteName#$id";
        $missions = Missions::all();
        $arr = [];
        foreach ($missions as $mission) {
            $newString = str_replace("$nameStepMissionDelete", "", $mission->steps_mission_name);
            Missions::where('id', $mission->id)->update(["steps_mission_name" => $newString]);
            array_push($arr, $newString);
        }
        MissionPosition::where('id', $id)->delete();
    }
}