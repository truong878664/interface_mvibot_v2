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
    $data = [];
@endphp

<div class="w-full md:w-1/2 flex flex-wrap h-fit">
    @if (count($dataStatus) === 0)
        <div class="status-item-wrapper w-full flex justify-center items-center text-slate-300">
            <i class="fa-solid fa-box-open text-[50px]"></i>
            <span>Robot empty!</span>
        </div>
    @else
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
                $robotType = $item['robotType'];
                $moduleIn = $item['moduleIn'];
                $moduleOut = $item['moduleOut'];
            @endphp
            @if ($robotType === 'robot')
                <x-status-item nameRobot="{{ $nameRobot }}" robotType="{{ $robotType }}"
                    moduleIn="{{ $moduleIn }}" moduleOut="{{ $moduleOut }}" statusStatusRobot="{{ $statusRobot }}"
                    batteryPercent="{{ $batteryPercent }}%" batteryCharge="{{ $batteryCharge }}"
                    batteryTemperValue="{{ $batteryTemperValue }}°C" batteryA="{{ $batteryA }}A"
                    batteryVoltValue="{{ $batteryVolt }}" :dataAccessory="$dataAccessory" activate="{{ $activate }}" />
            @endif
        @endforeach
    @endif
</div>
<div class="w-full md:w-1/2 flex flex-wrap h-fit">
    @if (count($dataStatus) === 0)
        <div class="status-item-wrapper w-full flex justify-center items-center text-slate-300">
            <i class="fa-solid fa-box-open text-[50px]"></i>
            <span>Module gpio empty!</span>
        </div>
    @else
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
                $robotType = $item['robotType'];
                $moduleIn = $item['moduleIn'];
                $moduleOut = $item['moduleOut'];
            @endphp
            @if ($robotType === 'module_gpio')
                <x-status-item nameRobot="{{ $nameRobot }}" robotType="{{ $robotType }}"
                    moduleIn="{{ $moduleIn }}" moduleOut="{{ $moduleOut }}"
                    statusStatusRobot="{{ $statusRobot }}" batteryPercent="{{ $batteryPercent }}%"
                    batteryCharge="{{ $batteryCharge }}" batteryTemperValue="{{ $batteryTemperValue }}°C"
                    batteryA="{{ $batteryA }}A" batteryVoltValue="{{ $batteryVolt }}" :dataAccessory="$dataAccessory"
                    activate="{{ $activate }}" />
            @endif
        @endforeach
    @endif
</div>
