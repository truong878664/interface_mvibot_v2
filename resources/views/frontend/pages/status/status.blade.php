@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading status-heading">Status</div>
    @php
        $dataSccessory = [
            [
                'name' => 'camera 1',
                'status' => 0,
            ],
            [
                'name' => 'camera 2',
                'status' => 1,
            ],
            [
                'name' => 'lidar 1',
                'status' => 0,
            ],
            [
                'name' => 'lidar 2',
                'status' => 1,
            ],
        ];
    @endphp
    <div class="contents">
        <div class="wrapper-status-content">
            <x-status-item nameRobot="robot zxy" statusStatusRobot="mapping" batteryPercent='20%' batteryTemperValue='8°C'
                batteryA='27A' batteryVoltValue='0.4' :dataSccessory='$dataSccessory' />

            <x-status-item nameRobot="robot 123" statusStatusRobot="navigation" batteryPercent='70%'
                batteryTemperValue='60°C' batteryA='27A' batteryVoltValue='0.5' :dataSccessory='$dataSccessory' />

            <x-status-item nameRobot="robot abd" statusStatusRobot="mapping" batteryPercent='10%' batteryTemperValue='40°C'
                batteryA='27A' batteryVoltValue='0.9' :dataSccessory='$dataSccessory' />
        </div>
    </div>
    <script src="/js/status/status.js"></script>
@endsection
