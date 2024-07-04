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
            "require" => RawMaterial::where("done", false)->where("cancel", false)->get(),
            "cancel" => RawMaterial::where("cancel", true)->orderBy("updated_at", "desc")->limit(5)->get(),
            "done" => RawMaterial::where("done", true)->orderBy("updated_at", "desc")->limit(5)->get(),
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

        $itemNotDone = RawMaterial::where("done", false)->where("cancel", false)->get();
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
        RawMaterial::where("id", $id)->update($request->all());
        return  RawMaterial::find($id);
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
