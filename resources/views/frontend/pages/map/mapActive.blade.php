@extends('frontend.layouts.mainLayout')
@section('content')
    <?php
    $fileMapList = glob('../maps/*');
    ?>
    <div class="w-full h-full flex flex-col max-h-[calc(100vh_-_48px)]">
        <div class="heading map-heading">Choose map active</div>
        <div class="mx-4 mb-4 h-full flex flex-col bg-[#ccc] relative overflow-hidden ">
            <div class="w-full h-full" id="map-wrapper">
                <div class="w-full h-full" id="map"></div>
            </div>
            {{-- select map --}}
            <label class="absolute h-[30px] bg-[#0f6cbd] text-[#fff] m-4 px-2 rounded-sm z-[1000]">
                <input type="hidden" id="robot-navigation" value="1">
                <span for="">Choose map:</span>
                <select name="" id="choose-map-active" class="bg-transparent outline-none">
                    <option value="">select map</option>
                    @foreach ($fileMapList as $map)
                        {{ $nameMap = str_replace('.yaml', '', str_replace('../maps/', '', $map)) }}
                        @if (str_ends_with($map, '.yaml'))
                            <option value='{{ $nameMap }}' class="text-[#333]">{{ $nameMap }}</option>
                        @endif
                    @endforeach
                </select>
            </label>
        </div>
    </div>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map/mapActive.js"></script>
@endsection
