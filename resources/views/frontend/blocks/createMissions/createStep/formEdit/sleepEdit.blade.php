<p class="heading-form-mission">Sleep</p>
<form method="POST" action="/dashboard/missions/update-sleep">
    <input type="text" hidden class="sleep-id" name="id">
    <label class="label-sleep" for="name-sleep">Name</label>
    <input id="name-sleep" name="name_sleep" type="text" class="name-sleep name-sleep-edit" required>
    <br>
    <label class="label-sleep" for="time-sleep">Time sleep</label>
    <input id="time-sleep" name="time_sleep" type="number" class="time-sleep time_sleep-edit" required>
    <span>second</span>
    @include('frontend.blocks.createMissions.createStep.function.idMission')

    @csrf
    <x-button tag="button" title="Update" class="add-btn" attribute=""></x-button>

</form>
