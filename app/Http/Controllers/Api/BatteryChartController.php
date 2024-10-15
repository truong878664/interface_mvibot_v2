<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\BatteryChart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BatteryChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->query();
        $lte = $query["created_at"]["lte"];
        $gte =  $query["created_at"]["gte"];
        $dateDiff = ceil(abs((strtotime($lte) - strtotime($gte)) / (60 * 60 * 24)));

        $rawQuery = DB::raw(
            "id,
            CONCAT_WS('h',LPAD(HOUR(created_at), 2, '0'), LPAD(MINUTE(created_at),2, '0')) as 'time', 
            DATE_FORMAT(created_at, '%b %d, %Y %Hh%i') as 'dateFormat',
            soc as 'value',
            UNIX_TIMESTAMP(DATE_SUB(created_at, INTERVAL SECOND(created_at) SECOND)) * 1000 as 'label'
            "
        );
        $data = BatteryChart::select($rawQuery)
            ->where("name_seri", $query["name_seri"])
            ->where("created_at", "<=", $lte)
            ->where("created_at", ">=", $gte)
            ->whereRaw("MOD(MINUTE(created_at), ?) = 0", $dateDiff >= 20 ? 30 : ($dateDiff >= 5 ? 5 : 1));

        $result = $data->get();
        return [
            "meta" => [
                "count" => count($result)
            ],
            "data" => $result,
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
        //
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
        //
    }
}