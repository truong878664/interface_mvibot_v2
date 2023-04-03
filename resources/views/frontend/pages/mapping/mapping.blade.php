@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="lg:flex w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 overflow-auto border">
        <div class="h-2/3 lg:h-full lg:w-2/3 relative">

            <div class="absolute h-[30px]  m-2  flex items-center">

                @include('frontend.blocks.selectRobot', [
                    'type' => 'robot_slam',
                    'id' => 'robot-mapping',
                ])

                <div class="ml-[30px] mt-2 relative">
                    <div class="flex">
                        <input type="text" class="px-3 w-[200px] text-2xl placeholder:text-2xl rounded-lg text-[#000]"
                            placeholder="Name map" id="create_map">
                        <button class="bg-[#0f6cbd] px-3 py-2 btn text-2xl ml-4 rounded-lg font-bold text-[#fff]"
                            id="create_map_btn">Save map</button>
                    </div>
                    <span class="text-[1.5rem] text-red-500 block absolute top-full" id="error_create_map"></span>
                </div>
            </div>

            <div class="w-full h-full overflow-hidden bg-[#333] rounded-md" id="map-wrapper">
                <div class="w-full h-full" id="map"></div>
            </div>
        </div>
        <div
            class="h-1/3 flex justify-between items-center px-7 lg:h-full lg:w-1/3 lg:flex-col xl:flex-col bg-stone-300 rounded-md">

            {{-- <div class="h-[160px] w-[160px] md:w-[220px] md:h-[220px] lg:h-[300px] lg:w-[300px]"></div> --}}
            <div class=" flex h-full items-center w-full justify-end lg:flex-col relative">
                <div class="absolute top-[50px] left-0 w-[90%]">
                    <span id=""
                        class="rs-label absolute -right-2 top-0 translate-x-full -translate-y-1/2 text-2xl font-bold leading-[30px] label-range-topic">16</span>
                    <input id="" class="rs-range w-full input-range-topic" type="range" value="100"
                        min="0" max="100">
                </div>
                <div class="absolute top-0 right-0 mt-4 flex">
                    <button data-type="joystick" data-active="active"
                        class="choose-joystick-btn btn w-[40px] text-[#fff] h-[30px] bg-[#ccc] data-[active=active]:bg-[#a8a8a8] data-[active=active]:text-[#ccc] mr-0 rounded-l-md"><i
                            class="fa-solid fa-gamepad"></i></button>
                    <button data-type="move-action" data-active=""
                        class="choose-joystick-btn btn w-[40px] text-[#fff] h-[30px] bg-[#ccc] data-[active=active]:bg-[#a8a8a8] data-[active=active]:text-[#ccc] ml-0 rounded-r-md"><i
                            class="fa-solid fa-arrows-up-down-left-right"></i></button>
                </div>

                <div class="joystick-action-wrapper mb-[40px] action-move-robot-wrapper">
                    @include('frontend/blocks/joystick', [
                        'mb' => '160px',
                        'md' => '220px',
                        'lg' => '300px',
                    ])
                </div>
                <div class="move-action-wrapper action-move-robot-wrapper mb-[30px] hidden">
                    <div class="relative mb-[20px]">
                        <div class="mb-8 absolute w-full -top-[120px]">
                            <div class="range-slider relative mb-12">
                                <span id="rs-bullet-speed"
                                    class="rs-label-speed rs-label absolute -left-2 top-0 -translate-x-full -translate-y-1/2"
                                    speed="0.00">0.00</span>
                                <input id="rs-range-line-speed" class="rs-range-speed rs-range w-full " type="range"
                                    value="0" min="0" max="100">
                            </div>

                            <div class="range-slider relative">
                                <span id="rs-bullet-rad"
                                    class="rs-label rs-label-rad absolute -left-2 top-0 -translate-x-full -translate-y-1/2"
                                    rad="0.00">0.00</span>
                                {{-- <span id="rs-bullet" class="rs-label" speed="0.00">0.00</span> --}}
                                <input id="rs-range-line-rad" class="rs-range rs-range-line-rad  w-full " type="range"
                                    value="0" min="0" max="100">
                            </div>
                        </div>
                        <div
                            class="h-[200px] w-[200px] md:w-[200px] md:h-[200px] lg:h-[300px] lg:w-[300px] rounded-full bg-[#eee] flex flex-col justify-center items-stretch button-console-wrapper p-2">
                            <div class=" w-full flex justify-center items-center h-1/3">
                                <button type="up"
                                    class="button-move p-[6px] flex justify-center items-center text-[26px]  w-[30px] tex h-[30px] md:w-[90px] md:h-[90px] md:text-[40px] text-[#ccc]"><i
                                        class="fa-solid fa-caret-up"></i></button>
                            </div>
                            <div class=" w-full flex justify-between items-center h-1/3">
                                <button type="left"
                                    class="button-move p-[6px] flex justify-center items-center text-[26px]  w-[30px] tex h-[30px] md:w-[90px] md:h-[90px] md:text-[40px] text-[#ccc]"><i
                                        class="fa-solid fa-caret-left"></i></button>
                                <button type="right"
                                    class="button-move p-[6px] flex justify-center items-center text-[26px]  w-[30px] tex h-[30px] md:w-[90px] md:h-[90px] md:text-[40px] text-[#ccc]"><i
                                        class="fa-solid fa-caret-right"></i></button>
                            </div>
                            <div class="w-full flex justify-center items-center h-1/3">
                                <button type="down"
                                    class="button-move p-[6px] flex justify-center items-center text-[26px]  w-[30px] tex h-[30px] md:w-[90px] md:h-[90px] md:text-[40px] text-[#ccc]"><i
                                        class="fa-solid fa-caret-down"></i></button>
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
