@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col max-h-[calc(100vh_-_48px)]">
        <div class="heading map-heading">Choose map active</div>
        <div class="mx-4 mb-4 h-full flex flex-col bg-[#ccc] relative overflow-hidden ">
            <div class="w-full h-full" id="map-wrapper">
                <div class="w-full h-full" id="map"></div>
            </div>
            {{-- select map --}}
            <div class="absolute h-[30px]  m-4 px-2 rounded-sm flex">
                <label class="text-[#fff] bg-[#0f6cbd] px-2">
                    <input type="hidden" id="robot-navigation" value="1">

                    <span for="">Choose map:</span>
                    <select name="" id="choose-map-active" class="bg-transparent outline-none">
                        <option value="">select map</option>
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
                    <button class="bg-[#0f6cbd] text-[#fff] px-3 rounded-sm btn" id="active-map-btn">Active map</button>
                    <button class="bg-red-500 text-[#fff] px-3 rounded-sm btn" id="delete-map-btn">Delete map</button>
                </div>
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
