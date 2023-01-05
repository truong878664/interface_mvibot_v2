@foreach ($allPoints as $point)
    <div
        class="point-id-1 flex justify-between items-center bg-[rgba(204,204,204,0.53)] px-3 mb-2 point-id-{{ $point->id }} item-point">

        <div class="text-2xl">
            <p class="">{{ $point->name_position }}</p>
            <p class="text-xl">create at: {{ $point->created_at }}</p>
        </div>
        <div class="flex items-center ">
            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white delete-point-btn" point-id="{{ $point->id }}">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white show-point-map">
                <i class="fa-solid fa-eye"></i>
            </button>

            <div class="item-point">
                @include('frontend.blocks.mission.createMissions.functionTab.idMission')
                <input type="text" value="position" class="type" hidden>
                <input type="text" value="{{ $point->name_position }}" class="name_type" hidden>
                <input type="text" value="{{ $point->id }}" class="id_type" hidden>
                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white add-point-btn">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
            <div class="show-point" id="{{ $point->id }}" x="{{ $point->x }}" y="{{ $point->y }}"
                z="{{ $point->z }}" w="{{ $point->w }}" color_position="{{ $point->color_position }}">
            </div>
        </div>
    </div>
@endforeach
