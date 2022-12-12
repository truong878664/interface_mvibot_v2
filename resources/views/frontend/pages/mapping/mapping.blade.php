@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full md:flex">
        <div class="h-2/3 bg-slate-500 md:h-full md:w-2/3" id="map"></div>
        <div class="h-1/3 flex justify-between items-center px-7 md:h-full md:w-1/3 md:flex-col">
            <div class=""></div>
            {{-- joystick --}}
            @include('frontend/blocks/joystick')

        </div>
    </div>

    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/mapping.js"></script>
@endsection
