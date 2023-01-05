<input id="form-create-point-checkbox" type="checkbox" class="form-create-point-checkbox" hidden>
<div class="form-create-point-wrapper">
    <label for="form-create-point-checkbox" class="overlay"></label>
    <form class="form-create-point">
        <label for="form-create-point-checkbox" class="form-create-point-close"><i class="fa-solid fa-xmark"></i></label>
        <div class="mb-4">
            <label for="" class="text-2xl">Name point</label>
            <input required type="text" class="text-2xl px-4 py-1 input-submit" name="name_position">
        </div>

        <div class="display-positon-wrapper">
            <div class="flex items-center">
                <span class="mr-4 text-2xl">x</span>
                <input class="text-center w-[40px] bg-[#ccc] text-2xl display-positon-x" tabindex="-1" readonly
                    id="" type="text" value="0">
            </div>
            <div class="flex items-center">
                <span class="mr-4 text-2xl">y</span>
                <input class="text-center w-[40px] bg-[#ccc] text-2xl display-positon-y " tabindex="-1" readonly
                    id="" type="text" value="0">
            </div>
            <div class="flex items-center">
                <span class="mr-4 text-2xl">z</span>
                <input class="text-center w-[40px] bg-[#ccc] text-2xl display-rotate-z " tabindex="-1" readonly
                    id="" type="text" value="0">
            </div>
            <input type="text" name="x" class="x x-value-database" hidden>
            <input type="text" name="y" class="y y-value-database" hidden>
            <input type="text" name="z" class="z z-value-database" hidden>
            <input type="text" name="w" class="w w-value-database" hidden>
        </div>
        <div class="mb-4">
            <label for="" class="text-2xl">Color</label>
            <input required type="color" class="text-2xl w-[60px]" name="color_position" value="#EA047E">
        </div>

        <div class="mb-4">
            <label for="" class="text-2xl">Time out</label>
            <input required type="text" class="w-[60px] text-2xl px-4 py-1 time-out text-center" name="time_out"
                value="-1">
            <span class="text-xl text-red-500"></span>
        </div>

        <div class="mb-4">
            <label for="" class="text-2xl">Mode</label>
            <input required type="text" class="text-2xl px-4 py-1 input-submit" name="mode_position" value="normal">
        </div>


        <div class="mb-4">
            <label for="" class="text-2xl">Mode child</label>
            <input required type="text" class="text-2xl px-4 py-1 input-submit" name="mode_child" value="-1">
        </div>

        <input type="text" value={{ $mapActive }} name="map" hidden />
        <button
            class="text-xl md:text-3xl btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md point-submit-btn">Add</button>

    </form>
</div>
<script></script>
