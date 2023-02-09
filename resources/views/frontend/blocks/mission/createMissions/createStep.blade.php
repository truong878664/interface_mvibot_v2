<div class="w-full h-full flex-col flex justify-start relative">
    {{-- <div class="flex items-center lg:mb-0 absolute top-0 left-0 -translate-y-full z-10">
        <a href="{{ route('dashboard.missions.create-missions.') }}"
            class="mx-4 bg-stone-300 px-4 rounded-md text-stone-400">
            <i class="fa-solid fa-angle-left"></i>
        </a>
        <div class="create-mission-heading text-[16px] font-bold">{{ $itemRender->name_mission }}</div>
    </div> --}}

    <div class="w-full h-full flex flex-col">
        <div class="w-full lg:flex h-[calc(60%_-_2.5px)] mb-1">
            <div
                class="mb-2 bg-[#fff] h-[20%] overflow-y-hidden lg:w-1/5 lg:h-full border border-solid relative">

                <p class="text-2xl text-center bg-[rgba(15,108,189,0.52)] text-[#333] font-bold absolute w-full top-0">
                    type mission
                </p>
                <div class="overflow-y-auto overflow-x-hidden min-h-0 mt-[20px] h-full">
                    <div
                        class="active normal-mission-btn function-btn type-mission-btn text-2xl font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Normal mission</span>
                    </div>
                    <div
                        class="ifelse-mission-btn function-btn type-mission-btn text-2xl font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>If-Else mission</span>
                    </div>

                    <div
                        class="trycatch-mission-btn function-btn type-mission-btn text-2xl font-bold mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Try-catch mission</span>
                    </div>
                </div>
            </div>

            <div
                class="mb-2 bg-[#fff] h-[20%] lg:w-1/5 lg:h-full border-[1px] overflow-hidden mx-1">
                <p class="text-2xl text-center bg-[rgba(15,108,189,0.52)] text-[#333]">function</p>
                <div class="overflow-y-auto overflow-x-hidden h-full pb-[20px]">
                    <div
                        class="footprint-function-btn function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)] ">
                        <span>Footprint</span>
                    </div>
                    <div
                        class="gpio-function-btn function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>GPIO</span>
                    </div>
                    <div
                        class="gpio-module-function-btn function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>GPIO module</span>
                    </div>
                    <div
                        class="marker-function-btn function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Marker</span>
                    </div>
                    <div
                        class="sleep-function-btn function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Sleep</span>
                    </div>
                    <div
                        class="hidden sound-function-btn function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Sound</span>
                    </div>

                    <div
                        class="point-function-btn function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                        <span>Position</span>
                    </div>
                </div>
            </div>

            <div class="fixed top-0 left-0 right-0 bottom-0 bg-black z-[19] opacity-25 hidden"
                id="overlay-update-mission"></div>
            <div
                class="mb-2 bg-[#fff] h-[60%] p-2 lg:w-3/5 lg:h-full border-[1px] flex-1 z-[20]">
                <div class="h-full w-full relative">
                    <div class="absolute right-0 top-0">
                        <button class="w-[30px] h-[30px] bg-cover btn info-function-btn"
                            style="background-image: url(/icon/info_icon.svg)">
                        </button>
                        <div
                            class="shadow-lg shadow-stone-400 w-[300px] h-[300px] bg-[#fff] absolute right-0 mt-3 px-10 py-5 text-2xl overflow-auto hidden info-function-content z-50">
                            <span class="function-info-heading font-bold">footprint</span>
                            <p class="function-info-content indent-[30px] text-justify">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis recusandae labore
                                deleniti, consectetur mollitia aperiam ea ut suscipit tempore odit ducimus minima,
                                dolore perspiciatis impedit dignissimos earum? Sunt, fuga cumque. Lorem ipsum dolor, sit
                                amet consectetur adipisicing elit. Debitis recusandae labore
                                deleniti, consectetur mollitia aperiam ea ut suscipit tempore odit ducimus minima,
                                dolore perspiciatis impedit dignissimos earum? Sunt, fuga cumque. Lorem ipsum dolor, sit
                                amet consectetur adipisicing elit. Debitis recusandae labore
                                deleniti, consectetur mollitia aperiam ea ut suscipit tempore odit ducimus minima,
                                dolore perspiciatis impedit dignissimos earum? Sunt, fuga cumque.
                            </p>
                        </div>
                    </div>
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.normal')
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.ifElse')
                    @include('frontend.blocks.mission.createMissions.typeMissionTab.tryCatch')
                    @include('frontend.blocks.mission.createMissions.functionTab.footprint')
                    @includeIf('frontend.blocks.mission.createMissions.functionTab.gpio', ['type' => 'gpio_normal'])
                    @includeIf('frontend.blocks.mission.createMissions.functionTab.gpio', ['type'=>'gpio_module'])
                    @include('frontend.blocks.mission.createMissions.functionTab.marker')
                    @include('frontend.blocks.mission.createMissions.functionTab.sleep')
                    @include('frontend.blocks.mission.createMissions.functionTab.sound')
                    @include('frontend.blocks.mission.createMissions.functionTab.point')
                </div>
            </div>
        </div>

        <div class="w-full bg-[#fff] z-18 h-[calc(40%)] border">
                @include('frontend.blocks.mission.createMissions.functionTab.steps')
        </div>
    </div>
</div>
</div>
<style>
    .function-btn.active {
        background: rgba(204, 204, 204, 70%)
    }
</style>
