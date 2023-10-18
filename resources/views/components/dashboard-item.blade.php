<a href="{{ route($route) }}">
    <li
        class="btn bg-white pt-52 w-full rounded-xl p-10 text-main shadow-light shadow-gray-300/20 hover:shadow-gray-200/30">
        <div class="dashboard-content-item-icon" style="--color: {{ $color }}">
            <i class="{{ $icon }}"></i>
        </div>
        <div class="h-full flex flex-col justify-end">
            <span class="font-bold text-3xl">{{ $title }}</span>
            <span>{{ $describe }}</span>
        </div>
    </li>
</a>
