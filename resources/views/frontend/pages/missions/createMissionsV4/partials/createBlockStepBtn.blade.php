<div class="w-full flex justify-end flex-wrap mb-10 absolute bottom-0 right-0" id="create-type-mission-wrapper">
    @php
        $blockMissions = [
            [
                'color' => 'text-red-400',
                'type' => 'Normal',
                'title' => 'Normal',
                'icon' => 'fa-solid fa-bullseye',
            ],
            [
                'color' => 'text-green-400',
                'type' => 'IfElse',
                'title' => 'If Else',
                'icon' => 'fa-solid fa-code-fork',
            ],
            [
                'color' => 'text-yellow-400',
                'type' => 'Trycatch',
                'title' => 'Try Catch',
                'icon' => 'fa-solid fa-triangle-exclamation',
            ],
            [
                'color' => 'text-sky-400',
                'type' => 'While',
                'title' => 'While',
                'icon' => 'fa-solid fa-arrows-spin',
            ],
        ];
    @endphp
    @foreach ($blockMissions as $item)
        <button data-type-mission={{ $item['type'] }} class="btn rounded-lg border px-4 py-2 text-3xl mx-2 bg-white">
            <span class="{{ $item['color'] }}">
                <i class=" {{ $item['icon'] }}"></i>
            </span>
            <span class="text-[16px] font-bold">{{ $item['title'] }}</span>
            <span class="text-blue-600">
                <i class="fa-solid fa-plus"></i>
            </span>
        </button>
    @endforeach
    <label for="step-wrapper" class="btn rounded-lg border px-4 py-2 text-3xl mx-2 bg-white">
        <span class="text-purple-700">
            <i class="fa-solid fa-square"></i>
        </span>
        <span class="text-[16px] font-bold">Step</span>
        <span class="text-blue-600">
            <i class="fa-solid fa-angle-right"></i>
        </span>
    </label>
</div>
