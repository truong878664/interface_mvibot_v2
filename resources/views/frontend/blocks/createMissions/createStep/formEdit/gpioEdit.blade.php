<p class="heading-form-mission">GPIO</p>
<form method="POST" action="/dashboard/missions/update-gpio" class="gpio_form">
    <input type="text" hidden class="gpio-id" name="id">
    <div class="name-gpio">
        <label for="name-gpio">Name</label>
        <input required name="name_gpio" class="name-gpio-edit" id="name_gpio" type="text">
    </div>
    <div class="time-out">
        <label for="time-out"> Time out</label>
        <input name="time_out" class="time_out-edit" id="time_out" type="number">
    </div>
    <div class="data-gpio">
        <div class="data-gpio-item">
            <label for="out_set">out_set</label>
            <input type="text" name="out_set" class="out_set-edit" id="out_set">
        </div>
        <div class="data-gpio-item">
            <label for="out_reset">out_reset</label>
            <input type="text" name="out_reset" class="out_reset-edit" id="out_reset">
        </div>
        <div class="data-gpio-item">
            <label for="in_on">in_on</label>
            <input type="text" name="in_on" class="in_on-edit" id="in_on">
        </div>
        <div class="data-gpio-item">
            <label for="in_off">in_off</label>
            <input type="text" name="in_off" class="in_off-edit" id="in_off">
        </div>
        <div class="data-gpio-item">
            <label for="in_pullup">in_pullup</label>
            <input type="text" name="in_pullup" class="in_pullup-edit" id="in_pullup">
        </div>
        <div class="data-gpio-item">
            <label for="in_pulldown">in_pulldown</label>
            <input type="text" name="in_pulldown" class="in_pulldown-edit" id="in_pulldown">
        </div>
        @include('frontend.blocks.createMissions.createStep.function.idMission')
    </div>
    <x-button tag="button" title="Update" class="add-btn" attribute=""></x-button>
    @csrf
</form>
