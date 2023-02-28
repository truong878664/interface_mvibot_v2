@php
    $colorMisisonItem = ['normal' => 'from-green-600 to-green-500', 'error' => 'from-red-500 to-red-600', 'battery' => 'from-[#0f6cbd] to-[#227dcd]', 'gpio' => 'from-[#FFB84C] to-[#F0A04B]'];
    $colorButton = ['normal' => 'text-green-500', 'error' => 'text-red-800', 'battery' => 'text-[#0f6cbd]', 'gpio' => 'text-[#F99417]'];
    $colorBg = ['normal' => 'bg-green-400', 'error' => 'bg-red-400', 'battery' => 'bg-blue-400', 'gpio' => 'bg-yellow-400'];
@endphp

@foreach ($missions as $index => $itemMission)
    <div class="create-misisons-item bg-gradient-to-r {{ $colorMisisonItem[$type] }}" mission-id="{{ $itemMission->id }}">
        <div class="absolute top-4 left-4 flex justify-between z-30">
            <div class="text-[30px] w-[30px] h-[30px] flex items-center justify-center pointer-events-none">
                @if ($itemMission->mission_shorthand)
                    <i class="fa-regular fa-file-lines"></i>
                @else
                    <i class="fa-regular fa-file"></i>
                @endif
            </div>
        </div>
        <div class="absolute top-4 right-4 justify-between z-30 flex flex-row-reverse ">
            <div class="flex">
                <form method="post" action="delete/{{ $itemMission->id }}" class="action-delete-mission">
                    @method('delete')
                    <button
                        class="rounded-full ml-2 bg-[#fff] {{ $colorButton[$type] }} text-[15px] w-[30px] h-[30px] flex items-center justify-center btn delete-mission-btn"><i
                            class="fa-regular fa-trash-can"></i></button>
                    @csrf
                </form>
                <button
                    class="rounded-full btn ml-2 bg-[#fff] {{ $colorButton[$type] }} text-[12px] w-[30px] h-[30px] flex items-center justify-center edit-name-mission-btn">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button mission-id="{{ $itemMission->id }}"
                    class="rounded-full btn ml-2 bg-[#fff] {{ $colorButton[$type] }} text-[12px] w-[30px] h-[30px] flex items-center justify-center clone-mission-btn">
                    <i class="fa-solid fa-clone"></i>
                </button>
            </div>
        </div>
        <div class="h-full w-full">
            <a href="/dashboard/missions/create-missions/{{ $itemMission->id }}"
                class=" flex relative items-end w-full h-full text-[#fff] href-mission">
                <input
                    class="text-3xl bg-transparent border-[2px] rounded-lg border-transparent p-2 w-full pointer-events-none name-mission"
                    value="{{ $itemMission->name_mission }}" disabled />

            </a>
        </div>
        <div class="absolute select-mission-wrapper top-0 left-0 w-full h-full hidden">
            <input type="checkbox" class="select-mission hidden peer/item-mission" value="{{ $itemMission->id }}"
                id="mission-{{ $itemMission->id }}">

            <label for="mission-{{ $itemMission->id }}"
                class="h-full w-full peer-checked/item-mission:text-[#fff] peer-checked/item-mission:bg-transparent bg-[#ffffff4d] text-transparent z-40 absolute flex justify-center items-center text-[70px]">
                <i class="fa-solid fa-check"></i>
            </label>
        </div>
    </div>
@endforeach
<input id="show-create-missions" type="checkbox" class="show-create-missions" hidden>

<label for="show-create-missions" class="create-misisons-item create-missions-btn {{ $colorButton[$type] }}">
    <i class="fa-solid fa-plus"></i>
</label>

<div class="form-create-mission">
    @include('frontend.blocks.mission.createMissions.formCreate')
</div>
