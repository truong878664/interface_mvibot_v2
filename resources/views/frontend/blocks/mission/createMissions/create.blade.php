@foreach ($allMissions as $itemMission)
    <a href="create-missions/{{ $itemMission->id }}" class="create-misisons-item relative">
        <div class="absolute top-0 left-0 hidden select-mission-wrapper">
            <input type="checkbox" class="absolute top-1 left-1 w-[20px] h-[20px] p-5 select-mission"
                value="{{ $itemMission->id }}" id="mission-{{ $itemMission->id }}">
            <label for="mission-{{ $itemMission->id }}" class="absolute h-[60px] w-[60px] bg-transparent"></label>
        </div>
        <form method="post" action="delete/{{ $itemMission->id }}" class="absolute top-0 right-0">
            @method('delete')
            <button class="w-[30px] h-[30px]"><i class="fa-solid fa-xmark"></i></button>
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
    @include('frontend.blocks.mission.createMissions.formCreate')
</div>
