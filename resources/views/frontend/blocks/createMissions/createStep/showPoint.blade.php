<div class="mission-step-item-heading">Point</div>
<div class="missison-point-content">
    @foreach ($allPoints as $point)
        <div class="point-item point-id-{{ $point->id }}">
            <div class="point-item-content">
                <p class="name-point">{{ $point->name_position }}</p>
                <p class="create-at">create at: {{ $point->created_at }}</p>
            </div>
            <div class="point-item-action">

                <form class="point-item-wrapper delete-point" method="post"
                    action="/dashboard/missions/delete-point/{{ $point->id }}">
                    @method('delete')
                    <button class="delete-point-map action-point-btn"><i class="fa-solid fa-xmark"></i></button>
                    @csrf
                </form>

                <button class="point-item-wrapper show-point-map action-point-btn"><i
                        class="fa-solid fa-eye"></i></button>

                <form class="point-item-wrapper" method="post" action="/dashboard/missions/add-point-to-mission">
                    @include('frontend.blocks.createMissions.createStep.function.idMission')
                    <input type="text" value="{{ $point->name_position }}" name="name_position" hidden>
                    <input type="text" value="{{ $point->id }}"" name="id_position" hidden>
                    <button class="add-point action-point-btn"><i class="fa-solid fa-plus"></i></button>
                    @csrf
                </form>
                <div class="show-point" id="{{ $point->id }}" x="{{ $point->x }}" y="{{ $point->y }}"
                    z="{{ $point->z }}" w="{{ $point->w }}" color_position="{{ $point->color_position }}">
                </div>
            </div>
        </div>
    @endforeach
</div>
