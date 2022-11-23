@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading map-heading">Map</div>
    <div class="contents">
        <div class="map-wrapper">
            <button class="list-map">list Map</button>
            <div class="map-page_map" id="map"></div>
            <div class="joystick-wrapper">
                <div id="zone_joystick"></div>
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
