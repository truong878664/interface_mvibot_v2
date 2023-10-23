<input id="create-point-checkbox" type="checkbox" class="peer/create-point hidden" />
<div class="hidden peer-checked/create-point:block">
    <label for="create-point-checkbox" class="fixed top-0 left-0 right-0 bottom-0 bg-[#00000046]"></label>
    <div class="form-create-point gap-4">
        <div class="">
            <label for="" class="">Name point</label>
            <input required type="text" class="input-submit flex-1 px-4 py-1 " name="name_position"
                autocomplete="off" />
        </div>

        <div class="display-positon-wrappe flex justify-between">
            <input type="text" name="x" class="x x-value-database sr-only" />
            <input type="text" name="y" class="y y-value-database sr-only" />
            <input type="text" name="z" class="z z-value-database sr-only" />
            <input type="text" name="w" class="w w-value-database sr-only" />
            <div class="flex items-center">
                <span class="mr-4 ">x</span>
                <input class="display-positon-x w-20 py-0 bg-[#ccc] text-center " tabindex="-1" readonly id=""
                    type="text" value="0" />
            </div>
            <div class="flex items-center">
                <span class="mr-4 ">y</span>
                <input class="display-positon-y w-20 py-0 bg-[#ccc] text-center " tabindex="-1" readonly id=""
                    type="text" value="0" />
            </div>
            <div class="flex items-center">
                <span class="mr-4 ">z</span>
                <input class="display-rotate-z w-20 py-0 bg-[#ccc] text-center " tabindex="-1" readonly id=""
                    type="text" value="0" />
            </div>
        </div>
        <div class="">
            <label for="" class="">Color</label>
            <input required type="color" class="w-24 " name="color_position" value="#EA047E" />
        </div>

        <div class="">
            <label for="" class="">Time out</label>
            <input required type="text"
                class="time-out input-type-number time-out-position w-24 px-4 py-1 text-center " name="time_out"
                value="-1" />
            <span class="text-xl text-red-500"></span>
        </div>

        <div class=" flex items-center">
            <label for="" class="">Mode</label>
            <div class="ml-2">
                <select name="mode_position" class="input-submit border bg-[#fff] px-4 py-1  outline-none"
                    id="">
                    <option value="normal">Normal</option>
                    <option value="line_follow">Line follow</option>
                    <option value="other">other...</option>
                </select>
                <input type="text" data-mode-position="" name="mode_position_other"
                    class="input-reset hidden w-[80px] px-4 py-1  data-[mode-position=other]:inline-block" />
            </div>
        </div>

        <div class="mb-4">
            <label for="" class="">Mode child</label>

            <input required type="text" class="input-submit w-[100px] px-4 py-1 " name="mode_child" value="-1" />
        </div>

        <div class="relative h-[50px] w-full">
            <input type="text" value="" name="map" hidden />
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
                'type' => 'position',
            ])
        </div>
    </div>
</div>
