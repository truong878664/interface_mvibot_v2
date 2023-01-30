<div class="create-layer">

    <x-button tag="label" title="create layer" class="layer-btn" attribute="for=value-layer"></x-button>
    <input hidden type="checkbox" id="value-layer">
    <div class="value-layer">
        <input type="text" class="input-layer name_layer" placeholder="Name">
        <input type="text" class="input-layer point-layer-1">
        <input type="text" class="input-layer point-layer-2">
        <input type="text" class="input-layer point-layer-3">
        <select name="" id="" class="zone">
            <option value="dead_zone">dead_zone</option>
            <option value="lowspeed_zone">lowspeed_zone</option>
        </select>
        <x-button tag="button" title="Show layer" class="show-layer" attribute=""></x-button>
    </div>
    <form action="/add-layer" method="POST" class="save-layer-form">
        <input type="hidden" name='data_layer' class="data-layer" value="{{ $layers }}">
        <input type="hidden" name='map_active' value="{{ $mapActive }}">
        @csrf
        <x-button tag="button" title="Save layer" class="layer-btn" attribute=""></x-button>
    </form>
</div>
