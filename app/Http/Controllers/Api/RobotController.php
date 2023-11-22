<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\backend\StatusRobot;
use App\Models\backend\Robot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RobotController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $allRobots = Robot::all();
            $robots = Robot::where('type', 'robot')->get();
            $moduleGpios = Robot::where('type', 'module_gpio')->get();
            $robotsSlam = DB::table('robot_status')->where('mode', 'slam')->get();
            $robotsNavigation = DB::table('robot_status')->where('mode', 'navigation')->get();
            //app version
        } catch (\Illuminate\Database\QueryException $e) {
            $robots = [];
            $moduleGpios = [];
            $robotsSlam = [];
            $robotsNavigation = [];
            $allRobots = [];
        }
        return [
            'robots' => $robots,
            'moduleGpios' => $moduleGpios,
            'robotsSlam' => $robotsSlam,
            'robotsNavigation' => $robotsNavigation,
            'allRobots' => $allRobots,
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
    public function show(Request $request, $robot)
    {
        $statusRobot = StatusRobot::where('name_seri', $robot)->first();
        if ($statusRobot) {
            return $statusRobot;
        } else {
            return ['message' => 'no robot'];
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
    public function destroy($name_seri)
    {
        DB::table('robot_status')->where('name_seri', $name_seri)->delete();
        DB::table('sensor_status')->where('name_seri', $name_seri)->delete();
        DB::table('output_user_status')->where('name_seri', $name_seri)->delete();
        DB::table('my_robot')->where('name_seri', $name_seri)->delete();
        DB::table('motor_right_status')->where('name_seri', $name_seri)->delete();
        DB::table('motor_left_status')->where('name_seri', $name_seri)->delete();
        DB::table('input_user_status')->where('name_seri', $name_seri)->delete();
        DB::table('battery_status')->where('name_seri', $name_seri)->delete();

        return ['status' => 200];
    }
}
