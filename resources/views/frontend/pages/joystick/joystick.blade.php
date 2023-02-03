@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col">
        <div class="flex justify-between mt-3">
            <label for="" class="bg-[#0f6cbd] flex items-center text-[#fff] px-4 rounded-lg py-2">
                <select class="outline-none bg-[#0f6cbd] rounded" id="list-robot">
                    <option value="">Chose robot</option>
                    @foreach ($allRobot as $robot)
                        <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
                    @endforeach
                </select>
            </label>
        </div>

        <div class="w-full flex-1 flex justify-evenly items-center ">
            @include('frontend/blocks/joystick', ['mb' => '160px', 'md' => '300px', 'lg' => '400px'])
            <div class="relative">
                <div class="mb-8 absolute w-full -top-[40px] -translate-y-full">
                    <div class="range-slider">
                        <span id="rs-bullet" class="rs-label" speed="0.5">0.5</span>
                        <input id="rs-range-line" class="rs-range w-full" type="range" value="50" min="0"
                            max="100">

                    </div>
                </div>
                <div
                    class="h-[160px] w-[160px] md:w-[300px] md:h-[300px] lg:h-[400px] lg:w-[400px] rounded-full bg-[#eee] flex flex-col justify-center items-stretch button-console-wrapper p-2">
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
        </div>
        <div class="">
            <style>
                
            </style>
            <script>
               
            </script>
        </div>
        <div class="w-full">
        </div>
    </div>
    <script type="module" src="/js/joystick/joystick.js"></script>
@endsection
