<input type="checkbox" name="" id="wake-up" class="input-checkbox" hidden>
<div class="select-robot-wrapper form-checkbox ">
    <input type="hidden" name="" id="current-wake-up" value="{{ $currentWakeUp }}">
    <label for="wake-up" class="overlay"></label>
    <div class="form-wrapper max-w-[800px] w-full" id="wake_up-wrapper">
        @includeIf('frontend.blocks.mission.createMissions.functionTab.gpio', [
            'type' => 'gpio_wake_up',
        ])

    </div>
</div>
<input type="checkbox" name="" id="stop" class="input-checkbox" hidden>
<div class="select-robot-wrapper form-checkbox">
    <input type="hidden" name="" id="current-stop" value="{{ $currentStop }}">
    <label for="stop" class="overlay"></label>
    <div class="form-wrapper max-w-[800px] w-full" id="stop-wrapper">
        @includeIf('frontend.blocks.mission.createMissions.functionTab.gpio', [
            'type' => 'gpio_stop',
        ])
    </div>
</div>