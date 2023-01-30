<div class="mission-point-control">
    <div class="mission-point-control-item positon-x position">
        <input id="inx" type="number" class="input-value number-position-x" min="-10.24" max="22.66"
            step="0.05" value="0">
        <input id="position-x" type="range" class="input-control" name="" value="0" min="-10.24"
            max="22.66" step="0.05">
        <p>Positon X</p>
    </div>

    <div class="mission-point-control-item positon-y position">
        <input id="iny" type="number" class="input-value number-position-y" min="-10.24" max="22.66"
            step="0.05" value="0">
        <input id="position-y" type="range" class="input-control" name="" value="0" min="-10.24"
            max="22.66" step="0.05">
        <p>Positon Y</p>
    </div>

    <div class="mission-point-control-item rotate-z position">
        <div class="number-rotate-z-wrapper">
            <input id="" type="number" class="input-value number-rotate-z" min="-180" max="180"
                step="0.05" value="0">
            <span class="deg-unit">deg</span>
        </div>
        <input id="rotate-z" type="range" class="input-control" name="" value="0" min="-180"
            max="180" step="1">
        <p>Rotate Z</p>
    </div>
    {{-- <x-button tag="label" title="Create" class="create-point-btn" attribute="for=form-create-point-checkbox">
    </x-button> --}}
    <label for="form-create-point-checkbox"
        class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-[#0f6cbd] text-[#fff] mx-2 btn create-point-btn">Send</label>

</div>
