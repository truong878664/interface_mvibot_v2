<div class="w-full flex-1 flex justify-between overflow-hidden">
    <div class="w-full lg:w-1/2 bg-slate-50 overflow-hidden relative shadow-md rounded-lg">
        <div class="absolute top-0 w-full bg-slate-100 flex z-20 h-[30px]">
            <div class="flex h-full w-full overflow-x-scroll">
                <button
                    class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="gpio">Gpio</button>
                <button
                    class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="gpio_module">Gpio module</button>
                <button
                    class="type-mission-{{ $itemRender->type}} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="footprint">Footprint</button>
                <button
                    class="type-mission-{{ $itemRender->type}} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="marker">Marker</button>
                <button
                    class="type-mission-{{ $itemRender->type}} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="sleep">Sleep</button>
                <button
                    class="type-mission-{{ $itemRender->type}} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="position">Point</button>
                <button
                    class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="variable">Variable</button>
                <button
                    class="type-mission-{{ $itemRender->type}} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="sound">Sound</button>
            </div>
        </div>
        <div
            class="w-full h-full overflow-auto pt-[30px] bg-[rgba(204,204,204,0.5)] text-xl detail-type-mission-function detail-type-mission-function-{{ $type }}">

            <div class="point-id-1 flex justify-between items-center  px-5 py-3 mb-2 point-id-8">
                <div class="flex">
                    <span class="type-funciton bg-[rgba(204,204,204,0.53)]"></span>
                    <span class="name-function"></span>
                </div>
                <div class="h-[30px] w-[30px]">
                    <button class="text-3xl mr-2  bg-white btn"></button>
                </div>
            </div>
        </div>
    </div>
    <div class="flex">
        <button
            class=" btn mr-2 bg-yellow-400 text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl cancel-{{ $type }} hidden">Cancel</button>
        <button
            class=" btn mr-2 bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl update-{{ $type }} hidden">Update</button>
        <button
            class=" btn mr-2 bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl add-mission-{{ $type }}">Add</button>
    </div>
</div>

<style>
    .type-mission-function-normal.active,
    .type-mission-function-ifelse.active,
    .type-mission-function-trycatch.active {
        background-color: #ccc;
    }

    .not-allowed {
        pointer-events: none;
        background-color: rgb(126, 126, 126);
        color: #fff;
        border-color: rgb(126, 126, 126);
        display: none;
    }
</style>
