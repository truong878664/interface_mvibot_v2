<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\BatteryChart;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// id, created_at, soc, YEAR(created_at) as year, MONTH(created_at) as month, DAY(created_at) as day,
// HOUR(created_at)+ (MINUTE(created_at)/60) as decimal_hour,
// TIME(created_at) as time, HOUR(created_at) as hour, MINUTE(created_at) as minute, WEEKOFYEAR(created_at) as week_of_year,
// CONCAT_WS('-',DAY(created_at), MONTH(created_at)) as label_day, CONCAT(HOUR(created_at), 'h:',MINUTE(created_at),'m') as label_hour
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


        $data = BatteryChart::select(
            DB::raw("*, 
            HOUR(created_at) + MINUTE(created_at)/60 as 'hour',
            CONCAT_WS('h',LPAD(HOUR(created_at), 2, '0'), LPAD(MINUTE(created_at),2, '0')) as 'time',
            DAY(created_at) as 'day',
            DATE_FORMAT(created_at, '%b %d, %Y %Hh%i') as 'dateFormat',
            soc as 'value',
            WEEKOFYEAR(created_at) as 'weekOfYear',
            UNIX_TIMESTAMP(created_at) as 'label'"),
        )->where("name_seri", $query["name_seri"])
        ->where("created_at", "<=", $query["created_at"]["lte"])
        ->where("created_at", ">=", $query["created_at"]["gte"]);
        // if ($query["period"] === "day") {
        // } else if ($query["period"] === "week") {
        //     $date = strtotime($query["created_at"]["equal"]);
        //     $week = date("W", $date);
        //     $data->whereRaw("WEEKOFYEAR(created_at) = ?", [$week]);
        // }
        return ["data" => $data->get()];
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