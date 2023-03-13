<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mi;
use App\Models\backend\Missions;
use App\Models\backend\TypeMission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TypeMissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TypeMission::all();
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
        switch ($request->method) {
            case 'multi':
                $idTypeMission = $request->idSelects;

                $typeMissions = DB::table('type_missions')->whereIn("id", $idTypeMission)->get();
                foreach ($typeMissions as $typeMission) {
                    $newTypeMission = $typeMission;
                    unset($newTypeMission->id);
                    $newTypeMission->name = $typeMission->name . "_copy";
                    DB::table('type_missions')->insert((array) $newTypeMission);
                };
                return ['message' => 'copy successfully!'];
                break;

            default:

                return TypeMission::create($request->all());
                break;
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
        return TypeMission::where('id', $id)->first();
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
    public function update(Request $request, $method)
    {
        switch ($method) {
            case "update-name-step":
                $allTypeMission = TypeMission::all();
                foreach ($allTypeMission as $item) {
                    $newData = str_replace($request->stepOld, $request->stepNew, $item->data);
                    TypeMission::where('id', $item->id)->update(['data' => $newData]);
                }
                return 123;
                break;
            default:
                return TypeMission::where('id', $method)->update($request->all());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $allMission =  Missions::select('mission_shorthand', 'id')->get();


        switch ($request->method) {
            case 'multi':
                $deletes = $request->deletes;
                DB::table('type_missions')->whereIn('id', $deletes)->delete();
                
                foreach ($allMission as $mission) {
                    $arr_mission_shorthand = explode('+', $mission->mission_shorthand);

                        $new_mission_shorthand =  array_filter($arr_mission_shorthand, function ($id_type_mission) use ($deletes) {
                            return !in_array($id_type_mission, $deletes);
                        });
                        
                        Missions::where('id', $mission->id)->update(['mission_shorthand' => implode("+", $new_mission_shorthand)]);
                }

                return ['message'=>'Delete type mission success!'];
                break;
            default:
                TypeMission::where('id', $id)->delete();


                foreach ($allMission as $mission) {
                    $arr_mission_shorthand = explode('+', $mission->mission_shorthand);
                    $new_mission_shorthand =  array_filter($arr_mission_shorthand, function ($id_type_mission) use ($id) {
                        return $id_type_mission !== $id;
                    });

                    Missions::where('id', $mission->id)->update(['mission_shorthand' => implode("+", $new_mission_shorthand)]);
                }

                return ['message' => 'Delete type mission success', 'deleted' => true];
                break;
        }
    }
}
