<div class="h-full w-full flex flex-col function-item form-footprint function-mission-tab hidden bg-[#fff] p-4"
    data-type="footprint">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="">Name function footpint</label>
        <input class="w-[200px] mb-2 px-4 py-1 input-reset valid-input" type="text" name="name_footprint" required>
    </div>
    <div class="flex w-full h-[calc(100%_-_100px)] ">
        <div class="w-[22%] flex flex-col gap-2">
            <div class="">
                <label for="" class="">X1</label>
                <input required type="text" placeholder="m"
                    class="w-24  px-2 py-1 text-center placeholder:text-sm input-type-number input-reset" step="0.01"
                    name="x1_footprint" value="">
            </div>

            <div class=" ">
                <label for="" class="">X2</label>
                <input required type="text" placeholder="m"
                    class="w-24  px-2 py-1 text-center placeholder:text-sm input-type-number input-reset" step="0.01"
                    name="x2_footprint" value="">
            </div>

            <div class=" ">
                <label for="" class="">Y1</label>
                <input required type="text" placeholder="m"
                    class="w-24  px-2 py-1 text-center placeholder:text-sm input-type-number input-reset" step="0.01"
                    name="y1_footprint" value="">
            </div>

            <div class="">
                <label for="" class="">Y2</label>
                <input required type="text" placeholder="m"
                    class="w-24  px-2 py-1 text-center placeholder:text-sm input-type-number input-reset" step="0.01"
                    name="y2_footprint" value="">
            </div>
            <div class="">
                <button
                    class="btn border-solid border border-black/80 self-end px-4 py-1 rounded-md default-value-footprint">default
                    value</button>
            </div>

        </div>
        <div class="w-[78%] flex-1 flex justify-center">
            <div class="w-full h-full bg-contain bg-center bg-no-repeat max-w-[300px]"
                style="background-image:url('/img/footprint.png');"></div>
        </div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'footprint'])
</div>
