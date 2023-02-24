<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\StatusRobot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
    public function show($robot)
    {
        $status_robot = StatusRobot::where('name_seri', $robot)->first();
        $battery_status = DB::table('battery_status')->where('name_seri', $robot)->first();
        $sensor_status = DB::table('sensor_status')->where('name_seri', $robot)->first();
        $robot_config_status = DB::table('robot_config_status')->where('name_seri', $robot)->select('serial_camera1', 'serial_camera2')->first();
        $motor_left_status = DB::table('motor_left_status')->where('name_seri', $robot)->select('live', 'error', 'enable', 'brake')->first();
        $motor_right_status = DB::table('motor_right_status')->where('name_seri', $robot)->select('live', 'error', 'enable', 'brake')->first();

        $status_robot =  $status_robot ? $status_robot : [        
            "name_seri" => "-",
            "status" => "-",
            "mode" => "-",
            "mode_status" => "-",
            "ip_node" => "-",
            "ip_master" => "-",
            "type_connect" => "-",

        ];
        $battery_status =  $battery_status ? $battery_status : [
            "name_seri" => "-",
            "soc" => "-",
            "vol" => "-",
            "cycle" => "-",
            "capacity_now" => "-",
            "capacity_max" => "-",
            "charge" => "-",
            "current" => "-",
            "num_cell" => "-",
            "temperature" => "-",
        ];
        $sensor_status =  $sensor_status ? $sensor_status : [
            "name_seri" => "-",
            "radar1" => "-",
            "radar2" => "-",
            "camera1" => "-",
            "camera2" => "-",
            "uart" => "-",
        ];
        $robot_config_status =  $robot_config_status ? $robot_config_status : [
            "serial_camera1" => "-",
            "serial_camera2" => "-"
        ];
        $motor_left_status =  $motor_left_status ? $motor_left_status : [
            "live" => "-",
            "error" => "-",
            "enable" => "-",
            "brake" => "-"
        ];
        $motor_right_status =  $motor_right_status ? $motor_right_status : [
            "live" => "-",
            "error" => "-",
            "enable" => "-",
            "brake" => "-"
        ];

        $data = array_merge(
            json_decode(json_encode($status_robot), true),
            json_decode(json_encode($battery_status), true),
            json_decode(json_encode($sensor_status), true),
            json_decode(json_encode($robot_config_status), true),
            [
                'motor_left' => $motor_left_status,
                'motor_right' => $motor_right_status,

            ]
        );


        return $data;
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
