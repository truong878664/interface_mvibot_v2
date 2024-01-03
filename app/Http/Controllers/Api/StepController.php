<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionFootprint;
use App\Models\backend\MissionGpio;
use App\Models\backend\MissionGpioModule;
use App\Models\backend\MissionMarker;
use App\Models\backend\MissionSleep;
use App\Models\backend\MissionSound;
use App\Models\backend\MissionVariable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StepController extends Controller
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
    public function show(Request $request, $id)
    {
        switch ($request->type) {
            case 'footprint':
                return MissionFootprint::where('id', $request->id)->get();
                break;
            case 'gpio':
                return MissionGpio::where('id', $request->id)->get();
                break;
            case 'gpio_module':
                return MissionGpioModule::where('id', $request->id)->get();
                break;
            case 'marker':
                return MissionMarker::where('id', $request->id)->get();
                break;
            case 'sleep':
                return MissionSleep::where('id', $request->id)->get();
                break;
            case 'variable':
                return MissionVariable::where('id', $request->id)->get();
                break;
            case 'sound':
                return MissionSound::where('id', $request->id)->get();
                break;
            case 'config':
                return DB::table("mission_configs")->where('id', $request->id)->get();
                break;
            default:
                return ['status' => 200];
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
        $dataUpdate = $request->all();
        unset($dataUpdate['type']);
        DB::table("mission_$request->type" . "s")->where('id', $id)->update($dataUpdate);
        return  $dataUpdate;
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