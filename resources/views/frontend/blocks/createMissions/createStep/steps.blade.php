{{-- <link rel="stylesheet" href="/css/createMission/steps.css"> --}}
<div class="steps-wrapper">
    <div class="step-item step-gpio">
        <button class="move-btn move-left"><i class="fa-solid fa-angle-left"></i></button>
        <div>gpio:123</div>
        <button class="delete-step" id-delete="1"><i class="fa-solid fa-xmark"></i></button>
        <button class="move-btn move-right"><i class="fa-solid fa-angle-right"></i></button>
    </div>
</div>
<div class="submit-btn-wrapper">
    <form class="form-submit-steps" action="/dashboard/missions/update-step-missions-name" method="POST">
        <input type="text" value="{{ $itemRender->id }}" name="id_mission" hidden>
        <input id="input-steps-name-submit" type="text" value="" name="steps_mission_name" hidden>
        <button class="submit-btn step-submit-btn">Save</button>
        @csrf
    </form>
    <br>
    <form class="form-submit-steps" action="">
        <input id="input-steps-name-submit" type="text" value="" name="" hidden>
        <button class="submit-btn step-submit-btn"><i class="fa-regular fa-paper-plane"></i></button>
    </form>
</div>
@php
    $datas = explode('|', $itemRender->steps_mission_name);
    array_shift($datas);
    $datasJson = json_encode($datas);
    echo "<input hidden class='data-steps' type='text' value='$datasJson'>";
@endphp
