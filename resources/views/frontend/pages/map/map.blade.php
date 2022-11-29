@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading map-heading">Map</div>
    <div class="contents">
        <div class="map-wrapper">
            <x-button tag="button" title="List map" class="list-map-btn" attribute=""></x-button>

            <div class="map-page_map" id="map"></div>
            <div class="joystick-container">
                <div class="joystick-wrapper">
                    <div id="zone_joystick"></div>
                </div>
                <div class="position-icon up"><i class="fa-solid fa-caret-up"></i></div>
                <div class="position-icon left"><i class="fa-solid fa-caret-left"></i></div>
                <div class="position-icon right"><i class="fa-solid fa-caret-right"></i></div>
                <div class="position-icon down"><i class="fa-solid fa-caret-down"></i></div>
            </div>
        </div>
    </div>

    <script>
        document.title = 'Map | Mvibot'
    </script>
    <script src="/js/library/roslib.min.js"></script>

    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map.js"></script>
@endsection
