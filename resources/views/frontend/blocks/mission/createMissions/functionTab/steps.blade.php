<div class="h-full flex">
    <div class="steps-wrapper"></div>
    <div class="submit-btn-wrapper flex flex-col justify-between">
        <form class="form-submit-steps" action="/dashboard/missions/update-step-missions-name" method="POST">
            <input type="text" value="{{ $itemRender->id }}" name="id_mission" hidden>
            <input id="input-steps-name-submit" type="text" value="" name="steps_mission_name" hidden>
            <button for="select-robot"
                class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-[var(--main-color)] text-[#fff] mx-2 btn">Save</button>

            @csrf
        </form>
        <div class="form-submit-steps ">
            <input id="input-steps-name-submit" type="text" value="" name="" hidden>
            <label for="wake-up"
                class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-green-500 text-[#fff] mx-2 btn">Wake
                up</label>

            <label for="stop"
                class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-red-500 text-[#fff] mx-2 btn">Stop</label>

            <label for="select-robot"
                class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-[var(--main-color)] text-[#fff] mx-2 btn ">Send</label>
        </div>
        <input type="checkbox" name="" id="select-robot" class="input-checkbox" hidden>
        <div class="select-robot-wrapper form-checkbox">
            <label for="select-robot" class="overlay"></label>
            <div class="select-robot form-wrapper">
                <select id="select-robot-option">
                    <option>Choose Robot</option>
                    @foreach ($allRobot as $robot)
                        <option>{{ $robot['name_seri'] }}</option>
                    @endforeach
                </select>
                <label for="select-robot"
                    class="mb-2 text-xl md:text-3xl rounded-md px-4 py-2 bg-[var(--main-color)] text-[#fff] mx-2 btn send-mission-btn">Send</label>
            </div>
        </div>
    </div>

    <input type="checkbox" name="" id="wake-up" class="input-checkbox" hidden>
    <div class="select-robot-wrapper form-checkbox ">
        <label for="wake-up" class="overlay"></label>
        <div class="form-wrapper w-[500px]">
            <strong>Wake Up</strong>
            <div class="flex flex-wrap justify-between">
                @php
                    $gpios = ['out_set', 'out_reset', 'in_on', 'in_off', 'in_pullup', 'in_pulldown'];
                @endphp
                @foreach ($gpios as $gpio)
                    @include('frontend.blocks.mission.createMissions.functionTab.dataGpioItem', [
                        'name_gpio_item' => $gpio,
                        'type' => 'wake_up',
                    ])
                @endforeach
            </div>
            <label for="wake-up"
                class="text-xl md:text-3xl btn bg-[var(--main-color)] text-[#fff] self-end px-4 py-2 rounded-md">Ok</label>
            <script type="module" src="/js/missions/gpio.js"></script>
        </div>
    </div>
</div>

<input type="checkbox" name="" id="stop" class="input-checkbox" hidden>
<div class="select-robot-wrapper form-checkbox">
    <label for="stop" class="overlay"></label>
    <div class="form-wrapper w-[500px]">
        <strong>Stop</strong>
        <div class="flex flex-wrap justify-between">
            @php
                $gpios = ['out_set', 'out_reset', 'in_on', 'in_off', 'in_pullup', 'in_pulldown'];
            @endphp
            @foreach ($gpios as $gpio)
                @include('frontend.blocks.mission.createMissions.functionTab.dataGpioItem', [
                    'name_gpio_item' => $gpio,
                    'type' => 'wake_up',
                ])
            @endforeach
        </div>
        <label for="stop"
            class="text-xl md:text-3xl btn bg-[var(--main-color)] text-[#fff] self-end px-4 py-2 rounded-md">Ok</label>
        <script type="module" src="/js/missions/gpio.js"></script>
    </div>
</div>
</div>
</div>

<style>
    .form-checkbox {
        display: none;
    }

    .form-wrapper {
        position: fixed;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-60%);
        z-index: 1000;
        border-radius: 4px;
        padding: 20px 32px;
    }


    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 100;
    }

    .input-checkbox:checked+.form-checkbox {
        display: block;
    }

    #select-robot-option {
        height: 46px;
        padding: 4px 8px;
        font-family: var(--main-font);
        font-size: 2rem;
    }

    .add-wake-up-btn {
        align-items: flex-end;
    }
</style>

</div>

@php
    $datas = explode('|', $itemRender->steps_mission_name);
    array_shift($datas);
    $datasJson = json_encode($datas);
    echo "<input hidden class='data-steps' type='text' value='$datasJson'>";
    
    if (session('data')) {
        $dataNew = session('data')[0]['steps_mission'];
        $stringStep_mission = trim(str_replace(')(', '||', $dataNew), '()');
    } else {
        $stringStep_mission = trim(str_replace(')(', '||', $itemRender->steps_mission), '()');
    }
    $dataStepJson = json_encode(explode('||', $stringStep_mission));
    echo "<input hidden class='data-steps-value' type='text' value='$dataStepJson'>";
@endphp

{{-- <div class="overlay-form-edit-step"></div>
<div class="form-edit-step">
    <div class=" edit-item footprint-form-edit">
        @include('frontend.blocks.mission.createMissions.createStep.formEdit.footprintEdit')
    </div>

    <div class=" edit-item gpio-form-edit">
        @include('frontend.blocks.mission.createMissions.createStep.formEdit.gpioEdit')
    </div>

    <div class=" edit-item marker-form-edit">
        marker
    </div>

    <div class=" edit-item sleep-form-edit">
        @include('frontend.blocks.mission.createMissions.createStep.formEdit.sleepEdit')
    </div>
    <div class=" edit-item position-form-edit">
        @include('frontend.blocks.mission.createMissions.createStep.formEdit.positionEdit')
    </div>
</div> --}}
<style>
    .form-edit-step {
        min-width: 500px;
        min-height: 500px;
        background-color: #fff;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        box-shadow: 0 0 10px rgba(51, 51, 51, 0.555);
        display: none;
        z-index: 1000;
    }

    .overlay-form-edit-step {
        position: fixed;
        top: 0%;
        left: 0%;
        right: 0%;
        bottom: 0%;
        background: transparent;
        z-index: 100;
        display: none;
    }

    .edit-item {
        display: none;
    }

    .form-edit-step.sleep-edit .sleep-form-edit,
    .form-edit-step.footprint-edit .footprint-form-edit,
    .form-edit-step.marker-edit .marker-form-edit,
    .form-edit-step.position-edit .position-form-edit,
    .form-edit-step.gpio-edit .gpio-form-edit {
        display: block;
    }

    .sleep-edit {}
</style>
