<div class="hidden h-full w-full flex flex-col function-item form-else-if overflow-hidden">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name if-else</label>
        <input class="w-[200px] text-xl px-4 py-1 input-reset name-ifelse-mission" type="text" name="" required>
    </div>
    <div class=" h-[calc(100%_-_42px)] flex flex-col">

        <div class="my-8">

            <input type="hidden" class="if-step-value" placeholder="if">
            <input type="hidden" class="then-step-value" placeholder="then">
            <input type="hidden" class="else-step-value" placeholder="else">
            {{-- if --}}
            <div class="flex items-center h-[46px]">
                <label
                    class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg">if</label>
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
                    class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg">then</label>
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
                    class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg">else</label>
                <div class="text-[16px] flex else-steps-wrapper overflow-x-auto">

                </div>
                <button
                    class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2 add-else-step-btn add-ifelse-step-btn"
                    type="else">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>

            {{-- tab --}}

        </div>
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


@php
    // $string = 'aa>normal^|footprint#1#3|gpio#1#3|sllep#123#2+bb>ifelse^|gpio#1#5|footprint#1#3?|gpio#1#3|gpio#4#2?|gpio#2#3';
    // $arr1 = explode('+', $string);
    
    // foreach ($arr1 as $value1) {
    //     $arr2 = explode('^', $value1);
    //     dd($arr2[1]);
    // }
@endphp
