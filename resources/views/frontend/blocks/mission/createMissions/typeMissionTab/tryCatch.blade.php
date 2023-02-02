<div class="hidden h-full w-full flex flex-col function-item form-else-if overflow-hidden">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name try-catch</label>
        <input class="w-[200px] text-xl px-4 py-1 input-reset name-trycatch-mission" type="text" name=""
            required>
    </div>
    <div class=" h-[calc(100%_-_42px)] flex flex-col">

        <div class="my-8">

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