<div class="missions-point-map">
    {{-- <label for="click-set-point" class="click-set-point"><i class="fa-regular fa-hand-point-up"></i></label> --}}
    <div class="missions-map" id="map"></div>
</div>
{{-- <input hidden type="checkbox" id="click-set-point">
<div class="map-click-wrapper">
    <label for="click-set-point" class="overlay"></label>
    <div class="map-click-container" id="map-click">
    </div>
</div> --}}
<div class="mission-point-control-wrapper">

    @include('frontend.blocks.createPoint.control')

    <x-button tag="label" title="Create" class="create-point-btn" attribute="for=form-create-point-checkbox">
    </x-button>

</div>
<input id="form-create-point-checkbox" type="checkbox" class="form-create-point-checkbox" hidden>
<div class="form-create-point-wrapper">
    @include('frontend.blocks.createPoint.form')
</div>
<style>
    .missions-point-map {
        position: relative;
    }

    .click-set-point {
        position: absolute;
        top: 0;
        right: 0;
        margin: 10px;
        font-size: 2rem;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        border: none;
        background: #ccc;
        opacity: .7;
        text-align: center;
        line-height: 40px;
        user-select: none;
    }

    .click-set-point:hover {
        opacity: 1;
        cursor: pointer;
    }

    .map-click-wrapper {
        display: none;
    }

    #click-set-point:checked~.map-click-wrapper {
        display: block
    }

    .map-click-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 100;
    }
</style>
