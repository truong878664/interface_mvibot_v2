<div class="missions-map" id="map"></div>
<div class="mission-point-control-wrapper">

    @include('frontend.blocks.createPoint.control')

    <x-button tag="label" title="Create" class="create-point-btn" attribute="for=form-create-point-checkbox"></x-button>

</div>
<input id="form-create-point-checkbox" type="checkbox" class="form-create-point-checkbox" hidden>
<div class="form-create-point-wrapper">
    @include('frontend.blocks.createPoint.form')
</div>
