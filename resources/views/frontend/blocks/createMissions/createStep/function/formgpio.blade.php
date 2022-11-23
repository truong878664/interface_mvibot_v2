<p class="heading-form-mission">GPIO</p>
{{-- <form method="post" action="{{route()}}" class="gpio_form"> --}}

<form method="POST" action="/dashboard/missions/create-gpio" class="gpio_form">
    <div class="name-gpio">
        <label for="name-gpio">Name</label>
        <input required name="name_gpio" id="name_gpio" type="text">
    </div>
    <div class="time-out">
        <label for="time-out"> Time out</label>
        <input name="time_out" id="time_out" type="number">
    </div>
    <div class="data-gpio">
        <div class="data-gpio-item">
            <label for="out_set">out_set</label>
            <input type="text" name="out_set" id="out_set">
        </div>
        <div class="data-gpio-item">
            <label for="out_reset">out_reset</label>
            <input type="text" name="out_reset" id="out_reset">
        </div>
        <div class="data-gpio-item">
            <label for="in_on">in_on</label>
            <input type="text" name="in_on" id="in_on">
        </div>
        <div class="data-gpio-item">
            <label for="in_off">in_off</label>
            <input type="text" name="in_off" id="in_off">
        </div>
        <div class="data-gpio-item">
            <label for="in_pullup">in_pullup</label>
            <input type="text" name="in_pullup" id="in_pullup">
        </div>
        <div class="data-gpio-item">
            <label for="in_pulldown">in_pulldown</label>
            <input type="text" name="in_pulldown" id="in_pulldown">
        </div>
        @include('frontend.blocks.createMissions.createStep.function.idMission')
    </div>
    <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>

    @csrf
</form>
