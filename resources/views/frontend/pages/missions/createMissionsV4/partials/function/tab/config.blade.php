<div class="function-form-item relative function-mission-tab relative hidden w-fit rounded-md bg-[#fff] py-4 px-8 pb-[60px]"
    data-type="config">
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonDismiss', [
        'type' => 'config',
    ])
    <div class="mb-4 flex flex-col">
        <label for="" class="">Name config</label>
        <input class="input-reset valid-input w-full min-w-[200px] px-4 py-1 " type="text" name="name_config"
            required />
    </div>

    @php $inputConfigList = ['footprint_padding', 'max_vel_x',"min_vel_x", 'acc_lim_x', 'max_vel_theta', 'acc_lim_theta', 'inflation_radius']; @endphp

    <div class="my-8 flex flex-col flex-wrap gap-8">
        @foreach ($inputConfigList as $config)
            <div class="flex justify-between gap-4">
                <label for="{{ $config }}" class="">{{ $config }}</label>
                <input id="{{ $config }}" class="input-reset input-type-number w-24 px-4 py-1 " placeholder="none"
                    type="text" name="{{ $config }}" required />
            </div>
        @endforeach
    </div>
    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'config',
    ])
</div>
