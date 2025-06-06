<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RobotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('my_robot')->insert(
            [
                [
                    'name_seri' => 'Mb23_946',
                    'type' => 'robot'
                ],
                [
                    'name_seri' => 'Mb23_94',
                    'type' => 'robot'
                ],
            ]
        );

        // DB::table('input_user_status')->insert(
        //     [
        //         [
        //             'name_seri' => 'Mb23_946',
        //             'in1' => 1,
        //             'in2' => 0,
        //             'in3' => 1,
        //             'in4' => 1,
        //             'in5' => 0,
        //             'in6' => 1,
        //             'in7' => 1,
        //             'in8' => 0,
        //             'in9' => 1,
        //             'in10' => 1,
        //             'in11' => 1,
        //             'in12' => 0,
        //             'in13' => 1,
        //             'in14' => 1,
        //             'in15' => 1,
        //             'in16' => 1,
        //         ],
        //         [
        //             'name_seri' => 'Mb23_94',
        //             'in1' => 1,
        //             'in2' => 0,
        //             'in3' => 1,
        //             'in4' => 1,
        //             'in5' => 0,
        //             'in6' => 1,
        //             'in7' => 1,
        //             'in8' => 0,
        //             'in9' => 1,
        //             'in10' => 1,
        //             'in11' => 1,
        //             'in12' => 0,
        //             'in13' => 1,
        //             'in14' => 1,
        //             'in15' => 1,
        //             'in16' => 1,
        //         ]
        //     ]
        // );

        // DB::table('output_user_status')->insert(
        //     [
        //         [
        //             'name_seri' => 'Mb23_946',
        //             'out1' => 0,
        //             'out2' => 0,
        //             'out3' => 0,
        //             'out4' => 0,
        //             'out5' => 0,
        //             'out6' => 0,
        //             'out7' => 0,
        //             'out8' => 0,
        //             'out9' => 0,
        //             'out10' => 0,
        //             'out11' => 0,
        //             'out12' => 0,
        //             'out13' => 0,
        //             'out14' => 0,
        //             'out15' => 0,
        //             'out16' => 0,
        //         ],
        //         [
        //             'name_seri' => 'Mb23_94',
        //             'out1' => 0,
        //             'out2' => 0,
        //             'out3' => 0,
        //             'out4' => 0,
        //             'out5' => 0,
        //             'out6' => 0,
        //             'out7' => 0,
        //             'out8' => 0,
        //             'out9' => 0,
        //             'out10' => 0,
        //             'out11' => 0,
        //             'out12' => 0,
        //             'out13' => 0,
        //             'out14' => 0,
        //             'out15' => 0,
        //             'out16' => 0,
        //         ]
        //     ]
        // );

        // DB::table('motor_left_status')->insert(
        //     [
        //         [
        //             'name_seri' => 'Mb23_946',
        //             'live' => 1,
        //             'error' => 1,
        //             'enable' => 1,
        //             'brake' => 1,

        //         ],
        //         [
        //             'name_seri' => 'Mb23_94',
        //             'live' => 1,
        //             'error' => 1,
        //             'enable' => 1,
        //             'brake' => 1,

        //         ]
        //     ]
        // );

        // DB::table('motor_right_status')->insert(
        //     [
        //         [
        //             'name_seri' => 'Mb23_946',
        //             'live' => 1,
        //             'error' => 1,
        //             'enable' => 1,
        //             'brake' => 1,

        //         ],
        //         [
        //             'name_seri' => 'Mb23_94',
        //             'live' => 1,
        //             'error' => 1,
        //             'enable' => 1,
        //             'brake' => 1,

        //         ]
        //     ]
        // );

        DB::table('robot_status')->insert(
            [
                [
                    'name_seri' => 'Mb23_946',
                    'status' => 1,
                    'mode' => 'navigation',
                    'mode_status' => 1,
                    'ip_node' => '127.0.0.1',
                    'ip_master' => '127.0.0.1',
                    'type_connect' => 1,

                ],
                [
                    'name_seri' => 'Mb23_94',
                    'status' => 1,
                    'mode' => 'navigation',
                    'mode_status' => 1,
                    'ip_node' => '127.0.0.1',
                    'ip_master' => '127.0.0.1',
                    'type_connect' => 1,

                ]
            ]
        );

        DB::table('sensor_status')->insert(
            [
                [
                    'name_seri' => 'Mb23_946',
                    'radar1' => 1,
                    'radar2' => 0,
                    'camera1' => 1,
                    'camera2' => 1,
                    'uart' => 1,

                ],
                [
                    'name_seri' => 'Mb23_94',
                    'radar1' => 1,
                    'radar2' => 0,
                    'camera1' => 1,
                    'camera2' => 1,
                    'uart' => 1,

                ]
            ]
        );

        DB::table('battery_status')->insert(
            [
                [
                    'name_seri' => 'Mb23_946',
                    'soc' => 35,
                    'vol' => 20,
                    'cycle' => 3,
                    'capacity_now' => 4,
                    'capacity_max' => 5,
                    'charge' => 1,
                    'current' => 10,
                    'num_cell' => 10,
                    'temperature' => 30,

                ],
                [
                    'name_seri' => 'Mb23_94',
                    'soc' => 35,
                    'vol' => 20,
                    'cycle' => 3,
                    'capacity_now' => 4,
                    'capacity_max' => 5,
                    'charge' => 1,
                    'current' => 10,
                    'num_cell' => 10,
                    'temperature' => 30,

                ]
            ]
        );

        // DB::table('map_active')->insert(
        //     [
        //         'name_map_active' => 'map22'
        //     ]
        // );

        DB::table('robot_config_status')->insert(

            [
                [
                    "name_seri" => 'Mb23_946',
                    "robot_R" => '0.0805',
                    "robot_L" => '0.594',
                    "robot_gear" => '25',
                    "robot_ax" => '1.0',
                    "robot_aw" => '3.0',
                    "robot_vmax" => '0.5',
                    "robot_wmax" => '0.314',
                    "robot_volume" => '150',
                    "robot_low_battery" => NULL,
                    "robot_type_connect" => "wifi",
                    "serial_camera1" => '143322071201',
                    "serial_camera2" => '148522074025',
                    "lan_type" => 'auto',
                    "lan_ipv4" => '192.168.0.200',
                    "lan_ipv4_gateway" => '',
                    "lan_ipv4_dns" => '',
                    "wifi_type" => 'auto',
                    "wifi_ssid" => 'MVP_PRO',
                    "wifi_password" => 'MarueiPRO&@1',
                    "wifi_ipv4" => '',
                    "wifi_ipv4_gateway" => '',
                    "wifi_ipv4_dns" => '',
                    "mode" => 'navigation',
                    "ip_master" => '10.0.70.77',
                    "is_master" => 'yes',
                    "ip_node" => '10.0.70.134'
                ],
                [
                    "name_seri" => 'Mb23_94',
                    "robot_R" => '0.1805',
                    "robot_L" => '0.394',
                    "robot_gear" => '23',
                    "robot_ax" => '2.0',
                    "robot_aw" => '3.0',
                    "robot_vmax" => '0.5',
                    "robot_wmax" => '0.314',
                    "robot_volume" => '150',
                    "robot_low_battery" => NULL,
                    "robot_type_connect" => "lan",
                    "serial_camera1" => '143322071212',
                    "serial_camera2" => '148522074124',
                    "lan_type" => 'manual',
                    "lan_ipv4" => '192.168.10.430',
                    "lan_ipv4_gateway" => '',
                    "lan_ipv4_dns" => '',
                    "wifi_type" => 'auto',
                    "wifi_ssid" => 'MVP_G',
                    "wifi_password" => 'MarueiPRO&@1',
                    "wifi_ipv4" => '10.0.30.20',
                    "wifi_ipv4_gateway" => '',
                    "wifi_ipv4_dns" => '',
                    "mode" => 'slam',
                    "ip_master" => '10.0.71.80',
                    "is_master" => 'no',
                    "ip_node" => '10.0.70.134'
                ]
            ]
        );
    }
}