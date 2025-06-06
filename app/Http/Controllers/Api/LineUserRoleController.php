<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LineUserRoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = auth('api')->user();

        $line =  DB::table('line_user_role')
            ->where('userID', $user->id)
            ->join('line', "line_user_role.lineID", "=", "line.id");

        $lineList = $line->select(["line.id as lineID", "line.name as lineName"])->get();
        $produceList = $line
            ->join('produce_code', "line.id", "=", "produce_code.lineID")
            ->select(["produce_code.lineID", "produce_code.code as produceCode", "line.name as lineName", DB::raw("CONCAT_WS(' - ',line.name,produce_code.code) as produceName")])
            ->get();

        return ['data' => [
            'produceList' => $produceList,
            'lineList' => $lineList
        ]];
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        $line = DB::table("line_user_role")
        ->where("userID", $userId)
            ->join("config_line_gpio", "config_line_gpio.line_id", "=", "line_user_role.lineID")->get();
        return $line;
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