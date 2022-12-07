<div class="missions-point-map">
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
        <div class="">
            <span>x:</span><span class="x-value"></span>
            <span>y:</span><span class="y-value"></span>
        </div>
    </div>
    <div class="line-x"></div>
    <div class="line-y"></div>
    <div class="missions-map" id="map"></div>
    <label class="switch">
        <input class="check-click-point" type="checkbox">
        <span class="slider round"></span>
    </label>

</div>
<div class="mission-point-control-wrapper">

    @include('frontend.blocks.createPoint.control')

    <x-button tag="label" title="Create" class="create-point-btn" attribute="for=form-create-point-checkbox">
    </x-button>

</div>
<input id="form-create-point-checkbox" type="checkbox" class="form-create-point-checkbox" hidden>
<div class="form-create-point-wrapper">
    @include('frontend.blocks.createPoint.form')
</div>
<script></script>
<style>
    .missions-point-map {
        position: relative;
    }

    .switch {
        display: inline-block;
        width: 60px;
        height: 34px;
        position: absolute;
        top: 0;
        right: 0;
        margin: 16px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    input:checked+.slider {
        background-color: #2196F3;
    }

    input:focus+.slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked+.slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .map-active {
        position: absolute;
        left: 0;
        font-size: 1.2rem;
        padding: 8px;
    }

    .line-x {
        width: 100%;
        height: 0.4px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        pointer-events: none;
    }

    .line-y {
        height: 100%;
        width: 0.4px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        pointer-events: none;

    }
</style>
