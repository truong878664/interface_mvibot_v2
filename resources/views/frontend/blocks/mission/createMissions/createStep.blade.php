<div class="w-full h-full flex-col flex justify-start relative ">
    <div class="w-full h-full flex flex-col">

        <div class="w-full lg:flex h-[calc(60%_-_2.5px)] mb-1 min-h-[300px]">
            {{-- TYPE MISSION --}}
            <div class="bg-[#fff] mr-1 w-1/5 relative rounded-md border">
                <input type="text" value="{{ $itemRender->id }}" class="hidden" id="current-id-mission">
                <p class="text-2xl text-center text-[#333] font-bold absolute w-full top-0 uppercase bg-stone-200">
                    type mission - <span data="{{ $itemRender->type }}"
                        class="type-mission">{{ $itemRender->type }}</span>
                </p>
                <div class="overflow-y-auto overflow-x-hidden min-h-0 mt-[20px] h-full type-mission-btn-wrapper">
                    <div data-index="0"
                        class="active normal-mission-btn function-btn type-mission-btn type-mission-btn text-2xl font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Normal mission</span>
                    </div>
                    <div data-index="1"
                        class="ifelse-mission-btn function-btn type-mission-btn type-mission-btn text-2xl font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>If-Else mission</span>
                    </div>

                    <div data-index="2"
                        class="trycatch-mission-btn function-btn type-mission-btn type-mission-btn text-2xl font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Try-catch mission</span>
                    </div>
                </div>
            </div>
            {{-- END TYPE MISISON --}}

            {{-- overlay idit --}}
            <div id="overlay-update-mission"
                class="fixed top-0 left-0 right-0 bottom-0 bg-black z-[19] opacity-25 hidden"></div>
            {{-- end overlay idit --}}

            {{-- DETAIL TYPE MISISON --}}
            <div class="bg-[#fff] mr-1 p-2 w-2/5 flex-1 z-[20] rounded-md border type-mission-update-wrapper">
                <div class="h-full w-full relative mt-[4px]">
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.normal')
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.ifElse')
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.tryCatch')
                </div>
            </div>
            {{-- END DETAIL TYPE MISISON --}}

            <div class="bg-[#fff] p-2 w-2/5 flex-1 z-[20] rounded-md border function-mission-update-wrapper">
                <div
                    class="w-full h-[30px] flex items-center overflow-x-auto overflow-y-hidden function-mission-btn-wrapper">

                    <button data-index="0"
                        class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex gpio-function-btn function-btn active function-mission-btn">
                        <span class="mr-2 text-green-500">
                            <i class="fa-solid fa-lightbulb"></i>
                        </span>
                        <span>
                            GPIO
                        </span>
                    </button>

                    <button data-index="1"
                        class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex gpio-module-function-btn function-btn function-mission-btn">
                        <span class="mr-2 text-blue-500">
                            <i class="fa-regular fa-lightbulb"></i>
                        </span>
                        <span>
                            GPIO_module
                        </span>
                    </button>

                    <button data-index="2"
                    class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex footprint-function-btn {{ $itemRender->type === 'error' ? 'hidden' : '' }} function-btn function-mission-btn">
                    <span class="mr-2 text-yellow-500">
                        <i class="fa-solid fa-arrows-to-dot"></i>
                    </span>
                    <span>
                        Footprint
                    </span>
                </button>

                    <button data-index="3"
                        class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex marker-function-btn {{ $itemRender->type === 'error' ? 'hidden' : '' }} function-btn function-mission-btn">
                        <span class="mr-2 text-sky-500">
                            <i class="fa-solid fa-map-pin"></i>
                        </span>
                        <span>
                            Marker
                        </span>
                    </button>

                    <button data-index="4"
                        class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex sleep-function-btn function-btn function-mission-btn">
                        <span class="mr-2 text-red-600">
                            <i class="fa-solid fa-mattress-pillow"></i>
                        </span>
                        <span>
                            Sleep
                        </span>
                    </button>

                    <button data-index="5"
                        class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex sound-function-btn {{ $itemRender->type === 'error' ? 'hidden' : '' }} function-btn function-mission-btn">
                        <span class="mr-2 text-purple-600">
                            <i class="fa-solid fa-volume-high"></i>
                        </span>
                        <span>
                            Sound
                        </span>
                    </button>

                    <button data-index="6"
                        class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex point-function-btn {{ $itemRender->type === 'error' ? 'hidden' : '' }} function-btn function-mission-btn">
                        <span class="mr-2 text-stone-600">
                            <i class="fa-solid fa-location-dot"></i>
                        </span>
                        <span>
                            Position
                        </span>
                    </button>

                    <button data-index="7"
                        class="text-sm md:text-2xl px-2 py-1 mx-2 btn rounded-md function-item-2 flex variable-function-btn function-btn function-mission-btn">
                        <span class="mr-2 text-orange-600">
                            <i class="fa-solid fa-square-root-variable"></i>
                        </span>
                        <span>
                            Variable
                        </span>
                    </button>

                </div>
                <div class="h-[calc(100%_-_34px)] w-full relative mt-[4px]">

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
            class="fixed top-0 left-0 right-0 bottom-0 z-20 bg-[rgba(0,0,0,0.2)] flex justify-center items-center function-item-form-wrapper hidden">
            <div class="w-[80%] h-[80%]  bg-[#fff] rounded-md p-4 function-item-form relative">
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

        <div class="w-full bg-[#fff] z-18 h-[calc(40%)] border rounded-md overflow-hidden">
            @include('frontend.blocks.mission.createMissions.functionTab.steps')
        </div>
    </div>
</div>


<style>
    .type-mission-btn.active {
        background-color: rgb(216, 216, 216) !important;
    }

    .function-btn.active {
        background: rgb(245, 245, 244);
        font-weight: bold;
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
        animation: zoom 100ms linear;
        -webkit-animation-timing-function: linear;
        animation-timing-function: linear;
    }

    @keyframes zoom {
        from {
            transform: scale(50%);
        }

        to {
            transform: scale(100%);
        }
    }
</style>
