<form method="POST" action="/dashboard/missions/create-gpio " class="hidden function-item">
    <div class="flex">
        <div class="flex flex-col">
            <label for="" class="text-xl">Name GPIO</label>
            <input class="w-[200px] text-xl px-4 py-1 name_gpio" type="text" name="name_gpio" required>
        </div>

        <div class="flex flex-col ml-2">
            <label for="" class="text-xl">Time out</label>
            <input class="w-[200px] text-xl px-4 py-1 time_out_gpio" type="text" name="time_out" required>
        </div>
    </div>

    <div class="flex flex-wrap mt-5">
        @php
            $gpios = ['out_set', 'out_reset', 'in_on', 'in_off', 'in_pullup', 'in_pulldown'];
        @endphp
        @foreach ($gpios as $gpio)
            @include('frontend.blocks.mission.createMissions.functionTab.dataGpioItem', [
                'name_gpio_item' => $gpio,
                'type' => 'gpio',
            ])
        @endforeach
    </div>
    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    <button
        class="submit-btn-gpio text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md">Add</button>

    @csrf
</form>
