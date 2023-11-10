<nav class="bg-slate-5 relative flex h-full flex-col shadow-md grid-in-navbar sm:min-w-0">
    <ul class="grid h-full grid-cols-3 items-center justify-between sm:flex sm:h-1/4 sm:w-full sm:flex-col xl:h-1/5">
        <a class="h-full sm:w-full" href="{{ route('home') }}">
            <li
                class="home flex h-full cursor-pointer flex-col items-center justify-center text-2xl text-stone-600/50 [&.active]:text-main">
                <i class="fa-solid fa-house"></i>
                <span class="text-xs">Home</span>
            </li>
        </a>
        <a class="h-full sm:w-full" href="{{ route('dashboard.') }}">
            <li
                class="dashboard flex h-full cursor-pointer flex-col items-center justify-center text-2xl text-stone-600/50 [&.active]:text-main">
                <i class="fa-solid fa-gamepad"></i>
                <span class="text-xs">Dashboard</span>
            </li>
        </a>
        <a class="h-full sm:w-full" href="{{ route('user') }}">
            <li
                class="user flex h-full cursor-pointer flex-col items-center justify-center text-2xl text-stone-600/50 [&.active]:text-main">
                <i class="fa-solid fa-user-gear"></i>
                <span class="text-xs">User</span>
            </li>
        </a>
    </ul>
    <hr />
    <ul
        class="bookmark-wrapper py-2 px-0.5 absolute left-0 top-1/4 hidden h-3/4 w-full overflow-auto sm:flex sm:flex-col sm:gap-3 xl:top-[20%] xl:h-4/5">
    </ul>
</nav>
