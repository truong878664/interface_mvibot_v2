@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-full h-full p-1">
        <div class="flex justify-between mb-1">
            @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'robot-status'])
        </div>
        <style>
            [data-status-robot="yes"] .no {
                color: rgb(220, 16, 16);
            }

            [data-status-robot="yes"] .yes {
                color: #54B435;
            }
        </style>

        @php
            $statusDetails = [
                [
                    'title' => 'robot',
                    'icon' => 'fa-solid fa-robot',
                    'color' => 'bg-red-400',
                ],
                [
                    'title' => 'battery',
                    'icon' => 'fa-solid fa-bolt',
                    'color' => 'bg-yellow-400',
                ],
                [
                    'title' => 'device',
                    'icon' => 'fa-solid fa-tablet-screen-button',
                    'color' => 'bg-blue-400',
                ],
                [
                    'title' => 'motor',
                    'icon' => 'fa-solid fa-fax',
                    'color' => 'bg-[#8d6e63]',
                ],
            ];
        @endphp
        <div class="group/status wrapper-battery-content overflow-auto flex flex-wrap data-[status-robot=no]:!text-[#d2d2d2]"
            data-status-robot="no">
            @foreach ($statusDetails as $item)
                <div class="w-1/2 md:w-1/3 lg:w-1/4">
                    <div class="w-[calc(100%_-_8px)] mx-2 bg-[#fff] rounded-md shadow-md">
                        <div class="flex justify-between items-center px-4 py-1 cursor-pointer border-b group/status-title peer/status-title status-title"
                            data-status="hidden">
                            <div class="">
                                <label
                                    class="inline-flex justify-center items-center p-3 rounded-md {{ $item['color'] }} text-white">
                                    <i class="{{ $item['icon'] }}"></i>
                                </label>
                                <span class="font-bold capitalize"
                                    id="{{ $item['title'] === 'robot' ? 'name_seri' : '' }}">{{ $item['title'] }}</span>
                            </div>
                            <div class="flex items-center">
                                <div class="group/status-item  text-yellow-400 data-[status-item=ok]:text-green-500 data-[status-item=ng]:text-red-500"
                                    data-title-status="{{ $item['title'] }}" data-status-item="">
                                    <span class="">
                                        <i class="fa-solid fa-circle"></i>
                                    </span>
                                    <span class="group-data-[status-item=ng]/status-item:inline-block hidden">
                                        NG
                                    </span>
                                    <span class="group-data-[status-item=ok]/status-item:inline-block hidden">
                                        OK
                                    </span>
                                </div>
                                <div
                                    class="text-[#0f6cbd] group-data-[status=show]/status-title:rotate-180 ml-3 transition-all duration-500 block">
                                    <i class="fa-solid fa-caret-down"></i>
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex justify-end status-item-detail overflow-hidden peer-data-[status=hidden]/status-title:hidden">
                            @switch($item['title'])
                                @case('robot')
                                    @include('frontend.blocks.statusDetail.robot')
                                @break

                                @case('battery')
                                    @include('frontend.blocks.statusDetail.battery')
                                @break

                                @case('device')
                                    @include('frontend.blocks.statusDetail.device')
                                @break

                                @case('motor')
                                    @include('frontend.blocks.statusDetail.motor')
                                @break

                                @default
                            @endswitch
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <script>
        const statusTitles = document.querySelectorAll('.status-title')
        statusTitles.forEach(element => {
            element.onclick = (e) => {
                const status = element.dataset.status
                element.dataset.status = status === 'hidden' ? 'show' : 'hidden'
            }
        });
    </script>
    <script type="module" src="/js/status/status2.js"></script>
@endsection
