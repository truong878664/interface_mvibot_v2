<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\Missions;
use App\Models\backend\MissionSleep;
use App\Models\backend\TypeMission;
use Illuminate\Http\Request;

class SleepController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MissionSleep::all();
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
        $time_sleep = $request->time_sleep;

        $dataSleep = [
            "name" => $name,
            "time_sleep" => $time_sleep,
            "mode" => "sleep",
            "time_out" => $request->time_out ? $request->time_out : -1
        ];

        return  MissionSleep::create($dataSleep);
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
        $itemDelete = MissionSleep::where('id', $id)->first();
        $itemName =  "$itemDelete->mode#$itemDelete->name#$itemDelete->id";
        //function at controller.php
        $this->updateStepDelete($itemName);

        MissionSleep::where('id', $id)->delete();
        return ['message' => 'delete sleep success'];
    }
}
