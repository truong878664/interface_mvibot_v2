<form class="flex h-full w-full justify-between hidden marker-item" action="/dashboard/missions/create-marker"
    method="POST">
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
        <input name="marker_type" class="input-offset" type="text" value="bar_marker" hidden>

        <div class="flex">

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">x1</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="off_set_x1" required>
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">x2</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="off_set_x2" required>
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">y1</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="off_set_y1" required>
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">y2</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="off_set_y2" required>
            </div>

        </div>

        <div class="flex">

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sx1</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sx2</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sy1</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sy2</label>
                <input class="w-[46px] text-xl px-4 py-1" type="text" name="">
            </div>

        </div>
    </div>
    <div class="w-1/2 h-full bg-contain bg-no-repeat self-center bg-center" markerDir="bar_marker_"
        style="background-image: url('/img/marker/bar_marker_front_ward.png')">
    </div>
    @include('frontend.blocks.mission.createMissions.functionTab.idMission')

    @csrf
    <button
        class="text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[var(--main-color)] text-[#fff] self-end px-4 py-2 rounded-md">Add</button>

</form>
