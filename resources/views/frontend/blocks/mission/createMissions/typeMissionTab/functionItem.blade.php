<div class="w-full flex-1 flex justify-between overflow-hidden  mb-2">
    <div class="w-full h-full overflow-auto bg-[#fff] text-xl ">

        
        <div data-type="{{$type}}" class="bg-[rgba(204,204,204,0.2)] px-5 py-3 mb-2 text-[20px] h-[40px] rounded-md shadow-sm shadow-[#ccc] flex items-center text-xl">
            <div class="mr-8">
                <i class="fa-solid fa-turn-up rotate-180 translate-y-"></i>
                <input type="checkbox" id="checkall-{{$type}}" data-type="{{$type}}" class=" ml-4 w-[12px] h-[12px] accent-[#f5b933] check-all-input-type-mission">
                <label for="checkall-{{$type}}" class="font-bold">Check all</label>
            </div>
            <span>With selected: </span>
            <button data-type="{{$type}}" class="ml-4 btn delete-multi-type-mission-btn">
                <i class="fa-regular fa-trash-can text-red-500"></i>
                <span class="font-bold">Delete</span>
            </button>
            
            <button data-type="{{$type}}" class=" ml-4 btn copy-multi-type-mission-btn">
                <i class="fa-regular fa-copy text-sky-600 "></i>
                <span class="font-bold">Copy</span>
            </button>
        </div>
        <div class="type-mission-item-wrapper-{{ $type }} w-full"></div>
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

