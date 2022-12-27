<div class="flex items-center">
    <a href="{{ route('dashboard.missions.create-missions.') }}" class="mx-4">
        <i class="fa-solid fa-angle-left"></i>
    </a>
    <div class="create-mission-heading text-[20px]">{{ $itemRender->name_mission }}</div>
</div>

<div class="w-full h-[calc(100%_-_26px)] flex flex-col relative">
    <div class=" w-full lg:flex lg:flex-1">
        {{-- point --}}
        <div
            class="mb-2 bg-[#fff] h-[30%] overflow-hidden lg:w-1/5 lg:h-full lg:mx-1 border-[1px] min-h-[200px] border-solid">
            <p class="text-2xl text-center bg-[rgba(15,108,189,0.52)] text-[#333]">point</p>
            <div class="overflow-y-auto overflow-x-hidden h-full pb-[20px]">
                {{-- point item --}}
                @include('frontend.blocks.mission.createMissions.showPoint.showPoint')

            </div>
        </div>
        {{-- function --}}
        <div class="mb-2 bg-[#fff] h-[30%] lg:mx-1 lg:w-1/5 lg:h-full border-[1px] min-h-[200px]  overflow-hidden">
            <p class="text-2xl text-center bg-[rgba(15,108,189,0.52)] text-[#333]">function</p>
            <div class="overflow-y-auto overflow-x-hidden h-full pb-[20px]">
                <div
                    class=" function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)] active">
                    <span>Footprint</span>
                </div>
                <div
                    class=" function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                    <span>GPIO</span>
                </div>
                <div
                    class=" function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                    <span>Marker</span>
                </div>
                <div
                    class=" function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                    <span>Sleep</span>
                </div>
                <div
                    class="hidden function-btn text-2xl mb-[2px] px-4 py-3 bg-[rgba(204,204,204,0.2)] cursor-pointer select-none hover:bg-[rgba(204,204,204,0.5)]">
                    <span>Sound</span>
                </div>
            </div>
        </div>

        {{-- deteil fc --}}
        <div class="mb-2 bg-[#fff] h-[40%] p-4 lg:w-3/5 lg:h-full lg:mx-1 border-[1px] flex-1 min-h-[300px]">
            <div class="h-full w-full relative">
                @include('frontend.blocks.mission.createMissions.functionTab.footprint')
                @include('frontend.blocks.mission.createMissions.functionTab.gpio')
                @include('frontend.blocks.mission.createMissions.functionTab.marker')
                @include('frontend.blocks.mission.createMissions.functionTab.sleep')
                @include('frontend.blocks.mission.createMissions.functionTab.sound')
            </div>
        </div>
    </div>
    <div class="mb-2 w-full h-[150px] border-[1px] bg-slate-50 mt-5">
        @include('frontend.blocks.mission.createMissions.functionTab.steps')
    </div>

</div>
{{-- </div> --}}
<style>
    .function-btn.active {
        background: rgba(204, 204, 204, 70%)
    }
</style>

<script>
    $$('.function-btn').forEach((item, index) => {
        item.onclick = () => {
            $('.function-btn.active').classList.remove('active')
            $('.function-item:not(.hidden)')?.classList.add('hidden')
            $$('.function-item')[index].classList.remove(
                'hidden')
            item.classList.add('active')
        }
    });
</script>
