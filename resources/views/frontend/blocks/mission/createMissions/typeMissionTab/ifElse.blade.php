<div class="hidden h-full w-full flex flex-col function-item form-else-if overflow-hidden">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name if-else</label>
        <input class="w-[200px] text-xl px-4 py-1 input-reset" type="text" name="" required>
    </div>
    <div class=" h-[calc(100%_-_42px)] flex flex-col">

        <div class="my-8">

            {{-- if --}}
            <div class="flex">
                <label
                    class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg">if</label>
                <div class="text-[16px] flex">
                    <div class="h-[30px] px-4 bg-red-500 text-white text-[16px] leading-[30px] rounded-lg ml-2">sleep|1
                    </div>
                    <div class="h-[30px] px-4 bg-sky-500 text-white text-[16px] leading-[30px] rounded-lg ml-2">
                        footprint|1
                    </div>
                </div>
                <button
                    class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            {{-- then --}}
            <div class="flex mt-4">
                <label
                    class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg">then</label>
                <div class="text-[16px] flex">
                    <div class="h-[30px] px-4 bg-stone-600 text-white text-[16px] leading-[30px] rounded-lg ml-2">
                        position|1
                    </div>
                    <div class="h-[30px] px-4 bg-red-500 text-white text-[16px] leading-[30px] rounded-lg ml-2">sleep|1
                    </div>
                </div>
                <button
                    class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            {{-- else --}}
            <div class="flex mt-4">
                <label
                    class="h-[30px] px-5 bg-black text-white text-[16px] leading-[30px] font-bold rounded-lg">else</label>
                <div class="text-[16px] flex">
                    <div class="h-[30px] px-4 bg-red-500 text-white text-[16px] leading-[30px] rounded-lg ml-2">sleep|1
                    </div>
                    <div class="h-[30px] px-4 bg-green-500 text-white text-[16px] leading-[30px] rounded-lg ml-2">
                        marker|1
                    </div>
                </div>
                <button
                    class="h-[30px] px-5 border-[1px] btn border-[#000] text-[16px] leading-[30px] font-bold rounded-lg ml-2">
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
