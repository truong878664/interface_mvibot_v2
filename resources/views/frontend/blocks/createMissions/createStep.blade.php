<link rel="stylesheet" href="/css/createMission/createStep.css">
<div class="create-mission-header">
    <a href="{{ route('dashboard.missions.createmissions.') }}" class="back-btn"><i class="fa-solid fa-angle-left"></i></a>
    <div class="create-mission-heading">{{ $itemRender->name_mission }}</div>
</div>
<div class="create-mission-wrapper">
    <div class="missison-point mission-step-item">
        <div class="mission-step-item-heading">Point</div>
        <div class="missison-point-content">

            @foreach ($allPoints as $point)
                <div class="point-item point-id-{{ $point->id }}">
                    <div class="point-item-content">
                        <p class="name-point">{{ $point->name_position }}</p>
                        <p class="create-at">create at: {{ $point->created_at }}</p>
                    </div>
                    <div class="point-item-action">

                        <form class="delete-point" method="post" action="/dashboard/missions/deletepoint/{{ $point->id }}" >
                            @method('delete')
                            <button class="delete-point-map action-point-btn"><i class="fa-solid fa-xmark"></i></button>
                            @csrf
                        </form>

                        <button class="show-point-map action-point-btn"><i class="fa-solid fa-eye"></i></button>
                        <button class="add-point action-point-btn"><i class="fa-solid fa-plus"></i></button>
                        <div class="show-point" id="{{ $point->id }}" x="{{ $point->x }}" y="{{ $point->y }}"
                            z="{{ $point->z }}" w="{{ $point->w }}"
                            color_position="{{ $point->color_position }}">
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <div class="misison-footprint mission-step-item">
        <div class="mission-step-item-heading">Function</div>
    </div>
    <div class="mission-gpio mission-step-item">
        <div class="mission-step-item-heading">Action</div>
    </div>
