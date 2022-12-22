<form method="POST" action="/dashboard/missions/create-footprint"
    class="h-full w-full flex flex-col function-item form-footprint">
    <div class="flex">

        <div class="flex flex-col mr-[30px]">
            <label for="" class="text-xl">Name footpint</label>
            <input class="w-[200px] text-xl px-4 py-1 " type="text" name="name_footprint" required>
        </div>

        <div class="flex">
            <div class="mr-4">
                <label for="" class="text-xl">X1</label>
                <input required type="number" class="w-[40px] text-xl px-4 py-1" step="0.01" name="x1">
                <span class="text-xl">m</span>
            </div>

            <div class="mr-4">
                <span class="font-[300] text-[#ccc]">|</span>
                <label for="" class="text-xl">X2</label>
                <input required type="number" class="w-[40px] text-xl px-4 py-1" step="0.01" name="x2">
                <span class="text-xl">m</span>
            </div>

            <div class="mr-4">
                <span class="font-[300] text-[#ccc]">|</span>
                <label for="" class="text-xl">Y1</label>
                <input required type="number" class="w-[40px] text-xl px-4 py-1" step="0.01" name="y1">
                <span class="text-xl">m</span>
            </div>

            <div class="mr-4">
                <span class="font-[300] text-[#ccc]">|</span>
                <label for="" class="text-xl">Y2</label>
                <input required type="number" class="w-[40px] text-xl px-4 py-1" step="0.01" name="y2">
                <span class="text-xl">m</span>
            </div>
        </div>
    </div>
    <div class=" relative w-[50%] h-[10%] bg-contain bg-center bg-no-repeat self-center flex-1"
        style="background-image:url('/img/footprint.png');">

    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    <button
        class="text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md submit-btn-footprint">Add</button>
    @csrf
</form>
