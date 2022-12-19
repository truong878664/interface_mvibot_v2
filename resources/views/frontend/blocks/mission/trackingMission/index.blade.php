<div class="tracking-mission-wrapper">
    <div class="map-tracking-wrapper">
        <div class="map-tracking" id="map"></div>
        <div class="choose-robot-tracking">
            <label for="">choose robot:</label>
            <input type="hidden" id="robot-navigation-json" value="{{ json_encode($robotNavigate) }}">
            <select name="" id="robot-navigation" class="obtion-robot">
                <option value="">select robot</option>
                @foreach ($robotNavigate as $item)
                    <option value="{{ $item->name_seri }}">{{ $item->name_seri }}</option>
                @endforeach
            </select>
        </div>
    </div>
    <div class="joystick">
        <div class="h-[160px] w-[160px] md:w-[220px] md:h-[220px] lg:h-[300px] lg:w-[300px]" hidden></div>
        @include('frontend.blocks.joystick', ['mb' => '160px', 'md' => '220px', 'lg' => '300px'])
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
