@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col max-h-[calc(100vh_-_48px)]">
        <div class="heading map-heading">Map</div>
        <div class="mx-4 mb-4 h-full flex flex-col">
            <a class="inline-block px-3 rounded hover:bg-[#ccc] w-[30px] mb-2" href="{{ route('dashboard.map.map') }}">
                <i class="fa-solid fa-chevron-left"></i>
            </a>
            <div class="flex-1 flex ">
                <div class="w-5/6 relative" id="map">
                    <div class="absolute px-2 text-[1.5rem]">
                        <span>Map active:</span>
                        <span id="map-active">{{ $mapActive }}</span>
                    </div>

                </div>
                <div class="flex flex-col mt-3 justify-end content-start w-1/6 px-5">
                    <form class="">
                        <label for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px] ">Name layer</span>
                            <input type="text" class=" w-[200px] px-4" id="name_layer">
                        </label>

                        <label for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Type layer</span>
                            <select name="" id="type-layer" class=" w-[200px] px-4 flex-1 outline-none border-[1px]">
                                <option value="lowspeed_zone">lowspeed_zone</option>
                                <option value="dead_zone">dead_zone</option>
                            </select>
                        </label>

                        <label for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Width</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="1" id="width-layer">
                                <input id="width-layer-range" type="range" step="0.1" value="1" max="50"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </label>

                        <label for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Height</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="1" id="height-layer">
                                <input id="height-layer-range" type="range" step="0.1" max="50" value="1"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </label>

                        <label for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">X</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="0" name="xo"
                                    id="xo">
                                <input id="xo-range" type="range" step="0.1" value="0" max="30"
                                    min="-30" value='1'
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </label>

                        <label for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Y</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="0" name="yo"
                                    id="yo">
                                <input id="yo-range" type="range" step="0.1" value="0" max="30"
                                    min="-30"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">

                            </div>
                        </label>

                        <label for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Yawo</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class="px-4 flex-1 w-[200px] " value="1" id="z-rotate">
                                <input id="z-rotate-range" type="range" step="1" value="0" max="180"
                                    min="-180"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </label>
                        <div class="">
                            <button class="px-4 bg-[#0f6cbd] text-[#fff]">Save</button>
                        </div>
                    </form>

                    {{-- ===list layer=== --}}
                    <div class="flex-1 mt-10  relative border-solid border-[1px] border-[#ccc] overflow-hidden "
                        id="list-layer-wrapper">
                        <label class="block text-center absolute w-full h-[30px] bg-[rgba(204,204,204,0.51)]">list
                            layer</label>
                        <div class="mt-[30px] overflow-y-visible overflow-x-auto h-[360px]" id="layer-container">
                            <div class="">123</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map.js"></script>
    <script></script>
@endsection
