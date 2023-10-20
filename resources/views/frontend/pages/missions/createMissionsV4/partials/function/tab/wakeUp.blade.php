<div class="flex h-full w-full flex-col bg-[#fff] p-4" data-type="wakeup">
    <div class="mb-4 flex">
        <div class="group w-full">
            <div class="flex w-full justify-between">
                <div class="font-bold">Wake UP</div>
            </div>
        </div>
    </div>
    <input
        type="radio"
        name="wakeup-radio"
        id="wakeup-normal"
        hidden
        class="peer/normal"
        checked
    />
    <input
        type="radio"
        name="wakeup-radio"
        id="wakeup-module"
        hidden
        class="peer/module"
    />
    <div class="group flex">
        <label
            for="wakeup-normal"
            class="ml-2 self-end rounded-l-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] peer-checked/normal:group-[]:bg-[#0f6cbd] peer-checked/normal:group-[]:text-[#fff]"
        >
            Gpio normal
        </label>
        <label
            for="wakeup-module"
            class="self-end rounded-r-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] peer-checked/module:group-[]:bg-[#0f6cbd] peer-checked/module:group-[]:text-[#fff]"
        >
            Gpio module
        </label>
    </div>
    <div class="group flex h-full w-full flex-col justify-center">
        <div
            class="my-3 ml-2 hidden items-center peer-checked/module:group-[]:flex"
        >
            <label for="" class="mr-3 text-xl">Name GPIO module</label>
            <select
                class="input-reset valid-input h-[24.5px] w-[200px] border bg-[#fff] px-4 py-1 text-xl outline-none"
                name="name_gpio"
                id=""
            >
                @foreach ($allRobots as $robot)
                <option value="{{ $robot->name_seri }}">
                    {{ $robot->name_seri }}
                </option>
                @endforeach
            </select>
        </div>
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio',
            [ 'type' => 'wakeup', ])
        </div>

        <div class="max-h-[calc(100%_-_80px)] flex-1 overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>

        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
        [ 'type' => 'wakeup', ])
    </div>
</div>
