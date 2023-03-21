@extends('frontend.layouts.mainLayout')
@section('content')
    <div class=" flex flex-col w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2">
        <div class="h-full flex flex-col bg-[#ccc] relative overflow-hidden rounded-md">
            <div class="w-full h-full" id="map-wrapper">
                <div class="w-full h-full" id="map"></div>
            </div>
            {{-- select map --}}
            <div class="absolute m-4 px-2 rounded-sm flex items-center">
                <label class="text-[#fff] bg-[#0f6cbd] text-2xl px-2 py-2 rounded-md">
                    <input type="hidden" id="robot-navigation" value="1">
                    <select name="" id="choose-map-active" class="bg-transparent outline-none">
                        <option value="">Select map</option>
                        @php
                            $fileMapList = glob('../maps/*');
                        @endphp

                        @foreach ($fileMapList as $map)
                            {{ $nameMap = str_replace('.yaml', '', str_replace('../maps/', '', $map)) }}
                            @if (str_ends_with($map, '.yaml'))
                                <option value='{{ $nameMap }}' class="text-[#333] map-item">{{ $nameMap }}
                                </option>
                            @endif
                        @endforeach
                    </select>
                </label>

                <div class="mx-4">
                    <button class="bg-[#0f6cbd] text-[#fff] px-3 py-2 rounded-md text-2xl btn" id="active-map-btn">Active map</button>
                    <label class="bg-red-500 text-[#fff] px-3 py-2 rounded-md text-2xl btn" for="delete-map">Delete map</label>

                </div>
                <input type="checkbox" name="" class="peer/delete-map hidden" id="delete-map">
                <label for="delete-map" class="fixed top-0 z-10 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)] hidden peer-checked/delete-map:flex justify-center items-center">
                    <div class="p-4 bg-[#fff] rounded-md flex flex-col justify-center text-2xl">
                        <p>Do you want to delete this map?</p>
                        <div class="flex justify-evenly mt-4">
                            <label for="delete-map" class="bg-yellow-500 text-[#fff] px-3 py-2 rounded-md btn">Cancel</label>
                            <label for="delete-map" class="bg-red-500 text-[#fff] px-3 py-2 rounded-md btn" id="delete-map-btn">Submit</label>
                        </div>
                    </div>
                </label>
            </div>

        </div>
    </div>
    <div id="msg" class="fixed rounded-sm text-[#fff] top-[100px] right-8 z-[12]">
        <div class="px-4 py-2">
            <div class="bg-red-500"></div>
            <div class="bg-green-500"></div>
        </div>
    </div>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map/mapActive.js"></script>
@endsection
