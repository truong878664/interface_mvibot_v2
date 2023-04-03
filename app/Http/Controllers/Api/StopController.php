<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\Missions;
use App\Models\backend\Stop;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;

class StopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $stop = Stop::where('id_mission', $request->id_mission)->where('type', $request->type)->first();
        return $stop ? $stop : [];
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

        if (Stop::where('id_mission', $request->id_mission)->where('type', $request->type)->count() > 0) {
            Stop::where('id_mission', $request->id_mission)->where('type', $request->type)->update($request->all());
        } else {
            Stop::insert($request->all());
        }

        $data = Stop::where('id_mission', $request->id_mission)->get();
        if(count($data) === 2) {
            Missions::where('id', $request->id_mission)->update(['stop' => $data[0]['data'] . $data[1]['data']]);
        } else {
            Missions::where('id', $request->id_mission)->update(['stop' => $data[0]['data']]);
        }

        return 123;
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
        //
    }
}
