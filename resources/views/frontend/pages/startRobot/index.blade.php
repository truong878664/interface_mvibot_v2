@extends('frontend.layouts.mainLayout')
@section('content')
    <style>
        .button-start {
            box-shadow: rgba(245, 56, 56, .2) 0 -25px 18px -14px inset, rgba(245, 56, 56, .15) 0 1px 2px, rgba(245, 56, 56, .15) 0 2px 4px, rgba(245, 56, 56, .15) 0 4px 8px, rgba(245, 56, 56, .15) 0 8px 16px, rgba(245, 56, 56, .15) 0 16px 32px;
            transform: scale(1.01) rotate(-1deg);
        }
    </style>
    <div class="w-[calc(100%_-_10px)] h-full md:h-[calc(100%_-_10px)] m-2 overflow-hidden">
        <div class="w-full h-full grid place-content-center relative">
            <div class="">
                <div class="mb-[20px] text-2xl">
                    <label class="cursor-pointer">
                        <input type="radio" name="toollift" data-toollift="false" class="sr-only peer" checked>
                        <div
                            class="bg-gray-200 text-gray-400 inline-block px-4 py-2 rounded-md peer-checked:bg-green-500 peer-checked:font-bold peer-checked:text-white">
                            No toollift
                        </div>
                    </label>
                    <label class="cursor-pointer">
                        <input type="radio" name="toollift" data-toollift="true" class="sr-only peer">
                        <div
                            class="bg-gray-200 text-gray-400 inline-block px-4 py-2 rounded-md peer-checked:bg-red-500 peer-checked:font-bold peer-checked:text-white">
                            With toollift
                        </div>
                    </label>
                </div>

                <div class="flex justify-center mb-10">
                    @include('frontend.blocks.selectRobot', [
                        'type' => 'robot_navigation',
                        'id' => 'robot-navigation',
                    ])
                </div>

                <div class="flex justify-center items-center">
                    <button class="bg-red-400 text-white rounded-full px-8 py-5 btn button-start" data-name="start">
                        <span class="label">
                            <span>
                                Start
                            </span>
                            <i class="fa-solid fa-power-off"></i>
                        </span>
                    </button>
                    <label for="input-setting-start" class="btn ml-5 cursor-pointer">
                        <i class="fa-solid fa-sliders"></i>
                    </label>
                </div>

                {{--  --}}
                <input type="checkbox" name="" id="input-setting-start" class="peer/setting-start hidden">
                <div class="absolute top-0 left-0 right-0 bottom-0 p-5 bg-white hidden peer-checked/setting-start:block">
                    <label for="input-setting-start"
                        class="absolute top-0 right-0 text-4xl px-4 py-2 inline-block rounded-full bg-white cursor-pointer">
                        <i class="fa-solid fa-xmark"></i>
                    </label>
                    <ul class="text-[16px]">
                        <li class="mb-4 flex">
                            <span>
                                Initial position <span class="font-bold">with</span> toollift
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
                            <span>Mission go to toollift</span>
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
                                Initial position <span class="font-bold">without</span> toollift
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
                            <span class="whitespace-nowrap">Missions send to robot</span>
                            <div data-name="show-label" class="px-4 py-1 rounded-md border ml-4 cursor-pointer relative">
                                <div class="flex">
                                    <div class="flex flex-wrap" id="mission-active"></div>
                                    <span><i class="fa-solid fa-sort-down"></i></span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <button class="text-2xl btn bg-main px-4 py-2 rounded-md text-white font-bold"
                        id="save-start-btn">save</button>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="/js/start/index.js"></script>
@endsection
