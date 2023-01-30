@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full flex flex-col">
        <div class="flex justify-between mt-3">
            <label for="" class="bg-[#0f6cbd] flex items-center text-[#fff] px-4">
                <span>choose robot:</span>
                <select class="outline-none bg-[#0f6cbd]" id="list-robot">
                    <option value="">Chose robot</option>
                    @foreach ($allRobot as $robot)
                        <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
                    @endforeach
                </select>
            </label>
        </div>

        <div class="w-full flex-1 flex justify-center items-center">
            <div class="h-[160px] w-[160px] md:w-[300px] md:h-[300px] lg:h-[400px] lg:w-[400px]" hidden></div>
            @include('frontend/blocks/joystick', ['mb' => '160px', 'md' => '300px', 'lg' => '400px'])
        </div>

        <div class="w-full">
        </div>
    </div>
    <script type="module" src="/js/joystick/joystick.js"></script>
@endsection
