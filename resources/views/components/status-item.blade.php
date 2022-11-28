<div class="status-item">
    <div class="status-header">
        <div class="status-name-robot">{{ $nameRobot }}</div>
        <div class="status-status-robot {{ $statusStatusRobot }}">{{ $statusStatusRobot }}</div>
    </div>
    <div class="status-battery">
        <div class="inner-circle"></div>
        <div class="outer-circle"></div>
        <div class="battery-parameter-wrapper">
            <div class="battery-percent">{{ $batteryPercent }}</div>
            <div class="battery-parameter">
                <div class="battery-temper"> <i class="temper-icon fa-solid fa-temperature-low"></i>
                    <p class="battery-temper-value">{{ $batteryTemperValue }}</p>
                </div>
                <div class="battery-a">{{ $batteryA }}</div>
                <div class="battery-volt"><i class="volt-icon fa-solid fa-bolt"></i>
                    <p>{{ $batteryVoltValue }}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="status-accessory">
        @if (is_array($dataAccessory) || is_object($dataAccessory))
            @foreach ($dataAccessory as $index => $item)
                <div
                    class="accessoty-item {{ $item['status'] === 1 ? 'active' : 'inactive' }} {{ $index <= 1 ? 'camera' : 'lidar' }}">
                    <div class="icon-check active-icon">
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                    <div class="icon-check inactive-icon">
                        <i class="fa-solid fa-circle-xmark"></i>
                    </div>
                    <div class="camera-icon">
                        <i class="fa-solid fa-camera"></i>
                    </div>
                    <div class="lidar-icon">
                        <img src="/icon/lidar.svg" alt="" class="lidar-img">
                    </div>
                    <div class="name-accessoty">{{ $item['name'] }}</div>
                </div>
            @endforeach
        @endif
    </div>
</div>
