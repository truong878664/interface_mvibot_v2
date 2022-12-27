@foreach ($allPoints as $point)
    <div
        class="point-id-1 flex justify-between items-center bg-[rgba(204,204,204,0.53)] px-3 mb-2 point-id-{{ $point->id }}">
        <div class="text-2xl">
            <p class="">{{ $point->name_position }}</p>
            <p class="text-xl">create at: {{ $point->created_at }}</p>
        </div>
        <div class="flex items-center ">
            <form class="" method="post" action="/dashboard/missions/delete-point/{{ $point->id }}">
                @method('delete')
                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white "><i class="fa-solid fa-xmark"></i></button>
                @csrf
            </form>
            <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white show-point-map"><i
                    class="fa-solid fa-eye"></i></button>

            <form class="item-point" method="post" action="/dashboard/missions/add-point-to-mission">
                @include('frontend.blocks.mission.createMissions.functionTab.idMission')
                <input type="text" value="position" class="type" hidden>
                <input type="text" value="{{ $point->name_position }}" class="name_type" hidden>
                <input type="text" value="{{ $point->id }}" class="id_type" hidden>
                <button class="text-3xl mr-2 h-[30px] w-[30px] bg-white add-point-btn"><i
                        class="fa-solid fa-plus"></i></button>
                @csrf
            </form>
            <div class="show-point" id="{{ $point->id }}" x="{{ $point->x }}" y="{{ $point->y }}"
                z="{{ $point->z }}" w="{{ $point->w }}" color_position="{{ $point->color_position }}">
            </div>
        </div>
    </div>
@endforeach
