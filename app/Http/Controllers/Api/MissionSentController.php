<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\MissionSent;
use App\Models\backend\MissionsVer;
use Illuminate\Http\Request;

class MissionSentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
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
        try {
            $name_seri = $request->name_seri;
            $currentMissionRobotSent = MissionSent::where("name_seri", $name_seri)->first();
            $missionSentList = $request->missionSentList;
            $foundMissionSentList = MissionsVer::whereIn("id", $missionSentList)->get();
            if ($currentMissionRobotSent) {
                $currentMissionRobotSentArray =  json_decode($currentMissionRobotSent->mission_sent);
                foreach ($foundMissionSentList as $mission) {
                    $indexFound = array_search($mission->id, array_column($currentMissionRobotSentArray, 'id'));
                    if ($indexFound !== false) {
                        $currentMissionRobotSentArray[$indexFound] = $mission;
                    } else {
                        array_push($currentMissionRobotSentArray, $mission);
                    }
                }
                MissionSent::where("name_seri", $name_seri)->update(["mission_sent" => json_encode($currentMissionRobotSentArray)]);
            } else {
                MissionSent::create(["name_seri" => $name_seri, "mission_sent" => json_encode($foundMissionSentList)]);
            }

            return ["error" => false, "message" => "Save mission sent to robot successfully!"];
        } catch (\Throwable $th) {
            return ["error" => true, "message" => "ERR!,$th"];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($name_seri)
    {
        try {
            $currentMissionRobotSent = MissionSent::where("name_seri", $name_seri)->first();
            return ["error" => false, "message" => "get mission sent successfully", "data" => $currentMissionRobotSent];
        } catch (\Throwable $th) {
            return ["error" => true, "message" => "ERR!,$th", "data" => null];
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
