<div class="h-full w-full flex flex-col bg-[#fff] p-4 hidden function-form-item function-mission-tab" data-type="gpio_module">
    <div class="flex mb-4">
        <div class="flex flex-col">
            <label for="" class="text-xl">Name function GPIO</label>
            <input class="w-[200px] text-xl px-4 py-1 name_function_gpio_module input-reset valid-input" type="text" name="name_gpio"
                required>
        </div>
        <div class="flex flex-col ml-2">
            <label class="text-xl">Name GPIO module</label>
            <select
                class="w-[200px] text-xl px-4 py-1 outline-none h-[24.5px] border bg-[#fff] name_gpio_module input-reset valid-input"
                name="name_gpio" >

                @foreach ($allRobots as $robot)
                    <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                @endforeach
            </select>
        </div>
        <div class="flex flex-col ml-2">
            <label for="" class="text-xl">Time out</label>
            <input class="w-[40px] text-xl px-2 py-1 time_out_gpio_module text-center input-type-number" type="text"
                name="time_out" value="-1" required>
        </div>
    </div>
    <div class="w-full h-full flex flex-col justify-center">
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio', [
                'type' => 'gpio_module',
            ])
        </div>
        <div class="flex-1 max-h-[calc(100%_-_80px)] overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
            'type' => 'gpio_module',
        ])
    </div>
</div>