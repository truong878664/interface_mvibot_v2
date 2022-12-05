<link rel="stylesheet" href="/css/createPoint/form.css">
<div class="overlay"></div>
<form method="POST" action="{{ route('dashboard.missions.create-point') }}" class="form-create-point">
    <label for="form-create-point-checkbox" class="form-create-point-close"><i class="fa-solid fa-xmark"></i></label>

    <div class="name-point-wrapper form-item">
        <label for="name-point">Name point</label>
        <input id="name-point" type="text" class="point-input" name="name_position" required>
    </div>
    <div class="display-positon-wrapper">
        <div class="display-position-item">
            <span>x</span>
            <input class="display-positon display-positon-x" tabindex="-1" id="" type="text"
                value="0">
        </div>
        <div class="display-position-item">
            <span>y</span>
            <input class="display-positon display-positon-y" tabindex="-1" id="" type="text"
                value="0">
        </div>
        <div class="display-position-item">
            <span>z</span>
            <input class="display-positon display-rotate-z" tabindex="-1" id="" type="text" value="0">
        </div>
        <input type="text" name="x" class="x x-value" value="0" hidden>
        <input type="text" name="y" class="y y-value" value="0" hidden>
        <input type="text" name="z" class="z z-value" value="0" hidden>
        <input type="text" name="w" class="w w-value" value="0" hidden>
    </div>
    <div class="time-color-wrapper form-item">
        <div class="time-point-wrapper form-item">
            <label for="time-point">Time out</label>
            <input id="time-point" type="number" name="time_out" required>
        </div>

        <div class="color-point-wrapper form-item">
            <label for="color-point" class="color-point">color</label>
            <input id="color-point" type="color" name="color_position" value="#EA047E">
        </div>
    </div>

    <div class="mode-wrapper form-item">
        <label for="mode">Mode</label>
        <input id="mode" type="text" class="point-input" name="mode_position" required>
    </div>

    <div class="mode-child-wrapper form-item">
        <label for="mode-child">Mode child</label>
        <input id="mode-child" type="text" class="point-input" name="mode_child" required>
    </div>
    <input type="text" value={{ $mapActive }} name="map" hidden />
    <x-button tag="button" title="Save" class="save-point-btn" attribute=""></x-button>
    @csrf
</form>
