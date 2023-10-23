<a href="{{ route($route) }}">
    <li
        class="btn bg-white pt-24 w-full h-full rounded-xl p-10 text-main shadow-light shadow-gray-300/20 hover:shadow-gray-200/30">
        <div class="absolute top-0 right-0 text-5xl text-white opacity-80 z-10 p-6 after:shadow-light after:shadow-white/20 after:text-7xl after:bg-[var(--color)] after:rounded-full after:h-[1em] after:w-[1em] after:block after:-translate-x-1/2 after:-translate-y-1/2 after:-z-[1] after:absolute after:left-1/2 after:top-1/2"
            style="--color: {{ $color }}"><i class="{{ $icon }}"></i>
        </div>
        <div class="h-full flex flex-col justify-end">
            <span class="font-bold text-xl">{{ $title }}</span>
            <span class="text-x">{{ $describe }}</span>
        </div>
    </li>
</a>
