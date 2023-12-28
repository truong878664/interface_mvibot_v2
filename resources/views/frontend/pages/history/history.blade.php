@extends('frontend.layouts.mainLayout')
@section('content')
    <div class="p-2 flex flex-col h-full">
        <div class="flex mx-4 justify-between">
            <div class="flex">
                @include('frontend.blocks.selectRobot', ['type' => 'robot', 'id' => 'robot-history'])
                <button class="btn px-2 py-0.5 rounded border mt-2" data-name="refresh-btn">
                    <i class="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
            <div class="mt-2">
                <button class="px-4 py-1 rounded bg-sky-500 text-white" data-name="reset-btn">Reset value</button>
                <button class="px-4 py-1 rounded bg-white border" data-name="export-btn">Export</button>
            </div>

        </div>
        <div class="w-full mt-4 flex-1 overflow-y-auto">
            <table class="w-full font-['ubuntu-mono']">
                <thead class="sticky top-0">
                    <tr class="bg-stone-50">
                        <th class="p-4 w-1/12 border">No</th>
                        <th class="p-4 w-1/12 border">Type</th>
                        <th class="p-4 w-1/12 border">Time</th>
                        <th class="p-4 w-8/12 border">Log</th>
                        <th class="p-4 w-1/12 border">action</th>
                    </tr>
                </thead>
                <tbody class="log-content bg-stone-50"></tbody>
            </table>

        </div>
    </div>
    <script type="module" src="/js/history/history.js"></script>
@endsection
