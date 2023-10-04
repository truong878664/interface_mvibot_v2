<div class="h-full w-full flex flex-col bg-[#fff] p-4" data-type="wakeup">
    <div class="flex mb-4">
        <div class="w-full group">
            <div class="flex justify-between w-full">
                <div class="font-bold">Wake UP</div>
            </div>
        </div>
    </div>
    <input type="radio" name="wakeup-radio" id="wakeup-normal" hidden class="peer/normal" checked>
    <input type="radio" name="wakeup-radio" id="wakeup-module" hidden class="peer/module">
    <div class="flex group">
        <label for="wakeup-normal"
            class=" ml-2 text-xl font-bold rounded-l-md px-4 py-1 bg-[#fff] text-[#000] self-end border border-[#000] peer-checked/normal:group-[]:bg-[#0f6cbd] peer-checked/normal:group-[]:text-[#fff]">
            Wake up normal
        </label>
        <label for="wakeup-module"
            class="text-xl font-bold rounded-r-md px-4 py-1 bg-[#fff] text-[#000] self-end border border-[#000] peer-checked/module:group-[]:bg-[#0f6cbd] peer-checked/module:group-[]:text-[#fff]">
            Wake up module
        </label>
    </div>
    <div class="w-full h-full flex flex-col justify-center group">
        <div class="ml-2 items-center hidden my-3 peer-checked/module:group-[]:flex">
            <label for="" class="text-xl mr-3">Name GPIO module</label>
            <select class="w-[200px] text-xl px-4 py-1 outline-none h-[24.5px] border bg-[#fff] input-reset valid-input"
                name="name_gpio" id="">
                @foreach ($allRobots as $robot)
                    <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                @endforeach
            </select>
        </div>
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio', [
                'type' => 'wakeup',
            ])
        </div>

        <div class="flex-1 max-h-[calc(100%_-_80px)] overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>

        @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
            'type' => 'wakeup',
        ])

    </div>

</div>
