<div class="h-full w-full relative flex flex-col rounded-lg overflow-hidden">
    <div class="w-full h-full bg-[#ccc]">
        <div class="w-full h-full" id="map"></div>
        @include('frontend.pages.trackingMission.missionInProgress')
        <div class="choose-robot-tracking">
            <input type="hidden" id="robot-navigation-json" value="{{ json_encode($robotNavigate) }}">
            @include('frontend.blocks.selectRobot', [
                'type' => 'robot_navigation',
                'id' => 'robot-navigation',
            ])
        </div>
    </div>
    <div class="absolute right-0 bottom-0 ">
        <input type="checkbox" class="peer/joystick sr-only" id="show-joystick">
        <div class="peer-checked/joystick:w-0 peer-checked/joystick:mr-0 w-fit overflow-hidden mr-[120px] mb-[50px]">
            @include('frontend.blocks.joystick', ['mb' => '160px', 'md' => '220px', 'lg' => '300px'])
        </div>
        <label class="absolute top-0 right-0 bg-white p-2 rounded-tl-2xl rounded-bl-xl shadow-md group"
            for="show-joystick">
            <span class="rotate-180 block transition-all duration-300 peer-checked/joystick:group-[]:rotate-0">
                <i class="fa-solid fa-caret-left"></i>
            </span>
    </div>
    <div class="absolute right-3 top-3">
        <button
            class=" btn bg-red-500 text-[#fff] self-end px-5 py-3 rounded-md mr-4 text-2xl font-bold stop-mission-btn">
            Stop
        </button>
        <button
            class=" btn bg-green-500 text-[#fff] self-end px-5 py-3 rounded-md mr-4 text-2xl font-bold continue-mission-btn">
            Continue
        </button>
        <button
            class=" btn bg-main text-[#fff] self-end px-5 py-3 rounded-md mr-4 text-2xl font-bold refresh-mission-btn">
            Reset server
        </button>
    </div>
</div>
