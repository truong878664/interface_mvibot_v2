<div
    class="marker-item flex hidden h-full w-full justify-between"
    data-type-marker="bar_marker"
>
    <div class="w-1/2">
        <div class="flex items-stretch gap-4">
            <div class="mb-2 flex flex-col">
                <label for="" class="text-xl">Name function Marker</label>
                <input
                    class="input-reset valid-input w-[100px] px-4 py-1 text-xl"
                    type="text"
                    name="name_marker"
                    required
                />
            </div>

            <div class="mb-2 ml-2 flex flex-col">
                <label for="" class="text-xl">Type marker</label>
                <select
                    name="marker_dir"
                    class="flex-1 px-4 py-1 text-xl outline-none"
                >
                    <option value="front_ward">Front ward</option>
                    <option value="back_ward">Back ward</option>
                </select>
            </div>
            <div class="ml-2 flex flex-col">
                <label for="" class="text-xl">Time out</label>
                <input
                    class="time_out_gpio_module input-type-number w-[40px] px-2 py-1 text-center text-xl"
                    type="text"
                    name="time_out"
                    value="-1"
                    required=""
                />
            </div>
        </div>
        <input
            name="marker_type"
            class="input-offset"
            type="text"
            value="bar_marker"
            hidden
        />

        <div class="flex">
            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">x1</label>
                <input
                    class="input-reset input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    step="0.01"
                    name="off_set_x1"
                    required
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">x2</label>
                <input
                    class="input-reset input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    step="0.01"
                    name="off_set_x2"
                    required
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">y1</label>
                <input
                    class="input-reset input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    step="0.01"
                    name="off_set_y1"
                    required
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">y2</label>
                <input
                    class="input-reset input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    step="0.01"
                    name="off_set_y2"
                    required
                />
            </div>
        </div>

        <div class="flex">
            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sx1</label>
                <input
                    class="input-type-number offset-s-001 w-[54px] px-4 py-1 text-xl"
                    value="0.01"
                    step="0.01"
                    required
                    type="text"
                    name="sx1"
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sx2</label>
                <input
                    class="input-type-number offset-s-001 w-[54px] px-4 py-1 text-xl"
                    value="0.01"
                    step="0.01"
                    required
                    type="text"
                    name="sx2"
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sy1</label>
                <input
                    class="input-type-number offset-s-001 w-[54px] px-4 py-1 text-xl"
                    value="0.01"
                    step="0.01"
                    required
                    type="text"
                    name="sy1"
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sy2</label>
                <input
                    class="input-type-number offset-s-001 w-[54px] px-4 py-1 text-xl"
                    value="0.01"
                    step="0.01"
                    required
                    type="text"
                    name="sy2"
                />
            </div>
        </div>
    </div>

    <div class="h-full w-1/2">
        <div
            class="marker-img h-full w-full max-w-[400px] self-center bg-contain bg-center bg-no-repeat"
            markerDir="bar_marker_"
            style="
                background-image: url(&quot;/img/marker/bar_marker_front_ward.png&quot;);
            "
        ></div>
    </div>

    {{-- @include('frontend.blocks.mission.createMissions.functionTab.idMission') --}}

    {{-- @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'bar_marker']) --}}
</div>
