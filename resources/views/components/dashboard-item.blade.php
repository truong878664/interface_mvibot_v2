<a href="{{ route($route) }}">
    <li
        class="btn bg-white pt-32 w-full h-full rounded-xl p-10 text-main shadow-light shadow-gray-300/20 hover:shadow-gray-200/30">
        <div class="dashboard-content-item-icon" style="--color: {{ $color }}">
            <i class="{{ $icon }}"></i>
        </div>
        <div class="h-full flex flex-col justify-end">
            <span class="font-bold text-xl">{{ $title }}</span>
            <span class="text-lg">{{ $describe }}</span>
        </div>
    </li>
</a>
