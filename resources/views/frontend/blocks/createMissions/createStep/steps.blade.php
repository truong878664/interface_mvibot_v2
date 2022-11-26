<div class="steps-wrapper"></div>

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
