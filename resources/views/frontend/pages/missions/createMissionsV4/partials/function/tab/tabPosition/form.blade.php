<input
    id="create-point-checkbox"
    type="checkbox"
    class="peer/create-point hidden"
/>
<div class="hidden peer-checked/create-point:block">
    <label
        for="create-point-checkbox"
        class="fixed top-0 left-0 right-0 bottom-0 bg-[#00000046]"
    ></label>
    <div class="form-create-point pb-5">
        <div class="mb-4">
            <label for="" class="text-2xl">Name point</label>
            <input
                required
                type="text"
                class="input-submit flex-1 px-4 py-1 text-2xl"
                name="name_position"
                autocomplete="off"
            />
        </div>

        <div class="display-positon-wrapper">
            <div class="flex items-center">
                <span class="mr-4 text-2xl">x</span>
                <input
                    class="display-positon-x w-[40px] bg-[#ccc] text-center text-2xl"
                    tabindex="-1"
                    readonly
                    id=""
                    type="text"
                    value="0"
                />
            </div>
            <div class="flex items-center">
                <span class="mr-4 text-2xl">y</span>
                <input
                    class="display-positon-y w-[40px] bg-[#ccc] text-center text-2xl"
                    tabindex="-1"
                    readonly
                    id=""
                    type="text"
                    value="0"
                />
            </div>
            <div class="flex items-center">
                <span class="mr-4 text-2xl">z</span>
                <input
                    class="display-rotate-z w-[40px] bg-[#ccc] text-center text-2xl"
                    tabindex="-1"
                    readonly
                    id=""
                    type="text"
                    value="0"
                />
            </div>
            <input type="text" name="x" class="x x-value-database" hidden />
            <input type="text" name="y" class="y y-value-database" hidden />
            <input type="text" name="z" class="z z-value-database" hidden />
            <input type="text" name="w" class="w w-value-database" hidden />
        </div>
        <div class="mb-4">
            <label for="" class="text-2xl">Color</label>
            <input
                required
                type="color"
                class="w-[60px] text-2xl"
                name="color_position"
                value="#EA047E"
            />
        </div>

        <div class="mb-4">
            <label for="" class="text-2xl">Time out</label>
            <input
                required
                type="text"
                class="time-out input-type-number time-out-position w-[60px] px-4 py-1 text-center text-2xl"
                name="time_out"
                value="-1"
            />
            <span class="text-xl text-red-500"></span>
        </div>

        <div class="mb-4 flex items-center">
            <label for="" class="text-2xl">Mode</label>
            <div class="ml-2">
                <select
                    name="mode_position"
                    class="input-submit border bg-[#fff] px-4 py-1 text-2xl outline-none"
                    id=""
                >
                    <option value="normal">Normal</option>
                    <option value="line_follow">Line follow</option>
                    <option value="other">other...</option>
                </select>
                <input
                    type="text"
                    data-mode-position=""
                    name="mode_position_other"
                    class="input-reset hidden w-[80px] px-4 py-1 text-2xl data-[mode-position=other]:inline-block"
                />
            </div>
        </div>

        <div class="mb-4">
            <label for="" class="text-2xl">Mode child</label>

            <input
                required
                type="text"
                class="input-submit w-[100px] px-4 py-1 text-2xl"
                name="mode_child"
                value="-1"
            />
        </div>

        <div class="relative h-[50px] w-full">
            <input type="text" value="" name="map" hidden />
            @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave',
            [ 'type' => 'position', ])
        </div>
    </div>
</div>
