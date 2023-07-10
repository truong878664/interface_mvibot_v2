<div class="mb-10 absolute bottom-0 right-0 w-full flex flex-row-reverse justify-between">
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
            <label for="input-send-mission" class="bg-black-o-30 absolute left-0 right-0 top-0 bottom-0 -z-10"></label>
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
        <label for="more-action" class="btn rounded-lg border px-4 py-2 text-3xl mx-2 bg-white">
            <i class="fa-solid fa-bars"></i>
        </label>
        <input hidden type="checkbox" id="more-action" class="peer/more-action">
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
<div class="pl-10"></div>
    {{-- WAKE UP STOP --}}
    <div class="absolute bottom-full right-0 mb-10 text-white">
        <button class="btn py-2 px-4 text-2xl font-bold bg-green-500 rounded-md">
            Wake up 
        </button>
        <button class="btn py-2 px-4 text-2xl font-bold bg-red-500 rounded-md">
            Stop 
        </button>
    </div>
    {{-- END WAKE UP STOP --}}


    <div class="flex justify-end flex-wrap ml-[20px]" id="create-type-mission-wrapper">
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
