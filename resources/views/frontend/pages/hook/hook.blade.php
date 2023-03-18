@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="flex w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2 overflow-auto border shadow-sm shadow-[#ccc]">
        <div class="h-full w-1/4">
            <input type="range" class="w-full change-hook">
        </div>

        <div class="w-3/4 flex justify-center items-center overflow-hidden">
            <div class="w-full img-wrapper relative">
                <div class="w-full img-item bg-contain bg-no-repeat bg-center absolute left-0 top-0"
                    style="background-image: url(/img/hook/robot2.png)"></div>
                <div class="w-full img-item bg-contain bg-no-repeat bg-center absolute left-0 top-0 origin-[50%_20%] hook-img"
                    style="background-image: url(/img/hook/hook2.png);transform: rotate(0deg);"></div>
                <div class="w-full img-item bg-contain bg-no-repeat bg-center absolute left-0 top-0"
                    style="background-image: url(/img/hook/path.png)"></div>
            </div>
        </div>

    </div>
    <script>
        const width = document.querySelector('.img-wrapper')
        const style = getComputedStyle(width);
        const height = (style.width.slice(0, style.width.length - 2)) * 68.8 / 100 + "px"
        width.style.height = height

        document.querySelectorAll('.img-item').forEach(element => {
            element.style.height = height
        });
        const MAX_ROTATE = 90
        const MIN_ROTATE = -90
        const hook = document.querySelector('.hook-img')
        const rangeHook = document.querySelector('.change-hook')
        rangeHook.oninput = (e) => {
            const value = e.target.value
            hook.style.rotate = -(value * (MAX_ROTATE - MIN_ROTATE) / 100 - 90) + "deg"
        }
    </script>
@endsection
