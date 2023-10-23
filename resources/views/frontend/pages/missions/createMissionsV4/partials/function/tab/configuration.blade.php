<div
    class="relative flex h-full w-full flex-col bg-[#fff] p-4"
    data-type="{{ $type }}"
    data-type-wake-stop-wrapper="{{ $type }}"
>
    <div class="z-[2] mb-4 flex font-bold capitalize">{{ $type }}</div>
    <div
        data-module=""
        data-type="{{ $type }}"
        class="group/module peer/module z-[2] ml-2 inline-flex w-fit rounded-md shadow-sm ring-red-300 data-[module='']:animate-bounce data-[module='']:ring-4"
    >
        <button
            data-kind="normal"
            data-kind-button="changeModule"
            data-type="{{ $type }}"
            class="self-end rounded-l-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] group-data-[module='normal']/module:bg-[#0f6cbd] group-data-[module='normal']/module:text-[#fff]"
        >
            Gpio normal
        </button>
        <button
            data-kind="module"
            data-kind-button="changeModule"
            data-type="{{ $type }}"
            class="self-end rounded-r-md border border-[#000] bg-[#fff] px-4 py-1 text-xl font-bold text-[#000] group-data-[module='module']/module:bg-[#0f6cbd] group-data-[module='module']/module:text-[#fff]"
        >
            Gpio module
        </button>
    </div>
    <div
        class="absolute top-0 left-0 right-0 bottom-0 z-[1] hidden place-content-center bg-white/80 text-[20px] peer-data-[module='']/module:grid"
    ></div>
    {{-- <span> Select type {{ $type }} </span> --}}
    <div class="group/module flex h-full w-full flex-col justify-center">
        <div
            class="my-3 ml-2 hidden items-center peer-data-[module='module']/module:group-[]/module:flex"
        >
            <label for="" class="mr-3 text-2xl">Name GPIO module</label>
            <select
                data-name-seri-module="{{ $type }}"
                class="input-reset valid-input h-[24.5px] w-[200px] border bg-[#fff] px-4 py-1 text-2xl outline-none"
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
        <div class="mb-4 ml-2 text-2xl">
            <label
                for="not_set_out_{{ $type }}"
                class="inline-flex items-center gap-4"
            >
                <span>Not set out </span>
                <input
                    id="not_set_out_{{ $type }}"
                    type="checkbox"
                    name="not_set_out"
                    class="h-6 w-6 rounded-md text-red-400 focus:outline-red-400"
                />
            </label>
        </div>
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio',
            [ 'type' => $type, ])
        </div>
        <div class="max-h-[calc(100%_-_80px)] flex-1 overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>
        <div class="text-2xl font-bold">
            <div
                class="absolute left-0 bottom-2 mt-4 flex w-full justify-end px-2"
            >
                <button
                    data-kind-button="save"
                    data-type="{{ $type }}"
                    class="btn self-end rounded-md bg-[#0f6cbd] px-4 py-2 text-[#fff]"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
