<div class="missions-map" id="map"></div>
<div class="mission-point-control-wrapper">

    @include('frontend.blocks.createPoint.control')

    <label for="form-create-point-checkbox" class="create-point-btn submit-btn">Create</label>
</div>
<input id="form-create-point-checkbox" type="checkbox" class="form-create-point-checkbox" hidden>
<div class="form-create-point-wrapper">
    @include('frontend.blocks.createPoint.form')
</div>
