<div class="hidden function-item function-mission-tab w-fit rounded-md bg-[#fff] p-4 pb-[60px] relative"
    data-type="sleep">
    <div class="flex flex-col mb-4">
        <label for="" class="">Name function Sleep</label>
        <input class="w-[200px]  px-4 py-1  input-reset valid-input" type="text" name="name_sleep" required>
    </div>

    <div class="flex flex-col">
        <label for="" class="">Time sleep</label>
        <div class="">
            <input class="w-[40px]  px-4 py-1 input-reset input-type-number" type="text" name="time_sleep" required>
            <span class="">second</span>
        </div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.idMission')

    @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'sleep'])
</div>
