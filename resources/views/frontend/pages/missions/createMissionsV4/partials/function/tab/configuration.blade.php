<div class="relative flex h-full w-full flex-col bg-white p-4" data-type="{{ $type }}"
    data-type-wake-stop-wrapper="{{ $type }}">
    <div class="z-[2] mb-2 flex font-bold capitalize">{{ $type }}</div>
    <div data-module="" data-type="{{ $type }}"
        class="group/module peer/module z-[2] ml-2 inline-flex w-fit rounded-md shadow-sm ring-red-300 data-[module='']:animate-bounce data-[module='']:ring-4">
        <button data-kind="normal" data-kind-button="changeModule" data-type="{{ $type }}"
            class="self-end rounded-l-md border border-black bg-white px-4 py-1 font-bold text-black text-sm group-data-[module='normal']/module:bg-main group-data-[module='normal']/module:text-white">
            Gpio normal
        </button>
        <button data-kind="module" data-kind-button="changeModule" data-type="{{ $type }}"
            class="self-end rounded-r-md border border-black bg-white px-4 py-1 font-bold text-black text-sm group-data-[module='module']/module:bg-main group-data-[module='module']/module:text-white">
            Gpio module
        </button>
    </div>
    <div
        class="absolute bottom-0 left-0 right-0 top-0 z-[1] hidden place-content-center bg-white/80 text-[20px] peer-data-[module='']/module:grid">
    </div>
    {{-- <span> Select type {{ $type }} </span> --}}
    <div class="group/module flex h-full w-full flex-col justify-center">
        <div class="my-3 ml-2 hidden items-center peer-data-[module='module']/module:group-[]/module:flex">
            <label for="" class="mr-3">Name GPIO module</label>
            <select data-name-seri-module="{{ $type }}"
                class="input-reset valid-input w-[200px] border bg-white px-4 py-1 outline-none" name="name_gpio">
                @foreach ($allRobots as $robot)
                    <option value="{{ $robot->name_seri }}">
                        {{ $robot->name_seri }}
                    </option>
                @endforeach
            </select>
        </div>
        <div class="mb-2 ml-2">
            <label for="not_set_out_{{ $type }}" class="inline-flex items-center gap-4">
                <span>Not set out </span>
                <input id="not_set_out_{{ $type }}" type="checkbox" name="not_set_out"
                    class="h-4 w-4 rounded text-red-400 focus:outline-red-400" />
            </label>
        </div>
        <div class="">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.kindGpio', [
                'type' => $type,
            ])
        </div>
        <div class="max-h-[calc(100%_-_80px)] flex-1 overflow-hidden">
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.tabGpio.board')
        </div>
        <div class="font-bold">
            <div class="absolute bottom-2 left-0 mt-4 flex w-full justify-end px-2">
                <button data-kind-button="save" data-type="{{ $type }}"
                    class="btn self-end rounded-md bg-main px-4 py-2 text-white">
                    Save
                </button>
            </div>
        </div>
    </div>
</div>
