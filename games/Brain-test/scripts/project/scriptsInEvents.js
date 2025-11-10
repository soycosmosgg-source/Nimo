var ad1 = null;

window.PokiSDK = {
    init: function() { 
        console.log("PokiSDK disabled - no ads");
    },
    gameplayStart: function() { 
        console.log("Gameplay start (ads disabled)");
    },
    gameplayStop: function() { 
        console.log("Gameplay stop (ads disabled)");
    },
    commercialBreak: function() { 
        console.log("Commercial break disabled");
        return Promise.resolve();
    },
    rewardedBreak: function() { 
        console.log("Rewarded break disabled - reward granted");
        return Promise.resolve(true); 
    },
    displayAd: function() { 
        console.log("Display ad disabled");
    },
    destroyAd: function() { 
        console.log("Destroy ad disabled");
    }
};

window.showAd1 = function(){
    console.log("showAd1 disabled - no ads");
}

window.showAd2 = function(){
    console.log("showAd2 disabled - no ads");
}

window.showAd3 = function(){
    console.log("showAd3 disabled - no ads");
}

window.setPositionLandscape = function(){
}

window.setPositionPortrait = function(){
}

window.destroyAd1 = function(){
    console.log("destroyAd1 disabled - no ads");
}

const scriptsInEvents = {

    async Homee_Event23_Act1(runtime, localVars)
    {
        PokiSDK.gameplayStart();
    },

    async Homee_Event24_Act2(runtime, localVars)
    {
        console.log("Commercial break skipped - continuing game");
        PokiSDK.gameplayStart();
    },

    async Homee_Event58_Act1(runtime, localVars)
    {
        PokiSDK.gameplayStart();
    },

    async Homee_Event59_Act2(runtime, localVars)
    {
        console.log("Commercial break skipped - continuing game");
        PokiSDK.gameplayStart();
    },

    async Starte_Event2_Act2(runtime, localVars)
    {
        PokiSDK.init();
    },

    async Globale_Event7_Act1(runtime, localVars)
    {
        PokiSDK.gameplayStop();
    },

    async Globale_Event7_Act2(runtime, localVars)
    {
        window.destroyAd1();
    },

    async Globale_Event8_Act1(runtime, localVars)
    {
        PokiSDK.gameplayStop();
    },

    async Globale_Event8_Act2(runtime, localVars)
    {
        window.destroyAd1();
    },

    async Globale_Event12_Act3(runtime, localVars)
    {
        PokiSDK.gameplayStop();
    },

    async Globale_Event12_Act4(runtime, localVars)
    {

        console.log("Rewarded break - automatically granting reward");
        runtime.callFunction("rewardedSuccessful");
        PokiSDK.gameplayStart();
    },

    async Globale_Event30_Act2(runtime, localVars)
    {
        PokiSDK.gameplayStop();
    },

    async Globale_Event30_Act3(runtime, localVars)
    {

        console.log("Rewarded break - automatically granting reward");
        runtime.callFunction("rewardedSuccessful");
        PokiSDK.gameplayStart();
    },

    async Globale_Event39_Act1(runtime, localVars)
    {
        PokiSDK.gameplayStop();
    },

    async Globale_Event43_Act1(runtime, localVars)
    {
        window.showAd2();
        window.setPositionPortrait();
    },

    async Globale_Event44_Act1(runtime, localVars)
    {
        window.showAd3();
        window.setPositionLandscape();
    },

    async Globale_Event46_Act1(runtime, localVars)
    {
        window.showAd3();
    },

    async Globale_Event47_Act1(runtime, localVars)
    {
        window.showAd1();
    },

    async Globale_Event53_Act1(runtime, localVars)
    {
        window.destroyAd1();
    },

    async Globale_Event124_Act2(runtime, localVars)
    {
        console.log("Commercial break skipped");
        runtime.callFunction("pokiCommercial"); 
        runtime.callFunction("unpauseGame");
        window.destroyAd1();
        PokiSDK.gameplayStart();
    },

    async Globale_Event139_Act2(runtime, localVars)
    {
        console.log("Commercial break skipped");
        runtime.callFunction("pokiCommercial"); 
        runtime.callFunction("unpauseGame");
        window.destroyAd1();
        PokiSDK.gameplayStart();
    },

    async Levelselecte_Event6_Act1(runtime, localVars)
    {
        PokiSDK.gameplayStart();
    },

    async Levelselecte_Event13_Act1(runtime, localVars)
    {
        PokiSDK.gameplayStart();
    }

};

self.C3.ScriptsInEvents = scriptsInEvents;