<div class="h-full w-full flex flex-col bg-[#fff] p-4 relative" data-type="{{ $type }}"
    data-type-wake-stop-wrapper="{{ $type }}">
    <div class="flex mb-4 font-bold capitalize z-[2]">{{ $type }}</div>
    <div data-module="" class="flex group/module peer/module z-[2]">
        <button data-kind="normal" data-kind-button='changeModule' data-type="{{ $type }}"
            class=" ml-2 text-xl font-bold rounded-l-md px-4 py-1 bg-[#fff] text-[#000] self-end border border-[#000] group-data-[module='normal']/module:bg-[#0f6cbd] group-data-[module='normal']/module:text-[#fff]">
            Wake up normal
        </button>
        <button data-kind="module" data-kind-button='changeModule' data-type="{{ $type }}"
            class="text-xl font-bold rounded-r-md px-4 py-1 bg-[#fff] text-[#000] self-end border border-[#000] group-data-[module='module']/module:bg-[#0f6cbd] group-data-[module='module']/module:text-[#fff]">
            Wake up module
        </button>
    </div>
    <div
        class="absolute top-0 left-0 right-0 bottom-0 bg-white/80 z-[1] place-content-center hidden peer-data-[module='']/module:grid text-[30px]">
        <span>
            Select type {{ $type }}
        </span>
    </div>
    <div class="w-full h-full flex flex-col justify-center group/module">
        <div class="ml-2 items-center hidden my-3 peer-data-[module='module']/module:group-[]/module:flex">
            <label for="" class="text-xl mr-3">Name GPIO module</label>
            <select data-name-seri-module="{{ $type }}"
                class="w-[200px] text-xl px-4 py-1 outline-none h-[24.5px] border bg-[#fff] input-reset valid-input"
                name="name_gpio" id="">
                @foreach ($allRobots as $robot)
                    <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                @endforeach
            </select>
        </div>
        <div class="text-2xl mb-4 ml-2">
            <label for="not_set_out_{{ $type }}" class="flex items-center gap-4">
                <span>Not set out </span>
                <input id="not_set_out_{{ $type }}" type="checkbox" name="not_set_out">
            </label>
        </div>
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio', [
                'type' => $type,
            ])
        </div>
        <div class="flex-1 max-h-[calc(100%_-_80px)] overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>
        <div class="text-2xl font-bold">
            <div class="mt-4 absolute left-0 bottom-2 px-2 w-full flex justify-end">
                <button data-kind-button='save' data-type="{{ $type }}"
                    class="btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md">Save</button>
            </div>
        </div>
    </div>
</div>
