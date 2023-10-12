<div class="tracking-mission-wrapper h-full">
    <div class="map-tracking-wrapper bg-[#ccc]">
        <div class="map-tracking" id="map"></div>
        @include('frontend.pages.trackingMission.missionInProgress')
        <div class="choose-robot-tracking">
            <input type="hidden" id="robot-navigation-json" value="{{ json_encode($robotNavigate) }}">
            @include('frontend.blocks.selectRobot', [
                'type' => 'robot_navigation',
                'id' => 'robot-navigation',
            ])
        </div>
    </div>
    <div class="joystick">
        @include('frontend.blocks.joystick', ['mb' => '160px', 'md' => '220px', 'lg' => '300px'])
    </div>
    <div class="absolute right-3 top-3">
        <button
            class=" btn bg-red-500 text-[#fff] self-end px-5 py-3 rounded-md mr-4 text-2xl font-bold stop-mission-btn">Stop</button>
        <button
            class=" btn bg-green-500 text-[#fff] self-end px-5 py-3 rounded-md mr-4 text-2xl font-bold continue-mission-btn">Continue</button>
        <button
            class=" btn bg-main text-[#fff] self-end px-5 py-3 rounded-md mr-4 text-2xl font-bold refresh-mission-btn">Reset
            server</button>
    </div>
</div>
