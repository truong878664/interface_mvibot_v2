<a class="dashboard-content-item blue btn" href="{{ route($route) }}">
    <div class="dashboard-content-item-icon " style="--color: {{ $color }}"><i class="{{ $icon }}"></i>
    </div>
    <div class="dashboard-content-item-wrapper">
        <h3 class="dashboard-content-item-heading">{{ $title }}</h3>
        <p class="dashboard-content-item-describe">{{ $describe }}</p>
    </div>
</a>
