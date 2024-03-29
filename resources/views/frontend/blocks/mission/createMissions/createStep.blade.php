<style>
    .type-mission-btn.active {
        background-color: rgb(216, 216, 216) !important;
    }

    .function-btn.active {
        font-weight: bold;
    }

    .type-mission-function-item.highline {
        border: 2px solid var(--main-color);
        border-radius: 10px;
    }

    .function-item-2.active {
        border-top: 2px solid var(--main-color);
    }

    .bg-gpio {
        background-color: rgba(242, 146, 28, 0.5);
    }

    .bg-battery {
        background-color: rgba(28, 146, 242, 0.5);
    }

    .bg-error {
        background-color: rgba(255, 39, 39, 0.5);
    }

    .bg-normal {
        background-color: rgba(25, 200, 28, 0.5);
    }

    .type-mission-error {
        /* display: none; */
    }

    .function-item-form {
        animation: zoom 200ms linear;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
    }
</style>

<div class="w-full h-full flex-col flex justify-start relative" id="create-step-container">
    <div class="w-full h-full flex flex-col">

        <div class="w-full md:flex h-[calc(60%_-_2.5px)] mb-1 min-h-[300px]">
            {{-- TYPE MISSION --}}
            <div class="bg-white mr-1 w-1/5 relative rounded-md border">
                <input type="text" value="{{ $itemRender->id }}" class="hidden" id="current-id-mission">
                <p class=" text-center text-[#333] font-bold absolute w-full top-0 uppercase bg-stone-200">
                    type mission - <span data="{{ $itemRender->type }}"
                        class="type-mission">{{ $itemRender->type }}</span>
                </p>
                <div class="overflow-y-auto overflow-x-hidden min-h-0 mt-[20px] h-full type-mission-btn-wrapper">
                    <div data-index="0" data-type-mission="normal"
                        class="active normal-mission-btn function-btn type-mission-btn type-mission-btn  font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)] shadow-sm shadow-[#ccc]">
                        <span>Normal mission</span>
                    </div>
                    <div data-index="1" data-type-mission="ifelse"
                        class="ifelse-mission-btn function-btn type-mission-btn type-mission-btn  font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)] shadow-sm shadow-[#ccc]">
                        <span>If-Else mission</span>
                    </div>

                    <div data-index="2" data-type-mission="trycatch"
                        class="trycatch-mission-btn function-btn type-mission-btn type-mission-btn  font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)] shadow-sm shadow-[#ccc] {{ $version === 'new_wave' ? 'hidden' : '' }}">
                        <span>Try-catch mission</span>
                    </div>
                </div>
            </div>
            {{-- END TYPE MISISON --}}

            {{-- overlay idit --}}
            <div id="overlay-update-mission"
                class="fixed top-0 left-0 right-0 bottom-0 bg-black z-19 opacity-25 hidden"></div>
            {{-- end overlay idit --}}

            {{-- DETAIL TYPE MISISON --}}
            <div class="bg-white mr-1 p-2 w-2/5 flex-1 z-20 rounded-md border type-mission-update-wrapper">
                <div class="h-full w-full relative mt-[4px]">
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.normal')
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.ifElse')
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.tryCatch')
                </div>
            </div>
            {{-- END DETAIL TYPE MISISON --}}

            <div class="bg-white p-2 w-2/5 flex-1 z-20 rounded-md border function-mission-update-wrapper">
                <div
                    class="w-full h-[30px] flex items-center overflow-x-auto overflow-y-hidden function-mission-btn-wrapper">

                    <button data-index="0" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-green-500/10 px-2 py-1 mx-2 btn function-item-2 flex gpio-function-btn function-btn active function-mission-btn">
                        <span class="mr-2 text-green-500">
                            <i class="fa-solid fa-microchip"></i>
                        </span>
                        <span>
                            GPIO
                        </span>
                    </button>

                    <button data-index="1" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-blue-500/10 px-2 py-1 mx-2 btn function-item-2 flex gpio-module-function-btn gpio_module-function-btn function-btn function-mission-btn {{ $version === 'new_wave' ? 'hidden' : '' }}">
                        <span class="mr-2 text-blue-500">
                            <i class="fa-solid fa-microchip"></i>
                        </span>
                        <span>
                            GPIO_module
                        </span>
                    </button>

                    <button data-index="2" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-yellow-500/10 px-2 py-1 mx-2 btn function-item-2 flex footprint-function-btn data-[type-mission=error-gpio]:hidden data-[type-mission=error-robot]:hidden data-[type-mission=gpio]:hidden function-btn function-mission-btn">
                        <span class="mr-2 text-yellow-500">
                            <i class="fa-solid fa-arrows-left-right-to-line"></i>
                        </span>
                        <span>
                            Footprint
                        </span>
                    </button>

                    <button data-index="3" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-sky-500/10 px-2 py-1 mx-2 btn function-item-2 flex marker-function-btn data-[type-mission=error-gpio]:hidden data-[type-mission=error-robot]:hidden data-[type-mission=gpio]:hidden function-btn function-mission-btn">
                        <span class="mr-2 text-sky-500">
                            <i class="fa-solid fa-arrows-up-to-line"></i>
                        </span>
                        <span>
                            Marker
                        </span>
                    </button>

                    <button data-index="4" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-red-600/10 px-2 py-1 mx-2 btn function-item-2 flex sleep-function-btn function-btn function-mission-btn">
                        <span class="mr-2 text-red-600">
                            <i class="fa-solid fa-mattress-pillow"></i>
                        </span>
                        <span>
                            Sleep
                        </span>
                    </button>

                    <button data-index="5" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-purple-600/10 px-2 py-1 mx-2 btn function-item-2 flex sound-function-btn data-[type-mission=error-gpio]:hidden data-[type-mission=error-robot]:hidden data-[type-mission=gpio]:hidden function-btn function-mission-btn">
                        <span class="mr-2 text-purple-600">
                            <i class="fa-solid fa-volume-high"></i>
                        </span>
                        <span>Sound</span>
                    </button>

                    <button data-index="6" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-stone-600/10 px-2 py-1 mx-2 btn function-item-2 flex position-function-btn point-function-btn data-[type-mission=error-gpio]:hidden data-[type-mission=error-robot]:hidden data-[type-mission=gpio]:hidden function-btn function-mission-btn">
                        <span class="mr-2 text-stone-600">
                            <i class="fa-solid fa-location-dot"></i>
                        </span>
                        <span>
                            Position
                        </span>
                    </button>

                    <button data-index="7" data-type-mission="{{ $itemRender->type }}"
                        class="text-sm [&.active]:bg-orange-600/10 px-2 py-1 mx-2 btn function-item-2 flex variable-function-btn function-btn function-mission-btn">
                        <span class="mr-2 text-orange-600">
                            <i class="fa-solid fa-file-code"></i>
                        </span>
                        <span>
                            Variable
                        </span>
                    </button>

                </div>
                <div class="h-[calc(100%_-_34px)] w-full relative mt-1">

                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'gpio',
                    ])
                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'gpio_module',
                    ])
                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'footprint',
                    ])
                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'marker',
                    ])
                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'sleep',
                    ])
                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'sound',
                    ])
                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'position',
                    ])
                    @include('frontend.blocks.mission.createMissions.functionTab.functionItem', [
                        'type' => 'variable',
                    ])

                </div>
            </div>
        </div>

        <div
            class="fixed top-0 left-0 right-0 bottom-0 z-25 bg-[rgba(0,0,0,0.2)] flex justify-center items-center function-item-form-wrapper hidden">
            <div
                class="w-[80%] h-[80%] rounded-md function-item-form relative overflow-hidden flex justify-center items-center">
                @include('frontend.blocks.mission.createMissions.functionTab.gpio', [
                    'type' => 'gpio',
                ])
                @include('frontend.blocks.mission.createMissions.functionTab.gpio', [
                    'type' => 'gpio_module',
                ])
                @include('frontend.blocks.mission.createMissions.functionTab.footprint')
                @include('frontend.blocks.mission.createMissions.functionTab.marker')
                @include('frontend.blocks.mission.createMissions.functionTab.sleep')
                @include('frontend.blocks.mission.createMissions.functionTab.sound')
                @include('frontend.blocks.mission.createMissions.functionTab.point')
                @include('frontend.blocks.mission.createMissions.functionTab.variable')
            </div>
        </div>

        <div class="w-full bg-white z-21 h-[calc(40%)] border rounded-md overflow-hidden"id="block-step-container">
            @include('frontend.blocks.mission.createMissions.functionTab.steps')
        </div>
    </div>
</div>
