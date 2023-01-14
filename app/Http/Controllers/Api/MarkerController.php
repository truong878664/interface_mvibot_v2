<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\MissionMarker;
use App\Models\backend\TypeMission;
use Illuminate\Http\Request;

class MarkerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MissionMarker::all();
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
        $marker_type = $request->marker_type;
        $marker_dir = $this->checkDataMarker($request->marker_dir);
        $off_set_x1 = $this->checkDataMarker($request->off_set_x1);
        $off_set_x2 = $this->checkDataMarker($request->off_set_x2);
        $off_set_y1 = $this->checkDataMarker($request->off_set_y1);
        $off_set_y2 = $this->checkDataMarker($request->off_set_y2);
        $off_set_dis = $this->checkDataMarker($request->off_set_dis);
        $off_set_angle = $this->checkDataMarker($request->off_set_angle);
        $sx1 = $request->sx1;
        $sx2 = $request->sx2;
        $sy1 = $request->sy1;
        $sy2 = $request->sy2;


        $dataMarker = [
            'name_marker' => $name_type,
            'marker_type' => $marker_type,
            'marker_dir' => $marker_dir,
            'off_set_x1' => $off_set_x1,
            'off_set_x2' => $off_set_x2,
            'off_set_y1' => $off_set_y1,
            'off_set_y2' => $off_set_y2,
            'off_set_dis' => $off_set_dis,
            'off_set_angle' => $off_set_angle,
            'sx1' => $sx1,
            'sx2' => $sx2,
            'sy1' => $sy1,
            'sy2' => $sy2,
        ];

        MissionMarker::create($dataMarker);
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
        $itemDelete = MissionMarker::where('id', $id)->first();

        $itemName =  "$itemDelete->mode#$itemDelete->name_marker#$itemDelete->id";

        $this->updateStepDelete($itemName);

        MissionMarker::where('id', $id)->delete();
        return ['message' => 'delete marker success'];
    }
    public function checkDataMarker($dataCheck)
    {
        if ($dataCheck) {
            $data = $dataCheck;
        } else {
            $data = null;
        }
        return $data;
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