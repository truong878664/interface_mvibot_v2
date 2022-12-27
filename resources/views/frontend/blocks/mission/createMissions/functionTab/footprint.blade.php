<form class="h-full w-full flex flex-col function-item form-footprint">
    <div class="flex flex-col mr-[30px]">
        <label for="" class="text-xl">Name footpint</label>
        <input class="w-[200px] text-xl px-4 py-1" type="text" name="name_footprint" required>
    </div>
    <div class="flex w-full h-full">
        <div class="w-[22%]">
            <div class="mr-4 ">
                <label for="" class="text-xl">X1</label>
                <input required type="number" placeholder="mm"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm" step="0.01"
                    name="x1_footprint">
            </div>

            <div class="mr-4 ">
                <label for="" class="text-xl">X2</label>
                <input required type="number" placeholder="mm"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm" step="0.01"
                    name="x2_footprint">
            </div>

            <div class="mr-4 ">
                <label for="" class="text-xl">Y1</label>
                <input required type="number" placeholder="mm"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm" step="0.01"
                    name="y1_footprint">
            </div>

            <div class="mr-4">
                <label for="" class="text-xl">Y2</label>
                <input required type="number" placeholder="mm"
                    class="w-[40px] text-xl px-2 py-1 text-center placeholder:text-sm" step="0.01"
                    name="y2_footprint">
            </div>
            <div class="mr-4">
                <button
                    class="max-h-[24.5px] text-xl md:text-xl btn border-solid border-[1px] border-[#00000085] self-end px-4 py-1 rounded-md default-value-footprint">default
                    value</button>
            </div>

        </div>
        <div class="w-[78%] h-full flex justify-center">
            <div class="w-full h-full bg-contain bg-center bg-no-repeat max-w-[300px]"
                style="background-image:url('/img/footprint.png');"></div>
        </div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    <button
        class="text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md submit-btn-footprint">Add</button>
    @csrf
</form>
