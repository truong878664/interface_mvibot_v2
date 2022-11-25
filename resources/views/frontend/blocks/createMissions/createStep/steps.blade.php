<div class="steps-wrapper"></div>
@include('frontend.blocks.createMissions.createStep.menu')

<div class="submit-btn-wrapper">
    <form class="form-submit-steps" action="/dashboard/missions/update-step-missions-name" method="POST">
        <input type="text" value="{{ $itemRender->id }}" name="id_mission" hidden>
        <input id="input-steps-name-submit" type="text" value="" name="steps_mission_name" hidden>
        <x-button tag="button" title="Save" class="step-submit-btn" attribute=""></x-button>

        @csrf
    </form>
    <br>
    <form class="form-submit-steps" action="">
        <input id="input-steps-name-submit" type="text" value="" name="" hidden>
        <x-button tag="button" title='Send' class="step-submit-btn" attribute=""></x-button>
    </form>
</div>
@php
    $datas = explode('|', $itemRender->steps_mission_name);
    array_shift($datas);
    $datasJson = json_encode($datas);
    echo "<input hidden class='data-steps' type='text' value='$datasJson'>";
    echo "<textarea name='Text1' cols='200' rows='5'>$itemRender->steps_mission</textarea>";
    $stringStep_mission = trim(str_replace(')(', '||', $itemRender->steps_mission), '()');
    $dataStepJson = json_encode(explode('||', $stringStep_mission));
    echo "<input hidden class='data-steps-value' type='text' value='$dataStepJson'>";
@endphp


<div class="overlay-form-edit-step"></div>
<div class="form-edit-step">

    <div class=" edit-item footprint-form-edit">
        <p class="heading-form-mission">Footprint</p>
        <form method="POST" action="/dashboard/missions/create-footprint">
            <div class="name-footprint">
                <label for="">Name</label>
                <input class="name-footprint-edit" type="text" name="name_footprint_edit" required>
            </div>
            <div class="footprint-img" style="background-image:url('/img/footprint.png');" class="img-footprint">
                <div class="input-footprint-wrapper top-footprint">
                    <input required type="number" class="x1-edit  input-footprint" placeholder="front" name="x1">
                    <span>cm</span>
                </div>

                <div class="input-footprint-wrapper right-footprint">
                    <input required type="number" class="y2-edit  input-footprint" placeholder="right" name="y2">
                    <span>cm</span>
                </div>

                <div class="input-footprint-wrapper left-footprint">
                    <input required type="number" class="y1-edit left-footprint input-footprint" placeholder="left"
                        name="y1">
                    <span>cm</span>
                </div>

                <div class="input-footprint-wrapper bottom-footprint">
                    <input required type="number" class="x2-edit bottom-footprint input-footprint" placeholder="behind"
                        name="x2">
                    <span>cm</span>
                </div>
            </div>
            @include('frontend.blocks.createMissions.createStep.function.idMission')
            <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>
            @csrf
        </form>
    </div>
    <div class=" edit-item gpio-form-edit">
        <p class="heading-form-mission">GPIO</p>
        <form method="POST" action="/dashboard/missions/create-gpio" class="gpio_form">
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
            <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>

            @csrf
        </form>
    </div>
    <div class=" edit-item marker-form-edit">
        marker
    </div>
    <div class=" edit-item sleep-form-edit">
        <p class="heading-form-mission">Sleep</p>
        <form method="POST" action="/dashboard/missions/create-sleep">
            <label class="label-sleep" for="name-sleep">Name</label>
            <input id="name-sleep" name="name_sleep " type="text" class="name-sleep name-sleep-edit" required>
            <br>
            <label class="label-sleep" for="time-sleep">Time sleep</label>
            <input id="time-sleep" name="time_sleep" type="number" class="time-sleep time_sleep-edit" required>
            <span>second</span>
            @include('frontend.blocks.createMissions.createStep.function.idMission')

            @csrf
            <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>
        </form>
    </div>

    <div class=" edit-item position-form-edit">
        <form method="POST" action="{{ route('dashboard.missions.create-point') }}" class="form-create-point">
            <label for="form-create-point-checkbox" class="form-create-point-close"><i
                    class="fa-solid fa-xmark"></i></label>

            <div class="name-point-wrapper form-item">
                <label for="name-point">Name point</label>
                <input id="name-point" type="text" class="point-input name-position-edit" name="name_position"
                    required>
            </div>
            <div class="display-positon-wrapper">
                <div class="display-position-item">
                    <span>x</span>
                    <input class="display-positon display-positon-x x-edit" tabindex="-1" id=""
                        type="text" value="0">
                </div>
                <div class="display-position-item">
                    <span>y</span>
                    <input class="display-positon display-positon-y y-edit" tabindex="-1" id=""
                        type="text" value="0">
                </div>
                <div class="display-position-item">
                    <span>z</span>
                    <input class="display-positon display-rotate-z z-edit" tabindex="-1" id=""
                        type="text" value="0">
                </div>

            </div>
            <div class="time-color-wrapper form-item">
                <div class="time-point-wrapper form-item">
                    <label for="time-point">Time out</label>
                    <input id="time-point" type="number" name="time_out" class="time_out-edit" required>
                </div>

                <div class="color-point-wrapper form-item">
                    <label for="color-point" class="color-point">color</label>
                    <input id="color-point" type="color" name="color_position" class="color_position-edit"
                        value="#EA047E">
                </div>
            </div>

            <div class="mode-wrapper form-item">
                <label for="mode">Mode</label>
                <input id="mode" type="text" class="point-input mode_position-edit" name="mode" required>
            </div>

            <div class="mode-child-wrapper form-item">
                <label for="mode-child">Mode child</label>
                <input id="mode-child" type="text" class="point-input mode_child-edit" name="mode_child"
                    required>
            </div>
            <x-button tag="button" title="Save" class="save-point-btn" attribute=""></x-button>
            @csrf
        </form>

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
