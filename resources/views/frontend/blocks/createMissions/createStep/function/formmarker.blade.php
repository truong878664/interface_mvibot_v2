<p class="heading-form-mission">Marker</p>
{{-- <form action="">
    <label for="">Time sleep</label>
    <input type="text" class="time-sleep">
    <span>second</span>
    <button class="add-btn submit-btn">Add</button>
</form> --}}
<div class="type-marker">
    <label for="l-marker" class="marker-btn">L Marker</label>
    <label for="vl-marker" class="marker-btn">VL Marker</label>
    <label for="bar-marker" class="marker-btn">Bar Marker</label>
    <label for="none-marker-dis" class="marker-btn">None Marker dis</label>
    <label for="none-marker-angle" class="marker-btn">None Marker angle</label>
</div>

<input hidden name="marker" type="radio" id="l-marker">
<input hidden name="marker" type="radio" id="vl-marker">
<input hidden name="marker" type="radio" id="bar-marker">
<input hidden name="marker" type="radio" id="none-marker-dis">
<input hidden name="marker" type="radio" id="none-marker-angle">

<div class="form-marker-wrapper form-l-marker">
    @include('frontend.blocks.createMissions.createStep.function.tabMarker.formLMarker')
</div>

<div class="form-marker-wrapper form-vl-marker">
    @include('frontend.blocks.createMissions.createStep.function.tabMarker.formVlMarker')
</div>

<div class="form-marker-wrapper form-bar-marker">
    @include('frontend.blocks.createMissions.createStep.function.tabMarker.formBarMarker')
</div>

<div class="form-marker-wrapper form-none-marker-dis">
    @include('frontend.blocks.createMissions.createStep.function.tabMarker.noneMarkerDis')
</div>

<div class="form-marker-wrapper form-none-marker-angle">
    @include('frontend.blocks.createMissions.createStep.function.tabMarker.noneMarkerAngle')
</div>
