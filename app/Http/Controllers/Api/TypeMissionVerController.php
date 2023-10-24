<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\v4\TypeMissionVer;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class TypeMissionVerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $type_mission = $request['type-mission'];
        return TypeMissionVer::where("type_mission", $type_mission)->get();
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
            $typeMission = TypeMissionVer::create($request->all());
            return ["saved" => true, "message" => "Save block step successfully!", "error" => null, "id" => $typeMission->id, "name" => $typeMission->name];
        } catch (\Throwable $th) {
            throw $th;
            // return ["saved" => false, "message" => "Save block step error!", "error" => $th];
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
        try {

            $dataTypeMission = TypeMissionVer::where("id", $id)->first();
            return [
                "message" => "Get data successfully!", "error" => false, "data" => $dataTypeMission
            ];
        } catch (\Throwable $th) {
            return [
                "message" => "Error!" . $th, "error" => true, "data" => null
            ];
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
        try {
            $data = $request->data;
            $name = $data['name'];
            TypeMissionVer::where("id", $id)->update(['data' => $request->data, 'name' => $name]);
            return ["message" => "update type mission successfully", "error" => false];
        } catch (\Throwable $th) {
            return ["message" => "ERR!" . $th, "error" => true];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            TypeMissionVer::where("id", $id)->delete();
            return ["deleted" => true, "message" => "Delete type mission id:$id, successfully!", "error" => null];
        } catch (\Throwable $th) {
            return ["deleted" => false, "message" => "Delete type mission id:$id, ERROR!", "error" => $th];
        }
    }
}
