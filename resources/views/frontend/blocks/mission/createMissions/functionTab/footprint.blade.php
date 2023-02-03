<div class="h-full w-full flex flex-col function-item hidden form-footprin">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name footpint</label>
        <input class="w-[200px] text-xl px-4 py-1 input-reset" type="text" name="name_footprint" required>
    </div>
    <div class="flex w-full h-[calc(100%_-_100px)] ">
        <div class="w-[22%]">
            <div class="mr-4 ">
                <label for="" class="text-xl">X1</label>
                <input required type="text" placeholder="m"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm input-reset" step="0.01"
                    name="x1_footprint" value="">
            </div>

            <div class="mr-4 ">
                <label for="" class="text-xl">X2</label>
                <input required type="text" placeholder="m"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm input-reset" step="0.01"
                    name="x2_footprint" value="">
            </div>

            <div class="mr-4 ">
                <label for="" class="text-xl">Y1</label>
                <input required type="text" placeholder="m"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm input-reset" step="0.01"
                    name="y1_footprint" value="">
            </div>

            <div class="mr-4">
                <label for="" class="text-xl">Y2</label>
                <input required type="text" placeholder="m"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm input-reset" step="0.01"
                    name="y2_footprint" value="">
            </div>
            <div class="mr-4">
                <button
                    class="max-h-[24.5px] text-xl md:text-xl btn border-solid border-[1px] border-[#00000085] self-end px-4 py-1 rounded-md default-value-footprint">default
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
