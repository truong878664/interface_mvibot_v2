<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\v4\StepController;
use App\Http\Controllers\Controller;
use App\Models\backend\MissionsVer;
use App\Models\backend\v4\BlockStep;
use App\Models\backend\v4\Step;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

class MissionV4Controller extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mission = $this->translateDataRobot(2);
        return $mission;
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
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return MissionsVer::where('id', $id)->first();
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
        MissionsVer::where('id', $id)->update($request->all());
        return ['ms' => $request->mission_shorthand];
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

    public function translateDataRobot($id)
    {
        $dataJson = MissionsVer::where("id", $id)->first()->mission_shorthand;
        $BlockStep = new BlockStep();
        $mission = json_decode($dataJson);
        $dataTranslateEndMission = array_map(function($mission) use($BlockStep) {
            return $BlockStep->translate($mission);
        }, $mission);

        return implode("",$dataTranslateEndMission);
    }
}