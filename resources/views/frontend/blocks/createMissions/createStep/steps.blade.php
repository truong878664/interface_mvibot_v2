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
@endphp
