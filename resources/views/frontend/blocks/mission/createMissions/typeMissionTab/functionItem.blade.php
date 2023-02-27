<div class="w-full flex-1 flex justify-between overflow-hidden">
    <div class="w-full lg:w-1/2 overflow-hidden relative shadow-md rounded-lg mr-1">
        <div class="absolute top-0 w-full flex z-20 h-[30px]">
            <div class="flex h-full w-full overflow-x-scroll">
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

    <div class="w-full lg:w-1/2 h-full overflow-hidden relative shadow-md rounded-lg ml-1 flex flex-col">
        <div class="w-full flex-1 h-[calc(100%_-_50px)] type-mission-wrapper">
            <div class="absolute top-0 w-full bg-slate-100 flex z-20 h-[30px]">
                <div class="flex h-full w-full overflow-x-scroll">
                    <button
                        class="text-[14px] whitespace-nowrap rounded-tl-lg rounded-tr-lg px-3 h-full bg-[rgba(204,204,204,0.2)] mr-[1px] hover:bg-[rgba(204,204,204,0.2)] "
                        type="gpio">Type mission</button>
                </div>
            </div>
            <div
                class="w-full h-full overflow-auto pt-[30px] bg-[rgba(204,204,204,0.5)] text-xl  type-mission-item-wrapper-{{ $type }}">
                
            </div>
        </div>
        <div class="flex self-end mt-2">
            <div class="update-wrapper-{{$type}} hidden">
                <button
                class=" btn mr-2 bg-yellow-400 text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl cancel-{{ $type }} ">Cancel</button>
                <button
                class=" btn mr-2 bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl update-{{ $type }} ">Update</button>
            </div>

            <div class="add-wrapper-{{$type}}">
                <button
                class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl save-mission-{{ $type }}">Save</button>
                <button
                class=" btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl add-mission-{{ $type }}">Add</button>
            </div>
        </div>
    </div>
</div>

{{-- <div
        class="w-full h-full overflow-auto pt-[30px] bg-[rgba(204,204,204,0.5)] text-xl type-mission-item-wrapper hidden">

        <div function-id=${item.id} function-type="${item.mode}"
            class="flex justify-between items-center bg-[rgba(204,204,204,0.53)] px-5 py-3 mb-2 point-id-8">
            <input type="hidden" value='${JSON.stringify(item)}' class="value-function-item" />
            <div class="flex flex-col">
                <span class="font-bold font-3xl capitalize">Normal</span>
                <div class="flex">
                    <span class="mr-2">Name:</span>
                    <span class="name-mission">MISSION</span>
                </div>
            </div>
            <input value="${item.mode}#${nameStep}#${item.id}" type="hidden"
                class="value-type-mission-function-item" />
            <div class="">
                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md delete-function-item-btn">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md edit-function-item-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white btn rounded-md add-mission-step-item-btn">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="flex absolute right-0 bottom-0 mr-4 mb-4 z-20 hidden">
        <button
            class=" btn mr-2 bg-yellow-400 text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl cancel-{{ $type }} hidden">Cancel</button>
        <button
            class=" btn mr-2 bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl update-{{ $type }} hidden">Update</button>
        <button
            class=" btn mr-2 bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md md:text-3xl text-xl add-mission-{{ $type }}">Add</button>
    </div> --}}

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
