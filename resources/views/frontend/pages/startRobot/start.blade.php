<div class="rounded-md p-4 bg-gray-50 shadow-sm flex flex-col">
    <div class="flex justify-between">
        <span class="font-bold">Start robot</span>
        <label for="input-setting-start" class="cursor-pointer"><i class="fa-solid fa-gears"></i></label>
    </div>

    <input type="checkbox" name="" id="input-setting-start" class="peer/setting-start hidden">
    <div
        class="fixed top-0 left-0 right-0 bottom-0 p-5 backdrop-blur-2xl hidden peer-checked/setting-start:block z-100">
        <label for="input-setting-start"
            class="fixed top-0 right-0 text-xl px-4 py-2 inline-block rounded-full cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
        </label>
        <ul class="text-[16px]">
            <li class="mb-4 flex">
                <span>
                    Vị trí ban đầu <span class="font-bold">có</span> tool lift
                </span>
                <div data-name="option-toollift" class="px-1 gap-2 rounded-md border ml-4 cursor-pointer relative">
                    <div class="flex">
                        <div class="flex flex-wrap gap-2" id="position-with-tool-active"></div>
                        <span class="px-2"><i class="fa-solid fa-sort-down"></i></span>
                    </div>
                </div>
            </li>
            <li class="mb-4 flex">
                <span>Mission đi vào tool lift</span>
                <div data-name="option-go-to-lift" class="px-1 gap-2 rounded-md border ml-4 cursor-pointer relative">
                    <div class="flex">
                        <div class="flex flex-wrap gap-2" id="go-to-lift-active"></div>
                        <span class="px-2"><i class="fa-solid fa-sort-down"></i></span>
                    </div>
                </div>
            </li>
            <li class="mb-4 flex">
                <span>
                    Vị trí ban đầu <span class="font-bold">không</span> có tool lift
                </span>
                <div data-name="option-no-toollift" class="px-1 gap-2 rounded-md border ml-4 cursor-pointer relative">
                    <div class="flex">
                        <div class="flex flex-wrap gap-2" id="position-no-tool-active"></div>
                        <span class="px-2"><i class="fa-solid fa-sort-down"></i></span>
                    </div>
                </div>
            </li>
            <li class="mb-4 flex ">
                <span class="whitespace-nowrap">Các Missions gửi cho robot</span>
                <div data-name="show-label" class="px-1 rounded-md border ml-4 cursor-pointer relative">
                    <div class="flex">
                        <div class="flex flex-wrap gap-2" id="mission-active"></div>
                        <span class="px-2"><i class="fa-solid fa-sort-down"></i></span>
                    </div>
                </div>
            </li>
        </ul>
        <button class="btn bg-main px-4 py-1 rounded-md text-white font-bold" id="save-start-btn">Lưu</button>
    </div>

    <div class="">
        @include('frontend.blocks.selectRobot', [
            'type' => 'robot_navigation',
            'id' => 'robot-navigation',
        ])
    </div>
    <div class="">
        <div class="inline-flex gap-2 bg-gray-200 p-1 mt-6 rounded-xl">
            <label class="cursor-pointer">
                <input type="radio" name="toollift" data-toollift="false" class="sr-only peer" checked />
                <div
                    class="px-4 py-2 text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-green-700 peer-checked:font-bold">
                    Không bao gồm tool lift
                </div>
            </label>
            <label class="cursor-pointer">
                <input type="radio" name="toollift" data-toollift="true" class="sr-only peer" />
                <div
                    class="px-4 py-2 text-gray-500 rounded-lg peer-checked:bg-white peer-checked:text-red-700 peer-checked:font-bold">
                    Bao gồm tool lift
                </div>
            </label>
        </div>
    </div>
    <div class="grid place-content-center flex-1 mt-10">
        <button class="bg-red-400 text-white rounded-full px-16 py-7 btn shadow-light shadow-red-700/20"
            data-name="start">
            <span class="label font-bold text-2xl">
                Start
                <i class="fa-solid fa-power-off"></i>
            </span>
        </button>
    </div>
</div>
