<select id="robots" class="hidden">
    @foreach ($robots as $robot)
        <option value="{{ $robot['name_seri'] }}">{{ $robot['name_seri'] }}</option>
    @endforeach
</select>