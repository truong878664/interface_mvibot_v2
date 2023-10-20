<div
    class="function-form-item form-footprint function-mission-tab flex hidden h-full w-full flex-col bg-[#fff] p-4"
    data-type="footprint"
>
    <div class="mr-[30px] flex flex-col">
        <label for="" class="text-xl">Name function footpint</label>
        <input
            class="input-reset valid-input w-[200px] px-4 py-1 text-xl"
            type="text"
            name="name_footprint"
            data-type="string"
            required
        />
    </div>
    <div class="flex h-[calc(100%_-_100px)] w-full">
        <div class="w-[22%]">
            <div class="mr-4">
                <label for="" class="text-xl">X1</label>
                <input
                    required
                    type="text"
                    placeholder="m"
                    data-type="number"
                    class="input-type-number input-reset w-[50px] px-2 py-1 text-center text-xl placeholder:text-xl"
                    step="0.01"
                    name="x1_footprint"
                    value=""
                />
            </div>

            <div class="mr-4">
                <label for="" class="text-xl">X2</label>
                <input
                    required
                    type="text"
                    placeholder="m"
                    data-type="number"
                    class="input-type-number input-reset w-[50px] px-2 py-1 text-center text-xl placeholder:text-xl"
                    step="0.01"
                    name="x2_footprint"
                    value=""
                />
            </div>

            <div class="mr-4">
                <label for="" class="text-xl">Y1</label>
                <input
                    required
                    type="text"
                    placeholder="m"
                    data-type="number"
                    class="input-type-number input-reset w-[50px] px-2 py-1 text-center text-xl placeholder:text-xl"
                    step="0.01"
                    name="y1_footprint"
                    value=""
                />
            </div>

            <div class="mr-4">
                <label for="" class="text-xl">Y2</label>
                <input
                    required
                    type="text"
                    placeholder="m"
                    data-type="number"
                    class="input-type-number input-reset w-[50px] px-2 py-1 text-center text-xl placeholder:text-xl"
                    step="0.01"
                    name="y2_footprint"
                    value=""
                />
            </div>
            <div class="mr-4">
                <button
                    class="btn default-value-footprint max-h-[24.5px] self-end rounded-md border-[1px] border-solid border-[#00000085] px-4 py-1 text-xl md:text-xl"
                >
                    default value
                </button>
            </div>
        </div>
        <div class="flex w-[78%] flex-1 justify-center">
            <div
                class="h-full w-full max-w-[300px] bg-contain bg-center bg-no-repeat"
                style="background-image: url(&quot;/img/footprint.png&quot;)"
            ></div>
        </div>
    </div>

    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
    [ 'type' => 'footprint', ])
</div>
