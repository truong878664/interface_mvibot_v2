<div
    class=" {{
        $type !== 'wakeup' && $type !== 'stop'
            ? 'hidden function-form-item function-mission-tab'
            : ''
    }} h-full w-full flex flex-col bg-[#fff] p-4"
    data-type="{{ $type }}"
>
    <input type="checkbox" class="peer/wakeup" name="" id="is-module-wakeup" />
    <div class="mb-4 flex">
        @if ($type != 'wakeup' && $type != 'stop')
        <div class="flex flex-col">
            <label for="" class="text-xl">Name function GPIO</label>
            <input
                class="w-[200px] text-xl px-4 py-1 {{
                    $type == 'gpio_module'
                        ? 'name_function_gpio_module'
                        : 'name_gpio'
                }} input-reset valid-input"
                type="text"
                name="name_gpio"
                required
            />
        </div>
        <div
            class="flex flex-col ml-2 {{
                $type == 'gpio_module' ? '' : 'hidden'
            }}"
        >
            <label for="" class="text-xl">Name GPIO module</label>
            <select
                class="w-[200px] text-xl px-4 py-1 outline-none h-[24.5px] border bg-[#fff] {{
                    $type == 'gpio_module' ? 'name_gpio_module ' : ''
                }} input-reset valid-input"
                name="name_gpio"
                id=""
            >
                @foreach ($allRobots as $robot)
                <option value="{{ $robot->name_seri }}">
                    {{ $robot->name_seri }}
                </option>
                @endforeach
            </select>
        </div>

        <div class="ml-2 flex flex-col">
            <label for="" class="text-xl">Time out</label>
            <input
                class="w-[40px] text-xl px-2 py-1 {{
                    $type == 'gpio_module'
                        ? 'time_out_gpio_module'
                        : 'time_out_gpio'
                }} text-center input-type-number"
                type="text"
                name="time_out"
                value="-1"
                required
            />
        </div>
        @elseif($type == 'wakeup')
        <div class="group w-full">
            <div class="flex w-full justify-between">
                <div class="font-bold">Wake UP</div>
            </div>
            <div class="flex">
                <button
                    data-type-ws-btn="gpio_wake_up"
                    data-module="gpio"
                    class="wakeup-module-btn active ml-2 self-end rounded-l-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff]"
                >
                    Wake up normal
                </button>
                <button
                    data-type-ws-btn="gpio_wake_up"
                    data-module="gpio_module"
                    class="wakeup-module-btn self-end rounded-r-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff]"
                >
                    Wake up module
                </button>
            </div>
        </div>
        @elseif($type == 'stop')
        <div class="w-full">
            <div class="flex w-full justify-between">
                <div class="font-bold">Stop</div>
            </div>
            <div class="flex">
                <button
                    data-type-ws-btn="gpio_stop"
                    data-module="gpio"
                    class="btn stop-module-btn active ml-2 self-end rounded-l-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff]"
                >
                    Stop normal
                </button>
                <button
                    data-type-ws-btn="gpio_stop"
                    data-module="gpio_module"
                    class="btn stop-module-btn self-end rounded-r-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] [&.active]:bg-[#0f6cbd] [&.active]:text-[#fff]"
                >
                    Stop module
                </button>
            </div>
        </div>
        @endif
    </div>
    <div class="flex h-full w-full flex-col justify-center">
        {{--
        <div class="">
            <button
                class="btn type-gpio-btn out-set-btn mx-2 ml-2 self-end rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl text-[#000]"
                type="out_set"
            >
                Out Set
            </button>
            <button
                class="btn type-gpio-btn out-reset-btn mx-2 ml-2 self-end rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl text-[#000]"
                type="out_reset"
            >
                Out Reset
            </button>
            <button
                class="btn type-gpio-btn in-on-btn mx-2 ml-2 self-end rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl text-[#000]"
                type="in_on"
            >
                In On
            </button>
            <button
                class="btn type-gpio-btn in-off-btn mx-2 ml-2 self-end rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl text-[#000]"
                type="in_off"
            >
                In Off
            </button>
            <button
                class="btn type-gpio-btn in-pullup-btn mx-2 ml-2 self-end rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl text-[#000]"
                type="in_pullup"
            >
                In Pullup
            </button>
            <button
                class="btn type-gpio-btn in-pulldown-btn mx-2 ml-2 self-end rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl text-[#000]"
                type="in_pulldown"
            >
                In Pulldown
            </button>

            @if ($type == 'wake_up' || $type == 'stop')
            <select
                data-ws-module-name="{{ $type }}"
                type-gpio="{{ $type }}"
                class="name_gpio_module_wakeup-stop hidden h-[24.5px] w-[120px] rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl outline-none"
                name="name_gpio"
                id=""
            >
                @foreach ($allRobots as $robot)
                <option value="{{ $robot->name_seri }}">
                    {{ $robot->name_seri }}
                </option>
                @endforeach
            </select>
            @endif
            <button
                data-type="{{ $type }}"
                class="btn reset-gpio-btn mx-2 ml-2 self-end rounded-md border border-[#000] bg-[#fff] px-4 py-1 text-xl text-[#000]"
            >
                <i class="fa-solid fa-rotate"></i>
            </button>
        </div>
        --}}
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio',
            [ 'type' => $type, ])
        </div>
        <div class="max-h-[calc(100%_-_80px)] flex-1 overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>

        @if ($type == 'gpio_module')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
        [ 'type' => 'gpio_module', ]) @elseif($type == 'wakeup')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
        [ 'type' => 'wakeup', ]) @elseif($type == 'stop')
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
        [ 'type' => 'stop', ]) @else
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
        [ 'type' => 'gpio', ]) @endif
    </div>

    <style>
        .gpio-io.out_reset,
        .gpio-io.in_off {
            fill: #dc0000;
        }

        .gpio-io.in_pullup {
            fill: #fed049;
        }

        .gpio-io.in_pulldown {
            fill: #4fa095;
        }

        .type-gpio-btn.active {
            color: #fff;
            border: #fff;
        }

        .gpio-io.out_set,
        .gpio-io.in_on {
            fill: #00e7ff;
        }

        .out-set-btn.active,
        .in-on-btn.active {
            background: #00e7ff;
        }

        .out-reset-btn.active,
        .in-off-btn.active {
            background: #dc0000;
        }

        .in-pullup-btn.active {
            background: #fed049;
        }

        .in-pulldown-btn.active {
            background: #4fa095;
        }
    </style>
    {{--
    <script type="module" src="/js/missions/function/gpio.js"></script>
    --}}
</div>
