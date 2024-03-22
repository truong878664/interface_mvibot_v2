<div class="function-form-item function-mission-tab relative hidden rounded-md bg-white p-4 pb-[60px]"
    data-type="telegram">
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonDismiss', [
        'type' => 'telegram',
    ])
    <div class="mb-4 flex flex-col">
        <label for="">Name function telegram</label>
        <input class="input-reset valid-input w-[200px] px-4 py-1" type="text" name="name_telegram" required />
    </div>

    <div class="flex flex-col">
        <label for="">token</label>
        <input class="input-reset input-type-number w-[200px] px-4 py-1" type="text" name="token" required />
    </div>
    <div class="flex flex-col">
        <label for="">Chat id</label>
        <input class="input-reset input-type-number w-[200px] px-4 py-1" type="text" name="chat_id" required />
    </div>
    <div class="flex flex-col">
        <label for="">Message</label>
        <textarea class="input-reset input-type-number min-w-[400px] px-4 py-1 resize" cols="2" rows="3"
            name="msg"></textarea>
    </div>


    @include('frontend.blocks.mission.createMissions.functionTab.idMission')
    @include('frontend.pages.missions.createMissionsV4.partials.function.tab.buttonSave', [
        'type' => 'telegram',
    ])
</div>
