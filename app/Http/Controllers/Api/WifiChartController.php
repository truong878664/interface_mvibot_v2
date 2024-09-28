<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WifiChartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = $request->query();

        $data = DB::table("Wifi_signal_strength")
            ->where("ssid", $query["ssid"])
            ->where("created_at", "<=", $query["created_at"]["lte"])
            ->where("created_at", ">=", $query["created_at"]["gte"]);

        if (array_key_exists("location", $query)) {
            $data->where("location", $query["location"]);
        }
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
    public function show($pathname)
    {
        $ssid = DB::table("Wifi_signal_strength")->select("ssid")->distinct()->get();
        if ($pathname === "ssid") {
            return ["data" => $ssid];
        } else if ($pathname === "ssid-location") {
            $location = DB::table("Wifi_signal_strength")->select("location")->distinct()->get();
            return ["data" => ["ssid" => $ssid, "location" => $location]];
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