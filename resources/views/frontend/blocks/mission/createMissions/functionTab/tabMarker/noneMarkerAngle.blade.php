<div class="flex h-full w-full justify-between hidden marker-item">
    <div class="w-1/2 ">
        <div class="flex items-stretch">
            <div class="flex flex-col mb-2">
                <label for="" class="text-xl">Name function Marker</label>
                <input class=" input-reset w-[100px] text-xl px-4 py-1 valid-input" type="text" name="name_marker"
                    required>
            </div>
        </div>
        <input name="marker_type" class="input-offset" type="text" value="none_marker_angle" hidden>

        <div class="flex">

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">Offset angle</label>
                <input class=" input-reset w-[54px] text-xl px-4 py-1 input-type-number" type="text" step="0.01"
                    name="off_set_angle" required>
            </div>

        </div>

        <div class="flex">

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sx1</label>
                <input class="w-[54px] text-xl px-4 py-1 offset-s-001 input-type-number" type="text" required
                    value="0.01" step="0.01" name="sx1">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sx2</label>
                <input class="w-[54px] text-xl px-4 py-1 offset-s-001 input-type-number" type="text" required
                    value="0.01" step="0.01" name="sx2">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sy1</label>
                <input class="w-[54px] text-xl px-4 py-1 offset-s-001 input-type-number" type="text" required
                    value="0.01" step="0.01" name="sy1">
            </div>

            <div class="flex flex-col mr-2 items-center">
                <label for="" class="text-xl">sy2</label>
                <input class="w-[54px] text-xl px-4 py-1 offset-s-001 input-type-number" type="text" required
                    value="0.01" step="0.01" name="sy2">
            </div>

        </div>
    </div>

    <div class="w-1/2 h-full ">
        <div class="h-full w-full max-w-[400px] bg-contain bg-no-repeat self-center bg-center marker-img"
            markerDir="l_marker_" style="background-image: url('/img/marker/none_marker_angle.png')"></div>
    </div>

    {{-- @include('frontend.blocks.mission.createMissions.functionTab.idMission')

    <button
        class="text-xl md:text-3xl absolute right-0 bottom-0 btn bg-[#0f6cbd] text-[#fff] self-end px-4 py-2 rounded-md submit-btn-marker">Add</button> --}}
    {{-- @include('frontend.blocks.mission.createMissions.functionTab.buttonSave', ['type' => 'none_marker_angle']) --}}

</div>
