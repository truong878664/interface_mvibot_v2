@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="flex flex-col w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 overflow-hidden border rounded-md">
        <div class="h-full flex flex-col bg-[#ccc] relative overflow-hidden" id="map-wrapper">
            <div class="h-full w-full" id="map"></div>
            {{-- choose robot --}}
            <label class="absolute">
                <input type="hidden" id="robot-navigation" value="{{ json_encode($robotNavigation) }}">
                    {{-- 
                <select name="" id="robot-navigation-name" class="bg-transparent outline-none">
                    <option value="">Select robot</option>
                    @foreach ($robotNavigation as $item)
                        <option value="{{ $item['name_seri'] }}" class="text-[#333]">{{ $item['name_seri'] }}</option>
                    @endforeach
                </select>
                
                --}}
                @include('frontend.blocks.selectRobot', ['type' => 'robot_navigation', 'id' => 'robot-navigation-name'])
            </label> 
                
            
            {{-- switch --}}
            <label class="switch m-4">
                <input class="check-click-point" type="checkbox">
                <span class="slider round"></span>
            </label>
            {{-- control --}}
            <div
                class="absolute right-0 bottom-0 w-[400px] h-[200px] rounded-tl-2xl p-5 bg-[#ffffff7f] flex flex-col justify-between text-2xl">
                <div class="flex items-center">
                    <span class="pr-6">X</span>
                    <input id="position-x" type="range" class="input-control w-full" name="" value="0"
                        min="-10.24" max="22.66" step="0.05">
                    <input id="inx" type="number" class="bg-transparent border-none w-[60px] text-center"
                        min="-10.24" max="22.66" step="0.05" value="0">
                </div>

                <div class="flex items-center">
                    <span class="pr-6">Y</span>
                    <input id="position-y" type="range" class="input-control w-full" name="" value="0"
                        min="-10.24" max="22.66" step="0.05">
                    <input id="iny" type="number" class="bg-transparent border-none w-[60px] text-center"
                        min="-10.24" max="22.66" step="0.05" value="0">
                </div>

                <div class="flex items-center">
                    <span class="pr-6">Z</span>
                    <input id="rotate-z" type="range" class="input-control w-full" name="" value="0"
                        min="-180" max="180" step="1">
                    <input id="inz" type="number" class="bg-transparent border-none w-[60px] text-center"
                        min="-180" max="180" step="1" value="0">
                </div>
                <div class="self-end">
                    <button id="send-location-btn" class="btn bg-main text-[#fff] self-end px-4 py-2 rounded-md mr-4 text-2xl font-bold">Send</button>
                </div>
            </div>
        </div>
    </div>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/location/location.js"></script>
@endsection
