@extends('frontend.layouts.mainLayout') @section('content')
    <div class="m-2 flex h-[calc(100%_-_10px)] w-[calc(100%_-_10px)] flex-col">
        <div class="relative flex h-full flex-col overflow-hidden rounded-md bg-[#ccc]">
            <div class="h-full w-full" id="map-wrapper">
                <div class="h-full w-full" id="map"></div>
            </div>
            {{-- select map --}}
            <div class="absolute m-4 flex items-center rounded-sm px-2">
                @php
                    $fileMapList = glob('../maps/*');
                    function a($m)
                    {
                        if (str_ends_with($m, '.yaml')) {
                            return ['name' => str_replace('.yaml', '', str_replace('../maps/', '', $m))];
                        } else {
                            return false;
                        }
                    }
                    $arrayMap = array_map('a', $fileMapList);
                    $newMap = array_filter($arrayMap, function ($m) {
                        return $m;
                    });
                @endphp
                @include('frontend/blocks/selection', [
                    'title' => 'Choose map',
                    'id' => 'choose-map-active',
                    'datas' => $newMap,
                    'nameArray' => 'name',
                ])
                <div class="mx-4">
                    <button class="btn rounded-md bg-[#0f6cbd] px-3 py-1 font-bold text-white" id="active-map-btn">
                        Active map
                    </button>
                    <button class="btn delete-map-active-btn rounded-md bg-red-500 px-3 py-1 font-bold text-white">
                        Delete map
                    </button>
                </div>
                <input type="checkbox" name="" class="peer/delete-map hidden" id="delete-map" />
                <label for="delete-map"
                    class="fixed top-0 left-0 right-0 bottom-0 z-10 hidden items-center justify-center bg-[rgba(0,0,0,0.2)] peer-checked/delete-map:flex">
                    <div class="flex flex-col justify-center rounded-md bg-[#fff] p-4">
                        <p>Do you want to delete this map?</p>
                        <div class="mt-4 flex justify-evenly">
                            <label for="delete-map" class="btn rounded-md bg-yellow-500 px-3 py-1 text-white">Cancel</label>
                            <label for="delete-map" class="btn rounded-md bg-red-500 px-3 py-1 text-white"
                                id="delete-map-btn">Submit</label>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
    <div id="msg" class="fixed top-[100px] right-8 z-[12] rounded-sm text-white">
        <div class="px-4 py-2">
            <div class="bg-red-500"></div>
            <div class="bg-green-500"></div>
        </div>
    </div>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map/mapActive.js"></script>
@endsection
