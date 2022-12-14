@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="h-full w-full overflow-hidden">
        <div class="heading ">setting</div>

        <div class="w-full h-[calc(100%_-_38px)] flex">
            <div class="w-1/5 h-full bg-stone-300">
                {{-- setting item --}}

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Public topic',
                    'icon' => 'fa-regular fa-paper-plane',
                    'class' => 'active',
                ])
                {{-- @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Network',
                    'icon' => 'fa-solid fa-earth-asia',
                    'class' => '',
                ]) --}}

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Sound',
                    'icon' => 'fa-solid fa-music',
                    'class' => '',
                ])

                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Users',
                    'icon' => 'fa-solid fa-user-gear',
                    'class' => '',
                ])
                @include('frontend.blocks.setting.settingItem', [
                    'title' => 'Reboot / Shutdown',
                    'icon' => 'fa-solid fa-power-off',
                    'class' => '',
                ])
            </div>

            <div class="w-4/5 h-full bg-stone-200 px-4 py-6 border-l border-solid">
                {{-- setting detail --}}
                @include('frontend.blocks.setting.settingTab.publicTopic')
                {{-- @include('frontend.blocks.setting.settingTab.network') --}}
                @include('frontend.blocks.setting.settingTab.sound')
                @include('frontend.blocks.setting.settingTab.users')
                @include('frontend.blocks.setting.settingTab.rebotShutdown')
            </div>
        </div>
    </div>
    <script type="module" src="/js/setting/publishTopic.js"></script>
    <script type="module" src="/js/setting/rebootShutdown.js"></script>
    <script type="module" src="/js/setting/setting.js"></script>
    <script type="module" src="/js/setting/user.js"></script>
    <script type="module" src="/js/setting/sound.js"></script>
@endsection
