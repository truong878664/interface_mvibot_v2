<div class="absolute bottom-0 right-0 mb-2 flex flex-col-reverse items-end justify-between gap-2 xl:w-full">
    <div class="xl:hidden">
        <label for="action-create-block" class="btn mx-2 rounded-lg border bg-white px-4 py-2">
            <i class="fa-solid fa-bars"></i>
        </label>
    </div>
    <input type="checkbox" name="" id="action-create-block" class="peer" hidden />
    <div
        class="hidden flex-col-reverse justify-between gap-1 rounded-md bg-white px-4 py-8 shadow-md peer-checked:flex xl:flex xl:w-full xl:flex-row-reverse xl:bg-transparent xl:p-0 xl:shadow-none">
        <div class="flex">
            {{-- ACTION SEND MISSION --}}
            <input class="peer/send-mission" type="checkbox" name="" hidden id="input-send-mission" />
            <label for="input-send-mission"
                class="btn mx-2 h-fit whitespace-nowrap rounded-lg border bg-white px-4 py-1">
                <span class="text-blue-400">
                    <i class="fa-solid fa-paper-plane"></i>
                </span>
                <span class=" font-bold">Send mission</span>
            </label>
            <div
                class="fixed bottom-0 left-0 right-0 top-0 z-10 hidden items-center justify-center transition-all peer-checked/send-mission:flex">
                <label for="input-send-mission"
                    class="absolute bottom-0 left-0 right-0 top-0 -z-10 bg-black-o-30"></label>
                <div class="flex items-center rounded-md bg-white px-3 py-2">
                    @include('frontend.blocks.selectRobot', [
                        'type' => 'all_robot',
                        'id' => 'select-robot-option',
                    ])
                    <button data-type-mission="{{ $itemRender->type }}" data-type-button="send-mission"
                        class="btn mx-2 rounded-md bg-main px-4 py-1 font-bold text-white">
                        Send
                    </button>
                </div>
            </div>

            {{-- END ACTION SEND MISSION --}}
            <div class="relative inline-block">
                <label for="more-action" class="btn mx-2 rounded-lg border bg-white px-4 py-1">
                    <i class="fa-solid fa-caret-up"></i>
                </label>
                <input hidden type="checkbox" id="more-action" class="peer/more-action" />
                <label for="more-action"
                    class="fixed bottom-0 left-0 right-0 top-0 z-20 hidden bg-black/10 peer-checked/more-action:block"></label>
                <ul id="more-action-wrapper"
                    class="absolute bottom-[calc(100%_+_10px)] right-0 hidden w-52 overflow-hidden rounded-md bg-white py-4 text-sm opacity-0 shadow-sm transition-all peer-checked/more-action:z-50 peer-checked/more-action:block peer-checked/more-action:opacity-100">
                    <li>
                        <button data-button-action-more="code"
                            class="flex w-full justify-end px-4 py-2 hover:bg-stone-100">
                            <span class="w-10 text-blue-600">
                                <i class="fa-solid fa-code"></i>
                            </span>
                            <span class="flex-1 text-start">
                                Show code mission
                            </span>
                        </button>
                    </li>

                    <li>
                        <button data-button-action-more="showAllMission"
                            class="flex w-full justify-end px-4 py-2 hover:bg-stone-100">
                            <span class="w-10 text-green-600">
                                <i class="fa-solid fa-eye"></i>
                            </span>
                            <span class="flex-1 text-start">
                                Show all mission
                            </span>
                        </button>
                    </li>
                    <li>
                        <button data-button-action-more="hideAllMission"
                            class="flex w-full justify-end px-4 py-2 hover:bg-stone-100">
                            <span class="w-10 text-fuchsia-600">
                                <i class="fa-solid fa-eye-slash"></i>
                            </span>
                            <span class="flex-1 text-start">
                                Hide all mission
                            </span>
                        </button>
                    </li>

                    <li>
                        <button id="button-test-1" class="flex w-full justify-end px-4 py-2 hover:bg-stone-100">
                            <span class="w-[40px] text-red-600">
                                <i class="fa-solid fa-umbrella"></i>
                            </span>
                            <span class="flex-1 text-start"> Button test </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        {{-- WAKE UP STOP --}}
        <div class="flex justify-end gap-2 py-3 text-white xl:absolute xl:bottom-full xl:right-0 xl:mb-5 xl:py-0">
            <label for="input-continue" class="btn rounded-md bg-sky-500 px-4 py-1 font-bold">
                Continue
            </label>
            <label for="input-wakeup" class="btn rounded-md bg-green-500 px-4 py-1 font-bold">
                Wake up
            </label>
            <label for="input-stop" class="btn rounded-md bg-red-500 px-4 py-1 font-bold">
                Stop
            </label>
        </div>
        <input type="radio" class="peer/continue sr-only" name="configuration" id="input-continue"
            data-type="continue" />
        <input type="radio" class="peer/wakeup sr-only" name="configuration" id="input-wakeup" data-type="wakeup" />
        <input type="radio" class="peer/stop sr-only" name="configuration" id="input-stop" data-type="stop" />
        <input type="radio" class="sr-only" name="configuration" id="input-show-configuration" />
        <div data-name="wakeup-stop-wrapper"
            class="fullscreen group z-20 hidden h-screen w-screen items-center justify-center peer-checked/continue:flex peer-checked/stop:flex peer-checked/wakeup:flex">
            <label for="input-show-configuration"
                class="fullscreen !-z-1 hidden bg-black/20 peer-checked/continue:group-[]:block peer-checked/stop:group-[]:block peer-checked/wakeup:group-[]:block"></label>

            <div
                class="function-item-form relative z-10 -mt-[5%] hidden h-[80%] w-[80%] items-center justify-center overflow-hidden rounded-md bg-white peer-checked/wakeup:group-[]:flex">
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.configuration', [
                    'type' => 'wakeup',
                ])
            </div>
            <div
                class="function-item-form relative z-10 -mt-[5%] hidden h-[80%] w-[80%] items-center justify-center overflow-hidden rounded-md bg-white peer-checked/stop:group-[]:flex">
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.configuration', [
                    'type' => 'stop',
                ])
            </div>
            <div
                class="function-item-form relative z-10 -mt-[5%] hidden h-[80%] w-[80%] items-center justify-center overflow-hidden rounded-md bg-white peer-checked/continue:group-[]:flex">
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.configuration', [
                    'type' => 'continue',
                ])
            </div>
        </div>
        {{-- END WAKE UP STOP --}}

        <div class="ml-2 flex flex-col flex-wrap justify-start gap-1 xl:flex-row" id="create-type-mission-wrapper">
            @php
                $blockMissions = [
                    ['color' => 'text-red-400', 'type' => 'Normal', 'title' => 'Normal', 'icon' => 'fa-solid fa-bullseye'],
                    [
                        'color' => 'text-green-400',
                        'type' => 'IfElse',
                        'title' => 'If Else',
                        'icon' => 'fa-solid fa-code-fork',
                    ],
                    ['color' => 'text-yellow-400', 'type' => 'Trycatch', 'title' => 'Try Catch', 'icon' => 'fa-solid fa-triangle-exclamation'],
                    ['color' => 'text-sky-400', 'type' => 'While', 'title' => 'While', 'icon' => 'fa-solid fa-arrows-spin'],
                    [
                        'color' => 'text-blue-400',
                        'type' => 'LogicOr',
                        'title' => 'Logic OR',
                        'icon' => 'fa-solid fa-grip-lines-vertical',
                    ],
                    ['color' => 'text-pink-400', 'type' => 'LogicAnd', 'title' => 'Logic AND', 'icon' => 'fa-solid fa-link'],
                ];
            @endphp
            @foreach ($blockMissions as $item)
                <button data-type-mission="{{ $item['type'] }}"
                    class="btn flex gap-3 rounded-lg border bg-white px-4 py-1">
                    <span class="{{ $item['color'] }}">
                        <i class=" {{ $item['icon'] }}"></i>
                    </span>
                    <span class=" font-bold">{{ $item['title'] }}</span>
                    <span class="text-blue-600">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </button>
            @endforeach
            <label for="step-wrapper" class="btn mx-2 rounded-lg border bg-white px-4 py-1">
                <span class="text-purple-700">
                    <i class="fa-solid fa-square"></i>
                </span>
                <span class=" font-bold">Step</span>
                <span class="text-blue-600">
                    <i class="fa-solid fa-angle-right"></i>
                </span>
            </label>
        </div>
    </div>
</div>
