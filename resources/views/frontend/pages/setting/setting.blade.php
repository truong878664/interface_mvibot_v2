@extends('frontend.layouts.mainLayout')
@section('content')
    <div class=" overflow-hidden w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2">
        <div class="heading ">setting</div>
        <div class="w-full h-[calc(100%_-_32px)] bg-[#EAE2DF] flex rounded-lg overflow-hidden border border-[#e5e5e5]">
            <div class="w-1/5 h-full  min-w-[220px] shadow-2xl overflow-auto setting-item-wrapper">

                @php
                    $settingItems = [
                        [
                            'title' => 'Robot',
                            'icon' => 'fa-solid fa-robot',
                            'class' => 'active robot-choose',
                            'color' => 'bg-[#010104]',
                        ],
                        [
                            'title' => 'Operation',
                            'icon' => 'fa-solid fa-person-running',
                            'class' => 'hidden',
                            'color' => 'bg-[#F94A29]',
                        ],
                        [
                            'title' => 'Parameter',
                            'icon' => 'fa-solid fa-sliders',
                            'class' => 'hidden',
                            'color' => 'bg-[#8E8A8B]',
                        ],

                        [
                            'title' => 'Wifi',
                            'icon' => 'fa-solid fa-wifi',
                            'class' => 'hidden',
                            'color' => 'bg-[#0080F6]',
                        ],
                        [
                            'title' => 'Ethernet',
                            'icon' => 'fa-solid fa-ethernet',
                            'class' => 'hidden',
                            'color' => 'bg-[#C07F00]',
                        ],
                        [
                            'title' => 'Camera',
                            'icon' => 'fa-solid fa-camera',
                            'class' => 'hidden',
                            'color' => 'bg-[#858B89]',
                        ],
                        [
                            'title' => 'Public topic',
                            'icon' => 'fa-regular fa-paper-plane',
                            'class' => 'hidden',
                            'color' => 'bg-[#6064DC]',
                        ],

                        [
                            'title' => 'Power',
                            'icon' => 'fa-solid fa-power-off',
                            'class' => 'hidden',
                            'color' => 'bg-[#FC4552]',
                        ],
                    ];
                @endphp

                @foreach ($settingItems as $index => $item)
                    <div data-index="{{ $index }}"
                        class="mx-4 mt-2 px-4 rounded-xl py-4 text-[#333] cursor-pointer flex items-center bg-[#dcd4d138] hover:bg-[#e4dcda] setting-item {{ $item['class'] }} last:mb-[100px]">
                        <label
                            class="w-10 h-10 flex justify-center items-center rounded-xl {{ $item['color'] }} text-white shadow-md text-xl pointer-events-none">
                            <i class=" pointer-events-none select-none {{ $item['icon'] }}"></i>
                        </label>
                        <span class="ml-4 pointer-events-none select-none">
                            {{ $item['title'] }}
                        </span>
                    </div>
                @endforeach

            </div>

            <div class="w-4/5 h-full bg-[#F6EEEB] px-4 py-6 border-l border-solid">
                @include('frontend.blocks.setting.settingTab.robot')
                @include('frontend.blocks.setting.settingTab.operation')
                @include('frontend.blocks.setting.settingTab.parameter')
                @include('frontend.blocks.setting.settingTab.wifi')
                @include('frontend.blocks.setting.settingTab.ethernet')
                @include('frontend.blocks.setting.settingTab.camera')
                @include('frontend.blocks.setting.settingTab.publicTopic')
                @include('frontend.blocks.setting.settingTab.rebotShutdown')
            </div>
        </div>
        {{-- @include('frontend.blocks.setting.settingTab.rbst') --}}
    </div>

    <script type="module" src="/js/setting/setting.js"></script>
@endsection
