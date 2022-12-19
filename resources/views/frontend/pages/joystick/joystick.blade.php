<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="stylesheet" href="/dist/css/app.css">
    {{-- @vite('resources/css/app.css') --}}
</head>

<body>
    <div class="flex flex-col  justify-between h-screen">
        <header class="flex justify-between">
            <label for="" class="bg-[#0f6cbd] flex items-center text-[#fff] px-4">
                <span>choose robot:</span>
                <select class="outline-none bg-[#0f6cbd]" id="list-robot">
                    <option value="">Chose robot</option>
                    @foreach ($allRobot as $robot)
                        <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
                    @endforeach
                </select>
            </label>
            <a class="px-4 py-2" href="{{ route('dashboard.') }}">close</a>
        </header>

        <div class="w-full flex-1 flex justify-center items-center">
            <div class="h-[160px] w-[160px] md:w-[300px] md:h-[300px] lg:h-[400px] lg:w-[400px]" hidden></div>
            @include('frontend/blocks/joystick', ['mb' => '160px', 'md' => '300px', 'lg' => '400px'])
        </div>

        <div class="w-full">
        </div>
    </div>

    <script src="/js/library/roslib.min.js"></script>
    <script src="/js/library/ros3d.min.js"></script>

    <script type="module" src="/js/joystick/joystick.js"></script>
</body>

</html>
