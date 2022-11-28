<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Robot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class statusController extends Controller
{
    public $dataStatus = [];

    public $statusRobotItem = [
        'nameRobot' => "",
        'statusRobot' => "",
        'batteryPercent' => "",
        'batteryTemperValue' => "",
        'batteryA' => "",
        'batteryVolt' => "",
        'dataAccessory' => "",
        'batteryChange' => ''
    ];

    public function index()
    {
        $robots = Robot::all();
        foreach ($robots as $robot) {
            $this->statusRobotItem['nameRobot'] = $robot->name_seri;
            array_push($this->dataStatus, $this->statusRobotItem);
        }


        $batteryStatus = DB::table('battery_status')->get();

        foreach ($batteryStatus as $itemBatteryStatus) {
            foreach ($this->dataStatus as $index => $dataItem) {
                if ($itemBatteryStatus->name_seri === $dataItem['nameRobot']) {
                    $this->dataStatus[$index]['batteryPercent'] = $itemBatteryStatus->current;
                    $this->dataStatus[$index]['batteryA'] = $itemBatteryStatus->soc;
                    $this->dataStatus[$index]['batteryVolt'] = $itemBatteryStatus->vol;
                    $this->dataStatus[$index]['batteryTemperValue'] = $itemBatteryStatus->temperature;
                }
            }
        }

        $robotStatus = DB::table('robot_status')->get();
        foreach ($robotStatus as $itemRobotStatus) {
            foreach ($this->dataStatus as $index => $dataItem) {
                if ($itemRobotStatus->name_seri === $dataItem['nameRobot']) {
                    $this->dataStatus[$index]['statusRobot'] = $itemRobotStatus->status;
                }
            }
        }

        $sensorStatus = DB::table('sensor_status')->get();
        foreach ($sensorStatus as $itemSensorStatus) {
            foreach ($this->dataStatus as $index => $dataItem) {
                if ($itemSensorStatus->name_seri === $dataItem['nameRobot']) {
                    $sensor = [
                        [
                            'name' => 'camera 1',
                            'status' => $itemSensorStatus->camera1,
                        ],
                        [
                            'name' => 'camera 2',
                            'status' => $itemSensorStatus->camera2,
                        ],
                        [
                            'name' => 'radar 1',
                            'status' => $itemSensorStatus->radar1,
                        ],
                        [
                            'name' => 'radar 2',
                            'status' => $itemSensorStatus->radar2,
                        ],
                    ];
                    $this->dataStatus[$index]['dataAccessory'] = $sensor;
                }
            }
        }

        $dataStatus = $this->dataStatus;
        return view('frontend.pages.status.status', compact('dataStatus'));
    }
}