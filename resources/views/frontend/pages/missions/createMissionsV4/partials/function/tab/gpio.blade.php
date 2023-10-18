<div class="h-full w-full flex flex-col bg-[#fff] p-4 hidden function-form-item function-mission-tab" data-type="gpio">
    <div class="flex mb-4">
        <div class="flex flex-col">
            <label for="" class="text-xl">Name function GPIO</label>
            <input class="w-[200px] text-xl px-4 py-1 name_gpio input-reset valid-input" type="text" name="name_gpio"
                required>
        </div>
        <div class="flex flex-col ml-2">
            <label for="" class="text-xl">Time out</label>
            <input class="w-[40px] text-xl px-2 py-1 time_out_gpio text-center input-type-number" type="text"
                name="time_out" value="-1" required>
        </div>
    </div>
    <div class="w-full h-full flex flex-col justify-center">
        <div class="text-2xl mb-4">
            <label for="not_set_out" class="flex items-center gap-4">
                <span>Not set out </span>
                <input id="not_set_out" type="checkbox" name="not_set_out" class="w-7 h-7 rounded-md">
            </label>
        </div>
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio', [
                'type' => 'gpio',
            ])
        </div>
        <div class="flex-1 max-h-[calc(100%_-_80px)] overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
            'type' => 'gpio',
        ])
    </div>
</div>
