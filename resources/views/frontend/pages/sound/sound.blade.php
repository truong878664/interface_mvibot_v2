@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="heading dashboard-heading">Sound</div>
    <div class="w-[calc(100%_-_10px)] h-[calc(100%_-_38px)] m-2 flex flex-col overflow-auto">
        <div class="w-1/2 mx-auto py-10 px-5 border-stone-300 border bg-stone-200 min-w-[500px]">
            <div class="flex justify-between items-center mb-8">
                <select name="" id="robot-sound"
                    class="text-2xl borde rounded-md border-[#0f6cbd] mr-[20px] bg-[#0f6cbd] py-2 text-white px-4 outline-none inline-block">
                    <option value="">Select robot</option>
                    @foreach ($allRobot as $robot)
                        <option value="{{ $robot->name_seri }}">{{ $robot->name_seri }}</option>
                    @endforeach
                </select>
                <div class="inline-block">
                    <button
                        class="float-right text-xl md:text-3xl btn bg-red-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 stop-sound-btn">Stop</button>

                    <button
                        class="float-right text-xl md:text-3xl btn bg-main text-[#fff] self-end px-4 py-2 rounded-md mr-4 basic-sound-btn">Basic</button>
                    <button
                        class="float-right text-xl md:text-3xl btn bg-yellow-500 text-[#fff] self-end px-4 py-2 rounded-md mr-4 custom-sound-btn">Custom</button>
                </div>

            </div>
            <table class="w-full border text-2xl bg-white " id="table-sound">
                <tr class="text-center">
                    <th class="border border-solit border-[#ccc] py-2">STT</th>
                    <th class="border border-solit border-[#ccc] py-2">Name</th>
                    <th class="border border-solit border-[#ccc] py-2">Time</th>
                    <th class="border border-solit border-[#ccc] py-2">Action</th>
                </tr>

                <tbody>

                    @php
                        $pathsSoundSystem = ['/sound/system/sound3.mp3', '/sound/system/sound4.mp3', '/sound/system/start1.mp3', '/sound/system/start2.mp3', '/sound/system/start3.mp3', '/sound/system/start4.mp3', '/sound/system/start5.mp3'];
                        $namesSoundSystem = ['sound3.mp3', 'sound4.mp3', 'start1.mp3', 'start2.mp3', 'start3.mp3', 'start4.mp3', 'start5.mp3'];
                    @endphp

                    @foreach ($pathsSoundSystem as $index => $sound)
                        <tr class="text-center sound-item">
                            <td class="border border-solit border-[#ccc]">{{ $index + 1 }}</td>
                            <td class="border border-solit border-[#ccc]"> {{ $namesSoundSystem[$index] }}
                                <audio class="sound-sound3.mp3 audio-item">
                                    <source src="{{ $sound }}" type="audio/mpeg" class="source-sound">
                                </audio>
                            </td>
                            <td class="border border-solit border-[#ccc] time-sound">00:00</td>
                            <td class="border border-solit border-[#ccc]">

                                <button
                                    class="pointer-events-none opacity-50 text-2xl h-[30px] w-[30px] text-center leading-[30px] m-2 bg-[#bfbfbf] hover:bg-main btn rounded-md">
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>
                                <button
                                    class="text-2xl h-[30px] w-[30px] text-center leading-[30px] m-2 bg-[#e9e9e9] hover:bg-main btn rounded-md hover:bg-[#e0e0e0] play-sound-btn">
                                    <i class="fa-solid fa-play"></i>
                                </button>

                                <button
                                    class="text-2xl h-[30px] w-[30px] text-center leading-[30px] m-2 bg-[#e9e9e9] hover:bg-main btn rounded-md hover:bg-[#e0e0e0] send-sound-btn">
                                    <i class="fa-solid fa-paper-plane"></i>
                                </button>

                            </td>
                        </tr>
                    @endforeach
                </tbody>


            </table>
            <form class="mt-4 flex justify-center" action="/upload/sound" method="POST" enctype="multipart/form-data"
                id="form-upload-sound">
                <label for="sound-file"
                    class="flex flex-col items-center justify-center w-[200px] border-2 pb-4 border-gray-400 border-dashed rounded-lg cursor-pointer bg-[#dcdcdc] ">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">

                        <p class="mb-2 text-xl text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click toupload (MP3)</span>
                        </p>
                        <span class="text-xl name-sound-up"></span>
                    </div>
                    @csrf

                    <input id="sound-file" type="file" accept=".mp3" max-size="6000" class="hidden" name="sound">
                    <button
                        class="float-right text-xl btn text-blue-400 bg-blue-200 px-8 py-1 rounded-full self-center upload-sound-submit">
                        <i class="fa-solid fa-upload"></i>
                    </button>
                </label>
            </form>






            @php
                function getSound()
                {
                    $fileSound = json_encode(glob('sound/custom/*'));
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
