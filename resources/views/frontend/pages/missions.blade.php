@extends('frontend.layouts.mainLayout')
@section('content')
    <link rel="stylesheet" href="/css/missions.css">
    <div class="heading missions-heading">Mission</div>
    <div class="contents missions-content">
        <ul class="nav-tab">
            <li class="navtab-item active create-point">Create point</li>
            <li class="navtab-item create-missions">Create missions</li>
            <li class="navtab-item tracking-mission">Tracking mission</li>
        </ul>
        <div class="missions-wrapper-map">

            <div class="missions-map" id="map"></div>
            <div class="mission-point-control-wrapper">
                <div class="mission-point-control">

                    <div class="mission-point-control-item positon-x position">
                        <input id="inx" type="number" class="input-value number-position-x" min="-10.24"
                            max="22.66" step="0.05" value="0">

                        <input id="position-x" type="range" class="input-control" name="" value="0"
                            min="-10.24" max="22.66" step="0.05">
                        <p>Positon X</p>
                    </div>
                    <div class="mission-point-control-item positon-y position">
                        <input id="" type="number" class="input-value number-position-y" min="-10.24"
                            max="22.66" step="0.05" value="0">
                        <input id="position-y" type="range" class="input-control" name="" value="0"
                            min="-10.24" max="22.66" step="0.05">
                        <p>Positon Y</p>
                    </div>
                    <div class="mission-point-control-item rotate-z position">
                        <input id="" type="number" class="input-value number-rotate-z" min="-180"
                            max="180" step="0.05" value="0">
                        <input id="rotate-z" type="range" class="input-control" name="" value="0"
                            min="-180" max="180" step="1">
                        <p>Rotate Z</p>
                    </div>
                </div>
                <label for="form-create-point-checkbox" class="create-point-btn submit-btn">Create</label>
            </div>
        </div>

        <input id="form-create-point-checkbox" type="checkbox" class="form-create-point-checkbox" hidden>
        <div class="form-create-point-wrapper">
            <div class="overlay"></div>
            <form action="" class="form-create-point">

                <label for="form-create-point-checkbox" class="form-create-point-close"><i
                        class="fa-solid fa-xmark"></i></label>

                <div class="name-point-wrapper form-item">
                    <label for="name-point">Name point</label>
                    <input id="name-point" type="text" name="name-point">
                </div>

                <div class="time-color-wrapper form-item">
                    <div class="time-point-wrapper form-item">
                        <label for="time-point">Time out</label>
                        <input id="time-point" type="number" name="time-point">
                    </div>

                    <div class="color-point-wrapper form-item">
                        <label for="color-point" class="color-point">color</label>
                        <input id="color-point" type="color" name="time-point">
                    </div>
                </div>

                <div class="mode-wrapper form-item">
                    <label for="mode">Mode</label>
                    <input id="mode" type="text" name="mode">
                </div>

                <div class="mode-child-wrapper form-item">
                    <label for="mode-child">Mode child</label>
                    <input id="mode-child" type="text" name="mode-child">
                </div>
                <button class="submit-btn save-point-btn">Save</button>
            </form>
        </div>
    </div>
    <script src="/js/missions.js"></script>
@endsection
