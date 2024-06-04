<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Layer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LayerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mapActive = DB::table("map_active")->first();
        return Layer::where("name_map_active", $mapActive->name_map_active)->get();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $dataLayer = json_decode($request->data_layer);
        // $array = json_decode(json_encode($dataLayer), true);
        try {
            $mapActive = DB::table("map_active")->first();
            $nameMapActive = $mapActive->name_map_active;
            switch ($request->type) {
                case 'listLayer':
                    Layer::insert($request->data);
                    return ["message" => "Ok", "data" => null];
                    break;
                default:
                    $dataLayer = $request->all();
                    $dataLayer["name_map_active"] = $nameMapActive;
                    Layer::insert($dataLayer);
                    return ["message" => "Ok", "data" => $dataLayer];
                    break;
            }
        } catch (\Throwable $th) {
            return ["message" => $th];
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
    public function update(Request $request, $name_layer)
    {
        try {
            Layer::where('name_layer', $name_layer)->update($request->all());
            return ['message' => 'update successfully.'];
        } catch (\Throwable $th) {
            return ['message' => 'something wrong, try again!', "error" => $th];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($name)
    {
        // return $request->all();
        Layer::where('name_layer', $name)->delete();

        return ["status" => 200];
    }
}