<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Mission;
use App\Models\backend\MissionBlock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MissionBlockController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return "this mission block";
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
            //code...
            $data = $request->data;
            $missionBlock = new MissionBlock();
            $missionNeedToUpdate = [];

            foreach ($data as $value) {
                $id = $value['id'];
                if ($missionBlock->where('id', $id)->exists()) {
                    array_push($missionNeedToUpdate, $value);
                } else {
                    $missionBlock->create($value);
                }
            }


            foreach ($missionNeedToUpdate as $valueUpdate) {
                $idUpdate = $valueUpdate['id'];
                unset($valueUpdate["created_at"]);
                unset($valueUpdate["updated_at"]);
                $missionBlock->where('id', $idUpdate)->update($valueUpdate);
            }

            return true;
        } catch (\Throwable $th) {
            return ["error"  => $th];
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
        $missionBlock = new MissionBlock();
        $data = $missionBlock->where("missionId", $id)->get();
        $mission = Mission::where("id", $id)->first();
        return [
            "data" => [
                "id" => (int)$id,
                "type" => $mission["type"],
                "name" => $mission["name"],
                "blocks" => $data
            ]
        ];
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