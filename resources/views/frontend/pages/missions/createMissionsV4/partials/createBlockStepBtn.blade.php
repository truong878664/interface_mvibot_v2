<div class="mb-10 absolute bottom-0 right-0 flex flex-col-reverse justify-between items-end gap-[10px] xl:w-full">
    <div class="xl:hidden">
        <label for="action-create-block" class="btn rounded-lg border px-4 py-2 mx-2 bg-white text-2xl">
            <i class="fa-solid fa-bars"></i>
        </label>
    </div>
    <input type="checkbox" name="" id="action-create-block" class="peer" hidden>
    <div
        class="flex-col-reverse justify-between gap-[10px] bg-white rounded-md shadow-md px-4 py-8 hidden peer-checked:flex xl:flex xl:w-full xl:flex-row-reverse xl:p-0 xl:bg-transparent xl:shadow-none">
        <div class="">
            {{-- ACTION SEND MISSION --}}
            <input class="peer/send-mission" type="checkbox" name="" hidden id="input-send-mission">
            <label for="input-send-mission" class="btn rounded-lg border px-4 py-2 text-3xl mx-2 bg-white">
                <span class="text-blue-400">
                    <i class="fa-solid fa-paper-plane"></i>
                </span>
                <span class="text-[16px] font-bold">Send mission</span>
            </label>
            <div
                class="fixed top-0 left-0 right-0 bottom-0 z-10 justify-center items-center hidden peer-checked/send-mission:flex transition-all">
                <label for="input-send-mission"
                    class="bg-black-o-30 absolute left-0 right-0 top-0 bottom-0 -z-10"></label>
                <div class="flex bg-white py-2 px-3 rounded-md items-center">
                    @include('frontend.blocks.selectRobot', [
                        'type' => 'all_robot',
                        'id' => 'select-robot-option',
                    ])
                    <button data-type-mission="{{ $itemRender->type }}" data-type-button='send-mission'
                        class="rounded-md text-2xl font-bold px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn">Send</button>
                </div>
            </div>

            {{-- END ACTION SEND MISSION --}}
            <div class="relative inline-block">
                <label for="more-action" class="btn rounded-lg border px-4 py-2 mx-2 bg-white text-2xl">
                    <i class="fa-solid fa-caret-up"></i>
                </label>
                <input hidden type="checkbox" id="more-action" class="peer/more-action">
                <label for="more-action"
                    class="fixed top-0 left-0 right-0 bottom-0 z-20 hidden peer-checked/more-action:block"></label>
                <ul id="more-action-wrapper"
                    class="absolute text-2xl right-0 bottom-[calc(100%_+_10px)] w-[200px] bg-white shadow-sm rounded-md transition-all hidden py-8 opacity-0 peer-checked/more-action:block peer-checked/more-action:opacity-100 peer-checked/more-action:z-50 overflow-hidden ">
                    <li>
                        <button data-button-action-more="code" class="w-full py-2 px-4 hover:bg-stone-100 text-start">
                            <span class="text-blue-600">
                                <i class="fa-solid fa-code"></i>
                            </span>
                            Show code mission
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pl-10"></div>
        {{-- WAKE UP STOP --}}
        <div class="text-white flex justify-end gap-[10px] xl:absolute xl:bottom-full xl:right-0 xl:mb-10">
            <label for="input-continue" class="btn py-2 px-4 text-2xl font-bold bg-sky-500 rounded-md">
                Continue
            </label>
            <label for="input-wakeup" class="btn py-2 px-4 text-2xl font-bold bg-green-500 rounded-md">
                Wake up
            </label>
            <label for="input-stop" class="btn py-2 px-4 text-2xl font-bold bg-red-500 rounded-md">
                Stop
            </label>
        </div>
        <input type="checkbox" class="sr-only peer/continue" name="" id="input-continue">
        <input type="checkbox" class="sr-only peer/wakeup" name="" id="input-wakeup">
        <input type="checkbox" class="sr-only peer/stop" name="" id="input-stop">
        <div data-name="wakeup-stop-wrapper"
            class="w-screen h-screen fullscreen z-20 justify-center items-center group hidden peer-checked/wakeup:flex peer-checked/stop:flex peer-checked/continue:flex">
            <label for="input-wakeup"
                class="fullscreen bg-black/20 !z-[-1] hidden peer-checked/wakeup:group-[]:block"></label>
            <label for="input-stop"
                class="fullscreen bg-black/20 !z-[-1] hidden peer-checked/stop:group-[]:block"></label>
            <label for="input-continue"
                class="fullscreen bg-black/20 !z-[-1] hidden peer-checked/continue:group-[]:block"></label>
            <div
                class="hidden peer-checked/wakeup:group-[]:flex w-[80%] h-[80%] rounded-md function-item-form relative overflow-hidden justify-center items-center z-10 bg-white">
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.configuration', [
                    'type' => 'wakeup',
                ])
            </div>
            <div
                class="hidden peer-checked/stop:group-[]:flex w-[80%] h-[80%] rounded-md function-item-form relative overflow-hidden justify-center items-center z-10 bg-white">
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.configuration', [
                    'type' => 'stop',
                ])
            </div>
            <div
                class="hidden peer-checked/continue:group-[]:flex w-[80%] h-[80%] rounded-md function-item-form relative overflow-hidden justify-center items-center z-10 bg-white">
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.configuration', [
                    'type' => 'continue',
                ])
            </div>
        </div>
        {{-- END WAKE UP STOP --}}

        <div class="ml-[20px] flex flex-col justify-start gap-[10px] xl:flex-row" id="create-type-mission-wrapper">
            @php
                $blockMissions = [
                    [
                        'color' => 'text-red-400',
                        'type' => 'Normal',
                        'title' => 'Normal',
                        'icon' => 'fa-solid fa-bullseye',
                    ],
                    [
                        'color' => 'text-green-400',
                        'type' => 'IfElse',
                        'title' => 'If Else',
                        'icon' => 'fa-solid fa-code-fork',
                    ],
                    [
                        'color' => 'text-yellow-400',
                        'type' => 'Trycatch',
                        'title' => 'Try Catch',
                        'icon' => 'fa-solid fa-triangle-exclamation',
                    ],
                    [
                        'color' => 'text-sky-400',
                        'type' => 'While',
                        'title' => 'While',
                        'icon' => 'fa-solid fa-arrows-spin',
                    ],
                    [
                        'color' => 'text-blue-400',
                        'type' => 'LogicOr',
                        'title' => 'Logic OR',
                        'icon' => 'fa-solid fa-grip-lines-vertical',
                    ],
                    [
                        'color' => 'text-pink-400',
                        'type' => 'LogicAnd',
                        'title' => 'Logic AND',
                        'icon' => 'fa-solid fa-link',
                    ],
                ];
            @endphp
            @foreach ($blockMissions as $item)
                <button data-type-mission="{{ $item['type'] }}"
                    class="btn rounded-lg border px-4 py-2 text-3xl mx-2 bg-white">
                    <span class="{{ $item['color'] }}">
                        <i class=" {{ $item['icon'] }}"></i>
                    </span>
                    <span class="text-[16px] font-bold">{{ $item['title'] }}</span>
                    <span class="text-blue-600">
                        <i class="fa-solid fa-plus"></i>
                    </span>
                </button>
            @endforeach
            <label for="step-wrapper" class="btn rounded-lg border px-4 py-2 text-3xl mx-2 bg-white">
                <span class="text-purple-700">
                    <i class="fa-solid fa-square"></i>
                </span>
                <span class="text-[16px] font-bold">Step</span>
                <span class="text-blue-600">
                    <i class="fa-solid fa-angle-right"></i>
                </span>
            </label>
        </div>
    </div>
</div>
