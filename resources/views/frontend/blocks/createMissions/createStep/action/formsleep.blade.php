<p class="heading-form-mission">Sleep</p>
<form method="POST" action="/dashboard/missions/create-sleep">
    <label class="label-sleep" for="name-sleep">Name</label>
    <input id="name-sleep" name="name_sleep" type="text" class="name-sleep"> <br>
    <label class="label-sleep" for="time-sleep">Time sleep</label>
    <input id="time-sleep" name="time_sleep" type="text" class="time-sleep">
    <span>second</span>
    @csrf
    <button class="add-btn submit-btn">Add</button>
</form>
