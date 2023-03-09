<div class="hidden h-full w-full flex flex-col function-item form-else-if type-mission-tab overflow-hidden">
    <div class="flex justify-between items-end">
        <div class="flex flex-col">
            <label for="" class="text-xl">Name if-else</label>
            <input class="w-[200px] text-xl px-4 py-1 input-reset name-ifelse-mission" type="text" name="" required>
        </div>

        @include('frontend.blocks.mission.createMissions.typeMissionTab.buttonTypeMission', ['type'=>'ifelse'])

    </div>
    <div class="h-[calc(100%_-_42px)] flex flex-col">

        {{-- if --}}
        <div class="flex items-center h-[46px]">
            <label
                class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg border if-label normal-border">if</label>
            <div class="text-[16px] flex if-steps-wrapper overflow-x-auto">

            </div>
            <button
                class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2 add-if-step-btn add-ifelse-step-btn active"
                type="if">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        {{-- then --}}
        <div class="flex items-center h-[46px]">
            <label
                class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg border then-label normal-border">then</label>
            <div class="text-[16px] flex then-steps-wrapper overflow-x-auto">

            </div>
            <button
                class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2 add-then-step-btn add-ifelse-step-btn"
                type="then">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        {{-- else --}}
        <div class="flex items-center h-[46px]">
            <label
                class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg border else-label normal-border">else</label>
            <div class="text-[16px] flex else-steps-wrapper overflow-x-auto">

            </div>
            <button
                class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2 add-else-step-btn add-ifelse-step-btn"
                type="else">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        {{-- tab --}}

        @include('frontend.blocks.mission.createMissions.typeMissionTab.functionItem', [
            'type' => 'ifelse',
        ])

    </div>


</div>
<style>
    .add-ifelse-step-btn.active {
        background-color: var(--main-color);
        color: #fff;
        border: #fff;
    }
</style>
