<form method="POST" action="/dashboard/missions/create-sleep" class="hidden function-item">
    <div class="flex flex-col mb-4">
        <label for="" class="text-xl">Name Sleep</label>
        <input class="w-[200px] text-xl px-4 py-1" type="text" name="name_sleep" required>
    </div>


    <div class="flex flex-col">
        <label for="" class="text-xl">Time sleep</label>
        <div class="">
            <input class="w-[40px] text-xl px-4 py-1" type="number" name="time_sleep" required>
            <span class="text-xl">second</span>
        </div>
    </div>


    @include('frontend.blocks.mission.createMissions.functionTab.idMission')

    @csrf
    <button
        class="text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md">Add</button>


</form>
