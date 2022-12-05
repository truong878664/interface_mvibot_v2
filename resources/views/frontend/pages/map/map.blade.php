@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading map-heading">Map</div>
    <div class="contents">
        <div class="map-wrapper">
            <?php
            $fileMapList = glob('../maps/*');
            ?>
            <div class="map-active">
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
            <form method="POST" action="/map-active">
                <div class="list-map-wrapper">

                    <label for="list-map">List map</label>
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
    <style>
        .list-map-wrapper {
            position: absolute;
            height: 40px;
            display: flex;
            align-item: center;
            margin: 10px;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 2px 2px 5px #333;
        }

        .list-map {

            height: ;
        }

        .list-map-wrapper label {
            background: var(--main-color);
            color: var(--white-color);
            line-height: 40px;
            padding: 0 8px;
        }

        #list-map {
            outline: none;
            border: none;
            font-size: 1.6rem;
            padding: 8px;
        }

        .map-active {
            position: absolute;
            right: 0;
            font-size: 1.2rem;
            padding: 8px;
        }
    </style>
@endsection
