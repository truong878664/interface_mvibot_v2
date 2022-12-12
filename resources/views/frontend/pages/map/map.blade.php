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
                {{-- <div class="list-layer">
                    <x-button tag="label" title="list layer" class="layer-btn" attribute="for=list-layer"></x-button>
                    <input type="checkbox" id="list-layer">
                    <div class="list-layer-wrapper"></div>
                </div> --}}
                {{-- @include('frontend.pages.map.binCreateLayer') --}}


                <div class="test">1234</div>
                <div class="create-layer">
                    <div class="overlay overlay-create-layer"></div>
                    <x-button tag="label" title="create layer" class="layer-btn" attribute="for=value-layer"></x-button>
                    <input hidden type="checkbox" checked id="value-layer">
                    <form class="value-layer">
                        <label for="name-layer" class="input-layer-wrapper">
                            <span class="">Name</span>
                            <input class="input-layer" type="text" id="name-layer">
                        </label>
                        <select class="input-layer-wrapper" name="" id="" class="type-layer">
                            <option value="dead_zone">dead_zone</option>
                            <option value="lowspeed_zone">lowspeed_zone</option><label
                                class="transform_panel--scrubbableInputLeftCol--5B9SL raw_components--borderFocusWithin--mSvWa scrubbable_control--containerBordered---60m8 raw_components--borderFocusWithin--mSvWa scrubbable_control--container--myvKL"
                                data-tooltip-type="text" data-tooltip="Rotation" aria-label="Rotation">flex
                        </select>
                        <label for="" class="input-layer-wrapper ">
                            <span class="label-input-layer">W</span>
                            <input class="input-layer input-layer-w" type="text" value="0">
                        </label>

                        <label for="" class="input-layer-wrapper ">
                            <span class="label-input-layer">H</span>
                            <input class="input-layer input-layer-h" type="text" value="0">
                        </label>

                        <label for="" class="input-layer-wrapper ">
                            <span class="label-input-layer deg-icon" style="background-image: url('/icon/deg.svg')">
                            </span>
                            <input class="input-layer input-layer-z" type="text" value="0">
                        </label>
                        <x-button tag="button" title="add" class="layer-btn" attribute=""></x-button>
                    </form>
                </div>
            </div>
            <style>
                .input-layer-wrapper {
                    background: #fff;
                    height: 30px;
                    border: 1px solid rgba(70, 69, 69, 0.438);
                    display: flex;
                    align-items: center;
                    margin: 0 4px;
                    padding: 0 4px;
                }

                .label-input-layer {
                    z-index: 1000;

                }

                .overlay-create-layer {
                    cursor: ew-resize;
                    background: transparent;
                    display: none;
                }

                .deg-icon {
                    width: 20px;
                    height: 20px;
                    background-repeat: no-repeat;
                    background-position: center;
                    object-fit: cover;
                }
            </style>
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

        const $ = document.querySelector.bind(document)
        const $$ = document.querySelectorAll.bind(document)
        document.querySelector('#list-map').onchange = (e) => {
            document.querySelector('.map-submit').click()
        }
        let currentInput
        let a = 0
        let currentValue;

        const setValueInputLayer = function(e) {

            currentValue = Number(currentInput.value)
            if (Number(currentValue) < 0) {
                currentValue = 0
            }

            if (e.x >= a) {
                a = e.x
                currentValue++
                currentInput.value = currentValue

            } else {
                a = e.x
                currentValue < 1 ? currentValue = 0 : currentValue--
                currentInput.value = currentValue
            }
        }

        $$('.label-input-layer').forEach(element => {
            element.onpointerdown = (e) => {
                currentInput = e.target.closest('.input-layer-wrapper').querySelector('.input-layer')
                $('.overlay-create-layer ').style.display = 'block';
                document.addEventListener('pointermove', setValueInputLayer)
            }
        });


        document.onpointerup = (e) => {
            $('.overlay-create-layer ').style.display = 'none';
            document.removeEventListener('pointermove', setValueInputLayer)

        }
    </script>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map.js"></script>
    <style>
        .create-layer {
            display: flex;
            align-items: center;
        }

        .label-input-layer {
            user-select: none;
            cursor: e-resize;
            padding: 4px;
        }
    </style>
@endsection
