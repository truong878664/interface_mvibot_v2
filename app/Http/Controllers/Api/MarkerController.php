<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\MissionMarker;
use App\Models\backend\Missions;
use App\Models\backend\TypeMission;
use Illuminate\Http\Request;

class MarkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MissionMarker::all();
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
        $marker_type = $request->marker_type;
        $time_out = $request->time_out;
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
            'name' => $name,
            'time_out' => $time_out,
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

        return MissionMarker::create($dataMarker);
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
        $itemDelete = MissionMarker::where('id', $id)->first();

        $itemName =  "$itemDelete->mode#$itemDelete->name#$itemDelete->id";

        //function at controller.php
        $this->updateStepDelete($itemName);

        MissionMarker::where('id', $id)->delete();
        return ['message' => 'delete marker success'];
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
