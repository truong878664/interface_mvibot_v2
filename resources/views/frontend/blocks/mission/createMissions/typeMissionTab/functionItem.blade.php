<style>
    .highline {
        border: 2px solid var(--main-color);
        border-radius: 10px;
    }
</style>
<div class="w-full flex-1 flex justify-between overflow-hidden mb-2 relative">
    <div class="w-full h-full bg-[#fff] text-xl flex flex-col-reverse">
        <div data-type="{{$type}}" class="bg-[rgba(204,204,204,0.2)] px-5 py-3 mb- text-[20px] h-[40px] rounded-md shadow-sm shadow-[#ccc] flex items-center text-xl">
            <div class="mr-8">
                <i class="fa-solid fa-turn-up rotate-180 translate-y-"></i>
                <input type="checkbox" id="checkall-{{$type}}" data-type="{{$type}}" class=" ml-4 w-[12px] h-[12px] accent-[#f5b933] check-all-input-type-mission">
                <label for="checkall-{{$type}}" class="font-bold">Check all</label>
            </div>
            <span>With selected: </span>
            <button data-type="{{$type}}" class="ml-4 btn delete-multi-type-mission-btn multi-btn disabled:opacity-50 px-2 rounded-sm multi-btn">
                <i class="fa-regular fa-trash-can text-red-500"></i>
                <span class="font-bold pointer-events-none">Delete</span>
            </button>
            
            <button data-type="{{$type}}" class=" ml-4 btn copy-multi-type-mission-btn multi-btn disabled:opacity-50 multi-btn">
                <i class="fa-regular fa-copy text-sky-600 "></i>
                <span class="font-bold">Copy</span>
            </button>
        </div>
        <div class="type-mission-item-wrapper-{{ $type }} w-full h-full overflow-auto"></div>
    </div>
</div>


