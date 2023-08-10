<div class=" {{ $type !== 'wakeup' && $type !== 'stop' ? 'hidden function-form-item function-mission-tab' : '' }} h-full w-full flex flex-col bg-[#fff] p-4"
    data-type="{{ $type }}">

    <input type="checkbox" class="peer/wakeup" name="" id="is-module-wakeup">
    <div class="flex mb-4">
        @if ($type != 'wakeup' && $type != 'stop')
            <div class="flex flex-col">
                <label for="" class="text-xl">Name function GPIO</label>
                <input
                    class="w-[200px] text-xl px-4 py-1 {{ $type == 'gpio_module' ? 'name_function_gpio_module' : 'name_gpio' }} input-reset valid-input"
                    type="text" name="name_gpio" required>
            </div>
            <div class="flex flex-col ml-2 {{ $type == 'gpio_module' ? '' : 'hidden' }}">
                <label for="" class="text-xl">Name GPIO module</label>
                <select
                    class="w-[200px] text-xl px-4 py-1 outline-none h-[24.5px] border bg-[#fff] {{ $type == 'gpio_module' ? 'name_gpio_module ' : '' }} input-reset valid-input"
                    name="name_gpio" id="">

                    @foreach ($allRobots as $robot)
                        <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                    @endforeach
                </select>
            </div>

            <div class="flex flex-col ml-2">
                <label for="" class="text-xl">Time out</label>
                <input
                    class="w-[40px] text-xl px-2 py-1 {{ $type == 'gpio_module' ? 'time_out_gpio_module' : 'time_out_gpio' }} text-center input-type-number"
                    type="text" name="time_out" value="-1" required>
            </div>
        @elseif($type == 'wakeup')
            <div class="w-full group">
                <div class="flex justify-between w-full">
                    <div class="font-bold">Wake UP</div>
                </div>
                <div class="flex">
                    <button data-type-ws-btn="gpio_wake_up" data-module="gpio"
                        class=" ml-2 text-xl font-bold rounded-l-md px-4 py-1 bg-[#fff] text-[#000] self-end border border-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff] wakeup-module-btn active">
                        Wake up normal
                    </button>
                    <button data-type-ws-btn="gpio_wake_up" data-module="gpio_module"
                        class="text-xl font-bold rounded-r-md px-4 py-1 bg-[#fff] text-[#000] self-end border border-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff] wakeup-module-btn">
                        Wake up module
                    </button>
                </div>
            </div>
        @elseif($type == 'stop')
            <div class="w-full">
                <div class="flex justify-between w-full">
                    <div class="font-bold">Stop</div>
                </div>
                <div class="flex">
                    <button data-type-ws-btn="gpio_stop" data-module="gpio"
                        class="ml-2 text-xl font-bold rounded-l-md px-4 py-1 bg-[#fff] text-[#000] btn self-end border border-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff] stop-module-btn active">
                        Stop normal
                    </button>
                    <button data-type-ws-btn="gpio_stop" data-module="gpio_module"
                        class="text-xl font-bold rounded-r-md px-4 py-1 bg-[#fff] text-[#000] btn self-end border border-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff] stop-module-btn">
                        Stop module
                    </button>
                </div>
            </div>
        @endif
    </div>
    <div class="w-full h-full flex flex-col justify-center">
        {{-- <div class="">
            <button
                class="ml-2 text-xl rounded-md px-4 py-1 bg-[#fff] text-[#000] mx-2 btn self-end border border-[#000] type-gpio-btn out-set-btn"
                type='out_set'>
                Out Set
            </button>
            <button
                class="ml-2 text-xl rounded-md px-4 py-1 bg-[#fff] text-[#000] mx-2 btn self-end border border-[#000] type-gpio-btn out-reset-btn"
                type='out_reset'>
                Out Reset
            </button>
            <button
                class="ml-2 text-xl rounded-md px-4 py-1 bg-[#fff] text-[#000] mx-2 btn self-end border border-[#000] type-gpio-btn in-on-btn"
                type='in_on'>
                In On
            </button>
            <button
                class="ml-2 text-xl rounded-md px-4 py-1 bg-[#fff] text-[#000] mx-2 btn self-end border border-[#000] type-gpio-btn in-off-btn"
                type='in_off'>
                In Off
            </button>
            <button
                class="ml-2 text-xl rounded-md px-4 py-1 bg-[#fff] text-[#000] mx-2 btn self-end border border-[#000] type-gpio-btn in-pullup-btn"
                type='in_pullup'>
                In Pullup
            </button>
            <button
                class="ml-2 text-xl rounded-md px-4 py-1 bg-[#fff] text-[#000] mx-2 btn self-end border border-[#000] type-gpio-btn in-pulldown-btn"
                type='in_pulldown'>
                In Pulldown
            </button>

            @if ($type == 'wake_up' || $type == 'stop')
                <select data-ws-module-name="{{ $type }}" type-gpio='{{ $type }}'
                    class="w-[120px] text-xl px-4 py-1 outline-none h-[24.5px] bg-[#fff] border border-[#000] rounded-md name_gpio_module_wakeup-stop hidden"
                    name="name_gpio" id="">
                    @foreach ($allRobots as $robot)
                        <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                    @endforeach
                </select>
            @endif
            <button data-type="{{ $type }}"
                class="ml-2 text-xl rounded-md px-4 py-1 bg-[#fff] text-[#000] mx-2 btn self-end border border-[#000] reset-gpio-btn">
                <i class="fa-solid fa-rotate"></i>
            </button>

        </div> --}}
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio', ["type" => $type])
        </div>
        <div class="flex-1 max-h-[calc(100%_-_80px)] overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>

        @if ($type == 'gpio_module')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
                'type' => 'gpio_module',
            ])
        @elseif($type == 'wakeup')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
                'type' => 'wakeup',
            ])
        @elseif($type == 'stop')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
                'type' => 'stop',
            ])
        @else
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
                'type' => 'gpio',
            ])
        @endif
    </div>

    <style>
        .gpio-io.out_reset,
        .gpio-io.in_off {
            fill: #DC0000;
        }

        .gpio-io.in_pullup {
            fill: #FED049;
        }

        .gpio-io.in_pulldown {
            fill: #4FA095;
        }

        .type-gpio-btn.active {
            color: #fff;
            border: #fff;
        }

        .gpio-io.out_set,
        .gpio-io.in_on {
            fill: #00E7FF;
        }

        .out-set-btn.active,
        .in-on-btn.active {
            background: #00E7FF;
        }

        .out-reset-btn.active,
        .in-off-btn.active {
            background: #DC0000;
        }

        .in-pullup-btn.active {
            background: #FED049;
        }

        .in-pulldown-btn.active {
            background: #4FA095;
        }
    </style>
    {{-- <script type="module" src="/js/missions/function/gpio.js"></script> --}}

</div>
