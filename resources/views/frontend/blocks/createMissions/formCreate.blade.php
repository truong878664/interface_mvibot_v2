<link rel="stylesheet" href="/css/createPoint/form.css">
<div class="overlay"></div>
<form method="POST" action="{{ route('dashboard.missions.createmissions.') }}" class="form-create-point">
    <label for="show-create-missions" class="form-create-point-close"><i class="fa-solid fa-xmark"></i></label>
    <div class="form-item form-create-missions">
        <label for="name-mission" class="heading-create-mission" >Name group missions</label>
        <input id="name-mission" type="text" class="point-input" name="name_mission" required>
    </div>
    <button class="submit-btn save-point-btn">Create</button>
    @csrf
</form>
