<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\MissionFootprint;
use App\Models\backend\MissionPosition;
use App\Models\backend\Missions;
use App\Models\backend\TypeMission;
use Illuminate\Http\Request;

class FootprintController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MissionFootprint::all();
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
        $footprintSaved = MissionFootprint::create($request->all());
        $footprintSaved->mode = "footprint";
        $footprintSaved->time_out = -1;
        return $footprintSaved;
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

        $itemDelete = MissionFootprint::where('id', $id)->first();
        $itemName =  "$itemDelete->mode#$itemDelete->name#$itemDelete->id";

        //function at controller.php
        $this->updateStepDelete($itemName);

        MissionFootprint::where('id', $id)->delete();
        return ['message' => 'delete footprint success'];
    }
}