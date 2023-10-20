<div
    class="status-item-wrapper {{ $activate ? '' : 'inactivate' }} {{ (int) $statusStatusRobot === 0 ? 'disconnect' : '' }}">
    <div class="status-header">
        <div class="status-name-robot">{{ $nameRobot }}</div>
    </div>
    <div class="status-item">
        @if ($robotType === 'robot')
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
        @elseif($robotType === 'module_gpio')
            <div class="flex flex-col w-full">
                <div class="flex flex-col w-full">
                    <span class="font-bold text-2xl">Input gpio</span>
                    <div class="w-full flex justify-between ">
                        @foreach (explode(',', $moduleIn) as $index => $io)
                            <div
                                class="text-[36px] {{ (int) $io === 1 ? 'text-[#79ef74]' : 'text-[#ff3a3a]' }} io_module relative">
                                <i class="fa-solid fa-circle"></i>
                                <span
                                    class="absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-[#fff]">{{ $index }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="flex flex-col w-full mt-8">
                    <span class="font-bold text-2xl">Output gpio</span>
                    <div class="w-full flex justify-between ">
                        @foreach (explode(',', $moduleOut) as $index => $io)
                            <div
                                class="text-[36px] {{ (int) $io === 1 ? 'text-[#79ef74]' : 'text-[#ff3a3a]' }} io_module relative">
                                <i class="fa-solid fa-circle"></i>
                                <span
                                    class="absolute font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-[#fff]">{{ $index }}</span>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>

        @endif
    </div>
</div>
