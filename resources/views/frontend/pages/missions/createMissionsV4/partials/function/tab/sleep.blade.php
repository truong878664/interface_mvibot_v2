<div
    class="function-form-item function-mission-tab relative hidden w-fit rounded-md bg-[#fff] p-4 pb-[60px]"
    data-type="sleep"
>
    <div class="mb-4 flex flex-col">
        <label for="" class="text-xl">Name function Sleep</label>
        <input
            class="input-reset valid-input w-[200px] px-4 py-1 text-xl"
            type="text"
            name="name_sleep"
            required
        />
    </div>

    <div class="flex flex-col">
        <label for="" class="text-xl">Time sleep</label>
        <div class="">
            <input
                class="input-reset input-type-number w-[40px] px-4 py-1 text-xl"
                type="text"
                name="time_sleep"
                required
            />
            <span class="text-xl">second</span>
        </div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
    [ 'type' => 'sleep', ])
</div>
