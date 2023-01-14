<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\MissionFootprint;
use App\Models\backend\MissionPosition;
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
        $name_type = $request->name_type;
        $x1 = -$request->x1;
        $x2 = $request->x2;
        $y1 = -$request->y1;
        $y2 = $request->y2;

        $dataFootprint = [
            "name_footprint" => $name_type,
            "x1" => $x1,
            "y1" => $y1,
            "x2" => $x2,
            "y2" => $y2,
        ];

        MissionFootprint::create($dataFootprint);
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
        $itemName =  "$itemDelete->mode#$itemDelete->name_footprint#$itemDelete->id";
        $this->updateStepDelete($itemName);

        MissionFootprint::where('id', $id)->delete();
        return ['message' => 'delete footprint success'];
    }

    public function updateStepDelete($itemName)
    {
        $allTypeMission = TypeMission::all();

        foreach ($allTypeMission as $item) {
            if ($item->type == 'normal') {
                $arrayData = explode("|", $item->data);

                $arrayDataNew = [];
                foreach ($arrayData as $itemStep) {
                    if ($itemStep != $itemName) {
                        array_push($arrayDataNew, $itemStep);
                    }
                }

                if (count($arrayDataNew) == 0) {
                    TypeMission::where('id', $item->id)->delete();

                    $allMissions = Mi::all();

                    foreach ($allMissions as $mission) {
                        $mission_shorthand = explode('+', $mission->mission_shorthand);
                        $new_mission_shorthand = [];
                        foreach ($mission_shorthand as $mission_type_item) {
                            if ($mission_type_item != $item->id) {
                                array_push($new_mission_shorthand, $mission_type_item);
                            }
                        }
                        Mi::where('id', $mission->id)->update(['mission_shorthand' => implode("+",  $new_mission_shorthand)]);
                    }
                } else {
                    TypeMission::where('id', $item->id)->update(['data' => implode("|", $arrayDataNew)]);
                }
            } else if ($item->type == 'ifelse') {
                $arrayData = explode("?", $item->data);

                $arrayIf = explode("|", $arrayData[0]);
                $arrayThen = explode("|", $arrayData[1]);
                $arrayElse = explode("|", $arrayData[2]);

                $arrayDataIfNew = [];
                foreach ($arrayIf as $itemStepIf) {
                    if ($itemStepIf != $itemName && $itemStepIf != "") {
                        array_push($arrayDataIfNew, $itemStepIf);
                    }
                }

                $arrayDataThenNew = [];
                foreach ($arrayThen as $itemStepThen) {
                    if ($itemStepThen != $itemName && $itemStepIf != "") {
                        array_push($arrayDataThenNew, $itemStepThen);
                    }
                }

                $arrayDataElseNew = [];
                foreach ($arrayElse as $itemStepElse) {
                    if ($itemStepElse != $itemName && $itemStepIf != "") {
                        array_push($arrayDataElseNew, $itemStepElse);
                    }
                }

                $newData = implode("|", $arrayDataIfNew) . "?" . implode("|", $arrayDataThenNew) . "?" . implode("|", $arrayDataElseNew);

                if (count($arrayDataIfNew) == 0 || (count($arrayDataThenNew) == 0 || count($arrayDataElseNew) == 0)) {
                    TypeMission::where('id', $item->id)->delete();

                    $allMissions = Mi::all();

                    foreach ($allMissions as $mission) {
                        $mission_shorthand = explode('+', $mission->mission_shorthand);
                        $new_mission_shorthand = [];
                        foreach ($mission_shorthand as $mission_type_item) {
                            if ($mission_type_item != $item->id) {
                                array_push($new_mission_shorthand, $mission_type_item);
                            }
                        }
                        Mi::where('id', $mission->id)->update(['mission_shorthand' => implode("+",  $new_mission_shorthand)]);
                    }
                } else {
                    TypeMission::where('id', $item->id)->update(['data' => $newData]);
                }
            }
        }
    }
}