@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Sound</div>
    <div class="w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 flex flex-col overflow-auto">
        <div class="w-1/2 mx-auto py-10 px-5 border-stone-300 border bg-stone-200">
            <select name="" id="robot-sound"
                class="text-2xl border rounded-md border-[#0f6cbd] mr-[20px] bg-[#0f6cbd] py-2 text-white px-4 outline-none mb-4">
                <option value="">Select robot</option>
                @foreach ($allRobot as $robot)
                    <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                @endforeach
            </select>

            <table class="w-full border text-2xl bg-white" id="table-sound">
                <tr class="text-center">
                    <th class="border border-solit border-[#ccc] py-2">STT</th>
                    <th class="border border-solit border-[#ccc] py-2">Name</th>
                    <th class="border border-solit border-[#ccc] py-2">Time</th>
                    <th class="border border-solit border-[#ccc] py-2">Action</th>
                </tr>
            </table>
            <form class="mt-4 flex justify-center" action="/upload/sound" method="POST">
                <label for="sound-file"
                    class="flex flex-col items-center justify-center w-1/4 border-2 pb-4 border-gray-400 border-dashed rounded-lg cursor-pointer bg-[#dcdcdc] ">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">

                        <p class="mb-2 text-xl text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click toupload (MP3)</span>
                        </p>
                        <span class="text-xl name-sound-up"></span>
                    </div>
                    <input id="sound-file" type="file" accept=".mp3" class="hidden" name="sound_file"/>
                    <button class="float-right text-xl btn text-blue-400 bg-blue-200 px-8 py-1 rounded-full self-center">
                        <i class="fa-solid fa-upload"></i>
                    </button>
                </label>
                @csrf
            </form>
            <div class="mt-4">
                <button
                    class="float-right text-xl md:text-3xl btn bg-red-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 stop-sound-btn">Stop</button>

                <button
                    class="float-right text-xl md:text-3xl btn bg-main text-[#fff] self-end px-4 py-2 rounded-md mr-4 basic-sound-btn">Basic</button>
                <button
                    class="float-right text-xl md:text-3xl btn bg-yellow-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 custom-sound-btn">Custom</button>
            </div>





            @php
                function getSound()
                {
                    $fileSound = json_encode(glob('sound/*'));
                    echo $fileSound;
                }
                
            @endphp

            <input type="hidden" class="pathSound" value="">

            <script>
                (function getPathSound() {
                    const pathSound = '<?php getSound(); ?>';
                    document.querySelector(".pathSound").value = pathSound;
                })()
            </script>
        </div>
    </div>
    <script type="module" src="/js/sound/sound.js"></script>
@endsection
