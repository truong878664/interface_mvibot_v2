<div class="absolute bottom-0 left-0 w-full  bg-[#fffff03c] flex justify-between data-[type-position=show]:hidden"
    data-type-position="">
    <div class="mission-point-control-item positon-x position">
        <div class="">

            <input id="inx" type="number"
                class="border-none w-[80px] text-center py-1 mb-2 text-2xl number-position-x" min="-10.24" max="22.66"
                step="0.05" value="0">
        </div>
        <input id="position-x" type="range" class="input-control" name="" value="0" min="-10.24"
            max="22.66" step="0.05">
        <p class="text-2xl ">Positon X</p>
    </div>
    <div class="mission-point-control-item positon-y position">
        <div class="">

            <input id="iny" type="number"
                class="border-none w-[80px] text-center py-1 mb-2 text-2xl number-position-y" min="-10.24"
                max="22.66" step="0.05" value="0">
        </div>
        <input id="position-y" type="range" class="input-control" name="" value="0" min="-10.24"
            max="22.66" step="0.05">
        <p class="text-2xl ">Positon Y</p>
    </div>
    <div class="mission-point-control-item rotate-z position">
        <div class="">
            <input id="" type="number"
                class="border-none w-[80px] text-center py-1 mb-2 text-2xl number-rotate-z" min="-180"
                max="180" step="0.05" value="0">
            <span class="text-2xl">deg</span>
        </div>
        <input id="rotate-z" type="range" class="input-control" name="" value="0" min="-180"
            max="180" step="1">
        <p class="text-2xl ">Rotate Z</p>
    </div>
    <div class="flex items-end">
        <label for="create-point-checkbox"
            class="mb-2 text-2xl font-bold rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn create-point-btn">Create</label>
    </div>
</div>
