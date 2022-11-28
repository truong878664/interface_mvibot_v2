@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading status-heading">Status</div>
    <div class="contents">
        <div class="wrapper-status-content">
            @foreach ($dataStatus as $item)
                @php
                    $dataAccessory2 = $item['dataAccessory'];
                @endphp
                <x-status-item nameRobot="{{ $item['nameRobot'] }}"
                    statusStatusRobot="{{ $item['statusRobot'] === 1 ? 'navigation' : 'mapping' }}"
                    batteryPercent="{{ $item['batteryPercent'] }}%" batteryTemperValue="{{ $item['batteryTemperValue'] }}°C"
                    batteryA="{{ $item['batteryA'] }}A" batteryVoltValue="{{ $item['batteryVolt'] }}" :dataAccessory="$dataAccessory2" />
            @endforeach
        </div>
    </div>
    <script type="module" src="/js/status/status.js"></script>
@endsection
