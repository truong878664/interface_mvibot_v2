<nav class="navbar-main z-10 flex h-full w-full min-w-[320px] md:min-w-0 flex-col bg-slate-50 shadow-sm">
    <ul class="grid grid-cols-3 h-full justify-between items-center md:flex md:flex-col md:h-fit md:w-full">
        <a class="h-full md:w-full" href="{{ route('home') }}">
            <li
                class="home flex cursor-pointer flex-col items-center justify-center border-b-4 h-full text-2xl text-stone-600/50 [&.active]:border-main [&.active]:text-main md:border-l-4 md:border-b-0 md:py-3">
                <i class="fa-solid fa-house"></i>
                <span class="text-sm">Home</span>
            </li>
        </a>
        <a class="h-full md:w-full" href="{{ route('dashboard.') }}">
            <li
                class="dashboard flex cursor-pointer flex-col items-center justify-center border-b-4 h-full text-2xl text-stone-600/50 [&.active]:border-main [&.active]:text-main md:border-l-4 md:border-b-0 md:py-3">
                <i class="fa-solid fa-gamepad"></i>
                <span class="text-sm">Dashboard</span>
            </li>
        </a>
        <a class="h-full md:w-full" href="{{ route('user') }}">
            <li
                class="user flex cursor-pointer flex-col items-center justify-center border-b-4 h-full text-2xl text-stone-600/50 [&.active]:border-main [&.active]:text-main md:border-l-4 md:border-b-0 md:py-3">
                <i class="fa-solid fa-user-gear"></i>
                <span class="text-sm">User</span>
            </li>
        </a>
    </ul>
    <hr />
    <ul
        class="bookmark-wrapper hidden h-full flex-col items-center overflow-y-auto gap-4 overflow-x-hidden pt-4 md:flex">
    </ul>
</nav>
