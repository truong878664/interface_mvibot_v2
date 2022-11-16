<link rel="stylesheet" href="/css/createMission/form.css">

@foreach ($allMissions as $itemMission)
    <a href="create-missions/{{ $itemMission->id }}" class="create-misisons-item">
        <form method="post" action="delete/{{ $itemMission->id }}">
            @method('delete')
            <button class="delete-mission-btn"><i class="fa-solid fa-xmark"></i></button>
            @csrf
        </form>
        <p> {{ $itemMission->name_mission }}</p>
    </a>
@endforeach

<input id="show-create-missions" type="checkbox" class="show-create-missions" hidden>

<label for="show-create-missions" class="create-misisons-item create-missions-btn">
    <i class="fa-solid fa-plus"></i>
</label>

<div class="form-create-mission">
    @include('frontend.blocks.createMissions.formCreate')
</div>
