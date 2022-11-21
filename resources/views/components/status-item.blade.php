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
        <div class="accessoty-item active camera">
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
                <i class="fa-solid fa-xmarks-lines"></i>
            </div>
            <div class="name-accessoty">camera 1</div>
        </div>
        <div class="accessoty-item inactive camera">
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
                <i class="fa-solid fa-xmarks-lines"></i>
            </div>
            <div class="name-accessoty">camera 2</div>
        </div>
        <div class="accessoty-item inactive lidar">
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
                <i class="fa-solid fa-xmarks-lines"></i>
            </div>
            <div class="name-accessoty">lidar 1</div>
        </div>
        <div class="accessoty-item active lidar">
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
                <i class="fa-solid fa-xmarks-lines"></i>
            </div>
            <div class="name-accessoty">lidar 2</div>
        </div>
    </div>
</div>
