<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Map;
use App\Models\backend\MissionConfig;
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
        $nameMapActive = $mapActive ? $mapActive->name_map_active : "no_map";
        $data = [
            'footprint' => MissionFootprint::all(),
            'gpio' => MissionGpio::all(),
            'marker' => MissionMarker::all(),
            'sleep' => MissionSleep::all(),
            'position' => MissionPosition::where('map', $nameMapActive)->get(),
            'gpio_module' => MissionGpioModule::all(),
            'variable' => MissionVariable::all(),
            'sound' => MissionSound::all(),
            'config' => MissionConfig::all(),
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
            $newFunction->name = $function->name . "_copy";
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
        $deletes = $request->deletes;


        $functions = DB::table($function)->whereIn('id', $deletes)->get();

        foreach ($functions as $function2) {
            $itemName =  "$function2->mode#$function2->name#$function2->id";
            $this->updateStepDelete($itemName);
        }

        DB::table($function)->whereIn('id', $deletes)->delete();
        return ['message' => 'delete function item successfully!', 'deleted' => true];
    }
}
