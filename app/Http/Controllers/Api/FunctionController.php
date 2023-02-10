<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionFootprint;
use App\Models\backend\MissionGpio;
use App\Models\backend\MissionGpioModule;
use App\Models\backend\MissionMarker;
use App\Models\backend\MissionPosition;
use App\Models\backend\Missions;
use App\Models\backend\MissionSleep;
use App\Models\backend\MissionSound;
use App\Models\backend\MissionVariable;
use Illuminate\Http\Request;

class FunctionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {


        $data = [
            'footprint' => MissionFootprint::all(),
            'gpio' => MissionGpio::all(),
            'marker' => MissionMarker::all(),
            'sleep' => MissionSleep::all(),
            'position' => MissionPosition::all(),
            'gpio_module'=> MissionGpioModule::all(),
            'variable'=> MissionVariable::all(),
            'sound'=> MissionSound::all(),
        ];
        return $data;
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
