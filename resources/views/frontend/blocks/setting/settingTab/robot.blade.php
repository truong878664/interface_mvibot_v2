<div class="setting-detail flex">
    <div class="mx-auto w-full max-w-[700px] mt-[50px] py-10 px-5 rounded-md bg-[#F2EAE8]">
        <div class="w-[calc(100%_+_20px)] -ml-[10px] flex flex-wrap cursor-pointer">
            <input type="text"  value="" id="robot-select" hidden>
            @foreach ($robots as $robot)
                <div data-robot="{{ $robot->name_seri }}"
                    class="w-[calc(100%_/_1_-_20px)] md:w-[calc(100%_/_4_-_20px)] bg-[#0f6cbd] mx-[10px] mb-8 rounded-md text-[17px]  px-4 py-2 relative opacity-70 hover:opacity-100  overflow-hidden robot-item robot-{{ $robot->name_seri }}">
                    <div class="flex justify-between">
                        <div
                            class="text-[24px] w-[30px] h-[30px] flex items-center justify-center pointer-events-none text-white">
                            <i class="fa-solid fa-robot"></i>
                        </div>
                        <button
                            class="rounded-full ml-2 bg-[#fff] text-[#0f6cbd] text-[15px] w-[30px] h-[30px] flex items-center justify-center btn delete-robot-btn">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                    <span class="text-[#fff] mt-4 block">{{ $robot->name_seri }}</span>
                    <input type="text" class="name-robot hidden" value="{{ $robot->name_seri }}">
                </div>
            @endforeach
        </div>
        {{-- <div class="float-right">
            <input type="text" class="name-new-robot text-2xl h-[34px] w-[200px] px-4 hidden rounded-md">
            <button
            class="px-4 py-2 bg-main text-[#fff] text-[16px] btn rounded-md opacity-80 hover:opacity-100 add-robot-btn">
            <span class="mr-2">Add robot</span>
        </button>
        </div> --}}
    </div>
    <style>
        .robot-item.active {
            box-shadow: 0 0 0 4px #fff, 0 0 0 6px #0f6cbd;
            opacity: 1;
        }
    </style>
    <script></script>
</div>

