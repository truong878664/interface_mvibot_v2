<div class="tracking-mission-wrapper h-[calc(100vh_-_130px)] md:h-[calc(100vh_-_100px)]">
    <div class="map-tracking-wrapper bg-[#ccc]">
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
    <div class="absolute right-3 top-3">
        <button class=" btn bg-red-500 text-[#fff] self-end px-4 py-1 rounded-md mr-4 stop-mission-btn">Stop</button>
        <button
            class=" btn bg-green-500 text-[#fff] self-end px-4 py-1 rounded-md mr-4 continue-mission-btn">Continue</button>
    </div>
</div>
