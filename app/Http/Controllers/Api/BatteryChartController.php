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
        // return BatteryChart::all();
        $dt = new DateTime();
        $name_seri = $request->input('name_seri', '');
        $hour = $request->input('hour', $dt->format('H'));
        $day = $request->input('day', $dt->format('d'));
        $month = $request->input('month', $dt->format('m'));
        $year = $request->input('year', $dt->format('Y'));
        $period = $request->input('period', 'day');

        $date = "$year-$month-$day";
        $req = [];

        function query($name_seri, $query_date)
        {
            return DB::select("
                SELECT 
                    id, created_at, soc, HOUR(created_at) as hour, HOUR(created_at) + MINUTE(created_at)/60 as decimal_hour
                FROM battery_status_chart
                    WHERE name_seri = '$name_seri' 
                        AND $query_date
                ");
        };

        switch ($period) {
            case 'day':
                $req = query($name_seri, "YEAR(created_at) = $year && MONTH(created_at) = $month && DAY(created_at) = $day");
                break;
            case 'month':
                $req = query($name_seri, "YEAR(created_at) = $year && MONTH(created_at) = $month");
                break;
            case 'week':
                if ($request->has('number_of_week')) {
                    $number_of_week = $request->input('number_of_week');
                    $req = query($name_seri, "WEEKOFYEAR(created_at) = $number_of_week");
                    break;
                } else {
                    $req = query($name_seri, "WEEKOFYEAR(created_at) = WEEKOFYEAR('$date')");
                    break;
                }

            default:
                break;
        }
        return ["data" => $req];
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
