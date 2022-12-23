@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col max-h-[calc(100vh_-_48px)]">

        <div class="heading map-heading">Map</div>
        <div class="mx-4 mb-4 h-full flex flex-col">

            <div class="flex-1 flex ">

                <div class="w-5/6 h-full relative  overflow-hidden">
                    <div class="w-full h-full absolute cursor-copy" id="map"></div>
                    {{-- ===heading map=== --}}
                    <div class="absolute p-2 text-[1.5rem] w-full flex">
                        <div class="">

                            <a class="inline-block px-3 rounded hover:bg-[#ccc] w-[30px] mb-2"
                                href="{{ route('dashboard.map.map') }}">
                                <i class="fa-solid fa-chevron-left"></i>
                            </a>
                        </div>
                        <div class="">
                            <span>Map active:</span>
                            <span id="map-active">{{ $mapActive }}</span>
                        </div>
                        <div class="bg-[#fff] absolute top-3 right-3 w-[200px]">
                            <label for=""
                                class="absolute bg-[#0f6cbd] rounded-sm select-none text-[#fff] top-0 w-full block h-[23px] text-center btn"
                                id="list-layer-btn">
                                <span>saved layer list</span>
                                <span class="text-xl float-right pr-4 leading-[23px]">
                                    <i class="fa-solid fa-chevron-down hidden" id="down-icon"></i>
                                    <i class="fa-solid fa-chevron-up hidden" id="up-icon"></i>
                                </span>
                            </label>
                            <div class="max-h-[300px] overflow-scroll overflow-x-hidden mt-[23px] hidden"
                                id="list-layer-item">
                                @php
                                    $allLayerJson = json_encode($allLayer->toArray());
                                @endphp
                                <input type="hidden" value="{{ $allLayerJson }}" id="data-layer-json">
                                @foreach ($allLayer as $layer)
                                    <div
                                        class="px-4 py-2 flex justify-between items-center hover:bg-[rgba(204,204,204,0.43)] cursor-pointer">
                                        <span class="">{{ $layer->name_layer }}</span>
                                        <form method="POST"
                                            action="{{ route('delete-layer', ['name' => $layer->name_layer]) }}">
                                            <input type="hidden" name="id" value="{{ $layer->id }}">
                                            @csrf
                                            <button class="text-[rgba(51,51,51,0.38)] hover:text-[#333]">
                                                <i class="fa-solid fa-xmark"></i>
                                            </button>
                                        </form>
                                    </div>
                                @endforeach

                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mt-3 justify-end content-start w-[300px] px-5">
                    <div class="">
                        <div for="" class="text-[1.4rem] w-full mb-9 relative">
                            <span
                                class="block w-full text-right text-[1.2rem] text-red-500 absolute top-0 right-1 -translate-y-full"
                                id="msg-name-layer"></span>
                            <div class="flex items-center">
                                <span class="pr-2 min-w-[77px] ">Name layer</span>
                                <input type="text" class=" w-[200px] px-4" id="name_layer">
                            </div>
                        </div>
                        <div class="w-full h-[1px] bg-slate-400 mb-4"></div>
                        <div for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Type layer</span>
                            <select name="" id="type-layer" class=" w-[200px] px-4 flex-1 outline-none border-[1px]">
                                <option value="high_zone">high_zone</option>
                                <option value="dead_zone">dead_zone</option>
                            </select>
                        </div>

                        <div for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Width</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="1" id="width-layer">
                                <input id="width-layer-range" type="range" step="0.1" value="0.1" max="50"
                                    min="0.1"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </div>

                        <div for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Height</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="1" id="height-layer">
                                <input id="height-layer-range" type="range" step="0.1" max="50" value="0.1"
                                    min="0.1"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </div>

                        <div for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">X</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="0" name="xo"
                                    id="xo">
                                <input id="xo-range" type="range" step="0.1" value="0" max="30"
                                    min="-30" value='1'
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </div>

                        <div for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Y</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class=" w-[200px] px-4 flex-1" value="0" name="yo"
                                    id="yo">
                                <input id="yo-range" type="range" step="0.1" value="0" max="30"
                                    min="-30"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">

                            </div>
                        </div>

                        <div for="" class="text-[1.4rem] w-full flex items-center mb-9">
                            <span class="pr-2 min-w-[77px]">Angle</span>
                            <div class="flex-1 flex flex-col">
                                <input type="number" class="px-4 flex-1 w-[200px] " value="0" id="z-rotate">
                                <input id="z-rotate-range" type="range" step="1" value="0" max="180"
                                    min="-180"
                                    class="layer-range w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-3">
                            </div>
                        </div>

                    </div>

                    {{-- ===list layer=== --}}
                    <div class="flex-1 mt-10  relative border-solid border-[1px] border-[#ccc] overflow-hidden "
                        id="list-layer-wrapper">
                        <label class="block text-center absolute w-full h-[30px] bg-[rgba(204,204,204,0.51)]">list
                            layer</label>
                        <div class="mt-[30px] overflow-y-visible overflow-x-auto max-h-[300px]" id="layer-container">
                            <div class="flex justify-between px-8 py-3 select-none hover:bg-[#cccccc25]">
                                <button class="delete-layer-btn text-[rgba(51,51,51,0.34)] px-2 hover:text-[#333]">
                                </button>
                            </div>
                        </div>

                        <div class="absolute bottom-0 right-0 ">
                            <form method="POST" action="{{ route('add-layer') }}" id="form-add-layer">
                                <input type="text" id="data-layer" name="data_layer" hidden>
                                @csrf
                                <button class="px-4 bg-[#0f6cbd] text-[#fff] m-4 btn" id="save-layer-btn">Save</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
    @include('frontend.blocks.message')
    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/nipplejs.js"></script>
    <script type="module" src="/js/map/createLayer.js"></script>
    <script>
        const $ = document.querySelector.bind(document)
        let isShowListlayer = JSON.parse(localStorage.getItem("isShowListlayer"));
        showIcon(isShowListlayer)
        isShowListlayer && $('#list-layer-item').classList.remove('hidden')
        $('#list-layer-btn').onclick = () => {
            $('#list-layer-item').classList.toggle('hidden')
            isShowListlayer = !isShowListlayer
            localStorage.setItem("isShowListlayer", isShowListlayer);
            showIcon(isShowListlayer)
        }

        function showIcon(boolean) {
            if (boolean) {
                $('#up-icon').classList.remove('hidden')
                $('#down-icon').classList.add('hidden')
            } else {
                $('#up-icon').classList.add('hidden')
                $('#down-icon').classList.remove('hidden')

            }
        }
    </script>
@endsection
