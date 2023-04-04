<?php

namespace App\Http\Controllers;

use App\Models\backend\Missions;
use App\Models\backend\TypeMission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function updateStepDelete($itemName)
    {
        $allTypeMission = TypeMission::all();

        foreach ($allTypeMission as $item) {
            switch ($item->type) {
                case 'normal':
                    $arrayData = explode("|", $item->data);
                    $arrayDataNew = [];
                    foreach ($arrayData as $itemStep) {
                        if ($itemStep != $itemName) {
                            array_push($arrayDataNew, $itemStep);
                        }
                    }

                    if (count($arrayDataNew) == 0) {
                        TypeMission::where('id', $item->id)->delete();

                        $allMissions = Missions::all();

                        foreach ($allMissions as $mission) {
                            $mission_shorthand = explode('+', $mission->mission_shorthand);
                            $new_mission_shorthand = [];
                            foreach ($mission_shorthand as $mission_type_item) {
                                if ($mission_type_item != $item->id) {
                                    array_push($new_mission_shorthand, $mission_type_item);
                                }
                            }
                            Missions::where('id', $mission->id)->update(['mission_shorthand' => implode("+",  $new_mission_shorthand)]);
                        }
                    } else {
                        TypeMission::where('id', $item->id)->update(['data' => implode("|", $arrayDataNew)]);
                    }
                    break;
                case 'ifelse':
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

                        $allMissions = Missions::all();

                        foreach ($allMissions as $mission) {
                            $mission_shorthand = explode('+', $mission->mission_shorthand);
                            $new_mission_shorthand = [];
                            foreach ($mission_shorthand as $mission_type_item) {
                                if ($mission_type_item != $item->id) {
                                    array_push($new_mission_shorthand, $mission_type_item);
                                }
                            }
                            Missions::where('id', $mission->id)->update(['mission_shorthand' => implode("+",  $new_mission_shorthand)]);
                        }
                    } else {
                        TypeMission::where('id', $item->id)->update(['data' => $newData]);
                    }
                    break;

                case 'trycatch':
                    $arrayData = explode("?", $item->data);

                    $arrayTry = explode("|", $arrayData[0]);
                    $arrayCatch = explode("|", $arrayData[1]);


                    $arrayDataTryNew = [];
                    foreach ($arrayTry as $itemStepTry) {
                        if ($itemStepTry != $itemName && $itemStepTry != "") {
                            array_push($arrayDataTryNew, $itemStepTry);
                        }
                    }

                    $arrayDataCatchNew = [];
                    foreach ($arrayCatch as $itemStepCatch) {
                        if ($itemStepCatch != $itemName && $itemStepCatch != "") {
                            array_push($arrayDataCatchNew, $itemStepCatch);
                        }
                    }

                    $newData = implode("|", $arrayDataTryNew) . "?" . implode("|", $arrayDataCatchNew);

                    // if (count($arrayDataTryNew) == 0 || (count($arrayDataCatchNew) == 0)) {
                    if (count($arrayDataTryNew) == 0) {
                        TypeMission::where('id', $item->id)->delete();
                        $allMissions = Missions::all();

                        foreach ($allMissions as $mission) {
                            $mission_shorthand = explode('+', $mission->mission_shorthand);
                            $new_mission_shorthand = [];
                            foreach ($mission_shorthand as $mission_type_item) {
                                if ($mission_type_item != $item->id) {
                                    array_push($new_mission_shorthand, $mission_type_item);
                                }
                            }
                            Missions::where('id', $mission->id)->update(['mission_shorthand' => implode("+",  $new_mission_shorthand)]);
                        }
                    } else {
                        TypeMission::where('id', $item->id)->update(['data' => $newData]);
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
