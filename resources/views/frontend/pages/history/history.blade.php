@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="w-[calc(100%_-_10px)] m-2  h-[calc(100%_-_10px)] flex flex-col">
        <div class="flex mx-4 items-center">
            @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'robot-history'])
        </div>
        <div class="w-full mt-4 h-full overflow-y-auto">
            <table class="w-full text-2xl font-['ubuntu-mono']">
                <thead class="">
                    <tr class="">
                        <th class="sticky top-0 bg-[#f5f5f5] p-4 w-1/12">STT</th>
                        <th class="sticky top-0 bg-[#f5f5f5] p-4 w-1/12">Type</th>
                        <th class="sticky top-0 bg-[#f5f5f5] p-4 w-2/12">Time error</th>
                        <th class="sticky top-0 bg-[#f5f5f5] p-4 w-8/12">Log</th>
                    </tr>
                </thead>
                <tbody class="log-content">
                    {{-- @for ($i = 0; $i < 20; $i++)
                        <tr>
                            <td data-log='{{ $i % 2 === 0 ? 'log' : 'error' }}'
                                class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 text-left">
                                {{ $i + 1 }}</td>
                            <td data-log='{{ $i % 2 === 0 ? 'log' : 'error' }}'
                                class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 text-left">
                                {{ $i % 2 === 0 ? 'log' : 'error' }}</td>
                            <td data-log='{{ $i % 2 === 0 ? 'log' : 'error' }}'
                                class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 text-left">
                                consectetur adipisicing </td>
                            <td data-log='{{ $i % 2 === 0 ? 'log' : 'error' }}'
                                class=" border-t  data-[log=log]:text-blue-700 data-[log=error]:text-red-600 px-4 py-2 ">
                                Lorem
                                ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum quasi magni vitae quidem nemo
                                itaque sunt possimus illo veritatis libero, quo repellat perspiciatis qui odit minima facere
                                excepturi accusamus repudiandae!</td>
                        </tr>
                    @endfor --}}
                </tbody>
            </table>

        </div>
    </div>
    <script type="module" src="/js/history/history.js"></script>
@endsection
