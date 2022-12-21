<form method="POST" action="/dashboard/missions/create-footprint" class="h-full w-full flex flex-col function-item">
    <div class="flex flex-col">
        <label for="" class="text-xl">Name footpint</label>
        <input class="w-[200px] text-xl px-4 py-1" type="text" name="name_footprint" required>
    </div>
    <div
        class="bg-[url('/public/img/footprint.png')] relative w-[50%] h-[10%] bg-contain bg-center bg-no-repeat self-center flex-1">
    </div>
    <div class="flex flex-col items-end absolute right-0 lg:right-[40px]">
        <div class="">
            <label for="" class="text-xl">front</label>
            <input required type="number" class="w-[40px] text-xl px-4 py-1" name="x1">
            <span class="text-xl">m</span>
        </div>

        <div class="">
            <label for="" class="text-xl">right</label>
            <input required type="number" class="w-[40px] text-xl px-4 py-1" name="y2">
            <span class="text-xl">m</span>
        </div>

        <div class="">
            <label for="" class="text-xl">left</label>
            <input required type="number" class="w-[40px] text-xl px-4 py-1" name="y1">
            <span class="text-xl">m</span>
        </div>

        <div class="">
            <label for="" class="text-xl">behind</label>
            <input required type="number" class="w-[40px] text-xl px-4 py-1" name="x2">
            <span class="text-xl">m</span>
        </div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    <button
        class="text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[var(--main-color)] text-[#fff] self-end px-4 py-2 rounded-md">Add</button>
    @csrf
</form>
