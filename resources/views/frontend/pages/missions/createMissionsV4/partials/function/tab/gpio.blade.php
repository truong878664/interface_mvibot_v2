<div class="function-form-item function-mission-tab flex hidden h-full w-full flex-col bg-[#fff] p-4 text-sm"
    data-type="gpio">
    <div class="mb-2 flex">
        <div class="flex flex-col">
            <label for="" class="">Name function GPIO</label>
            <input class="name_gpio input-reset valid-input w-[200px] px-4 py-1 " type="text" name="name_gpio"
                required />
        </div>
        <div class="ml-2 flex flex-col">
            <label for="" class="">Time out</label>
            <input class="time_out_gpio input-type-number w-12 px-2 py-1 text-center " type="text" name="time_out"
                value="-1" required />
        </div>
    </div>
    <div class="flex h-full w-full flex-col justify-center">
        <div class="mb-4">
            <label for="not_set_out" class="flex items-center gap-4">
                <span>Not set out </span>
                <input id="not_set_out" type="checkbox" name="not_set_out" class="h-4 w-4 rounded" />
            </label>
        </div>
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio', [
                'type' => 'gpio',
            ])
        </div>
        <div class="max-h-[calc(100%_-_80px)] flex-1 overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
            'type' => 'gpio',
        ])
    </div>
</div>
