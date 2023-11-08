@php
    $userName = session('UserName');
    $key = substr($userName, 0, 1);
    $colors = ['#FF7B54', '#D7E9B9', '#7B2869', '#B5D5C5', '#3C6255', '#579BB1', '#FF6E31', '#FFEBB7', '#AD8E70', '#B9FFF8', '#6FEDD6', '#FF9551', '#FF4A4A', '#FDFDBD', '#C8FFD4', '#B8E8FC', '#B1AFFF', '#FED049', '#CFFDE1', '#68B984', '#3D5656'];
    $color = $colors[strlen($userName)];
@endphp
<header class="grid-in-header z-11 flex h-full w-full items-center justify-between bg-main px-7 text-white shadow-md">
    <div class="flex h-full items-center gap-4">
        <div
            class="connect-ros-btn connection-failed shake z-12 text-center text-2xl [&.connected]:text-green-400 [&.connection-failed]:text-red-500">
            <i class="fa-solid fa-satellite-dish"></i>
        </div>
        <span class="flex items-center text-xl font-bold">Mvibot</span>
        <div class="relative">
            <button data-bookmark="" class="btn bookmark-btn group/bookmark text-yellow-400">
                <div
                    class="icon-bookmark-btn active-bookmark pointer-events-none hidden group-data-[bookmark=active]/bookmark:block">
                    <i class="fa-solid fa-bookmark"></i>
                </div>
                <div
                    class="icon-bookmark-btn unactive-bookmark pointer-events-none hidden group-data-[bookmark='']/bookmark:block">
                    <i class="fa-regular fa-bookmark"></i>
                </div>
            </button>
            <div class="absolute top-full hidden w-52 rounded-md bg-white p-4 text-2xl text-black shadow-sm">
                <span>Bookmark add</span>
                <div class="my-2 flex">
                    <label for="name-bookmark" class="mr-2">name</label>
                    <input id="name-bookmark" type="text" class="w-full px-2" value="Mvibot" />
                </div>
                <div class="flex items-center justify-end">
                    <button class="btn btn float-right mr-2 self-end rounded-full border px-4 py-1">
                        Remove
                    </button>
                    <button class="btn btn float-right self-end rounded-full border bg-sky-400 px-4 py-1 text-white">
                        Done
                    </button>
                </div>
            </div>
        </div>
        <div class="ml-4">
            <div class="ml-7 !hidden" id="loader-header"></div>
        </div>
    </div>

    <div class="flex items-center gap-4">
        <span>{{ session('UserName') }}</span>
        <div data-user-name="{{ session('UserName') }}" key="{{ $key }}"
            style="background-color: {{ $color }};"
            class="avatar-user transparent bg-avatar relative flex aspect-square w-7 items-center justify-center rounded-full text-3xl ring-2 ring-sky-200 after:absolute after:text-lg after:font-bold after:uppercase after:content-[attr(key)]">
            <span class="uppercase"></span>
            @if (session('TypeUser') == 'admin')
                <div
                    class="absolute -top-1 -right-2 grid aspect-square w-5 place-content-center rounded-full bg-cyan-400 text-xs text-white">
                    <i class="fa-solid fa-check"></i>
                </div>
            @endif
        </div>
    </div>
</header>
