<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\RawMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RawMaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        return [
            "require" => RawMaterial::whereIn("status", array("require", "processing"))->get(),
            "cancel" => RawMaterial::where("status", "cancel")->limit(5)->get(),
            "done" => RawMaterial::where("status", "done")->limit(5)->get(),
        ];
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

        $itemNotDone = RawMaterial::whereNotIn("status", array("cancel", "done"))->get();
        if (count($itemNotDone) >= 2) {
            return [
                'success' =>  false,
                'msg' => "Raw material request is full",
                'data' => null
            ];
        }
        return [
            'success' => true,
            'msg' => 'success',
            'data' => RawMaterial::create($request->all())
        ];
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
        $currentRaw = RawMaterial::find($id);
        $user = auth('api')->user();
        $status = $request->status;
        if ($user->line !== "QLSX") {
            if ($currentRaw->status === "processing") {
                return response(["message" => "Cannot cancel, QLSX is processing"], 409);
            }
            if ($currentRaw->status === "done") {
                return ['data' => []];
            }
        }

        RawMaterial::where("id", $id)->update($request->all());
        return [
            'data' => RawMaterial::find($id),
            'jwt' => auth('api')->user(),
            'status' => $status = $request->status,
            'line' => $user->line
        ];
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
