@extends('frontend.layouts.mainLayout') @section('content')
    <div class="m-2 h-[calc(100%_-_10px)] w-[calc(100%_-_10px)] overflow-auto border lg:flex">
        <div class="relative h-2/3 lg:h-full lg:w-2/3">
            <div class="absolute m-2 flex h-[30px] items-center">
                @include('frontend.blocks.selectRobot', ['type' => 'robot_slam', 'id' => 'robot-mapping'])

                <div class="relative ml-[30px] mt-2">
                    <div class="flex">
                        <input type="text" class="w-[200px] rounded-lg px-3 py-1 text-black" placeholder="Name map"
                            id="create_map" />
                        <button class="btn ml-4 rounded-lg bg-[#0f6cbd] px-3 py-1  font-bold text-white" id="create_map_btn">
                            Save map
                        </button>
                    </div>
                    <span class="absolute top-full block text-[1.5rem] text-red-500" id="error_create_map"></span>
                </div>
            </div>

            <div class="h-full w-full overflow-hidden rounded-md bg-[#333]" id="map-wrapper">
                <div class="h-full w-full" id="map"></div>
            </div>
        </div>
        <div
            class="flex h-1/3 items-center justify-between rounded-md bg-stone-300 px-7 lg:h-full lg:w-1/3 lg:flex-col xl:flex-col">
            <div class="relative flex h-full w-full items-center justify-end lg:flex-col">
                <div class="absolute top-[50px] left-0 w-[90%]">
                    <span id=""
                        class="rs-label label-range-topic absolute -right-2 top-0 translate-x-full -translate-y-1/2  font-bold leading-[30px]">16</span>
                    <input id="" class="rs-range input-range-topic w-full" type="range" value="100"
                        min="0" max="100" />
                </div>
                <div class="absolute top-0 right-0 mt-4 flex">
                    <button data-type="joystick" data-active="active"
                        class="choose-joystick-btn btn mr-0 h-[30px] w-[40px] rounded-l-md bg-[#ccc] tewhite data-[active=active]:bg-[#a8a8a8] data-[active=active]:text-[#ccc]">
                        <i class="fa-solid fa-gamepad"></i>
                    </button>
                    <button data-type="move-action" data-active=""
                        class="choose-joystick-btn btn ml-0 h-[30px] w-[40px] rounded-r-md bg-[#ccc] tewhite data-[active=active]:bg-[#a8a8a8] data-[active=active]:text-[#ccc]">
                        <i class="fa-solid fa-arrows-up-down-left-right"></i>
                    </button>
                </div>

                <div class="joystick-action-wrapper action-move-robot-wrapper mb-[40px]">
                    @include('frontend/blocks/joystick', [
                        'mb' => '160px',
                        'md' => '220px',
                        'lg' => '300px',
                    ])
                </div>
                <div class="move-action-wrapper action-move-robot-wrapper mb-[30px] hidden">
                    <div class="relative mb-[20px]">
                        <div class="absolute -top-[120px] mb-8 w-full">
                            <div class="range-slider relative mb-12">
                                <span id="rs-bullet-speed"
                                    class="rs-label-speed rs-label absolute -left-2 top-0 -translate-x-full -translate-y-1/2"
                                    speed="0.00">0.00</span>
                                <input id="rs-range-line-speed" class="rs-range-speed rs-range w-full" type="range"
                                    value="0" min="0" max="100" />
                            </div>

                            <div class="range-slider relative">
                                <span id="rs-bullet-rad"
                                    class="rs-label rs-label-rad absolute -left-2 top-0 -translate-x-full -translate-y-1/2"
                                    rad="0.00">0.00</span>
                                {{--
                            <span id="rs-bullet" class="rs-label" speed="0.00"
                                >0.00</span
                            >
                            --}}
                                <input id="rs-range-line-rad" class="rs-range rs-range-line-rad w-full" type="range"
                                    value="0" min="0" max="100" />
                            </div>
                        </div>
                        <div
                            class="button-console-wrapper flex h-[200px] w-[200px] flex-col items-stretch justify-center rounded-full bg-[#eee] p-2 md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px]">
                            <div class="flex h-1/3 w-full items-center justify-center">
                                <button type="up"
                                    class="button-move tex flex h-[30px] w-[30px] items-center justify-center p-[6px] text-[26px] text-[#ccc] md:h-[90px] md:w-[90px] md:text-[40px]">
                                    <i class="fa-solid fa-caret-up"></i>
                                </button>
                            </div>
                            <div class="flex h-1/3 w-full items-center justify-between">
                                <button type="left"
                                    class="button-move tex flex h-[30px] w-[30px] items-center justify-center p-[6px] text-[26px] text-[#ccc] md:h-[90px] md:w-[90px] md:text-[40px]">
                                    <i class="fa-solid fa-caret-left"></i>
                                </button>
                                <button type="right"
                                    class="button-move tex flex h-[30px] w-[30px] items-center justify-center p-[6px] text-[26px] text-[#ccc] md:h-[90px] md:w-[90px] md:text-[40px]">
                                    <i class="fa-solid fa-caret-right"></i>
                                </button>
                            </div>
                            <div class="flex h-1/3 w-full items-center justify-center">
                                <button type="down"
                                    class="button-move tex flex h-[30px] w-[30px] items-center justify-center p-[6px] text-[26px] text-[#ccc] md:h-[90px] md:w-[90px] md:text-[40px]">
                                    <i class="fa-solid fa-caret-down"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="/js/library/roslib.min.js"></script>
    <script type="module" src="/js/mapping.js"></script>
@endsection
