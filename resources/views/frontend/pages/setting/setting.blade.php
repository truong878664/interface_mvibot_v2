@extends('frontend.layouts.mainLayout')
@section('content')
    <div class=" overflow-hidden w-[calc(100%_-_10px)] h-[calc(100%_-_10px)] m-2">
        <div class="heading ">setting</div>
        <div class="w-full h-[calc(100%_-_32px)] bg-[#e1e1e1] flex rounded-lg overflow-hidden border border-[#e5e5e5]">
            <div class="w-1/5 h-full border-r-[1px] border-[#ccc]">
                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Robot',
                    'icon' => 'fa-solid fa-robot',
                    'class' => 'active robot-choose',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Settings robot',
                    'icon' => 'fa-solid fa-gears',
                    'class' => 'hidden',
                ])
                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Public topic',
                    'icon' => 'fa-regular fa-paper-plane',
                    'class' => 'hidden',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Reboot / Shutdown',
                    'icon' => 'fa-solid fa-power-off',
                    'class' => 'hidden',
                ])
            </div>

            <div class="w-4/5 h-full bg-[#ececec] px-4 py-6 border-l border-solid">
                @include('frontend.blocks.setting.settingTab.robot')
                @include('frontend.blocks.setting.settingTab.settingRobot')
                @include('frontend.blocks.setting.settingTab.publicTopic')
                @include('frontend.blocks.setting.settingTab.rebotShutdown')
            </div>
        </div>
    </div>
    <script type="module" src="/js/setting/publishTopic.js"></script>
    <script type="module" src="/js/setting/rebootShutdown.js"></script>
    <script type="module" src="/js/setting/setting.js"></script>
    <script type="module" src="/js/setting/robot.js"></script>
    <script type="module" src="/js/setting/settingRobot.js"></script>
@endsection
