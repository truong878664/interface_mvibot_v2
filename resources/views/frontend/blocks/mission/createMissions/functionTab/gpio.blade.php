<form class="hidden function-item h-full flex flex-col">
    <div class="flex">
        <div class="flex flex-col">
            <label for="" class="text-xl">Name GPIO</label>
            <input class="w-[200px] text-xl px-4 py-1 name_gpio" type="text" name="name_gpio" required>
        </div>

        <div class="flex flex-col ml-2">
            <label for="" class="text-xl">Time out</label>
            <input class="w-[40px] text-xl px-2 py-1 time_out_gpio text-center" type="number" name="time_out"
                value="-1" required>
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
    <div class="flex justify-center items-center overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 2400 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
            @include('frontend.blocks.imgGpio')
        </svg>
    </div>

    {{-- @include('frontend.blocks.mission.createMissions.functionTab.idMission') --}}
    <button
        class="submit-btn-gpio text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md">Add</button>

</form>
