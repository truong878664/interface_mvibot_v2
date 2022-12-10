<p class="heading-form-mission">GPIO</p>
<form method="POST" action="/dashboard/missions/create-gpio" class="gpio_form">
    <div class="input-gpio-wrapper">
        <label for="name-gpio" class="label-gpio">Name</label>
        <input required name="name_gpio" id="name_gpio" type="text">
    </div>
    <div class="input-gpio-wrapper">
        <label for="time-out" class="label-gpio"> Time out</label>
        <input name="time_out" id="time_out" type="number">
    </div>
    <div class="data-gpio">
        @php
            $gpios = ['out_set', 'out_reset', 'in_on', 'in_off', 'in_pullup', 'in_pulldown'];
        @endphp
        @foreach ($gpios as $gpio)
            @include('frontend.blocks.mission.createMissions.createStep.function.dataGpioItem', [
                'name_gpio_item' => $gpio,
            ])
        @endforeach
    </div>
    @include('frontend.blocks.mission.createMissions.createStep.function.idMission')
    <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>
    @csrf
</form>
<script src="/js/missions/gpio.js"></script>
