<div class="function-form-item function-mission-tab relative hidden w-fit rounded-md bg-[#fff] p-4 pb-[60px]"
    data-type="sleep">
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonDismiss', [
        'type' => 'sleep',
    ])
    <div class="mb-4 flex flex-col">
        <label for="">Name function Sleep</label>
        <input class="input-reset valid-input w-[200px] px-4 py-1" type="text" name="name_sleep" required />
    </div>

    <div class="flex flex-col">
        <label for="">Time sleep</label>
        <div class="">
            <input class="input-reset input-type-number w-24 px-4 py-1" type="text" name="time_sleep" required />
            <span>second</span>
        </div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'sleep',
    ])
</div>
