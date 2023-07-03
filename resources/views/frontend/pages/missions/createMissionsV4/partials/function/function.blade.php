@php
    $typeMissions = [
        [
            'type' => 'footprint',
            'title' => 'footprint',
            'color' => 'text-[#38c3ff]',
            'bg' => 'bg-[#38c3ff33]',
            'icon' => 'fa-solid fa-arrows-left-right-to-line',
        ],
        [
            'type' => 'gpio',
            'title' => 'gpio',
            'color' => 'text-[#30C930]',
            'bg' => 'bg-[#30C93033]',
            'icon' => 'fa-solid fa-microchip',
        ],
        [
            'type' => 'gpio_module',
            'title' => 'gpio module',
            'color' => 'text-[#EE5E8B]',
            'bg' => 'bg-[#EE5E8B33]',
            'icon' => 'fa-solid fa-microchip',
        ],
        [
            'type' => 'marker',
            'title' => 'marker',
            'color' => 'text-[#432C7A]',
            'bg' => 'bg-[#432C7A33]',
            'icon' => 'fa-solid fa-arrows-up-to-line',
        ],
        [
            'type' => 'sleep',
            'title' => 'sleep',
            'color' => 'text-[#DC2626]',
            'bg' => 'bg-[#DC262633]',
            'icon' => 'fa-solid fa-mattress-pillow',
        ],
        [
            'type' => 'sound',
            'title' => 'sound',
            'color' => 'text-[#9333EA]',
            'bg' => 'bg-[#9333EA33]',
            'icon' => 'fa-solid fa-volume-high',
        ],
        [
            'type' => 'position',
            'title' => 'position',
            'color' => 'text-[#57534E]',
            'bg' => 'bg-[#57534E33]',
            'icon' => 'fa-solid fa-location-dot',
        ],
        [
            'type' => 'variable',
            'title' => 'variable',
            'color' => 'text-[#EA580C]',
            'bg' => 'bg-[#EA580C33]',
            'icon' => 'fa-solid fa-file-code',
        ],
        [
            'type' => 'break',
            'title' => 'break',
            'color' => 'text-[#C9000C]',
            'bg' => 'bg-[#C9000C33]',
            'icon' => 'fa-solid fa-link-slash',
        ],
    ];
@endphp
<div class="flex flex-col h-full overflow-y-auto overflow-x-clip" id="function-container">
    @foreach ($typeMissions as $index => $item)
        @if ($item['type'] === 'break')
            <button data-button-function-kind="add" data-function-type="break" data-value="break##" class="label-function shadow-sm h-[30px] text-[16px] flex items-center justify-between rounded-md px-4 mt-3 mb-1 btn border border-stone-100 {{ $item['bg'] }}">
                <div class="flex">
                    <span class="mr-4 {{ $item['color'] }} w-[24px] text-center">
                        <i class="{{ $item['icon'] }}"></i>
                    </span>
                    <span class="capitalize">{{ $item['title'] }}</span>
                </div>
            </button>
        @else
            <div class="">
                <input type="checkbox" hidden name="function" class="peer/function function" id="{{ $item['title'] }}">
                <label for="{{ $item['title'] }}"
                    class="label-function shadow-sm h-[30px] text-[16px] flex items-center justify-between rounded-md px-4 mt-3 mb-1 btn border border-stone-100 {{ $item['bg'] }}">
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
                </label>
                <div class="hidden peer-checked/function:block relative">
                    <div data-list-function="{{ $item['type'] }}"
                        class="w-full max-h-[500px] bg-stone-50 overflow-y-auto p-4 rounded-md text-[16px] pt-14 {{ $item['type'] === 'break' ? '!hidden' : '' }}">

                    </div>

                    @if ($item['type'] !== 'break')
                        <button data-index="{{ $index }}" data-button-function-kind="new"
                            data-type-mission="{{ $item['type'] }}"
                            class="absolute top-0 right-0 bg-main py-1 px-2 text-white rounded-md text-2xl mr-2 mt-1 btn">New</button>
                    @endif
                </div>
            </div>
        @endif
    @endforeach

    <div id="function-item-form-wrapper"
        class="fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,0.2)] flex justify-center items-center hidden">
        <div
            class="w-[80%] h-[80%] rounded-md function-item-form relative overflow-hidden flex justify-center items-center">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.gpio', [
                'type' => 'gpio',
            ])
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.gpio', [
                'type' => 'gpio_module',
            ])
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.footprint')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.marker')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.sleep')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.sound')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.position')
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.variable')
        </div>
    </div>

    <script></script>
</div>
