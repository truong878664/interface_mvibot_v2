<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\StatusRobot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\TryCatch;

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
        try {

            $battery_status = DB::table('battery_status')->where('name_seri', $robot)->first();
            $sensor_status = DB::table('sensor_status')->where('name_seri', $robot)->first();
            $robot_config_status = DB::table('robot_config_status')->where('name_seri', $robot)->select('serial_camera1', 'serial_camera2', 'robot_low_battery', 'is_master', 'robot_volume', 'robot_type_connect', 'name_seri', 'mode', 'ip_node', 'ip_master', 'robot_type_connect')->first();
            $motor_left_status = DB::table('motor_left_status')->where('name_seri', $robot)->select('live', 'error', 'enable', 'brake')->first();
            $motor_right_status = DB::table('motor_right_status')->where('name_seri', $robot)->select('live', 'error', 'enable', 'brake')->first();

            $data = array_merge(
                json_decode(json_encode($battery_status), true),
                json_decode(json_encode($sensor_status), true),
                json_decode(json_encode($robot_config_status), true),
                [
                    'motor_left' => $motor_left_status,
                    'motor_right' => $motor_right_status,
                ]
            );

            return $data;
        } catch (\Throwable $th) {
            return [
                'name_seri' => 'error',
                'radar1' => 0,
                'motor_left' => ['error' => 0, 'live' => 0],
                'motor_right' => ['error' => 0, 'live' => 0],
                'soc' => 0,
                'status'=>'error'

            ];
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
