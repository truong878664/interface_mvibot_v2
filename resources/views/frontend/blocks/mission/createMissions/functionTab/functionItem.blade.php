<div class="function-list-item {{ $type !== 'gpio' ? 'hidden' : '' }} w-full h-full flex flex-col">
    <div data-type="{{ $type }}"
        class="flex justify-center items-center bg-[rgba(204,204,204,0.2)] opacity-60 px-5 py-3 mb-2 point-id-8 text-[20px] h-[40px] text-sky-500 hover:opacity-100 btn create-function-btn rounded-md shadow-sm shadow-[#ccc]">
        <i class="fa-solid fa-plus"></i>
    </div>
    <div class="function-list-item-{{ $type }} flex-1 overflow-auto"></div>
    <div data-type="{{ $type }}"
        class="bg-[rgba(204,204,204,0.2)] px-5 py-3 text-[20px] h-[40px] rounded-md shadow-sm shadow-[#ccc] flex items-center text-xl border-t relative">
        <div class="mr-4">
            <i class="fa-solid fa-turn-down rotate-180 -translate-y-3"></i>
            <input type="checkbox" id="checkall-{{ $type }}" data-type="{{ $type }}"
                class=" ml-4 w-[12px] h-[12px] accent-[#f5b933] check-all-input">
            <label for="checkall-{{ $type }}" class="font-bold hidden lg:inline-block">Check all</label>
        </div>

        <span>With selected: </span>
        <button class="disabled:opacity-50 ml-2 btn delete-multi-function-btn multi-btn px-2 rounded-sm"
            data-type="{{ $type }}">
            <i class="fa-regular fa-trash-can text-red-500 pointer-events-none"></i>
            <span class="font-bold hidden lg:inline-block pointer-events-none">Delete</span>
        </button>

        <button class="disabled:opacity-50 ml-4 btn copy-multi-function-btn multi-btn" data-type="{{ $type }}">
            <i class="fa-regular fa-copy text-sky-600"></i>
            <span class="font-bold hidden lg:inline-block">Copy</span>
        </button>

        <span class="ml-8">Sort: </span>
        <button data-sort="dsc" data-type-sort="name"
            class="group/az disabled:opacity-50 btn px-2 rounded-sm mx-2 border text-2xl [&.active]:text-blue-600 sort-btn sort-name-btn">
            <span class="group-data-[sort=asc]/az:block hidden pointer-events-none">
                <i class="fa-solid fa-arrow-down-a-z"></i>
            </span>
            <span class="group-data-[sort=dsc]/az:block hidden pointer-events-none">
                <i class="fa-solid fa-arrow-down-z-a"></i>
            </span>
        </button>

        <button data-sort="asc" data-type-sort="id"
            class="group/19 disabled:opacity-50 btn px-2 rounded-sm mx-2 border text-2xl [&.active]:text-blue-600 sort-btn sort-date-btn">
            <span class="group-data-[sort=asc]/19:block hidden pointer-events-none">
                <i class="fa-solid fa-arrow-down-1-9"></i>
            </span>
            <span class="group-data-[sort=dsc]/19:block hidden pointer-events-none">
                <i class="fa-solid fa-arrow-down-9-1"></i>
            </span>
        </button>

        @if ($type === 'position')
            <button class="disabled:opacity-50 ml-4 btn show-all-map-btn multi-btn" data-type="{{ $type }}">
                <i class="fa-regular fa-eye text-yellow-600"></i>
                <span class="font-bold hidden xl:inline-block">Show all point</span>
            </button>
        @endif

        @if ($type === 'marker')
            <div class="absolute bottom-[calc(100%_+_4px)] left-0 flex sort-marker-wrapper">
                <button data-type='all'
                    class="mr-2 btn rounded-md px-2 min-w-[30px] text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-marker-btn active">all</button>
                <button data-type='l_marker'
                    class="mr-2 btn rounded-md px-2 min-w-[30px] text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-marker-btn">L</button>
                <button data-type='vl_marker'
                    class="mr-2 btn rounded-md px-2 min-w-[30px] text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-marker-btn">VL</button>
                <button data-type='bar_marker'
                    class="mr-2 btn rounded-md px-2 min-w-[30px] text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-marker-btn">Bar</button>
                <button data-type='none_marker_dis'
                    class="mr-2 btn rounded-md px-2 min-w-[30px] text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-marker-btn">Dis</button>
                <button data-type='none_marker_angle'
                    class="mr-2 btn rounded-md px-2 min-w-[30px] text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-marker-btn">Angle</button>
            </div>
        @elseif($type === 'gpio_module')
            <div class="absolute bottom-[calc(100%_+_4px)] left-0 flex sort-gpio_module-wrapper w-full overflow-x-auto overflow-y-hidden">
                <button data-type='all'
                    class="mr-2 btn rounded-md px-2 min-w-[30px] text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-gpio_module-btn active">all</button>
                @foreach ($allRobots as $robot)
                    <button data-type='{{ $robot->name_seri }}' class="mr-2 btn rounded-md px-2 text-center border border-[#0f6cbd] bg-[#fff] [&.active]:text-[#fff] [&.active]:bg-[#0f6cbd] sort-gpio_module-btn">{{ $robot->name_seri }}</button>
                @endforeach
            </div>
        @endif
    </div>
</div>
