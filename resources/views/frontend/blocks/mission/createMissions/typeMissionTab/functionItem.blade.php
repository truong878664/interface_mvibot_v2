<div class="w-full flex-1 flex justify-between overflow-hidden">
    <div class="w-full lg:w-1/2 bg-slate-50 overflow-hidden relative shadow-md">
        <div class="absolute top-0 w-full h-[30px] bg-slate-100 flex z-20">
            <button
                class="text-[14px] px-2 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.5)] type-mission-function-{{ $type }}"
                type="footprint">footprint</button>
            <button
                class="text-[14px] px-2 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.5)] type-mission-function-{{ $type }}"
                type="gpio">Gpio</button>
            <button
                class="text-[14px] px-2 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.5)] type-mission-function-{{ $type }}"
                type="marker">marker</button>
            <button
                class="text-[14px] px-2 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.5)] type-mission-function-{{ $type }}"
                type="sleep">sleep</button>
            <button
                class="text-[14px] px-2 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.5)] type-mission-function-{{ $type }}"
                type="position">point</button>
        </div>
        <div
            class="w-full h-full overflow-auto pt-[30px] bg-[rgba(204,204,204,0.5)] text-xl detail-type-mission-function  detail-type-mission-function-{{ $type }}">

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
    <button
        class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl add-mission-{{ $type }}">Add</button>
</div>

<style>
    .type-mission-function-normal.active,
    .type-mission-function-ifelse.active {
        background-color: rgba(204, 204, 204, 0.5);
    }
</style>
