<input id="create-point-checkbox" type="checkbox" class="peer/create-point hidden">
<div class="hidden peer-checked/create-point:block">
    <label for="create-point-checkbox" class="fixed top-0 left-0 right-0 bottom-0 bg-[#00000046]"></label>
    <div class="form-create-point pb-5">
        <div class="mb-4">
            <label for="" class="">Name point</label>
            <input required type="text" class=" px-4 py-1 flex-1 input-submit" name="name_position"
                autocomplete="off">
        </div>

        <div class="flex justify-between gap-2 mb-2">
            <div class="flex items-center">
                <span class="mr-4 ">x</span>
                <input class="text-center w-24 bg-[#ccc] py-1 display-positon-x" tabindex="-1" readonly id=""
                    type="text" value="0">
            </div>
            <div class="flex items-center">
                <span class="mr-4 ">y</span>
                <input class="text-center w-24 bg-[#ccc] py-1 display-positon-y " tabindex="-1" readonly id=""
                    type="text" value="0">
            </div>
            <div class="flex items-center">
                <span class="mr-4 ">z</span>
                <input class="text-center w-24 bg-[#ccc] py-1 display-rotate-z " tabindex="-1" readonly id=""
                    type="text" value="0">
            </div>
            <input type="text" name="x" class="x x-value-database" hidden>
            <input type="text" name="y" class="y y-value-database" hidden>
            <input type="text" name="z" class="z z-value-database" hidden>
            <input type="text" name="w" class="w w-value-database" hidden>
        </div>
        <div class="mb-4">
            <label for="" class="">Color</label>
            <input required type="color" class=" w-[60px]" name="color_position" value="#EA047E">
        </div>

        <div class="mb-4">
            <label for="" class="">Time out</label>
            <input required type="text"
                class="w-[60px]  px-4 py-1 time-out text-center input-type-number time-out-position" name="time_out"
                value="-1">
            <span class="text-xl text-red-500"></span>
        </div>

        <div class="mb-4 flex items-center">
            <label for="" class="">Mode</label>
            <div class="ml-2">
                <select name="mode_position" class=" px-4 py-1 input-submit bg-[#fff] border outline-none"
                    id="">
                    <option value="normal">Normal</option>
                    <option value="line_follow">Line follow</option>
                    <option value="other">other...</option>
                </select>
                <input type="text" data-mode-position="" name="mode_position_other"
                    class=" w-[80px] px-4 py-1 hidden data-[mode-position=other]:inline-block input-reset">
            </div>
        </div>

        <div class="mb-4">
            <label for="" class="">Mode child</label>

            <input required type="text" class=" px-4 py-1 input-submit w-[100px]" name="mode_child" value="-1">
        </div>

        <div class="relative w-full h-[50px]">
            <input type="text" value="" name="map" hidden />
            @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', [
                'type' => 'position',
            ])
        </div>

    </div>
</div>
