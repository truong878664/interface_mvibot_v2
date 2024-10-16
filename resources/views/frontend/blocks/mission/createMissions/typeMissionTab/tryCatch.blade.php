<div class="hidden h-full w-full flex flex-col function-item form-else-if type-mission-tab overflow-hidden">
    <div class="flex justify-between items-end">
        <div class="flex flex-col">
            <label for="" class="">Name try-catch</label>
            <input class="w-[200px]  px-4 py-1 name-trycatch-mission" type="text" name="" required>
        </div>

        @include('frontend.blocks.mission.createMissions.typeMissionTab.buttonTypeMission', [
            'type' => 'trycatch',
        ])
    </div>

    <div class=" h-[calc(100%_-_42px)] flex flex-col">
        {{-- try --}}
        <div class="flex items-center h-[46px]">
            <label
                class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg border try-label normal-border">try</label>
            <div class="text-[16px] flex try-steps-wrapper overflow-x-auto"></div>
            <button
                class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2 add-if-step-btn add-trycatch-step-btn active"
                type="try">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        {{-- catch --}}
        <div class="flex items-center h-[46px]">
            <label
                class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg border catch-label normal-border">catch</label>
            <div class="text-[16px] flex catch-steps-wrapper overflow-x-auto">

            </div>
            <button
                class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2 add-then-step-btn add-trycatch-step-btn"
                type="catch">
                <i class="fa-solid fa-plus"></i>
            </button>

        </div>
        @include('frontend.blocks.mission.createMissions.typeMissionTab.functionItem', [
            'type' => 'trycatch',
        ])

    </div>

</div>
<style>
    .add-trycatch-step-btn.active {
        background-color: var(--main-color);
        color: #fff;
        border: #fff;
    }
</style>
