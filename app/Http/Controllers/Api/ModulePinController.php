<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\Line;
use App\Models\backend\ModulePinMaterial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModulePinController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = ModulePinMaterial::all()->groupBy("when");
        $line = Line::all();
        $userId = $request->userId;
        if($request->when) {
            if ($userId) {
                $lineValid = DB::table('line_user_role')->where('userID', $userId)->get();
                $lineValidArray = array_map(function ($item) {
                    return $item->lineID;
                }, $lineValid->toArray());
                $data = ModulePinMaterial::where('when', $request->when)->whereIn('lineID', $lineValidArray)->get();
            } else {
                $data = ModulePinMaterial::where('when', $request->when)->get();
            }
        }
        return [
            'data' => $data,
            'request' => $request->when,
            'included' => [
                'line' => $line,
            ]
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
        return ModulePinMaterial::create($request->all());
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
        return ModulePinMaterial::where('id', $id)->update($request->all());
        return ['request' => $request->all()];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $item = ModulePinMaterial::where('id', $id);
        $itemDelete = $item->first();
        $item->delete();
        return  $itemDelete;
    }
}