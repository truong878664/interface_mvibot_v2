@php
    $functions = [
        [
            'type' => 'footprint',
            'title' => 'footprint',
            'color' => 'text-[#38c3ff]',
            'bg' => 'bg-[#38c3ff]/20',
            'icon' => 'fa-solid fa-arrows-left-right-to-line',
            'mission_not_allowed' => ['error-robot', 'error-gpio'],
        ],
        [
            'type' => 'gpio',
            'title' => 'gpio',
            'color' => 'text-[#30C930]',
            'bg' => 'bg-[#30C930]/20',
            'icon' => 'fa-solid fa-microchip',
            'mission_not_allowed' => [],
        ],
        [
            'type' => 'gpio_module',
            'title' => 'gpio module',
            'color' => 'text-[#EE5E8B]',
            'bg' => 'bg-[#EE5E8B]/20',
            'icon' => 'fa-solid fa-microchip',
            'mission_not_allowed' => [],
        ],
        [
            'type' => 'marker',
            'title' => 'marker',
            'color' => 'text-[#432C7A]',
            'bg' => 'bg-[#432C7A]/20',
            'icon' => 'fa-solid fa-arrows-up-to-line',
            'mission_not_allowed' => ['error-robot', 'error-gpio'],
        ],
        [
            'type' => 'sleep',
            'title' => 'sleep',
            'color' => 'text-[#DC2626]',
            'bg' => 'bg-[#DC2626]/20',
            'icon' => 'fa-solid fa-mattress-pillow',
            'mission_not_allowed' => [],
        ],
        [
            'type' => 'sound',
            'title' => 'sound',
            'color' => 'text-[#9333EA]',
            'bg' => 'bg-[#9333EA]/20',
            'icon' => 'fa-solid fa-volume-high',
            'mission_not_allowed' => ['error-gpio'],
        ],
        [
            'type' => 'position',
            'title' => 'position',
            'color' => 'text-[#57534E]',
            'bg' => 'bg-[#57534E]/20',
            'icon' => 'fa-solid fa-location-dot',
            'mission_not_allowed' => ['error-robot', 'error-gpio'],
        ],
        [
            'type' => 'variable',
            'title' => 'variable',
            'color' => 'text-[#EA580C]',
            'bg' => 'bg-[#EA580C]/20',
            'icon' => 'fa-solid fa-file-code',
            'mission_not_allowed' => [],
        ],
        [
            'type' => 'config',
            'title' => 'config',
            'color' => 'text-yellow-500',
            'bg' => 'bg-yellow-500/20',
            'icon' => 'fa-solid fa-grip',
            'mission_not_allowed' => ['error-robot', 'error-gpio'],
        ],
        [
            'type' => 'break',
            'title' => 'break',
            'color' => 'text-[#C9000C]',
            'bg' => 'bg-[#C9000C]/20',
            'icon' => 'fa-solid fa-link-slash',
            'mission_not_allowed' => [],
        ],
    ];

    $currentTypeMission = $itemRender->type;

    $typeMissions = [
        [
            'type' => 'normal',
            'title' => 'Normal',
            'color' => 'text-red-400',
            'bg' => 'bg-red-100',
            'icon' => 'fa-solid fa-bullseye',
        ],
        [
            'type' => 'ifelse',
            'title' => 'If else',
            'color' => 'text-green-400',
            'bg' => 'bg-green-100',
            'icon' => ' fa-solid fa-code-fork',
        ],
        [
            'type' => 'trycatch',
            'title' => 'Try Catch',
            'color' => 'text-yellow-400',
            'bg' => 'bg-yellow-100',
            'icon' => ' fa-solid fa-triangle-exclamation',
        ],
        [
            'type' => 'while',
            'title' => 'While',
            'color' => 'text-sky-400',
            'bg' => 'bg-sky-100',
            'icon' => ' fa-solid fa-arrows-spin',
        ],
        [
            'type' => 'logic_or',
            'title' => 'Logic OR',
            'color' => 'text-blue-400',
            'bg' => 'bg-blue-100',
            'icon' => ' fa-solid fa-grip-lines-vertical',
        ],
        [
            'type' => 'logic_and',
            'title' => 'Logic AND',
            'color' => 'text-pink-400',
            'bg' => 'bg-pink-100',
            'icon' => ' fa-solid fa-link',
        ],
    ];
