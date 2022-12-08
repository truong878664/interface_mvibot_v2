@php
    $sensor = [
        [
            'name' => 'camera 1',
            'status' => 0,
            'type' => 'camera',
        ],
        [
            'name' => 'camera 2',
            'status' => 0,
            'type' => 'camera',
        ],
        [
            'name' => 'radar 1',
            'status' => 0,
            'type' => 'radar',
        ],
        [
            'name' => 'radar 2',
            'status' => 0,
            'type' => 'radar',
        ],
        [
            'name' => 'motor right',
            'status' => 0,
            'type' => 'motor',
        ],
        [
            'name' => 'motor left',
            'status' => 0,
            'type' => 'motor',
        ],
        [
            'name' => 'uart',
            'status' => 0,
            'type' => 'uart',
        ],
    ];
@endphp
{{-- {{ dd($dataStatus) }} --}}
@foreach ($dataStatus as $item)
    @php
        
        $dataAccessory = $item['dataAccessory'] ? $item['dataAccessory'] : $sensor;
        $nameRobot = $item['nameRobot'] ? $item['nameRobot'] : 0;
        $statusRobot = $item['statusRobot'] ? $item['statusRobot'] : 0;
        $batteryPercent = $item['batteryPercent'] ? $item['batteryPercent'] : 0;
        $batteryTemperValue = $item['batteryTemperValue'] ? $item['batteryTemperValue'] : 0;
        $batteryA = $item['batteryA'] ? $item['batteryA'] : 0;
        $batteryVolt = $item['batteryVolt'] ? $item['batteryVolt'] : 0;
        $batteryCharge = $item['batteryCharge'];
        $activate = $item['activate'];
    @endphp
    <x-status-item nameRobot="{{ $nameRobot }}"
        statusStatusRobot="{{ $statusRobot === 1 ? 'navigation' : 'mapping' }}" batteryPercent="{{ $batteryPercent }}%"
        batteryCharge="{{ $batteryCharge }}" batteryTemperValue="{{ $batteryTemperValue }}°C"
        batteryA="{{ $batteryA }}A" batteryVoltValue="{{ $batteryVolt }}" :dataAccessory="$dataAccessory"
        activate="{{ $activate }}" />
@endforeach
