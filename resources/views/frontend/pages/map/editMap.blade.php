@extends('frontend.layouts.mainLayout')
@section('content')
    <section class="relative p-1 w-full h-full">
        <div class="absolute w-full h-10 top-0 left-0 z-10">
            <div id="map-edit" class="rounded w-full h-full overflow-hidden">
                <input type="range" name="" id="range" class="">
            </div>
        </div>
        <div id="canvas-wrapper" class="w-full h-full">
            <canvas id='canvas' />
        </div>
    </section>
    <script type="module" src="/js/map/editMap.js"></script>
@endsection
