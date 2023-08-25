@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-[calc(100%_-_10px)] h-full md:h-[calc(100%_-_10px)] m-2 overflow-hidden p-4">
        <div class="w-full h-full grid grid-cols-2 gap-4 grid-rows-2 text-3xl" id="feature-wrapper-button">
            <div class="rounded-md p-4 bg-gray-50 shadow-sm flex flex-col">
                <div class="flex justify-between">
                    <span class="font-bold">Start robot</span>
                    <label for="input-setting-start" class="cursor-pointer"><i class="fa-solid fa-gears"></i></label>
                </div>

                <input type="checkbox" name="" id="input-setting-start" class="peer/setting-start hidden">
                <div
                    class="fixed top-[44px] left-[74px] right-0 bottom-0 p-5 bg-white hidden peer-checked/setting-start:block z-10">
                    <label for="input-setting-start"
                        class="absolute top-0 right-0 text-4xl px-4 py-2 inline-block rounded-full bg-white cursor-pointer">
                        <i class="fa-solid fa-xmark"></i>
                    </label>
                    <ul class="text-[16px]">
                        <li class="mb-4 flex">
                            <span>
                                Vị trí ban đầu <span class="font-bold">có</span> tool lift
                            </span>
                            <div data-name="option-toollift"
                                class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                <div class="flex">
                                    <div class="flex flex-wrap" id="position-with-tool-active"></div>
                                    <span><i class="fa-solid fa-sort-down"></i></span>
                                </div>
                            </div>
                        </li>
                        <li class="mb-4 flex">
                            <span>Mission đi vào tool lift</span>
                            <div data-name="option-go-to-lift"
                                class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                <div class="flex">
                                    <div class="flex flex-wrap" id="go-to-lift-active"></div>
                                    <span><i class="fa-solid fa-sort-down"></i></span>
                                </div>
                            </div>
                        </li>
                        <li class="mb-4 flex">
                            <span>
                                Vị trí ban đầu <span class="font-bold">không</span> có tool lift
                            </span>
                            <div data-name="option-no-toollift"
                                class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                <div class="flex">
                                    <div class="flex flex-wrap" id="position-no-tool-active"></div>
                                    <span><i class="fa-solid fa-sort-down"></i></span>
                                </div>
                            </div>
                        </li>
                        <li class="mb-4 flex ">
                            <span class="whitespace-nowrap">Các Missions gửi cho robot</span>
                            <div data-name="show-label" class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                <div class="flex">
                                    <div class="flex flex-wrap" id="mission-active"></div>
                                    <span><i class="fa-solid fa-sort-down"></i></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <button class="text-2xl btn bg-main px-4 py-2 rounded-md text-white font-bold"
                        id="save-start-btn">Lưu</button>
                </div>

                <div class="">
                    @include('frontend.blocks.selectRobot', [
                        'type' => 'robot_navigation',
                        'id' => 'robot-navigation',
                    ])
                </div>
                <div class="">
                    <div class="inline-flex gap-2 bg-gray-200 p-2 mt-10 rounded-xl">
                        <label>
                            <input type="radio" name="toollift" data-toollift="false" class="sr-only peer" checked />
                            <div
                                class="p-4 text-gray-500 rounded-xl peer-checked:bg-white peer-checked:text-green-700 peer-checked:font-bold">
                                Không bao gồm tool lift
                            </div>
                        </label>
                        <label>
                            <input type="radio" name="toollift" data-toollift="true" class="sr-only peer" />
                            <div
                                class="p-4 text-gray-500 rounded-xl peer-checked:bg-white peer-checked:text-red-700 peer-checked:font-bold">
                                Bao gồm tool lift
                            </div>
                        </label>
                    </div>
                </div>
                <div class="grid place-content-center flex-1">
                    <button class="bg-red-400 text-white rounded-full px-16 py-7 btn shadow-light shadow-red-700/20"
                        data-name="start">
                        <span class="label font-bold text-5xl">
                            Start
                            <i class="fa-solid fa-power-off"></i>
                        </span>
                    </button>
                </div>
            </div>
            <div class="rounded-md p-4 bg-gray-50 shadow-sm flex flex-col">
                <input class="sr-only" id="module_gpio_list" type="text" value="{{ json_encode($moduleGpios) }}">
                <div class="h-full flex flex-col">
                    <div class="">
                        <span class="font-bold">Module GPIO</span>
                    </div>
                    <div class="grid grid-cols-3 grid-rows-1 flex-1 gap-4" id="light-andon-wrapper">
                        <div class="h-full">
                            <div data-hs="hs-0010-0020-12" data-module="IB05_916b" class="andon aspect-square"></div>
                            <span class="block text-center">HS0010 - HS0020 line 12</span>

                        </div>
                        <div class="h-full">
                            <div data-hs="hs-0020-34-56" data-module="IB03_916b" class="andon aspect-square"></div>
                            <span class="block text-center">HS0020 line 34,56</span>

                        </div>
                        <div class="h-full">
                            <div data-hs="hs-2360-12-34" data-module="IB04_916b" class="andon aspect-square"></div>
                            <span class="block text-center">HS2360 line 12,34</span>

                        </div>
                    </div>
                    <div class="text-white text-3xl ml-3 mt-5 flex gap-[50px] justify-center">
                        <button data-type-button="setYellowSx"
                            class="bg-yellow-500 p-5 shadow-light shadow-yellow-500/10 btn font-bold rounded-full">Kích đèn
                            vàng ở
                            SX</button>
                        <button data-type-button="setRedSx"
                            class="bg-red-500 p-5 shadow-light shadow-red-500/10 btn font-bold rounded-full">Kích đèn đỏ ở
                            SX</button>
                    </div>
                </div>
            </div>
            <div class="rounded-md flex flex-col bg-gray-50 shadow-sm p-4">
                <div class="">
                    <span class="font-bold">Tool lift ROBOT</span>
                </div>
                <div class="flex flex-col flex-1">
                    <div class="">
                        @include('frontend.blocks.selectRobot', [
                            'type' => 'robot_navigation',
                            'id' => 'robot-tool-lift',
                        ])
                    </div>
                    <div class=" flex-1 grid place-content-center">
                        <div class="text-white text-3xl ml-3 mt-5 flex gap-[50px] justify-center">
                            <button data-type-button="upToolLift"
                                class="bg-main p-7 shadow-light shadow-main/20 btn font-bold rounded-full">
                                Nâng tool lift
                            </button>
                            <button data-type-button="downToolLift"
                                class="bg-green-500 p-7 shadow-light shadow-green-500/10 btn font-bold rounded-full">Hạ
                                tool
                                lif</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script></script>





        {{-- <div class="flex flex-col h-full p-10 overflow-auto sr-only">
            <div id="feature-wrapper-button" class="pb-10">
                <div class="">
                    <span class="font-bold">Tính năng module GPIO</span>
                    <input class="sr-only" id="module_gpio_list" type="text" value="{{ json_encode($moduleGpios) }}">
                    <div class="text-white text-3xl ml-3 my-10 flex gap-[30px]">
                        <button data-type-button="setYellowSx" class="bg-yellow-500 p-4 rounded-md btn">Kích đèn vàng ở
                            SX</button>
                        <button data-type-button="setRedSx" class="bg-red-500 p-4 rounded-md btn ml-10">Kích đèn đỏ ở
                            SX</button>
                    </div>
                </div>
                <hr>
                <div class="mt-10">
                    <span class="font-bold">Tính năng tool lift robot</span>
                    <div class="flex gap-32 flex-wrap text-white text-3xl my-10">
                        @include('frontend.blocks.selectRobot', [
                            'type' => 'robot_navigation',
                            'id' => 'robot-tool-lift',
                        ])
                        <button data-type-button="upToolLift" class="bg-main p-4 rounded-md btn">Nâng tool lift</button>
                        <button data-type-button="downToolLift"
                            class="bg-green-500 p-4 rounded-md btn shadow-button-light shadow-green-400/20">Hạ tool
                            lift</button>
                    </div>
                </div>
            </div>
            <hr />
            <div class="w-full h-full  relative flex-1 mt-10">
                <span class="font-bold">Setup bắt đầu chạy robot</span>
                <div class="">
                    <div class=" mb-10">
                        @include('frontend.blocks.selectRobot', [
                            'type' => 'robot_navigation',
                            'id' => 'robot-navigation',
                        ])
                    </div>
                    <div class="mb-[20px] text-3xl flex gap-[30px]">
                        <label class="cursor-pointer">
                            <input type="radio" name="toollift_" data-toollift="false" class="sr-only peer" checked>
                            <div
                                class="bg-gray-200 text-gray-400 inline-block px-8 py-4 rounded-md peer-checked:bg-green-500 peer-checked:font-bold peer-checked:text-white">
                                Không bao gồm tool lift
                            </div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="radio" name="toollift_" data-toollift="true" class="sr-only peer">
                            <div
                                class="bg-gray-200 text-gray-400 inline-block px-8 py-4 rounded-md peer-checked:bg-red-500 peer-checked:font-bold peer-checked:text-white">
                                Bao gồm tool lift
                            </div>
                        </label>
                    </div>


                    <div class="">
                        <button class="bg-red-400 text-white rounded-full px-8 py-5 btn shadow-light shadow-red-700/20"
                            data-name="start">
                            <span class="label">
                                <span>
                                    Start
                                </span>
                                <i class="fa-solid fa-power-off"></i>
                            </span>
                        </button>
                        <label for="input-setting-start" class="btn ml-10 cursor-pointer">
                            <i class="fa-solid fa-sliders"></i>
                        </label>
                    </div>

                    
                    <input type="checkbox" name="" id="input-setting-start" class="peer/setting-start hidden">
                    <div
                        class="fixed top-[44px] left-[74px] right-0 bottom-0 p-5 bg-white hidden peer-checked/setting-start:block">
                        <label for="input-setting-start"
                            class="absolute top-0 right-0 text-4xl px-4 py-2 inline-block rounded-full bg-white cursor-pointer">
                            <i class="fa-solid fa-xmark"></i>
                        </label>
                        <ul class="text-[16px]">
                            <li class="mb-4 flex">
                                <span>
                                    Vị trí ban đầu <span class="font-bold">có</span> tool lift
                                </span>
                                <div data-name="option-toollift"
                                    class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                    <div class="flex">
                                        <div class="flex flex-wrap" id="position-with-tool-active"></div>
                                        <span><i class="fa-solid fa-sort-down"></i></span>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-4 flex">
                                <span>Mission đi vào tool lift</span>
                                <div data-name="option-go-to-lift"
                                    class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                    <div class="flex">
                                        <div class="flex flex-wrap" id="go-to-lift-active"></div>
                                        <span><i class="fa-solid fa-sort-down"></i></span>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-4 flex">
                                <span>
                                    Vị trí ban đầu <span class="font-bold">không</span> có tool lift
                                </span>
                                <div data-name="option-no-toollift"
                                    class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                    <div class="flex">
                                        <div class="flex flex-wrap" id="position-no-tool-active"></div>
                                        <span><i class="fa-solid fa-sort-down"></i></span>
                                    </div>
                                </div>
                            </li>
                            <li class="mb-4 flex ">
                                <span class="whitespace-nowrap">Các Missions gửi cho robot</span>
                                <div data-name="show-label"
                                    class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                    <div class="flex">
                                        <div class="flex flex-wrap" id="mission-active"></div>
                                        <span><i class="fa-solid fa-sort-down"></i></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button class="text-2xl btn bg-main px-4 py-2 rounded-md text-white font-bold"
                            id="save-start-btn">Lưu</button>
                    </div>
                </div>
            </div>
        </div> --}}
    </div>
    <script type="module" src="/js/start/index.js"></script>
@endsection
