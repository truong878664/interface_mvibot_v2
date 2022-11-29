<div class="steps-wrapper"></div>

<div class="submit-btn-wrapper">
    <form class="form-submit-steps" action="/dashboard/missions/update-step-missions-name" method="POST">
        <input type="text" value="{{ $itemRender->id }}" name="id_mission" hidden>
        <input id="input-steps-name-submit" type="text" value="" name="steps_mission_name" hidden>
        <x-button tag="button" title="Save" class="step-submit-btn" attribute=""></x-button>

        @csrf
    </form>
    <br>
    <div class="form-submit-steps">
        <input id="input-steps-name-submit" type="text" value="" name="" hidden>

        <x-button tag="label" title='Wake up' class="wake-up-btn" attribute="for=wake-up"></x-button>
        <x-button tag="label" title='Stop' class="stop-btn" attribute="for=stop"></x-button>
        <x-button tag="label" title='Send' class="send-mission" attribute="for=select-robot"></x-button>
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
            <x-button tag="label" title='Send' class="send-mission-btn" attribute="for=select-robot"></x-button>
        </div>
    </div>

    <input type="checkbox" name="" id="wake-up" class="input-checkbox" hidden>
    <div class="select-robot-wrapper form-checkbox">
        <label for="wake-up" class="overlay"></label>
        <div class="form-wrapper">
            <strong>Wake Up</strong>
            <div class="data-gpio ">
                <div class="data-gpio-item">
                    <label for="out_set">out_set</label>
                    <input type="text" class="out_set_wake_up">
                </div>
                <div class="data-gpio-item">
                    <label for="out_reset">out_reset</label>
                    <input type="text" class="out_reset_wake_up">
                </div>
                <div class="data-gpio-item">
                    <label for="in_on">in_on</label>
                    <input type="text" class="in_on_wake_up">
                </div>
                <div class="data-gpio-item">
                    <label for="in_off">in_off</label>
                    <input type="text" class="in_off_wake_up">
                </div>
                <div class="data-gpio-item">
                    <label for="in_pullup">in_pullup</label>
                    <input type="text" class="in_pullup_wake_up">
                </div>
                <div class="data-gpio-item">
                    <label for="in_pulldown">in_pulldown</label>
                    <input type="text" class="in_pulldown_wake_up">
                </div>
                <x-button tag="label" title='Ok' class="add-wake-up-btn" attribute="for=wake-up">
                </x-button>
            </div>
        </div>
    </div>
</div>


<input type="checkbox" name="" id="stop" class="input-checkbox" hidden>
<div class="select-robot-wrapper form-checkbox">
    <label for="stop" class="overlay"></label>
    <div class="form-wrapper">
        <strong>Stop</strong>
        <div class="data-gpio ">
            <div class="data-gpio-item">
                <label for="out_set">out_set</label>
                <input type="text" class="out_set_stop">
            </div>
            <div class="data-gpio-item">
                <label for="out_reset">out_reset</label>
                <input type="text" class="out_reset_stop">
            </div>
            <div class="data-gpio-item">
                <label for="in_on">in_on</label>
                <input type="text" class="in_on_stop">
            </div>
            <div class="data-gpio-item">
                <label for="in_off">in_off</label>
                <input type="text" class="in_off_stop">
            </div>
            <div class="data-gpio-item">
                <label for="in_pullup">in_pullup</label>
                <input type="text" class="in_pullup_stop">
            </div>
            <div class="data-gpio-item">
                <label for="in_pulldown">in_pulldown</label>
                <input type="text" class="in_pulldown_stop">
            </div>
            <x-button tag="label" title='Ok' class="add-stop-btn" attribute="for=stop">
            </x-button>
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

    .wake-up-btn {
        background-color: #54B435;
    }

    .stop-btn {
        background-color: #FF1700;
    }

    .add-wake-up-btn {
        align-items: flex-end;
    }

    .data-gpio {
        justify-content: flex-end;
    }
</style>

</div>

@php
    $datas = explode('|', $itemRender->steps_mission_name);
    array_shift($datas);
    $datasJson = json_encode($datas);
    echo "<input hidden class='data-steps' type='text' value='$datasJson'>";
    // echo "<textarea name='Text1' cols='200' rows='5'>$itemRender->steps_mission</textarea>";
    
    if (session('data')) {
        $dataNew = session('data')[0]['steps_mission'];
        $stringStep_mission = trim(str_replace(')(', '||', $dataNew), '()');
    } else {
        $stringStep_mission = trim(str_replace(')(', '||', $itemRender->steps_mission), '()');
    }
    $dataStepJson = json_encode(explode('||', $stringStep_mission));
    echo "<input hidden class='data-steps-value' type='text' value='$dataStepJson'>";
@endphp

<div class="overlay-form-edit-step"></div>
<div class="form-edit-step">
    <div class=" edit-item footprint-form-edit">
        @include('frontend.blocks.createMissions.createStep.formEdit.footprintEdit')
    </div>

    <div class=" edit-item gpio-form-edit">
        @include('frontend.blocks.createMissions.createStep.formEdit.gpioEdit')
    </div>

    <div class=" edit-item marker-form-edit">
        marker
    </div>

    <div class=" edit-item sleep-form-edit">
        @include('frontend.blocks.createMissions.createStep.formEdit.sleepEdit')
    </div>
    <div class=" edit-item position-form-edit">
        @include('frontend.blocks.createMissions.createStep.formEdit.positionEdit')
    </div>
</div>
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
