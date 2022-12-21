<p class="heading-form-mission">Sleep</p>
<form method="POST" action="/dashboard/missions/create-sleep">
    <label class="label-sleep" for="name-sleep">Name</label>
    <input id="name-sleep" name="name_sleep" type="text" class="name-sleep" required>
    <br>
    <label class="label-sleep" for="time-sleep">Time sleep</label>
    <input id="time-sleep" name="time_sleep" type="number" class="time-sleep" required>
    <span>second</span>
    @include('frontend.blocks.mission.createMissions.createStep.function.idMission')

    @csrf
    <x-button tag="button" title="Add" class="add-btn" attribute=""></x-button>
</form>
