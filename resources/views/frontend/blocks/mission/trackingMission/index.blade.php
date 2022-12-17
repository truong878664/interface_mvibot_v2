<div class="tracking-mission-wrapper">
    <div class="map-tracking" id="map"></div>
    <div class="joystick">
        @include('frontend.blocks.joystick')
    </div>
    <div class="step-mission-tracking-wrapper">
        <div class="step-mission-tracking">
        </div>
        <div class="tracking-misison-btn">
            <x-button tag="button" title='stop' class="stop-mission-btn" attribute=""></x-button>
            <x-button tag="button" title='Continue' class="continue-mission-btn" attribute=""></x-button>
        </div>
    </div>
</div>
