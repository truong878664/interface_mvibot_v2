<div class="function-form-item form-footprint function-mission-tab flex hidden h-full w-full flex-col bg-[#fff] p-4 gap-2"
    data-type="footprint">
    <div class="mr-[30px] flex flex-col">
        <label for="" class="">Name function footpint</label>
        <input class="input-reset valid-input w-[200px] px-4 py-1 " type="text" name="name_footprint" data-type="string"
            required />
    </div>
    <div class="flex h-[calc(100%_-_100px)] w-full text-sm gap-2">
        <div class="w-[22%] flex flex-col gap-2">
            <div class="mr-4">
                <label for="" class="">X1</label>
                <input required type="text" placeholder="m" data-type="number"
                    class="input-type-number input-reset w-24 px-2 py-1 text-center" step="0.01" name="x1_footprint"
                    value="" />
            </div>

            <div class="mr-4">
                <label for="" class="">X2</label>
                <input required type="text" placeholder="m" data-type="number"
                    class="input-type-number input-reset w-24 px-2 py-1 text-center" step="0.01" name="x2_footprint"
                    value="" />
            </div>

            <div class="mr-4">
                <label for="" class="">Y1</label>
                <input required type="text" placeholder="m" data-type="number"
                    class="input-type-number input-reset w-24 px-2 py-1 text-center" step="0.01" name="y1_footprint"
                    value="" />
            </div>

            <div class="mr-4">
                <label for="" class="">Y2</label>
                <input required type="text" placeholder="m" data-type="number"
                    class="input-type-number input-reset w-24 px-2 py-1 text-center" step="0.01" name="y2_footprint"
                    value="" />
            </div>
            <div class="mr-4">
                <button
                    class="btn text-base default-value-footprint self-end rounded-md border-[1px] border-solid border-[#00000085] px-4 py-1">
                    default value
                </button>
            </div>
        </div>
        <div class="flex w-[78%] flex-1 justify-center">
            <div class="h-full w-full max-w-[300px] bg-contain bg-center bg-no-repeat"
                style="background-image: url(&quot;/img/footprint.png&quot;)"></div>
        </div>
    </div>

    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'footprint',
    ])
</div>
