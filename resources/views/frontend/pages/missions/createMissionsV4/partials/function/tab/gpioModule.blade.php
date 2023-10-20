<div
    class="function-form-item function-mission-tab flex hidden h-full w-full flex-col bg-[#fff] p-4"
    data-type="gpio_module"
>
    <div class="mb-4 flex">
        <div class="flex flex-col">
            <label for="" class="text-xl">Name function GPIO</label>
            <input
                class="name_function_gpio_module input-reset valid-input w-[200px] px-4 py-1 text-xl"
                type="text"
                name="name_gpio"
                required
            />
        </div>
        <div class="ml-2 flex flex-col">
            <label class="text-xl">Name GPIO module</label>
            <select
                class="name_gpio_module input-reset valid-input h-[24.5px] w-[200px] border bg-[#fff] px-4 py-1 text-xl outline-none"
                name="name_gpio"
            >
                @foreach ($allRobots as $robot)
                <option value="{{ $robot->name_seri }}">
                    {{ $robot->name_seri }}
                </option>
                @endforeach
            </select>
        </div>
        <div class="ml-2 flex flex-col">
            <label for="" class="text-xl">Time out</label>
            <input
                class="time_out_gpio_module input-type-number w-[40px] px-2 py-1 text-center text-xl"
                type="text"
                name="time_out"
                value="-1"
                required
            />
        </div>
    </div>
    <div class="mb-4 text-2xl">
        <label for="not_set_out_module" class="flex items-center gap-4">
            <span>Not set out </span>
            <input
                id="not_set_out_module"
                type="checkbox"
                name="not_set_out"
                class="h-7 w-7 rounded-md"
            />
        </label>
    </div>
    <div class="flex h-full w-full flex-col">
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio',
            [ 'type' => 'gpio_module', ])
        </div>
        <div class="max-h-[calc(100%_-_80px)] flex-1 overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>
        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
        [ 'type' => 'gpio_module', ])
    </div>
</div>