@endphp
<div class="flex flex-col h-full" id="function-container">
    <input type="radio" name="tab-function" class="peer/function" hidden id="tab-function" checked>
    <input type="radio" name="tab-function" class="peer/type-mission" hidden id="tab-type-mission">
    <div class="w-full bg-stone-100 px-2 py-1 flex justify-evenly rounded-md items-center text-2xl group">
        <label
            class="cursor-pointer text-center rounded-md flex-1 peer-checked/function:group-[]:bg-white peer-checked/function:group-[]:font-bold"
            for="tab-function">
            function
        </label>
        <label for="tab-type-mission"
            class="cursor-pointer text-center rounded-md flex-1 peer-checked/type-mission:group-[]:bg-white peer-checked/type-mission:group-[]:font-bold">
            type mission
        </label>
    </div>

    <div class="h-full overflow-y-auto overflow-x-hidden hidden peer-checked/function:block">
        @foreach ($functions as $index => $item)
            @if (!in_array($currentTypeMission, $item['mission_not_allowed']))
                @if ($item['type'] === 'break')
                    <button data-button-function-kind="add" data-function-type="break" data-value="break##"
                        class="function-item label-function shadow-sm h-[30px] text-[16px] flex items-center justify-between rounded-md px-4 mt-3 mb-1 btn border border-stone-100 {{ $item['bg'] }}">
                        <div class="flex">
                            <span class="mr-4 {{ $item['color'] }} w-[24px] text-center">
                                <i class="{{ $item['icon'] }}"></i>
                            </span>
                            <span class="capitalize">{{ $item['title'] }}</span>
                        </div>
                    </button>
                @else
                    <div class="">
                        <input type="radio" name="function" class="peer/function function" id="{{ $item['type'] }}"
                            hidden>
                        <button data-type="{{ $item['type'] }}"
                            onclick="(()=>{const {type} = this.dataset;const radio = document.getElementById(type);radio.checked = radio.checked ? false :true;})()"
                            class="label-function w-full shadow-sm h-[30px] text-[16px] flex items-center justify-between rounded-md px-4 mt-3 mb-1 btn border border-stone-100 {{ $item['bg'] }}">
                            <div class="flex">
                                <span class="mr-4 {{ $item['color'] }} w-[24px] text-center">
                                    <i class="{{ $item['icon'] }}"></i>
                                </span>
                                <span class="capitalize">{{ $item['title'] }}</span>
                            </div>
                            <span
                                class="{{ $item['color'] }} transition-all down {{ $item['type'] === 'break' ? '!hidden' : '' }}">
                                <i class="fa-solid fa-angle-down"></i>
                            </span>
                        </button>
                        <div class="hidden peer-checked/function:block relative">
                            <div data-list-function="{{ $item['type'] }}"
                                class="w-full max-h-[500px] bg-stone-50 overflow-y-auto p-4 rounded-md text-[16px] pt-14 {{ $item['type'] === 'break' ? '!hidden' : '' }}">

                            </div>

                            @if ($item['type'] !== 'break')
                                <div class="absolute top-0 right-0 pr-2 pt-1 flex gap-2 w-full justify-end">
                                    <div class="flex text-2xl">
                                        <input type="checkbox" name="" class="sr-only peer/search"
                                            id="s-{{ $item['type'] }}">
                                        <input data-type="{{ $item['type'] }}" type="text" data-action="search"
                                            class="px-2 peer-checked/search:block focus:ring-transparent focus:bottom-0 hidden search-function-input !border-gray-200 border-r-0 rounded-l-md">
                                        <label for="s-{{ $item['type'] }}"
                                            class="py-1 px-4 border rounded-md peer-checked/search:border-l-0 peer-checked/search:rounded-l-none text-base h-full bg-white grid place-content-center">
                                            <i class="fa-solid fa-magnifying-glass"></i>
                                        </label>
                                    </div>
                                    <button data-index="{{ $index }}" data-button-function-kind="new"
                                        data-type-mission="{{ $item['type'] }}"
                                        class=" bg-main py-1 px-2 text-white rounded-md text-2xl btn">New</button>
                                </div>
                            @endif
                        </div>
                    </div>
                @endif
            @endif

        @endforeach

        <div id="function-item-form-wrapper"
            class="fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,0.2)] flex justify-center items-center hidden">
            <div
                class="w-[80%] h-[80%] rounded-md function-item-form relative overflow-hidden flex justify-center items-center">
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.gpio')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.gpioModule')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.footprint')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.marker')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.sleep')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.sound')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.position')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.variable')
                @include('frontend.pages.missions.createMissionsV4.partials.function.tab.config')
            </div>
        </div>
    </div>

    <div class="h-full overflow-y-auto overflow-x-hidden hidden peer-checked/type-mission:block"
        id="list-type-mission-wrapper">
        @foreach ($typeMissions as $index => $item)
            <div class="">
                <input type="radio" name="function" class="peer/function function" id="{{ $item['type'] }}" hidden>
                <button data-type="{{ $item['type'] }}"
                    onclick="(()=>{const {type} = this.dataset;const radio = document.getElementById(type);radio.checked = radio.checked ? false :true;})()"
                    class="label-function w-full shadow-sm h-[30px] text-[16px] flex items-center justify-between rounded-md px-4 mt-3 mb-1 btn border border-stone-100 {{ $item['bg'] }}">
                    <div class="flex">
                        <span class="mr-4 {{ $item['color'] }} w-[24px] text-center">
                            <i class="{{ $item['icon'] }}"></i>
                        </span>
                        <span class="capitalize">{{ $item['title'] }}</span>
                    </div>
                    <span class="{{ $item['color'] }} transition-all down">
                        <i class="fa-solid fa-angle-down"></i>
                    </span>
                </button>
                <div class="hidden peer-checked/function:block relative">
                    <div class="w-full max-h-[500px] min-h-[100px] bg-stone-50 overflow-y-auto p-4 rounded-md text-2xl"
                        data-list-type-mission="{{ $item['type'] }}">
                    </div>
                </div>
            </div>
        @endforeach
    </div>
    <script></script>
</div>
