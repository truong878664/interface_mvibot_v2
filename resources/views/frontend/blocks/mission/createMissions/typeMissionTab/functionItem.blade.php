<div class="w-full flex-1 flex justify-between overflow-hidden  mb-2">
    <div class="w-full lg:w-1/2 overflow-hidden relative rounded-lg mr-1 hidden">
        <div class="absolute top-0 w-full flex z-20 h-[30px] ">
            <div class="flex h-full w-full overflow-x-scroll bg-[#e5e5e5]">
                <button
                    class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="gpio">Gpio</button>
                <button
                    class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="gpio_module">Gpio module</button>
                <button
                    class="type-mission-{{ $itemRender->type }} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="footprint">Footprint</button>
                <button
                    class="type-mission-{{ $itemRender->type }} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="marker">Marker</button>
                <button
                    class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="sleep">Sleep</button>
                <button
                    class="type-mission-{{ $itemRender->type }} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="position">Point</button>
                <button
                    class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
                    type="variable">Variable</button>
                <button
                    class="type-mission-{{ $itemRender->type }} text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] type-mission-function-{{ $type }}"
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

    <div class="w-full h-full overflow-hidden relative flex flex-col border">
        <div class="w-full flex-1 h-full type-mission-wrapper">
            <div
                class="w-full h-full overflow-auto bg-[#fff] text-xl type-mission-item-wrapper-{{ $type }}">
            </div>
        </div>
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
