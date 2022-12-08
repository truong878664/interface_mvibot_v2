<div class="status-item-wrapper {{ $activate ? '' : 'inactivate' }}">
    <div class="status-header">
        <div class="status-name-robot">{{ $nameRobot }}</div>
        {{-- <div class="status-status-robot {{ $statusStatusRobot }}">{{ $statusStatusRobot }}</div> --}}
    </div>
    <div class="status-item">

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
                        <p>{{ $batteryVoltValue }}V</p>
                    </div>
                </div>
            </div>
            @if ($batteryCharge)
                <div class="charge charging">
                    <i class="fa-solid fa-charging-station"></i>
                </div>
            @else
                <div class="charge no-change">
                    <i class="fa-solid fa-charging-station"></i>
                </div>
            @endif
        </div>
        <div class="status-accessory">
            @foreach ($dataAccessory as $item)
                <div class="accessoty-item-wrapper {{ $item['status'] ? 'active' : 'inactive' }}">
                    <div class="accessoty-item">
                        <img src="/icon/{{ $item['type'] }}.svg" alt="" class="accessoty-icon">
                    </div>
                    <span>{{ $item['name'] }}</span>
                </div>
            @endforeach
        </div>
    </div>
</div>
<style>
    .inactivate {
        color: #ccc;
    }

    .inactivate .accessoty-item-wrapper .accessoty-item {
        background: #ccc;
        box-shadow: none;
    }

    .inactivate .temper-icon,
    .inactivate .volt-icon {
        color: #ccc !important;
    }


    .charge {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
    }

    .charging {
        color: #82CD47;
        text-shadow: 0 0 20px #82CD47;
    }

    .no-change {
        color: #ccc;
    }
</style>
