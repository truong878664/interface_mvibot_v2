<div class="tracking-mission-wrapper">
    <div class="step-mission-tracking-wrapper">
        <p class="step-mission-heading">Step tracking mission</p>
        <div class="tracking-mission-step-wrapper">
            <div class="step-mission-tracking"></div>
            <div class="tracking-misison-btn">
                <x-button tag="button" title='stop' class="stop-mission-btn" attribute=""></x-button>
                <x-button tag="button" title='Continue' class="continue-mission-btn" attribute=""></x-button>
            </div>
        </div>
    </div>
    <div class="map-tracking" id="map">
    </div>
    <script type="module" src="/js/missions/trackingMission.js"></script>
</div>
<style>
    .tracking-mission-step-wrapper {
        display: flex;
        justify-content: space-between;
    }

    .stop-mission-btn {
        background: #FF1700;
    }

    .continue-mission-btn {
        background: #54B435;
    }
</style>
