@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="h-full w-full overflow-hidden">
        <div class="heading ">setting</div>
        <div class="w-full h-[calc(100%_-_38px)] flex">
            <div class="w-1/5 h-full bg-[#dcdcdc] border-r-[1px] border-[#ababab]">
                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Robot',
                    'icon' => 'fa-solid fa-robot',
                    'class' => 'active',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Settings robot',
                    'icon' => 'fa-solid fa-gears',
                    'class' => '',
                ])
                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Public topic',
                    'icon' => 'fa-regular fa-paper-plane',
                    'class' => '',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Reboot / Shutdown',
                    'icon' => 'fa-solid fa-power-off',
                    'class' => '',
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
