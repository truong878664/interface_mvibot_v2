@extends('frontend.layouts.mainLayout')
@section('content')
    <div class=" overflow-hidden w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2">
        <div class="heading ">setting</div>
        <div class="w-full h-[calc(100%_-_32px)] bg-[#EAE2DF] flex rounded-lg overflow-hidden border border-[#e5e5e5]">
            <div class="w-1/5 h-full  min-w-[220px] shadow-2xl overflow-auto">

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Robot',
                    'icon' => 'fa-solid fa-robot',
                    'class' => 'active robot-choose',
                    'color' => '#010104',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Parameter',
                    'icon' => 'fa-solid fa-dolly',
                    'class' => 'hidden',
                    'color' => '#8E8A8B',
                ])
                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Mode',
                    'icon' => 'fa-solid fa-person-walking',
                    'class' => 'hidden',
                    'color' => '#D61355',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Wifi',
                    'icon' => 'fa-solid fa-wifi',
                    'class' => 'hidden',
                    'color' => '#0080F6',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'IP',
                    'icon' => 'fa-solid fa-location-dot',
                    'class' => 'hidden',
                    'color' => '#F94A29',
                ])
                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Device',
                    'icon' => 'fa-solid fa-tablet-screen-button',
                    'class' => 'hidden',
                    'color' => '#858B89',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Public topic',
                    'icon' => 'fa-regular fa-paper-plane',
                    'class' => 'hidden',
                    'color' => '#6064DC',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Volume',
                    'icon' => 'fa-solid fa-volume-high',
                    'class' => 'hidden',
                    'color' => '#0080F6',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Power',
                    'icon' => 'fa-solid fa-power-off',
                    'class' => 'hidden',
                    'color' => '#FC4552',
                ])
            </div>

            <div class="w-4/5 h-full bg-[#F6EEEB] px-4 py-6 border-l border-solid">
                @include('frontend.blocks.setting.settingTab.robot')
                @include('frontend.blocks.setting.settingTab.parameter')
                @include('frontend.blocks.setting.settingTab.mode')
                @include('frontend.blocks.setting.settingTab.wifi')
                @include('frontend.blocks.setting.settingTab.ip')
                @include('frontend.blocks.setting.settingTab.camera')
                @include('frontend.blocks.setting.settingTab.publicTopic')
                @include('frontend.blocks.setting.settingTab.volume')
                @include('frontend.blocks.setting.settingTab.rebotShutdown')
            </div>
        </div>
        @include('frontend.blocks.setting.settingTab.rbst')
    </div>
    <script type="module" src="/js/setting/setting.js"></script>
@endsection

