@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="lg:flex w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 overflow-auto border">
        <div class="h-2/3 lg:h-full lg:w-2/3 relative">
            <label class="absolute h-[30px] bg-[#0f6cbd] text-[#fff] m-4 px-2 rounded-sm z-[1000]">
                <select name="" id="robot-mapping" class="bg-transparent outline-none">
                    <option value="">select robot</option>
                    @foreach ($robotSlam as $item)
                        <option value="{{ $item['name_seri'] }}" class="text-[#ccc]">{{ $item['name_seri'] }}</option>
                    @endforeach
                </select>
            </label>
            <div class="w-full h-full overflow-hidden bg-[#333] rounded-md" id="map-wrapper">
                <div class="w-full h-full" id="map"></div>
            </div>
        </div>
        <div class="h-1/3 flex justify-between items-center px-7 lg:h-full lg:w-1/3 lg:flex-col xl:flex-col bg-stone-300 rounded-md">
            <div class="w-full mt-[32px] h-full">
                <div class="flex">
                    <input type="text" class="px-3 w-[200px] text-2xl placeholder:text-2xl rounded-lg"
                        placeholder="Name map" id="create_map">
                    <button class="bg-[#0f6cbd] px-3 py-2 text-[#fff] btn text-2xl ml-4 rounded-lg" id="create_map_btn">Save map</button>
                </div>
                <span class="text-[1.5rem] text-red-500 block" id="error_create_map"></span>
            </div>
            {{-- <div class="h-[160px] w-[160px] md:w-[220px] md:h-[220px] lg:h-[300px] lg:w-[300px]"></div> --}}
            <div class="lg:p-10 lg:mb-[70px]">
                @include('frontend/blocks/joystick', ['mb' => '160px', 'md' => '220px', 'lg' => '300px'])
            </div>

        </div>
    </div>

    <script src="/js/library/roslib.min.js"></script>
    <script type="module" src="/js/mapping.js"></script>
@endsection
