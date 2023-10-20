<div
    class="marker-item flex hidden h-full w-full justify-between"
    data-type-marker="none_marker_dis"
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
            value="none_marker_dis"
            hidden
        />

        <div class="flex">
            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">Offset dis</label>
                <input
                    class="input-reset input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    step="0.01"
                    name="off_set_dis"
                    required
                />
            </div>
        </div>

        <div class="flex">
            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sx1</label>
                <input
                    class="offset-s-001 input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    value="0.01"
                    step="0.01"
                    required
                    name="sx1"
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sx2</label>
                <input
                    class="offset-s-001 input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    value="0.01"
                    step="0.01"
                    required
                    name="sx2"
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sy1</label>
                <input
                    class="offset-s-001 input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    value="0.01"
                    step="0.01"
                    required
                    name="sy1"
                />
            </div>

            <div class="mr-2 flex flex-col items-center">
                <label for="" class="text-xl">sy2</label>
                <input
                    class="offset-s-001 input-type-number w-[54px] px-4 py-1 text-xl"
                    type="text"
                    value="0.01"
                    step="0.01"
                    required
                    name="sy2"
                />
            </div>
        </div>
    </div>

    <div class="h-full w-1/2">
        <div
            class="marker-img h-full w-full max-w-[400px] self-center bg-contain bg-center bg-no-repeat"
            markerDir="l_marker_"
            style="
                background-image: url(&quot;/img/marker/none_marker_dis.png&quot;);
            "
        ></div>
    </div>

    {{--
    @include('frontend.blocks.mission.createMissions.functionTab.idMission')

    <button
        class="btn submit-btn-marker absolute right-0 bottom-0 self-end rounded-md bg-[#0f6cbd] px-4 py-2 text-xl text-[#fff] md:text-3xl"
    >
        Add
    </button>
    --}}
    {{-- @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'none_marker_dis']) --}}
</div>
