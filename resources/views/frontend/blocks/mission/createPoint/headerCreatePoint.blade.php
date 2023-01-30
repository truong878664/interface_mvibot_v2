<?php
$fileMapList = glob('../maps/*');
?>
<div class="map-active">
    <span>Map active:</span>
    <span>
        @foreach ($fileMapList as $item)
            @if (strpos($item, "$mapActive.yaml"))
                {{ $mapActive }}
            @else
            @endif
        @endforeach
    </span>
    <div class="">
        <span>x:</span><span class="x-value"></span>
        <span>y:</span><span class="y-value"></span>
    </div>
</div>
<div class="line-x"></div>
<div class="line-y"></div>
<label class="switch">
    <input class="check-click-point" type="checkbox">
    <span class="slider round"></span>
</label>
