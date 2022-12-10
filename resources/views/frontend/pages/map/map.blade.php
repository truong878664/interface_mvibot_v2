@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading map-heading">Map</div>
    <div class="contents">
        <div class="map-wrapper">
            <?php
            $fileMapList = glob('../maps/*');
            ?>

            <div class="header-map">
                <select class="list-robot" id="list-robot">
                    <option value="">chose robot</option>
                    @foreach ($allRobot as $robot)
                        <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
                    @endforeach
                </select>
                <form method="POST" action="/map-active">
                    <div class="list-map-wrapper">
                        <label for="list-map" class="list-map-label">List map</label>
                        <select name="map_active" id="list-map" class="list-map">
                            <option value="">Select Map</option>
                            @foreach ($fileMapList as $map)
                                @if (str_ends_with($map, '.yaml'))
                                    <option value='{{ str_replace('.yaml', '', str_replace('../maps/', '', $map)) }}'>
                                        {{ str_replace('.yaml', '', str_replace('../maps/', '', $map)) }}</option>
                                @endif
                            @endforeach
                        </select>
                        @csrf
                        <input type="submit" class="map-submit" hidden>
                    </div>
                </form>
                <div class="list-layer">
                    <x-button tag="label" title="list layer" class="layer-btn" attribute="for=list-layer"></x-button>
                    <input type="checkbox" id="list-layer">
                    <div class="list-layer-wrapper"></div>
                </div>
                <div class="create-layer">

                    <x-button tag="label" title="create layer" class="layer-btn" attribute="for=value-layer"></x-button>
                    <input hidden type="checkbox" id="value-layer">
                    <div class="value-layer">
                        <input type="text" class="input-layer name_layer" placeholder="Name">
                        <input type="text" class="input-layer point-layer-1">
                        <input type="text" class="input-layer point-layer-2">
                        <input type="text" class="input-layer point-layer-3">
                        <select name="" id="" class="zone">
                            <option value="dead_zone">dead_zone</option>
                            <option value="lowspeed_zone">lowspeed_zone</option>
                        </select>
                        <x-button tag="button" title="Show layer" class="show-layer" attribute=""></x-button>
                    </div>
                    <form action="/add-layer" method="POST" class="save-layer-form">
                        <input type="hidden" name='data_layer' class="data-layer" value="{{ $layers }}">
                        <input type="hidden" name='map_active' value="{{ $mapActive }}">
                        @csrf
                        <x-button tag="button" title="Save layer" class="layer-btn" attribute=""></x-button>
                    </form>
                </div>
            </div>
            <div class="map-active-map">
                <span>Map active:</span>
                <span>
                    @foreach ($fileMapList as $item)
                        @if (strpos($item, "$mapActive.yaml"))
                            {{ $mapActive }}
                        @else
                        @endif
                    @endforeach
                </span>
            </div>
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

        document.querySelector('#list-map').onchange = (e) => {
            document.querySelector('.map-submit').click()
        }
    </script>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map.js"></script>
    <script></script>
    <style>

    </style>
@endsection
