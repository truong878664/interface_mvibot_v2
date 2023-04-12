@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col">
        <div class="flex justify-between mt-3 ml-4">
            @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'list-robot'])
        </div>

        <div class="w-full flex-1 flex justify-evenly items-center mt-[70px]">
            <div class="relative">
                <div class="mb-8 absolute w-full -top-[30px] -translate-y-full">
                    <div class="range-slider relative mb-12">
                        <span id="rs-bullet-speed"
                            class="rs-label-speed rs-label absolute -left-2 top-0 -translate-x-full -translate-y-1/2 "
                            speed="0.00">0.00</span>
                        <input id="rs-range-line-speed" class="rs-range-speed rs-range w-full" type="range" value="0"
                            min="0" max="100">
                    </div>
                    <div class="range-slider relative">
                        <span id="rs-bullet-rad"
                            class="rs-label rs-label-rad absolute -left-2 top-0 -translate-x-full -translate-y-1/2 "
                            rad="0.00">0.00</span>
                        {{-- <span id="rs-bullet" class="rs-label" speed="0.00">0.00</span> --}}
                        <input id="rs-range-line-rad" class="rs-range rs-range-line-rad  w-full" type="range"
                            value="0" min="0" max="100">
                    </div>
                </div>
                <div
                    class="h-[160px] w-[160px] md:w-[300px] md:h-[300px] lg:h-[350px] lg:w-[350px] rounded-full bg-[#eee] flex flex-col justify-center items-stretch button-console-wrapper p-2">
                    <div class=" w-full flex justify-center items-center h-1/3">
                        <button type="up"
                            class="button-move w-[50px] p-[6px] flex justify-center items-center text-[26px] tex h-[50px]  md:w-[120px] md:h-[120px] md:text-[40px] text-[#ccc]"><i
                                class="fa-solid fa-caret-up"></i></button>
                    </div>
                    <div class=" w-full flex justify-between items-center h-1/3">
                        <button type="left"
                            class="button-move w-[50px] p-[6px] flex justify-center items-center text-[26px] tex h-[50px]  md:w-[120px] md:h-[120px] md:text-[40px] text-[#ccc]"><i
                                class="fa-solid fa-caret-left"></i></button>
                        <button type="right"
                            class="button-move w-[50px] p-[6px] flex justify-center items-center text-[26px] tex h-[50px]  md:w-[120px] md:h-[120px] md:text-[40px] text-[#ccc]"><i
                                class="fa-solid fa-caret-right"></i></button>
                    </div>
                    <div class="w-full flex justify-center items-center h-1/3">
                        <button type="down"
                            class="button-move w-[50px] p-[6px] flex justify-center items-center text-[26px] tex h-[50px]  md:w-[120px] md:h-[120px] md:text-[40px] text-[#ccc]"><i
                                class="fa-solid fa-caret-down"></i></button>
                    </div>
                </div>
            </div>
            @include('frontend/blocks/joystick', ['mb' => '160px', 'md' => '300px', 'lg' => '350px'])
        </div>
    </div>
    <script type="module" src="/js/joystick/joystick.js"></script>
@endsection
