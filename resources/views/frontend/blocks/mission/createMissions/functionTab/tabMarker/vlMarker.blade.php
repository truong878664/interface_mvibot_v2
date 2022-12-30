<form class="flex h-full w-full justify-between hidden marker-item">
    <div class="w-1/2 ">
        <div class="flex items-stretch">
            <div class="flex flex-col mb-2">
                <label for="" class="text-xl">Name Marker</label>
                <input class="w-[100px] text-xl px-4 py-1" type="text" name="name_marker" required>
            </div>

            <div class="flex flex-col mb-2 ml-2">
                <label for="" class="text-xl">Type marker</label>
                <select name="marker_dir" class=" text-xl px-4 py-1 outline-none flex-1">
                    <option value="front_ward">Front ward</option>
                    <option value="back_ward">Back ward</option>
                </select>
            </div>
        </div>
        <input name="marker_type" class="input-offset" type="text" value="vl_marker" hidden>

        <div class="flex">

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">x1</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" step="0.01" name="off_set_x1" required>
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">x2</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" step="0.01" name="off_set_x2" required>
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">y1</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" step="0.01" name="off_set_y1" required>
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">y2</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" step="0.01" name="off_set_y2" required>
            </div>

        </div>

        <div class="flex">

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sx1</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" value="0.01" step="0.01" required
                    name="sx1">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sx2</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" value="0.01" step="0.01" required
                    name="sx2">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sy1</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" value="0.01" step="0.01" required
                    name="sy1">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sy2</label>
                <input class="w-[54px] text-xl px-4 py-1" type="number" value="0.01" step="0.01" required
                    name="sy2">
            </div>

        </div>
    </div>

    <div class="w-1/2 h-full ">
        <div class="h-full w-full max-w-[400px] bg-contain bg-no-repeat self-center bg-center marker-img"
            markerDir="vl_marker_" style="background-image: url('/img/marker/vl_marker_front_ward.png')"></div>
    </div>

    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    <button
        class="text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md submit-btn-marker">Add</button>

</form>
