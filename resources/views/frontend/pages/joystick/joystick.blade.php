@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col">
        <div class="flex justify-between">
            @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'list-robot'])
        </div>

        <div class="w-full flex-1 grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 ">
            <div class="grid place-content-center">
                <div class="">
                    <div class="w-full flex flex-col gap-12 mb-8">
                        <div class="range-slider relative flex !text-xs">
                            <span id="rs-bullet-speed"
                                class="rs-label-speed rs-label absolute -left-2 -translate-x-full -translate-y-full "
                                speed="0.00">0.00</span>
                            <input id="rs-range-line-speed" class="rs-range-speed rs-range w-full" type="range"
                                value="0" min="0" max="100">
                        </div>
                        <div class="range-slider relative flex !text-xs">
                            <span id="rs-bullet-rad"
                                class="rs-label rs-label-rad absolute -left-2 top-0 -translate-x-full -translate-y-full "
                                rad="0.00">0.00</span>
                            <input id="rs-range-line-rad" class="rs-range rs-range-line-rad  w-full" type="range"
                                value="0" min="0" max="100">
                        </div>
                    </div>
                    <div
                        class="h-48 w-48 md:w-[300px] md:h-[300px] lg:h-[350px] lg:w-[350px] rounded-full bg-[#eee] flex flex-col justify-center items-stretch button-console-wrapper p-2">
                        <div class="w-full flex justify-center items-center h-1/3">
                            <button type="up"
                                class="button-move w-16 h-16 p-1 flex justify-center items-center text-xl md:w-24 md:h-24 md:text-2xl xl:w-28 xl:h-28 text-stone-400"><i
                                    class="fa-solid fa-caret-up"></i></button>
                        </div>
                        <div class=" w-full flex justify-between items-center h-1/3">
                            <button type="left"
                                class="button-move w-16 h-16 p-1 flex justify-center items-center text-xl md:w-24 md:h-24 md:text-2xl xl:w-28 xl:h-28 text-stone-400"><i
                                    class="fa-solid fa-caret-left"></i></button>
                            <button type="right"
                                class="button-move w-16 h-16 p-1 flex justify-center items-center text-xl md:w-24 md:h-24 md:text-2xl xl:w-28 xl:h-28 text-stone-400"><i
                                    class="fa-solid fa-caret-right"></i></button>
                        </div>
                        <div class="w-full flex justify-center items-center h-1/3">
                            <button type="down"
                                class="button-move w-16 h-16 p-1 flex justify-center items-center text-xl md:w-24 md:h-24 md:text-2xl xl:w-28 xl:h-28 text-stone-400"><i
                                    class="fa-solid fa-caret-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid place-content-center">
                @include('frontend/blocks/joystick', ['mb' => '160px', 'md' => '300px', 'lg' => '350px'])
            </div>
        </div>
    </div>
    <script type="module" src="/js/joystick/joystick.js"></script>
@endsection
