<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\backend\Robot;
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
        'batteryCharge' => "",
        'activate' => 0,
        'robotType' => "",
        'moduleIn' => "",
        'moduleOut' => "",
    ];

    public function index()
    {
        $this->getDataStatus();
        $dataStatus = $this->dataStatus;
        $title = "status";
        return view('frontend.pages.status.status', compact('dataStatus', 'title'));
    }
    public function allStatus()
    {
        $this->getDataStatus();
        $dataStatus = $this->dataStatus;
        return view('frontend.pages.status.dataStatus', compact('dataStatus'));
    }

    public function getDataStatus()
    {
        $robots = Robot::all();
        foreach ($robots as $robot) {
            $this->statusRobotItem['nameRobot'] = $robot->name_seri;
            $this->statusRobotItem['robotType'] = $robot->type;
            array_push($this->dataStatus, $this->statusRobotItem);
        }

        $batteryStatus = DB::table('battery_status')->get();

        foreach ($batteryStatus as $itemBatteryStatus) {
            foreach ($this->dataStatus as $index => $dataItem) {
                if ($itemBatteryStatus->name_seri === $dataItem['nameRobot']) {
                    $this->dataStatus[$index]['batteryPercent'] = $itemBatteryStatus->soc;
                    $this->dataStatus[$index]['batteryA'] = $itemBatteryStatus->current;
                    $this->dataStatus[$index]['batteryVolt'] = $itemBatteryStatus->vol;
                    $this->dataStatus[$index]['batteryTemperValue'] = $itemBatteryStatus->temperature;
                    $this->dataStatus[$index]['batteryCharge'] = $itemBatteryStatus->charge;
                    $this->dataStatus[$index]['activate'] = 1;
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
                    $motorRightStatusData = DB::table('motor_right_status')->where('name_seri', $dataItem['nameRobot'])->get()->all();
                    $motorLeftStatusData = DB::table('motor_left_status')->where('name_seri', $dataItem['nameRobot'])->get()->all();
                    $sensor = [
                        [
                            'name' => 'camera 1',
                            'status' => $itemSensorStatus->camera1,
                            'type' => 'camera',

                        ],
                        [
                            'name' => 'camera 2',
                            'status' => $itemSensorStatus->camera2,
                            'type' => 'camera',

                        ],
                        [
                            'name' => 'radar 1',
                            'status' => $itemSensorStatus->radar1,
                            'type' => 'radar',
                        ],
                        [
                            'name' => 'radar 2',
                            'status' => $itemSensorStatus->radar2,
                            'type' => 'radar',

                        ],
                        [
                            'name' => 'motor right',
                            'status' => $motorRightStatusData ? $motorRightStatusData[0]->{'live'} : 0,
                            'type' => 'motor',
                        ],
                        [
                            'name' => 'motor left',
                            'status' => $motorLeftStatusData ? $motorLeftStatusData[0]->{"live"} : 0,
                            'type' => 'motor',
                        ],
                        [
                            'name' => 'uart',
                            'status' => $itemSensorStatus->uart,
                            'type' => 'uart',

                        ]
                    ];
                    $this->dataStatus[$index]['dataAccessory'] = $sensor;
                } else {
                }
            }
        }

        $inputModule = DB::table('input_user_status')->get();
        $outputModule = DB::table('output_user_status')->get();
        foreach ($inputModule as $inputIO) {
            foreach ($this->dataStatus as $index => $dataItem) {
                if ($inputIO->name_seri === $dataItem['nameRobot']) {
                    $dataIO = [
                        $inputIO->in1,
                        $inputIO->in2,
                        $inputIO->in3,
                        $inputIO->in4,
                        $inputIO->in5,
                        $inputIO->in6,
                        $inputIO->in7,
                        $inputIO->in8,
                    ];
                    $this->dataStatus[$index]['moduleIn'] = implode(",", $dataIO);
                }
            }
        }
        foreach ($outputModule as $outputIO) {
            foreach ($this->dataStatus as $index => $dataItem) {
                if ($outputIO->name_seri === $dataItem['nameRobot']) {
                    $dataIO = [
                        $outputIO->out1,
                        $outputIO->out2,
                        $outputIO->out3,
                        $outputIO->out4,
                        $outputIO->out5,
                        $outputIO->out6,
                        $outputIO->out7,
                        $outputIO->out8,
                    ];
                    $this->dataStatus[$index]['moduleOut'] = implode(",",$dataIO);
                }
            }
        }
    }
}
