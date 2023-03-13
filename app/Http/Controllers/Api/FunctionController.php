<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Map;
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
use Illuminate\Support\Facades\DB;

class FunctionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mapActive = Map::first();

        $data = [
            'footprint' => MissionFootprint::all(),
            'gpio' => MissionGpio::all(),
            'marker' => MissionMarker::all(),
            'sleep' => MissionSleep::all(),
            'position' => MissionPosition::where('map', $mapActive->name_map_active)->get(),
            'gpio_module' => MissionGpioModule::all(),
            'variable' => MissionVariable::all(),
            'sound' => MissionSound::all(),
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
        $idFunction = $request->idSelects;
        $table = $request->table;

        $functions = DB::table($table)->whereIn("id", $idFunction)->get();
        foreach ($functions as $function) {
            $newFunction = $function;
            unset($newFunction->id);
            $nameFunction = ($function->mode === 'variable') ? 'name_function_' . $function->mode : (($function->mode === 'gpio_module') ? 'name_gpio' : ('name_' . $function->mode));
            $newFunction->$nameFunction = $function->$nameFunction . "_copy";
            DB::table($table)->insert((array) $newFunction);
        };
        return ['message' => 'copy successfully!'];
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
    public function destroy(Request $request, $function)
    {

        // $idFunction = $request->idSelects;
        // $table = $request->table;

        // $functions = DB::table($table)->whereIn("id", $idFunction)->get();

        // $itemDelete = MissionFootprint::where('id', $id)->first();
        // $itemName =  "$itemDelete->mode#$itemDelete->name_footprint#$itemDelete->id";



        // //function at controller.php
        // $this->updateStepDelete($itemName);


        $deletes = $request->deletes;
        DB::table($function)->whereIn('id', $deletes)->delete();
    }
}
