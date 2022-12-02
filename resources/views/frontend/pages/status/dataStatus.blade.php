@foreach ($dataStatus as $item)
    @php
        $dataAccessory = $item['dataAccessory'];
    @endphp
    <x-status-item nameRobot="{{ $item['nameRobot'] }}"
        statusStatusRobot="{{ $item['statusRobot'] === 1 ? 'navigation' : 'mapping' }}"
        batteryPercent="{{ $item['batteryPercent'] }}%" batteryTemperValue="{{ $item['batteryTemperValue'] }}°C"
        batteryA="{{ $item['batteryA'] }}A" batteryVoltValue="{{ $item['batteryVolt'] }}" :dataAccessory="$dataAccessory" />
@endforeach
