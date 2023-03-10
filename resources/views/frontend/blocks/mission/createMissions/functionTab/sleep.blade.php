<div class="hidden function-item function-mission-tab" data-type="sleep">
    <div class="flex flex-col mb-4">
        <label for="" class="text-xl">Name function Sleep</label>
        <input class="w-[200px] text-xl px-4 py-1  input-reset valid-input" type="text" name="name_sleep" required>
    </div>


    <div class="flex flex-col">
        <label for="" class="text-xl">Time sleep</label>
        <div class="">
            <input class="w-[40px] text-xl px-4 py-1 input-reset input-type-number" type="text" name="time_sleep"
                required>
            <span class="text-xl">second</span>
        </div>
    </div>


    @include('frontend.blocks.mission.createMissions.functionTab.idMission')

    @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'sleep'])


</div>
