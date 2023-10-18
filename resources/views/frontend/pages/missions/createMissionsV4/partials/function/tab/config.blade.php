<div class="hidden function-form-item function-mission-tab w-fit rounded-md bg-[#fff] py-4 px-8 pb-[60px] relative"
    data-type="config">
    <div class="flex flex-col mb-4">
        <label for="" class="text-2xl">Name config</label>
        <input class="min-w-[200px] w-full text-2xl px-4 py-1  input-reset valid-input" type="text" name="name_config"
            required>
    </div>

    @php
        $inputConfigList = ['footprint_padding', 'max_vel_x', 'acc_lim_x', 'max_vel_theta', 'acc_lim_theta', 'inflation_radius'];

    @endphp

    <div class="flex gap-8 flex-wrap flex-col my-8">
        @foreach ($inputConfigList as $config)
            <div class="flex justify-between gap-4">
                <label for="{{ $config }}" class="text-2xl">{{ $config }}</label>
                <input id="{{ $config }}"
                    class="w-[70px] text-2xl px-4 py-1 input-reset input-type-number placeholder:text-2xl"
                    placeholder="none" type="text" name="{{ $config }}" required>
            </div>
        @endforeach
    </div>
    @include('frontend.blocks.mission.createMissions.functionTab.idMission')

    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'config',
    ])
</div>
