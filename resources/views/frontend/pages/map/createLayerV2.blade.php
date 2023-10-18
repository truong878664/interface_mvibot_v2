@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 rounded-md overflow-hidden bg-stone-200 relative">
        <div class="absolute top-0 left-0 w-full min-h-[40px] p-2">
            <div class="bg-main/50 backdrop-blur-sm w-full h-full rounded-md p-2">
                <input type="checkbox" class="w-6 h-6 rounded-md text-red-400">
            </div>
        </div>
        <div class="w-full h-full" id="map"></div>
        <script src="/js/map/layerV2.js" type="module"></script>
    </div>
@endsection
