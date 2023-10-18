@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 rounded-md overflow-hidden bg-stone-200 relative">
        <div class="absolute top-0 left-0 bg-main/50 backdrop-blur-sm w-full min-h-[40px]"></div>
        <div class="w-full h-full" id="map"></div>
        <script src="/js/map/layerV2.js" type="module"></script>
    </div>
@endsection
