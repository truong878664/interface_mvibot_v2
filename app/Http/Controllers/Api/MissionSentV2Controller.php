<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionSent;
use App\Models\backend\MissionSentV2;
use App\Models\backend\MissionsVer;
use Illuminate\Http\Request;

class MissionSentV2Controller extends Controller
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
        $ids =  $request->ids;
        $listMission = MissionsVer::whereIn("id", $ids)->select('id as id_mission', 'name', 'mission_shorthand AS data')->get();
        foreach ($listMission as $mission) {

            $idMission = $mission['id_mission'];
            $name = $mission['name'];
            $data = $mission['data'];

            $currentMissionSent = MissionSentV2::where('id_mission', $idMission)->first();

            if ($currentMissionSent) {
                MissionSentV2::where('id_mission', $idMission)->update(['name' => $name, 'data' => $data]);
            } else {
                MissionSentV2::insert([
                    'id_mission' => $idMission,
                    'name' => $name,
                    'data' => $data
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return MissionSentV2::where('id_mission', $id)->first();
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