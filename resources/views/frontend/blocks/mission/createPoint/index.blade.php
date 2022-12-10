<div class="missions-point-map">
    @include('frontend.blocks.mission.createPoint.headerCreatePoint')

    <div class="missions-map" id="map"></div>
</div>
<div class="mission-point-control-wrapper">
    @include('frontend.blocks.mission.createPoint.control')
    <x-button tag="label" title="Create" class="create-point-btn" attribute="for=form-create-point-checkbox"></x-button>
</div>
@include('frontend.blocks.mission.createPoint.form')
