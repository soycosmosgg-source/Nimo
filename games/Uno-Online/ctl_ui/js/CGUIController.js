var MULTIPLAYER_GAME = true;
var LOGIN_SECTION = false;
var MULTILANGUAGE_SECTION = true;
var SHOW_MOREGAMES = false;
        
class CGUIController{

    static ON_SELECT_LANG = "on_select_lang";
    static ON_GOTO_MAIN_MENU = "on_goto_main_menu";
    static ON_RESTART_GAME = "on_restart_game";
    static ON_BACK_BUTTON = "on_back_button";

    constructor(bMultiplayer = true, bLogin = false, bLang = true, bMoreGames = false){
        MULTIPLAYER_GAME = bMultiplayer;
        LOGIN_SECTION = bLogin;
        MULTILANGUAGE_SECTION = bLang;
        SHOW_MOREGAMES = bMoreGames;
        
        this._oEventListener = new CEventsHandler();
        
        this._szActionCustomButtons = "action-custom-buttons";
        this._szActionConfirmModals = 'action-confirm-modals';
        
        this._szIdConfirmGotoMenu = "confirm-gotomenu";
        this._szIdConfirmRestart = "confirm-restart";
        
        this.REMOVE_ADS_SUBSCRIPTION = "remove_ads_subscription";
        this.REMOVE_ADS_DURABLE = "remove_ads_durable";
        this.REMOVE_ADS_NULL = ""; 

        this._szRemoveAdsType = this.REMOVE_ADS_NULL;

        this._bShowPrivacyBut = false;

        this.LEADERBOARD_GROUP_ID = "ranking";
        this.NUM_LEADERBOARD_ROWS = 8;
        this.LEADERBOARD_DAY = 0;
        this.LEADERBOARD_MONTH = 1;
        this.LEADERBOARD_GENERAL = 2;

        this.GAME_OPTIONS_DIV_ID = "game_options";

        this.DYNAMIC_LOADING = true; //CHECK THIS TRUE IF THERE IS ANY DYNAMIC RESOURCE LOADING

        this.BADGE_OFFSET = [
                                            0,200,300,400,500, //RANK COPPER
                                            600,700,800,900,1000, //RANK BRONZE
                                            1200,1400,1600,1800,2000, //RANK SILVER
                                            2200,2400,2600,2800,3000, //RANK GOLD
                                            3200,3400,3600,3800,4000, //RANK PLATINUM
                                            4200,4400,4600,4800,5000, //RANK EMERALD
                                            5200,5400,5600,5800,6000, //RANK DIAMOND
                                            6200,6400,6600,6800,7000, //RANK CHAMPION
                                            10000
                            ];

        this.WIN_POINTS = [25, 25, 25, 25,25,
                                20,20,20,20,20,
                                20, 20,20,20,20,
                                15, 15,15,15,15,
                                10, 10,10,10,10,
                                10,10,10,10,10,
                                10, 10,10,10,10,
                                10, 10,10,10,10,
                                10 ];

        this._aPlayerPos = [];
        this._aLeaderboard = [];
        this._aTaggedGames = [];
        this._aOtherGames = [];
        this._aFeaturedGames = [];

        this._aLeaderboard[this.LEADERBOARD_DAY] = [];
        this._aLeaderboard[this.LEADERBOARD_MONTH] = [];
        this._aLeaderboard[this.LEADERBOARD_GENERAL] = [];

        this._fRequestFullScreen = null;
        this._fCancelFullScreen = null;

        this._bJoiningRoom;

        this._szRoomID;
        this._szPass;

        this._iCurLeaderboardToShow = this.LEADERBOARD_GENERAL;
        this._iWins;
        this._iLosses;
        this._iTotMatches;
        this._iPlayerRanking;
        this._iCurBadgeLevel;
        this._iAmountBadges = this.BADGE_OFFSET.length;
        this._oInfoAccessRoom = null;

        /////
        
        
        this.resetPlayerValues();
        
        var doc = window.document;
        var docEl = doc.documentElement;
        this._fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        this._fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        refreshLanguageGUIController();
        
        this._checkCodethislabLink();
        
        //CREATE MENU DIV
        var div = document.createElement('div');
        div.className = 'sidebar-menu-container';
        document.body.appendChild(div);
        
        
        this.createSideBar();
        
        this.__modalCallbacks();
        this.__modalsCallbacks();

        this.hideBackButton();

        if(LOGIN_SECTION){
            s_oNetworkManager.addEventListener(ON_USER_LOGOUT,this.onUserLogout,this);
            s_oNetworkManager.addEventListener(ON_USER_LOGGED,this.onUserLogged,this);
        }
        
    };
    
    addEventListener(szEvent,cbCompleted, cbOwner,aParams = [], bOnce = false, bApply = false){
        aParams.unshift(this);
        this._oEventListener.addEventListener(szEvent,cbCompleted, cbOwner, aParams, bOnce, bApply);
    };
    
    removeEventListener(szEvent, oListenerObj = null){
        if(oListenerObj){
            this._oEventListener.removeEventListener(oListenerObj);
        }else{
            this._oEventListener.removeAllEventListeners(szEvent);
        }
    };
    
    resetPlayerValues(){
        this._iWins = 0;
        this._iLosses = 0;
        this._iTotMatches = 0;
        this._iPlayerRanking = 0;
        this._iCurBadgeLevel = 0; 
    };
    
    onRefreshRanking(oData){
        this._iPlayerRanking = parseInt(oData.ranking);
        this._iWins = parseInt(oData.win_matches);
        this._iLosses = parseInt(oData.lose_matches);
        this._iTotMatches = this._iWins +this._iLosses;
        this._iCurBadgeLevel = this.calculateBadgeLevelByRanking(this._iPlayerRanking);
    };
    
    refreshPlayerInfos(){
        if(!s_oNetworkManager.isLogged()){
            return;
        }
        
        s_oCurClient.bigDB.loadMyPlayerObject((myDBObject)=>{
            if(myDBObject.ranking !== undefined){
                this._iPlayerRanking = parseInt(myDBObject.ranking);

                this._iWins = parseInt(myDBObject.wins);
                this._iLosses = parseInt(myDBObject.losses);
                this._iTotMatches = parseInt(myDBObject.tot_matches);
                this._iCurBadgeLevel = this.calculateBadgeLevelByRanking(this._iPlayerRanking)
            }else{
                //IF USER DOESNT EXIST, CREATE DATA ON DB
                myDBObject.ranking = this._iPlayerRanking;
                myDBObject.wins = this._iWins;
                myDBObject.losses = this._iLosses;
                myDBObject.tot_matches = this._iTotMatches;

                myDBObject.save();
            }

        },function(error){
            console.log(error);
        });
    };

    checkPendingInvitation(){
        this._oInfoAccessRoom = null;
        this._szRoomID = getParameterByName(PARAM_ROOM_ID);
        this._szPass = getParameterByName(PARAM_PASSWORD);
        
        

        if(this._szRoomID !== undefined && this._szPass !== null){
            this._oInfoAccessRoom = {id:this._szRoomID,pass:this._szPass};
            this.__createLoadingModal();

            this._bJoiningRoom = true;

            window.history.replaceState(
                null,
                null,
                removeParamsFromURL([PARAM_ROOM_ID,PARAM_PASSWORD])
            );
    
            if(this.DYNAMIC_LOADING){
                s_oMenu._prepareResources();
            }else{
                if(s_oNetworkManager.isLogged()){
                    s_oNetworkManager.addEventListener(ON_USEROWNERROOM_JOIN_SUCCESS,this.onRoomJoined,this);

                    s_oNetworkManager.tryJoinFromInvitation(this._szRoomID.toString(), this._szPass.toString());
                }else{
                    this._joinRoomAsGuest();
                }
            }

        }
    };

    onUserLogged(){

        var szNick = s_oNetworkManager.filterString(s_oNetworkManager.getPlayerNickname());

        document.querySelector("#sidebar-section-login span").innerHTML = szNick;

        //SHOW LOGIN SECTION
        document.getElementById("sidebar-section-login").classList.remove('d-none');
        //HIDE LOGIN BUTTON
        document.getElementById("button_login").classList.add('d-none');
        document.getElementById("button_register").classList.add('d-none');
    };    

    onUserLogout(){
        this.resetPlayerValues();
        
        document.getElementById("sidebar-section-login").classList.add('d-none');
        document.getElementById("button_login").classList.remove('d-none');
        document.getElementById("button_register").classList.remove('d-none');
 
        if(s_bStorageAvailable){
            localStorage.removeItem(LOCALSTORAGE_STRING+"_player_login");
        }
    };
    
    onLogout(){
        s_oNetworkManager.logout();
    };
    
    _joinRoomAsGuest(){
        if(document.querySelector(".block-loading-container")){
            this.__removeLoadingModal();
        }
        s_oNetworkManager.addEventListener(ON_LOGIN_SUCCESS, ()=>{
            s_oNetworkManager.tryJoinFromInvitation(this._szRoomID.toString(), this._szPass.toString());
        },this);

        //s_oNetworkManager.connectToSystem();
        s_oNetworkManager.login();
    };

    onRoomJoined(){
        s_oNetworkManager.removeEventListener(ON_USEROWNERROOM_JOIN_SUCCESS);
        if(document.querySelector(".block-loading-container")){
            this.__removeLoadingModal();
        }
    };
    
    onPlayerInfosRetrieved(){
        
    };
    
    calculateBadgeLevelByRanking(iRanking) {
        //console.log("iRanking "+iRanking)
        var iBadgeIndex = 0;
        for (var i = 0; i < this.BADGE_OFFSET.length; i++) {
                //console.log("this.BADGE_OFFSET["+i+"] "+this.BADGE_OFFSET[i])
                if (iRanking >= this.BADGE_OFFSET[i]) {
                    iBadgeIndex++;
                    //console.log("iBadgeIndex "+iBadgeIndex)
                } else {
                    if(iBadgeIndex === 0){
                        return 0;
                    }
                  
                    return iBadgeIndex -1;
                }
            
        }

        return iBadgeIndex-1;
    };
    
    getBadgePointsByIndex(iLevel){
        var iCont = 0;
        for (var i = 0; i < this.BADGE_OFFSET.length; i++) {
                if(iLevel === iCont){
                    return this.BADGE_OFFSET[i];
                }
                iCont++;
            
        }
        
        return this.BADGE_OFFSET[0];
    };
    
    getWinPointByRank(iBadgeLevel) {
        return this.WIN_POINTS[iBadgeLevel];
    };
    
    addToGameOptions(szHtml){
        document.querySelector("#"+this.GAME_OPTIONS_DIV_ID).appendChild(htmlMarkupToNode(szHtml));   
    }; 
    
    showMainMenuBut(){
        document.getElementById( "main-menu-but" ).classList.remove("d-none");
    };
    
    hideMainMenuBut() {
        document.getElementById( "main-menu-but" ).classList.add("d-none");
    };
    
    showRestartBut(){
        document.getElementById( "restart-game-but" ).classList.remove("d-none");
    };
    
    hideRestartBut() {
        document.getElementById( "restart-game-but" ).classList.add("d-none");
    };
    
    showCartButton() {
        document.getElementById( "cart-btn" ).classList.remove("d-none");
    };
    
    hideCartButton() {
        document.getElementById( "cart-btn" ).classList.add("d-none");
    };
    
    showBackButton() {
        document.getElementById( "back-btn" ).classList.remove("d-none");
    };
    
    hideBackButton() {
        document.getElementById( "back-btn" ).classList.add("d-none");
    };
    
    showLangButton() {
        document.getElementById( "but-lang" ).classList.remove("d-none");
    };
    
    hideLangButton() {
        document.getElementById( "but-lang" ).classList.add("d-none");
    };

    showPrivacyButton() {
        document.getElementById( "privacy" ).classList.remove("d-none");
    };
    
    hidePrivacyButton() {
        document.getElementById( "privacy" ).classList.add("d-none");
    };
    
    ///////////////////MENU SIDEBAR
    __modalCallbacks(){
        var szEvent = "click";
        if(s_bMobile){
                szEvent = "touchend";
        }
        
        document.addEventListener(szEvent, (e) => {
            var target = e.target;
            while (target && target.parentNode !== document) {
                if (target.classList.contains('action-show-login')){
                   this.__createLoginPlayerModal();
                   return;
                }else if(target.classList.contains('action-show-register')){
                    this.__createRegisterPanelModal();
                    return;
                }else if(target.classList.contains('action-try-login')){
                    this.onClickSubmitLogin(); 
                    return;
                }else if(target.classList.contains('action-try-register')){
                    this.onClickSubmitRegister();
                    return;
                }else if(target.classList.contains('action-restore-pwd') ){
                    this.onClickRestorePwd(document.getElementById("modal-login-email").value);
                    return;
                }else if(target.classList.contains('action-show-lang')){
                    this.__createLanguageModal();
                    return;
                }else if(target.classList.contains('action-select-lang')){
                    this.onChangeLang(target);
                    return;
                }else if(target.classList.contains("action-hide-sidebar")){
                    var oOffcanvas = document.getElementById("sidebarMenu");
                    oOffcanvas.classList.remove('show');
                    return;
                }else if(target.classList.contains("action-toggle-sidebar") || target.classList.contains("hamburger")){
                    this.toggleSideBar();
                    return;
                }else if(target.classList.contains("action-go-back")){
                    this._oEventListener.triggerEvent(CGUIController.ON_BACK_BUTTON);
                    return;
                }else if(target.classList.contains("action-logout")){
                    this.onLogout();
                    return;
                }else if(target.classList.contains("action-toggle-music")){
                    this.onToggleMusic();
                    return;
                }else if(target.classList.contains("action-toggle-sfx")){
                    this.onToggleSfx();
                    return;
                }else if(target.classList.contains("action-toggle-fullscreen")){
                    this.onToggleFullscreen();
                    return;
                }else if(target.classList.contains('action-goto-menu')){
                    this.__createConfirmModal(this._szIdConfirmGotoMenu, TEXT_ARE_YOU_SURE);
                    return;
                }else if(target.classList.contains('action-restart-game')){
                    this.__createConfirmModal(this._szIdConfirmRestart, TEXT_ARE_YOU_SURE);
                    return;
                }else if(target.classList.contains('action-not-confirm-in-modal')){
                
                    return;
                }else if(target.classList.contains('action-show-leaderboard')){
                    this.getLeaderboardEntries();
                    return;
                }else if(target.classList.contains('action-show-leaderboard-general')){
                    this.onSelectLeaderboardGeneral();
                    return;
                }else if(target.classList.contains('action-show-leaderboard-month')){
                    this.onSelectLeaderboardMonthly();
                    return;
                }else if(target.classList.contains('action-show-leaderboard-day')){
                    this.onSelectLeaderboardDaily();
                    return;
                }else if(target.classList.contains('action-goto-website')){
                    this.onGoToWebSite();
                    return;
                }else if(target.classList.contains('action-show-credits')){
                    this.__createCreditsModal();
                    return;
                }else if(target.classList.contains('action-report-bug')){
                    this.__createSendEmailModal(TEXT_REPORT_BUG);
                    return;
                }else if(target.classList.contains('action-remove-ads')){
                    this.onRemoveAds();
                    return;
                }else if(target.classList.contains('action-confirm-remove-ads-subscription')){
                    this.onAcceptSubscription();
                    return;
                }else if(target.classList.contains('action-confirm-remove-ads-durable')){
                    this.onAcceptRemoveAdsDurable();
                    return;
                }else if(target.classList.contains('action-restore-purchase-ios')){
                    this.onRestoreIOS();
                    return;
                }else if(target.classList.contains('action-confirm-restore-purchase-ios')){
                    this.onConfirmRestoreIOS();
                    return;
                }else if(target.classList.contains('action-show-stats')){
                    this.__createStatsModal();
                    return;
                }else if(target.classList.contains('action-show-moregames')){
                    this.onMoreGames();
                    return;
                }else if(target.classList.contains('action-on-privacy')){
                    this.onPrivacy();
                    return;
                }else if(target.classList.contains('action-show-profile')){
                    this.__createStatsModal();
                    return;
                }else if(target.classList.contains('action-delete-user')){
                    if(document.querySelector("#statsModal")){
                        document.querySelector(".modal-backdrop").classList.add('d-none');
                        document.querySelector("#statsModal").remove();
                    }
                    this.__createSendEmailModal(TEXT_DELETE_USER);
                    return;
                    
                    ////CUSTOM PARTS
                }else if(target.classList.contains(this._szActionCustomButtons)){
                    this.__triggerCustomButtons(target);
                }else if(target.classList.contains(this._szActionConfirmModals)){
                    this.__triggerConfirmModals(target);
                }
                
                target = target.parentNode;
                if (!target) { return; } // If element doesn't exist
            }
            
        });
    };
    
    __triggerCustomButtons(oTarget){
        //console.log(oTarget.id)
    };
    
    __triggerConfirmModals(oTarget){
        //console.log(oTarget.id)
        switch(oTarget.id){
            case this._szIdConfirmGotoMenu: {
                this.onGotoMenu(); 
                break;
            }
            case this._szIdConfirmRestart: {
                this.onRestartGame(); 
                break;
            }
            
        }
    };
    
    __modalsCallbacks(){
        document.addEventListener('hidden.bs.modal', event => {
            bootstrap.Modal.getInstance(event.target).dispose()
            event.target.remove();
        });
    };
    
    _setSafeArea(){

    };
    
    _setButtonsMarginLeft(iSafeArea){
        var iPx = 10 + iSafeArea;
        var szPX = iPx + "px";
        //var szPerc = this._getPercent(iPx, s_rSafeAreaRectDP.width) +"%";

        document.getElementById( "back-btn" ).style.left = szPX;
        
    };
    
    _setButtonsMarginTop(iSafeArea){
        var iPx = 10 + iSafeArea;
        var szPX = iPx + "px";
        //var szPerc = this._getPercent(iPx, s_rSafeAreaRectDP.height) +"%";
        
        document.getElementById( "toggle-sidebar-btn-top-right" ).style.top = szPX;

        document.getElementById( "cart-btn" ).style.top = szPX;
        
        document.getElementById( "back-btn" ).style.top = szPX;
        
    };
    
    _setSideBarMarginTop(iSafeArea){
        
        if(iSafeArea>0){
            var iPx = iSafeArea;
            var szPX = iPx+"px";
            //document.getElementById( "toggle-sidebar-btn-top-right" ).style.top = szCalc;
            
            document.getElementById( "offcanvas-body" ).style.paddingTop = szPX;
            
            
            var iHeight = 55 + iSafeArea;
            //console.log(document.getElementById( "offcanvas-header" ))
            document.getElementById( "offcanvas-header" ).style.height = iHeight+"px";
            
            
        }else{
            document.getElementById( "toggle-sidebar-btn-top-right" ).style.removeProperty('top');
        }
    };
    
    _setButtonsMarginRight(iSafeArea){
        var szPx = -65 - iSafeArea;
        var szCalc = "calc("+szPx+"px - 10px)";
        document.getElementById( "toggle-sidebar-btn-top-right" ).style.left = szCalc;

        var iPx = 75 + iSafeArea;
        var szPX = iPx + "px";
        document.getElementById( "cart-btn" ).style.right = szPX;
    };

    _setSideBarMarginRight(iSafeArea){
        if(iSafeArea>0){
            var szPx = iSafeArea;
            var szCalc = szPx+"px";
            document.getElementById( "toggle-sidebar-btn-top-right" ).style.left = szCalc;
            
            document.getElementById( "offcanvas-body" ).style.paddingRight = iSafeArea+"px";
        }else{
            document.getElementById( "toggle-sidebar-btn-top-right" ).style.removeProperty('left');
        }
    };

    toggleSideBar(){
        var oOffcanvas = document.getElementById("sidebarMenu");
                    
        if ( oOffcanvas.classList.contains("show")){
            oOffcanvas.classList.remove('show');
            document.querySelector(".action-toggle-sidebar .hamburger").classList.remove("is-active");
            document.querySelector(".offcanvas-block").classList.remove("show");
        }else{
            oOffcanvas.classList.add('show');
            document.querySelector(".action-toggle-sidebar .hamburger").classList.add("is-active");
            document.querySelector(".offcanvas-block").classList.add("show");                        
        }
    };
    
    createSideBar(){
        //CREATE SIDEBAR
        var szHtml = '';        
        
        szHtml += '<div id="offcanvas-block" class="offcanvas-block action-toggle-sidebar"></div>';
        
        szHtml += '<a id="back-btn" class="btn btn-link go-back-btn action-go-back" role="button" aria-controls="goBack"><i class="fa-solid fa-arrow-left"></i></a> '; 
        
        var szRemoveAdsHide = "d-none";
        if(this._szRemoveAdsType){
            szRemoveAdsHide = "";
        }
        szHtml += '<a id="cart-btn" class="cart-btn action-remove-ads '+szRemoveAdsHide+'" href="#" role="button"><i class="fa-solid fa-cart-shopping"></i></a>';
        
        
        szHtml += '<div class="offcanvas offcanvas-end sidebar-menu" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">';
        szHtml += '<div id="offcanvas-header" class="offcanvas-header p-2" >';
        
        if(LOGIN_SECTION){
            //LOGIN SECTION
            szHtml += '<div class="btn-group logged-user d-none" id="sidebar-section-login">'; 
            szHtml += '<button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">';
            szHtml += '<img class="leaderboard-avatar" src="" alt="">';
            szHtml += "<span></span></button>"
            szHtml += '<ul class="dropdown-menu">';
            szHtml += '<li><a class="dropdown-item action-show-profile">'+TEXT_MY_PROFILE+'</a></li>';
            szHtml += '<li><hr class="dropdown-divider"></li>';
            szHtml += '<li><a class="dropdown-item action-logout">'+TEXT_LOGOUT+'</a></li>';
            szHtml += '</ul></div>';

            szHtml += '<button id="button_login" type="button" class="btn btn-primary action-show-login">'+TEXT_LOGIN+'</button>';
            szHtml += '<button id="button_register" type="button" class="btn btn-primary action-show-register">'+TEXT_REGISTER+'</button>';
        }
        
        szHtml += '</div>';
        
        szHtml += '<div id="offcanvas-body" class="offcanvas-body">';
        szHtml += '<div class="list-group sidebar-menu-form-check">';
        szHtml += '<h4 class="sidebar-menu-section-title" id="sidebar-menu-section-title-0">'+TEXT_SETTINGS+'</h4>';

        if(MULTILANGUAGE_SECTION){
            var iLangCode = LANG_CODES[s_iStartingLangCode];
            if(iLangCode === undefined){
                iLangCode = LANG_EN;
                s_iStartingLangCode = "en";
            }
            szHtml += '<div id="but-lang" class="cursor-pointer form-check action-show-lang"><div class="row align-items-center">';
            szHtml += '<div class="col col-8" id="sidebar-menu-section-0-0"><i class="fa-solid fa-language icon-start"></i><span>'+TEXT_LANGUAGE+'</span></div>';
            szHtml += '<div class="col col-4"><div id="flag-cur-language" class="language-flag bg-'+s_iStartingLangCode+' " ></div></div></div></div>';
        }

        if(ENABLE_FULLSCREEN){
            szHtml += '<div class="cursor-pointer form-check form-switch form-check-reverse text-start">';
            szHtml += '<input class="form-check-input action-toggle-fullscreen" type="checkbox" role="switch" id="sidebar-menu-section-0-1">';
            szHtml += '<label class="form-check-label" for="sidebar-menu-section-0-1"><i class="fa-solid fa-expand icon-start"></i><span>'+TEXT_FULLSCREEN_OFF+'</span></label></div>';
        }
        
        szHtml += '<div class="cursor-pointer form-check form-switch form-check-reverse text-start">';
            szHtml += '<input class="form-check-input action-toggle-music" type="checkbox" role="switch" id="sidebar-menu-section-0-2" >';
            szHtml += '<label class="form-check-label" for="sidebar-menu-section-0-2"><i class="fa-solid fa-music icon-start"></i><span>'+TEXT_MUSIC_OFF+'</span></label>';
        szHtml += "</div>";
            
        szHtml += '<div class="cursor-pointer form-check form-switch form-check-reverse text-start">';
            szHtml += '<input class="form-check-input action-toggle-sfx" type="checkbox" role="switch" id="sidebar-menu-section-0-3">';
            szHtml += '<label class="form-check-label" for="sidebar-menu-section-0-3"><i class="fa-solid fa-volume-high icon-start"></i><span>'+TEXT_SFX_OFF+'</span></label>';
        szHtml += "</div>";

        
        var bShowPrivacy = "d-none";
        if(this._bShowPrivacyBut){
            bShowPrivacy = "";
        }

        szHtml += '<div id="privacy" class="cursor-pointer form-check form-switch form-check-reverse text-start action-on-privacy '+bShowPrivacy+'">';
            //szHtml += '<button id="restore-side" type="button" class="btn btn-link text-start action-restore-purchase-ios">'
            //szHtml += '<label class="form-check-label" for="sidebar-menu-section-0-2">'
                szHtml += '<i class="fa-solid fa-shield-halved icon-start" id="sidebar-menu-section-0-4"></i>';
                szHtml += '<span id="privacy-span">'+TEXT_PERSONAL_DATA_MANAGEMENT+'</span>';
            //szHtml += '</button>';   
        szHtml += '</div>';

        
            
            
        szHtml += '</div>';

        ////////////GAME OPTIONS

        szHtml += '<div class="sidebar-menu-button-link">';
        szHtml += '<h4 class="sidebar-menu-section-title" id="sidebar-menu-section-title-1">'+TEXT_GAME_OPTION+'</h4>'
        
        szHtml += '<div id="'+this.GAME_OPTIONS_DIV_ID+'" class="d-grid">';
        
        szHtml += '<button id="main-menu-but" type="button" class="btn btn-link text-start action-goto-menu">';
            szHtml += '<i class="fa-solid fa-house icon-start" id="sidebar-menu-section-1-0"></i>';
            szHtml += '<span>'+TEXT_MAIN_MENU+'</span>';
        szHtml += '</button>';
        
        szHtml += '<button id="restart-game-but" type="button" class="btn btn-link text-start action-restart-game">';
            szHtml += '<i class="fa-solid fa-arrows-rotate icon-start" id="sidebar-menu-section-1-1"></i>';
            szHtml += '<span>'+TEXT_SB_RESTART+'</span>';
        szHtml += '</button>';
        
        if(LOGIN_SECTION){
            szHtml += '<button type="button" class="btn btn-link text-start action-show-leaderboard">';
                szHtml += '<i class="fa-solid fa-ranking-star icon-start" id="sidebar-menu-section-1-1"></i>';
                szHtml += '<span>'+TEXT_LEADERBOARD+'</span>';
            szHtml += '</button>';
        }
		
        
        szHtml += '<button type="button" class="btn btn-link text-start action-report-bug">'
            szHtml += '<i class="fa-solid fa-bug icon-start" id="sidebar-menu-section-1-2"></i>'
            szHtml += '<span>'+TEXT_REPORT_BUG+'</span>'
        szHtml += '</button>';
        

        szHtml += '<button id="remove-ads-side" type="button" class="btn btn-link text-start action-remove-ads '+szRemoveAdsHide+'">'
            szHtml += '<i class="fa-solid fa-coins icon-start" id="sidebar-menu-section-1-3"></i>'
            szHtml += '<span>'+TEXT_REMOVE_ADS+'</span>'
        szHtml += '</button>';

        if(isIOS()){
            szHtml += '<button id="restore-side" type="button" class="btn btn-link text-start action-restore-purchase-ios '+szRemoveAdsHide+'">'
                szHtml += '<i class="fa-solid fa-clock-rotate-left icon-start" id="sidebar-menu-section-1-3"></i>'
                szHtml += '<span>'+TEXT_SVC_RESTORE+'</span>'
            szHtml += '</button>';
        }
        
        
        szHtml += '</div></div>';
        if(LOGIN_SECTION){
            szHtml += '<div class="sidebar-menu-button-link">';
            szHtml += '<h4 class="sidebar-menu-section-title" id="sidebar-menu-section-title-2">'+TEXT_MY_PROFILE+'</h4>';
            szHtml += '<div class="d-grid sidebar-menu-button-link">';
                szHtml += '<button type="button" class="btn btn-link text-start action-show-stats">'
                    szHtml += '<i class="fa-solid fa-chart-line icon-start"></i>'
                    szHtml += '<span>'+TEXT_STATS+'</span>'
                szHtml += '</button>';
            szHtml += '</div></div>';
        }
        
        if (SHOW_MOREGAMES) {
            //MOREGAMES
            szHtml += '<div class="more-games-btn d-grid gap-2">';
                szHtml += '<button class="btn btn-primary rounded-pill action-show-moregames" type="button">';
                    szHtml += '<i class="fa-solid fa-gamepad me-3"></i>';
                    szHtml += '<span>'+TEXT_MORE_GAMES+'</span>';
                szHtml += '</button>';
            szHtml += '</div>';
            
            if (typeof FEATURED_GAMES !== 'undefined' && typeof TAGGED_GAMES !== 'undefined' && typeof OTHER_GAMES !== 'undefined') {
                this._loadMoregamesInfos();
            }
        }
        
        //CREDITS
        szHtml += '<div id="sidebar-footer" class="sidebar-footer">';
            szHtml += '<div class="row m-0 text-center">';
                szHtml += '<div class="col col-6 align-self-center"><img class="ctl-logo action-goto-website" src="ctl_ui/sprites/codethislab-logo-white.svg" alt="Code This Lab">';
                szHtml += '</div>';
                szHtml += '<div class="col col-6 align-self-center action-show-credits">';
                    szHtml += '<a href="#" class="text-decoration-none"><i class="fa-solid fa-circle-info icon-start"></i><span>'+TEXT_CREDITS+'</span></a>';
                szHtml += '</div>';
            szHtml += '</div>';
        szHtml += '</div>';
        ///////////////////
        //szHtml += '</div>';    

/*
            ////TODO
            szHtml += '<a class="btn btn-link go-back-btn" role="button" aria-controls="goBack">'
                szHtml += '<i class="fa-solid fa-arrow-left"></i>'
            szHtml += '</a>'
*/
            szHtml += '<a class="btn btn-link action-toggle-sidebar toggle-sidebar-btn-top-right" role="button" aria-controls="sidebarMenu" id="toggle-sidebar-btn-top-right">';           
                    szHtml += '<div class="hamburger hamburger--slider"><div class="hamburger-box"><div class="hamburger-inner hamburger-inner-white"></div></div></div>';
            szHtml += '</a>';

        szHtml += '</div>';
        
        
        document.querySelector(".sidebar-menu-container").appendChild(htmlMarkupToNode(szHtml));   
        
        if(s_bFullscreen){
            document.querySelector(".sidebar-menu-container #sidebar-menu-section-0-1").checked = true;
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-1] span").innerHTML = TEXT_FULLSCREEN_ON;
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            document.querySelector(".sidebar-menu-container #sidebar-menu-section-0-2").checked = true;
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-2] span").innerHTML = TEXT_MUSIC_ON;

            document.querySelector(".sidebar-menu-container #sidebar-menu-section-0-3").checked = true;
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-3] span").innerHTML = TEXT_SFX_ON;
        }

    };

    __createLoginPlayerModal(){    

        var szHtml = '<div class="modal fade overflow-hidden" id="loginModal" aria-labelledby="loginModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered">';
        szHtml += '<div class="modal-content"><div class="modal-header">';
        //szHtml += '<div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="loginModalLabel">'+TEXT_LOGIN+'</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="'+TEXT_CLOSE+'"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<form>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-login-email" class="form-label">'+TEXT_SYS_CHOOSENICK_OR_EMAIL+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input class="form-control" id="modal-login-email" aria-describedby="emailHelp"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-login-pwd" class="form-label">'+TEXT_PWD+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input type="password" class="form-control" id="modal-login-pwd" /></div>';
        szHtml += "<a class='underlined-text-but action-restore-pwd'>"+TEXT_PWD_FORGOT+"  </a>";
        szHtml += '<p id="restore-pwd-alert-text" class="ctl-multiplayer-alert-text"></p>';
        szHtml += '<p id="login-alert-text" class="ctl-multiplayer-alert-text"></p>';        
        szHtml += '<div class="btn btn-primary action-try-login">'+TEXT_SUBMIT+'</div>';
        szHtml += '</form></div></div></div></div>';
        
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
   
        
        var oModal = new bootstrap.Modal(document.getElementById('loginModal'));
        oModal.show();
    };
    
    __createRegisterPanelModal(){
        var szHtml = '<div class="modal fade overflow-hidden" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered"><div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="registerModalLabel">'+TEXT_REGISTER+'</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="'+TEXT_CLOSE+'"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<form>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-nick" class="form-label">'+TEXT_SYS_CHOOSENICK+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input class="form-control" id="modal-register-nickname"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-email" class="form-label">'+TEXT_EMAIL+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input class="form-control" id="modal-register-email"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-pwd" class="form-label">'+TEXT_PWD+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input type="password" class="form-control" id="modal-register-pwd"></div>';
        szHtml += '<div class="mb-3">';
        szHtml += '<label for="modal-register-confirm-pwd" class="form-label">'+TEXT_SYS_CONFIRM_PWD+'<i class="mandatory ms-1 fa-solid fa-asterisk"></i></label>';
        szHtml += '<input type="password" class="form-control" id="modal-register-confirm-pwd"></div>';
        if(TEXT_PRIVACY_URL !== ""){
            szHtml += '<div class="mb-3">';
            szHtml += '<a class="terms-privacy-text-color" href="'+TEXT_PRIVACY_URL+'" target="_blank">'+TEXT_PRIVACY+'</a>';
            szHtml += '</div>';
        }
        if(TEXT_TERMS_OF_USE_URL !== ""){
            szHtml += '<div class="mb-3">';
            szHtml += '<a class="terms-privacy-text-color" href="'+TEXT_TERMS_OF_USE_URL+'" target="_blank">'+TEXT_TERMS_OF_USE+'</a>'
            szHtml += '</div>';
        }
        szHtml += '<p id="register-alert-text" class="ctl-multiplayer-alert-text"></p>';
        szHtml += '<button type="button" class="btn btn-primary action-try-register">'+TEXT_REGISTER+'</button>';
        szHtml += '</form></div></div></div></div>';
        
        document.querySelector(".sidebar-menu-container").innerHTML += szHtml;
        
        var oModal = new bootstrap.Modal(document.getElementById('registerModal'));
        oModal.show();
    };
    
    __createLanguageModal(){
        var szHtml = '';
        szHtml += '<div class="modal fade" id="languageModal" tabindex="-1" aria-labelledby="languageModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">';
        szHtml += '<div class="modal-content">';
        szHtml += '<div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="languageModalLabel">' + TEXT_LANGUAGE + '</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="' + TEXT_CLOSE + '"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<ul class="list-group list-group-flush">';
        
        for (let szLang in TEXT_ORIGINAL_LANGUAGE) {
            szHtml += '<li class="list-group-item text-dark action-select-lang" data-flag='+szLang+'>'
                szHtml += '<span class="language-flag bg-'+szLang+'"></span>'
            szHtml += TEXT_ORIGINAL_LANGUAGE[szLang]+'</li>';
        }
        
        szHtml += '</ul></div></div></div></div>';    
       
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  

        var oModal = new bootstrap.Modal(document.getElementById('languageModal'));
        oModal.show();
    };
    
    __createCreditsModal(){
        var szUrlText = TEXT_CREDITS_URL.split("//")[1];
        
        var szHtml = '<div class="modal fade credits-box overflow-hidden" id="creditsModal" tabindex="-1" aria-labelledby="creditsModalLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered">';
                szHtml += ' <div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += '<div class="modal-header">';
                        szHtml += '<h1 class="modal-title fs-5 text-center" id="creditsModalLabel"><i class="fa-solid fa-circle-info icon-start"></i>'+TEXT_CREDITS+'</h1>';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';
                    //szHtml += '<a href="'+TEXT_CREDITS_URL+'" target="_blank">';
                        szHtml += '<div class="modal-body"> ';
                            var szVersion = "v "+ (s_szCurVers || "1.00");
                            szHtml += '<h1 class="modal-title fs-5 text-left" id="version">'+szVersion+'</h1>';
                            szHtml += '<div class="text-center">';
                                szHtml += ' <img class="ctl-logo" src="ctl_ui/sprites/logo_payoff_ctl_white.svg" alt="Code This Lab">';
                                szHtml += '<h3>'+szUrlText+'</h3>';
                            szHtml += '</div> ';
                        szHtml += '</div> ';
                    //szHtml += '</a>'; 
                szHtml += ' </div>'; 
            szHtml += ' </div>'; 
        szHtml += ' </div>'; 
            
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('creditsModal'));
        oModal.show();
    };
    
    __createSendEmailModal(szTitle){
        var szHtml = '<div class="modal fade general-box overflow-hidden" id="sendEmailModal" tabindex="-1" aria-labelledby="sendEmailModalLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered">';
                szHtml += ' <div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += '<div class="modal-header">';
                        szHtml += '<h1 class="modal-title fs-5 text-center" id="sendEmailModalLabel"><i class="fa-solid fa-circle-info icon-start"></i>'+szTitle+'</h1>';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';

                        szHtml += '<div class="modal-body"> ';
                            szHtml += '<div class="text-center">';
                                szHtml += '<h3>'+TEXT_SEND_EMAIL+'</h3>';
                                szHtml += '<h2>support@codethislab.com</h2>';
                            szHtml += '</div> ';
                        szHtml += '</div> ';
                    szHtml += '</a>'; 
                szHtml += ' </div>'; 
            szHtml += ' </div>'; 
        szHtml += ' </div>'; 
            
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        
        if(document.querySelector("#statsModal")){
            document.querySelector(".modal-backdrop").classList.add('d-none');
            document.querySelector("#statsModal").remove();
        }
        
        var oModal = new bootstrap.Modal(document.getElementById('sendEmailModal'));
        oModal.show();
    };
    
    __createStatsModal(){
        var iPerc = 0;
        if(this._iTotMatches>0){
            iPerc = parseFloat((this._iWins/this._iTotMatches).toFixed(2))*100;
        }

        var szHtml = '<div class="modal fade general-box overflow-hidden" id="statsModal" tabindex="-1" aria-labelledby="statsLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered">';
                szHtml += ' <div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += '<div class="modal-header">';
                        szHtml += '<h1 class="modal-title fs-5 text-center d-flex align-items-center" id="statsLabel"><td class="text-center stats-badge">';
                            szHtml += '<div class="badges-container"><div class="badges badge_'+this._iCurBadgeLevel+'"></div></div>';
                            szHtml += '<div class="ml-2">' + s_oNetworkManager.filterString(s_oNetworkManager.getPlayerNickname())+'</div>'+'</h1>';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';
                    szHtml += '<a>';
                        szHtml += '<div class="modal-body"> ';
                            szHtml += '<div class="text-center">';
                                szHtml += '<h3>'+TEXT_WINS+": "+this._iWins+'</h3>';
                                szHtml += '<h3>'+TEXT_LOSSES+": "+this._iLosses+'</h3>';
                                szHtml += '<h3>'+TEXT_WIN_PERC+": "+iPerc+'%</h3>';
                                 szHtml += '<br>'
                                szHtml += '<h2>'+TEXT_RANKING+": "+this._iPlayerRanking+'</h3>';
                                szHtml += '<button class="btn btn-danger rounded-pill action-delete-user mt-5" type="button">'+TEXT_DELETE_USER+'</button>';
                            szHtml += '</div> ';
                        szHtml += '</div> ';
                    szHtml += '</a>'; 
                szHtml += ' </div>'; 
            szHtml += ' </div>'; 
        szHtml += ' </div>'; 
            
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('statsModal'));
        oModal.show();
    };

    __createMoregamesModal(){
        var szHtml = '<div class="modal fade more-games-box overflow-hidden" id="moregamesModal" tabindex="-1" aria-labelledby="moregamesModalLabel" aria-hidden="true">';
            szHtml += '<div class="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down">';
                szHtml += '<div class="modal-content animate__animated animate__fadeInUpBig">';
                    szHtml += ' <div class="modal-header">';
                        szHtml += '<img class="ctl-logo m-auto" src="ctl_ui/sprites/codethislab-logo-white.svg" alt="Code This Lab">';
                        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
                    szHtml += '</div>';
                    szHtml += '<div class="modal-body">';
                        szHtml += '<div class="col col-12"><h4>'+TEXT_FEATURED_GAMES+'</h4></div>';
                        szHtml += '<div class="owl-carousel owl-main owl-theme mb-4">';
                            for(var k=0;k<this._aFeaturedGames.length;k++){
                                szHtml += '<a class="img-game" href="'+this._aFeaturedGames[k].url+'" target="_blank"><img src="'+this._aFeaturedGames[k].img+'" alt=""></a>';
                            }
                        szHtml += '</div>';
                        szHtml += '<div class="mb-3">';
                            szHtml += '<div class="col col-12"><h4>'+TEXT_OTHER_GAMES+'</h4></div>';
                            szHtml += '<div class="owl-carousel owl-theme mb-3">';
                                for(var k=0;k<this._aTaggedGames.length;k++){
                                    szHtml += '<a class="img-game" href="'+this._aTaggedGames[k].url+'" target="_blank"><img src="'+this._aTaggedGames[k].img+'" alt=""></a>';
                                }
                            szHtml += '</div>';
                            szHtml += '<div class="owl-carousel owl-theme">';
                                for(var i=0;i<this._aOtherGames.length;i++){
                                    szHtml += '<a class="img-game" href="'+this._aOtherGames[i].url+'" target="_blank"><img src="'+this._aOtherGames[i].img+'" alt=""></a>';
                                }
                            szHtml += '</div>';
                        szHtml += '</div>';
                    szHtml += '</div>';
                szHtml += '</div>';
            szHtml += '</div>';
        szHtml += '</div>';
        
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
                            $('.owl-main').owlCarousel({
                stagePadding: 30,
                loop:true,
                margin:10,
                nav:true,
                dots:false,
                items:3,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:2
                    },
                    1000:{
                        items:3
                    }
                }
            })
            
            $('.owl-carousel').owlCarousel({
                stagePadding: 20,
                loop:true,
                margin:10,
                nav:true,
                dots:false,
                responsive:{
                    0:{
                        items:2
                    },
                    600:{
                        items:4
                    },
                    1000:{
                        items:5
                    }
                }
            })
        
        var oModal = new bootstrap.Modal(document.getElementById('moregamesModal'));
        oModal.show();
        

    };

    

    __createGeneralAlertModal(szText){
        var szHtml = '<div class="modal fade overflow-hidden" id="alertModal" tabindex="-1"  aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered"><div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="alertModalLabel">'+szText+'</h1>';
        szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="'+TEXT_CLOSE+'"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '</div></div></div>';

        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('alertModal'));
        oModal.show();
    };
    
    __createConfirmModal(szID, szText){
        var szHtml = '<div class="modal fade overflow-hidden" id="confirmModal" tabindex="-1"  aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered"><div class="modal-content animate__animated animate__fadeInUpBig"><div class="modal-header">';
        szHtml += '<h1 class="modal-title fs-5" id="alertModalLabel">'+szText+'</h1></div>';
        //szHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="'+TEXT_CLOSE+'"></button></div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<button type="button" class="btn btn-primary btn-sm action-not-confirm-in-modal" data-bs-dismiss="modal"  id="footer-btn-title-'+TEXT_NO+'" >'+TEXT_NO+'</button>';
        szHtml += '<button type="button" class="btn btn-primary btn-sm '+this._szActionConfirmModals+' float-end" data-bs-dismiss="modal" id="'+szID+'" >'+TEXT_YES+'</button>';
        szHtml += '</div></div></div>';

        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        var oModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        oModal.show();
    };
    
    __createLoadingModal(){
        var szHtml = '';
        szHtml += '<div class="block-loading-container show d-flex justify-content-center align-items-center">';
            szHtml += '<div class="block-loading"></div>';
                szHtml += '<div class="block-loading-spinner">';
                    szHtml += '<div class="spinner-border text-light"></div>';
                szHtml += '</div>';
        szHtml += '</div>';
 
        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
    };
    
    __removeLoadingModal(){
        if(document.querySelector(".block-loading-container")){
            document.querySelector(".block-loading-container").remove();
        }
    };
/*
this._loadMoregamesInfos = function(){

            if( GAME_LIST_JSON.length === 0 ){
                  return;
            }

            //ADD JUST GAMES WITH SELECTED TAG
            this._aFeaturedGames = [];
            for(var t=0;t<GAME_TAGS.length;t++){
                for(var k=0;k<GAME_LIST_JSON.length;k++){
                    if(GAME_LIST_JSON[k].tag.indexOf(GAME_TAGS[t]) !== -1 && this._aFeaturedGames.indexOf(GAME_LIST_JSON[k]) === -1 && GAME_LIST_JSON[k].id !== _szGameId){
                        this._aFeaturedGames.push(GAME_LIST_JSON[k]);
                    }
                }
            }

            this._aOtherGames = new Array();
            for(var k=0;k<GAME_LIST_JSON.length;k++){
                if(this._aFeaturedGames.indexOf(GAME_LIST_JSON[k]) === -1 && GAME_LIST_JSON[k].id !== _szGameId){
                    this._aOtherGames.push(GAME_LIST_JSON[k]);
                }
            }

    };*/
    _loadMoregamesInfos(){
        this._aFeaturedGames = [];
        for(var k=0;k<FEATURED_GAMES.length;k++){
            this._aFeaturedGames.push(FEATURED_GAMES[k]);
        }
        
        this._aTaggedGames = new Array();
        for(var k=0;k<TAGGED_GAMES.length;k++){
            this._aTaggedGames.push(TAGGED_GAMES[k]);
        }
        
        this._aOtherGames = new Array();
        for(var k=0;k<OTHER_GAMES.length;k++){
            this._aOtherGames.push(OTHER_GAMES[k]);
        }
    }    
    
    /*
    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        
        if ("withCredentials" in xhr) {
            // XHR for Chrome/Firefox/Opera/Safari.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {
            // XDomainRequest for IE.
            xhr = new XDomainRequest();
            xhr.open(method, url);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        } else {
            // CORS not supported.
            xhr = null;
            return xhr;
        }

        return xhr;
    }
    */
    
    onMoreGames(){
        this.__createMoregamesModal();
    }
   
    onRemoveAds(){

    }
    
    onAcceptSubscription(){

    }
    
    onAcceptRemoveAdsDurable(){

    }
    
    onRestoreIOS(){

    }
   
    onConfirmRestoreIOS(){

    }
   
    onGoToWebSite(){
        
    }
   
    onPrivacy(){
     
    }
   
    onClickSubmitLogin(){
        this.clearAlertTexts();
        
        var szUser = document.getElementById("modal-login-email").value;
        var szPwd  = document.getElementById("modal-login-pwd").value;
        
        if(szUser === "" || szPwd === ""){
            document.getElementById("login-alert-text").textContent = TEXT_FIELDS_NOT_FILLED;
            return;
        }
        
        this.__createLoadingModal();

        s_oNetworkManager.loginGeneric(szUser,szPwd,this.onLoginPlayer,this.onLoginError);
    };
    
    onClickSubmitRegister(){
        var szNick  = stripHTML(document.getElementById("modal-register-nickname").value);
        var szEmail = stripHTML(document.getElementById("modal-register-email").value);
        var szPwd  = stripHTML(document.getElementById("modal-register-pwd").value);
        var szConfirmPwd  = stripHTML(document.getElementById("modal-register-confirm-pwd").value);
    
        if(szNick === "" || szPwd === "" || szConfirmPwd === "" || szEmail === ""){
            document.getElementById("register-alert-text").textContent = TEXT_FIELDS_NOT_FILLED;
            return;
        }
    
        //CHECK EMAIL
        if(!validateEmail(szEmail)){
            document.getElementById("register-alert-text").textContent = TEXT_EMAIL_NOT_VALID;
            return;
        }
    
        //CHECK IF PASSWORDS ARE MATCHING
        if(szPwd !== szConfirmPwd){
            document.getElementById("register-alert-text").textContent = TEXT_PWD_NOT_MATCHING ;
            return;
        }

        //CHECK PASSWORD LENGTH
        if(szPwd.length <3){
            document.getElementById("register-alert-text").textContent = TEXT_PWD_TOO_SHORT;
            return;
        }

        if(szPwd.length > 10){
            document.getElementById("register-alert-text").textContent =  TEXT_PWD_TOO_LONG;
            return;
        }
        
        this.__createLoadingModal();
        s_oNetworkManager.registerUser(szNick,szEmail,szPwd,this.onRegisterPlayer,this.onRegisterError);
    };
    
    clearAlertTexts(){
        document.getElementById("restore-pwd-alert-text").textContent = "";
        document.getElementById("login-alert-text").textContent = "";
    };
    
    onClickRestorePwd(szUser){
        if(szUser === ""){
            s_oGuiController.clearAlertTexts();
             document.getElementById("restore-pwd-alert-text").textContent =  TEXT_INVALID_USER;
        }else{
            s_oNetworkManager.recoverPwd(szUser,this.onPwdRestoreSuccess,this.onPwdRestoreError); 
        }
    };
    
    onPwdRestoreSuccess(){
        s_oGuiController.__createGeneralAlertModal(TEXT_PWD_RECOVER);
    };
    
    onPwdRestoreError(szNickname){
        s_oGuiController.clearAlertTexts();
        if(validateEmail(szNickname)){
            document.getElementById("restore-pwd-alert-text").textContent =  TEXT_EMAIL_NOT_VALID;
        }else{
            document.getElementById("restore-pwd-alert-text").textContent =  TEXT_INVALID_USER;
        }
    };

    onLoginPlayer(){
        s_oGuiController.__removeLoadingModal();

        var oModal = document.getElementById("loginModal")
        bootstrap.Modal.getInstance(oModal).hide();
    };
    
    onLoginError(error){
        s_oGuiController.__removeLoadingModal();
        var szErr = TEXT_GENERIC_LOGIN_FAILED;

        switch(error.code){
            case "UnknownUser":{
                    szErr = TEXT_INVALID_USER;
                    break;
            }
            case "InvalidPassword":{
                    szErr = TEXT_INVALID_PASSWORD;
                    break;
            }
        }
        
        s_oGuiController.clearAlertTexts();
        document.getElementById("login-alert-text").textContent = szErr;
    };
    
    onRegisterPlayer(){
        s_oGuiController.__removeLoadingModal();
        
        var oModal = document.getElementById("registerModal")
        bootstrap.Modal.getInstance(oModal).hide();
    };
    
    onRegisterError(error){
        s_oGuiController.__removeLoadingModal();

        var szErr = TEXT_GENERIC_LOGIN_FAILED;
        switch(error.code){
            case "UnknownUser":{
                    szErr = TEXT_INVALID_USER;
                    break;
            }
            case "InvalidPassword":{
                    szErr = TEXT_INVALID_PASSWORD;
                    break;
            }
            case "InvalidRegistrationData":{
                    szErr = TEXT_ERR_USER_ALREADY_REGISTERED;
                    break;
            }
        }
        document.getElementById("register-alert-text").textContent = szErr;
    };
    
    onChangeLang(target){
        target = target.firstChild;
                    
        var szClass = target.classList[1];
        var aTmp = szClass.split("bg-");
        var szFlag = aTmp[1];

        var oModal = document.getElementById("languageModal")
        bootstrap.Modal.getInstance(oModal).hide();

        document.getElementById("flag-cur-language").classList.remove('bg-'+s_iStartingLangCode);
        s_iStartingLangCode = szFlag;
        s_iCurLang = LANG_CODES[s_iStartingLangCode];
        refreshLanguage();
        refreshLanguageGUIController();
        this.refreshMenuLanguage();

        this._oEventListener.triggerEvent(CGUIController.ON_SELECT_LANG);

        document.getElementById("flag-cur-language").classList.add('bg-'+s_iStartingLangCode);
    };
    
    refreshMenuLanguage(){
        if(LOGIN_SECTION){
            document.querySelector(".sidebar-menu-container .action-show-profile ").innerHTML = TEXT_MY_PROFILE;
            document.querySelector(".sidebar-menu-container .logged-user .action-logout").innerHTML = TEXT_LOGOUT;
            document.querySelector(".sidebar-menu-container #button_login").innerHTML = TEXT_LOGIN;
            document.querySelector(".sidebar-menu-container #button_register").innerHTML = TEXT_REGISTER;
        }
        
        document.querySelector(".sidebar-menu-container #sidebar-menu-section-title-0").innerHTML = TEXT_SETTINGS;
        document.querySelector(".sidebar-menu-container #sidebar-menu-section-0-0 span").innerHTML = TEXT_LANGUAGE;
        if (SHOW_MOREGAMES) {
            document.querySelector(".sidebar-menu-container .action-show-moregames span").innerHTML = TEXT_MORE_GAMES;
        }
        
        if(ENABLE_FULLSCREEN){
            if(s_bFullscreen){
                document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-1] span").innerHTML = TEXT_FULLSCREEN_ON;
            }else{
                document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-1] span").innerHTML = TEXT_FULLSCREEN_OFF;
            }
        }
        
     
        if(s_bMusicActive){
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-2] span").innerHTML = TEXT_MUSIC_ON;
        }else{
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-2] span").innerHTML = TEXT_MUSIC_OFF;
        }
        
        if(s_bSfxActive){
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-3] span").innerHTML = TEXT_SFX_ON;
        }else{
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-3] span").innerHTML = TEXT_SFX_OFF;
        }
        
        document.querySelector("#privacy-span").innerHTML = TEXT_PERSONAL_DATA_MANAGEMENT;
        
        
        document.querySelector(".sidebar-menu-container #sidebar-menu-section-title-1").innerHTML = TEXT_GAME_OPTION;
        
        document.querySelector(".sidebar-menu-container .action-goto-menu span").innerHTML = TEXT_MAIN_MENU;
        document.querySelector(".sidebar-menu-container .action-restart-game span").innerHTML = TEXT_SB_RESTART;
        
        if(LOGIN_SECTION){
            document.querySelector(".sidebar-menu-container .action-show-leaderboard span").innerHTML = TEXT_LEADERBOARD;
            document.querySelector(".sidebar-menu-container #sidebar-menu-section-title-2").innerHTML = TEXT_MY_PROFILE;
            document.querySelector(".sidebar-menu-container .action-show-stats span").innerHTML = TEXT_STATS;
        }
        document.querySelector(".sidebar-menu-container .action-report-bug span").innerHTML = TEXT_REPORT_BUG;
        
        
        
        if(this._szRemoveAdsType){
            document.querySelector(".sidebar-menu-container .action-remove-ads span").innerHTML = TEXT_REMOVE_ADS;
        	if(isIOS()){
	            document.querySelector(".sidebar-menu-container .action-restore-purchase-ios span").innerHTML = TEXT_SVC_RESTORE;
	        }
        }
        
        document.querySelector(".sidebar-menu-container .action-show-credits span").innerHTML = TEXT_CREDITS;


        this._checkCodethislabLink();

    };
    
    _checkCodethislabLink(){
        CODETHISLAB_LINK = CODETHISLAB_LINK_COM;
        if(s_iCurLang === LANG_CODES["it"]){
            CODETHISLAB_LINK = CODETHISLAB_LINK_IT;
        }
    };
    
    onToggleFullscreen(){
        if(s_bFullscreen) { 
            this._fCancelFullScreen.call(window.document);
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-1] span").innerHTML = TEXT_FULLSCREEN_OFF;
	}else{
            this._fRequestFullScreen.call(window.document.documentElement);
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-1] span").innerHTML = TEXT_FULLSCREEN_ON;
	}
	
	sizeHandler(); 
    };
    
    onToggleMusic(){
        muteAllMusic(s_bMusicActive);
        s_bMusicActive = !s_bMusicActive;
        
        if(s_bMusicActive){
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-2] span").innerHTML = TEXT_MUSIC_ON;
        }else{
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-2] span").innerHTML = TEXT_MUSIC_OFF;
        }
    };
    
    onToggleSfx(){
        muteAllSfx(s_bSfxActive);
        s_bSfxActive = !s_bSfxActive;
        
        if(s_bSfxActive){
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-3] span").innerHTML = TEXT_SFX_ON;
        }else{
            document.querySelector(".sidebar-menu-container label[for=sidebar-menu-section-0-3] span").innerHTML = TEXT_SFX_OFF;
        }
    };
    
    onGotoMenu(){
        this.toggleSideBar();
        this._oEventListener.triggerEvent(CGUIController.ON_GOTO_MAIN_MENU);
    };
    
    onRestartGame(){
        this.toggleSideBar();
        this._oEventListener.triggerEvent(CGUIController.ON_RESTART_GAME);
    };
    
    //END################MENU SIDEBAR
    
    ///////////////////////////////////LEADERBOARD
    getLeaderboardEntries(){
        if(!s_oNetworkManager.isLogged()){
            this.__createGeneralAlertModal(TEXT_PLS_LOGIN);
            return;
        }

        switch(this._iCurLeaderboardToShow){
            case this.LEADERBOARD_GENERAL:{
                    this.onSelectLeaderboardGeneral();
                    break;
            }
            case this.LEADERBOARD_MONTH:{
                    this.onSelectLeaderboardMonthly();
                    break;
            }
            case this.LEADERBOARD_DAY:{
                    this.onSelectLeaderboardDaily();
                    break;
            }
        }
        
    };
    
    async getPlayerNeighbors(iPlayerPos,iTypeLeaderboard){
        var oPromise = new Promise((resolve,reject)=>{
            var szLeaderboard = null;
            let oDate = new Date();


            switch(iTypeLeaderboard){
                case this.LEADERBOARD_MONTH:{
                        var oDayDate = oDate.toISOString().split('T')[0];
                        var aTmp = oDayDate.split("-");
                        szLeaderboard = aTmp[0]+"-"+aTmp[1];
                        break;
                }
                case this.LEADERBOARD_DAY:{
                        szLeaderboard = oDate.toISOString().split('T')[0];
                        break;
                }
            }

            if(iPlayerPos > 5){
                //GET TOP 3 PLAYERS
                this.getLeaderboardTopRankings(szLeaderboard,0,3).then((oRet)=>{

                    for(var k=0;k<oRet.length;k++){
                        var oEntry = this.parseLeaderboardEntry(oRet[k]);
                        this._aLeaderboard[iTypeLeaderboard][k] = oEntry;
                    }

                    //GET PLAYER NEIGHBOURS
                    this.getLeaderboardNeighbourRanking(szLeaderboard,-2,5).then((oRet)=>{

                        for(var k=0;k<oRet.length;k++){
                            this._aLeaderboard[iTypeLeaderboard][k] = this.parseLeaderboardEntry(oRet[k]);
                        }
                        resolve();
                    });
                }).catch((evt)=>{
                    reject();
                });


            }else{

                this.getLeaderboardTopRankings(szLeaderboard,0,this.NUM_LEADERBOARD_ROWS).then((oRet)=>{

                    for(var k=0;k<oRet.length;k++){
                        this._aLeaderboard[iTypeLeaderboard][k] = this.parseLeaderboardEntry(oRet[k]);
                    }

                    resolve();
                }).catch((evt)=>{
                    reject();
                });
            }
        });

        return await oPromise; 
    };
    
    __createLeaderboardDialog(iTypeLeaderboard,bAnimate){

        var szHtml = '<div class="modal fade more-games-box overflow-hidden" id="leaderboardModal" tabindex="-1" aria-labelledby="leaderboardModalLabel" aria-hidden="true">';
        szHtml += '<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">';
        szHtml += '<div class="modal-content leaderboard-container animate__animated animate__fadeInUpBig">';
        szHtml += '<div class="modal-header">';
        szHtml += '<i class="header-leaderboard-icon fa-solid fa-ranking-star"></i>';
        szHtml += '<h1 id="leaderboard-title" class="modal-title header-leaderboard-title text-end">'+TEXT_LEADERBOARD+'</h1>';
        szHtml += '<button type="button" class="btn-close btn-close-white align-self-start" data-bs-dismiss="modal" aria-label="Close"></button>';
        szHtml += '</div>';
        szHtml += '<div class="modal-body">';
        szHtml += '<table class="table">';
        szHtml += '<thead class=""><tr>';
        szHtml += '<th class="text-center leaderboard-level" id="table-title-col-1" scope="col">'+TEXT_POSITION+'</th>';
        szHtml += '<th class="text-center leaderboard-rank" id="table-title-col-2" scope="col">'+TEXT_RANK+'</th>';
        szHtml += '<th class="text-center leaderboard-nickname" id="table-title-col-3" scope="col">'+TEXT_NICKNAME+'</th>';
        szHtml += '<th class="text-center leaderboard-points" id="table-title-col-4" scope="col">'+TEXT_POINTS+'</th>';
        szHtml += '</tr></thead>';
        szHtml += '<tbody class="top-players-container">';

        szHtml += this._refreshLeaderboardTopPlayer(iTypeLeaderboard);
        
        szHtml += '</tbody><tbody class="last-players-container">';

        szHtml += this._refreshLeaderboardLastPlayer(iTypeLeaderboard);
        
        szHtml += '<tbody></table></div>';
        szHtml += '<div class="modal-footer justify-content-center">  ';
        szHtml += '<button type="button" class="btn btn-primary btn-sm active action-show-leaderboard-general" id="footer-btn-title-'+this.LEADERBOARD_GENERAL+'" >'+TEXT_GENERAL_LEADERBOARD+'</button>';
        szHtml += '<button type="button" class="btn btn-primary btn-sm action-show-leaderboard-month" id="footer-btn-title-'+this.LEADERBOARD_MONTH + '" >'+TEXT_MONTHLY_LEADERBOARD+'</button>';
        szHtml += '<button type="button" class="btn btn-primary btn-sm action-show-leaderboard-day" id="footer-btn-title-'+this.LEADERBOARD_DAY + '">'+TEXT_DAILY_LEADERBOARD+'</button>';
        szHtml += '</div></div></div></div></div>';

        document.querySelector("body").appendChild(htmlMarkupToNode(szHtml));  
        
        if(bAnimate){
            var leaderboardModal = new bootstrap.Modal(document.getElementById('leaderboardModal'));
            leaderboardModal.show();
        }
    };
    
    _refreshLeaderboardTopPlayer(iTypeLeaderboard){
        var szHtml = "";
        
        for(var k=0;k<3;k++){
            if(this._aLeaderboard[iTypeLeaderboard][k].userId === s_oNetworkManager.getPlayerNickname()){
                szHtml += '<tr class="top-players-bg-color table-active">';
                this._aPlayerPos[iTypeLeaderboard]["leaderboard_index"] = k;
            }else{
                szHtml += '<tr class="top-players-bg-color">';
            }

            szHtml += '<th class="text-end leaderboard-level" scope="row">'+(k+1)+'</th>';
            szHtml += '<td class="text-center leaderboard-badge badge-bg-top-player">'
            szHtml += '<div class="badges-container">';
            szHtml += '<div class="badges badge_'+this._aLeaderboard[iTypeLeaderboard][k].badge_index+'"></div></td>';
            szHtml += '</div>';
            //szHtml += '<td class="leaderboard-nickname"><img class="leaderboard-avatar" src="sprites/avatar/avatar1.png" alt="">'+this._aLeaderboard[iTypeLeaderboard][k].userId+'</td>';
            szHtml += '<td class="leaderboard-nickname">'+this._aLeaderboard[iTypeLeaderboard][k].userId+'</td>';
            szHtml += '<td class="text-end leaderboard-point point-bg-top-player">'+this._aLeaderboard[iTypeLeaderboard][k].score+'</td></tr>';
        }
        
        if(document.querySelector(".top-players-container")){
            document.querySelector(".top-players-container").innerHTML = "";
            document.querySelector(".top-players-container").appendChild(htmlMarkupToNode(szHtml));
        }
        
        return szHtml;
    };
    
    _refreshLeaderboardLastPlayer(iTypeLeaderboard){
        var szHtml = "";
        var iCont = this._aLeaderboard[iTypeLeaderboard][3].rank;
        for(var k=3;k<this._aLeaderboard[iTypeLeaderboard].length;k++){
            if(this._aLeaderboard[iTypeLeaderboard][k].userId === s_oNetworkManager.getPlayerNickname()){
                szHtml += '<tr class="table-active">';
                this._aPlayerPos[iTypeLeaderboard]["leaderboard_index"] = k;
            }else{
                szHtml += '<tr class="">';
            }
            
            szHtml += '<th class="text-end" scope="row">'+iCont+'</th>';
            szHtml += '<td class="text-center leaderboard-badge badge-bg-player"><i class="diamond-1"></i></td>';
            //szHtml += '<td><img class="leaderboard-avatar" src="sprites/avatar/avatar1.png" alt="">'+this._aLeaderboard[iTypeLeaderboard][k].userId+'</td>';
            szHtml += '<td>'+this._aLeaderboard[iTypeLeaderboard][k].userId+'</td>';
            szHtml += '<td class="text-end leaderboard-point point-bg-player">'+this._aLeaderboard[iTypeLeaderboard][k].score+'</td></tr>';

            iCont++;
        }
        
        if(document.querySelector(".last-players-container")){
            document.querySelector(".last-players-container").innerHTML = "";
            document.querySelector(".last-players-container").appendChild(htmlMarkupToNode(szHtml));
        }
        
        return szHtml;
    };

    async getLeaderboardTopRankings(szLeaderboard,iStartIndex,iCount,oCallbackSuccess,oCallbackError){
        var oPromise = new Promise((resolve,reject)=>{
            s_oCurClient.leaderboards.getTop(this.LEADERBOARD_GROUP_ID, szLeaderboard, iStartIndex, iCount, null,
                                function(entries) {resolve(entries);},
                                function(error) { reject(error);});
        });

        return await oPromise; 
    };

    async getLeaderboardPlayerRanking(szLeaderboard,szNickname){
        var oPromise = new Promise((resolve,reject)=>{
            s_oCurClient.leaderboards.getTop(this.LEADERBOARD_GROUP_ID, szLeaderboard, 0, 1, [ "simple"+szNickname ],
                                function(entries) {
                                    resolve(entries);
                                },
                                function(error) { 
                                    reject(error);
                                });
        });

        return await oPromise; 
    };

    async getLeaderboardNeighbourRanking(szLeaderboard,iStartIndex,iCount){
        var oPromise = new Promise((resolve,reject)=>{
       
            s_oCurClient.leaderboards.getNeighbourhood(this.LEADERBOARD_GROUP_ID, szLeaderboard, iStartIndex, iCount, null,
                                            function(entries) {resolve(entries);},
                                            function(error) { reject(error);});

        });

        return await oPromise; 
    };

    clearLeaderboards(){
        var oNode = document.querySelector("#leaderboardModal");
        oNode.innerHTML = '';
    };
    
    resetLeaderboard(iTypeLeaderboard){
        //CHECK IF PLAYER IN LEADERBOARD ARE ENOUGH
        if(this._aLeaderboard[iTypeLeaderboard].length<this.NUM_LEADERBOARD_ROWS){
            for(var k=this._aLeaderboard[iTypeLeaderboard].length;k<this.NUM_LEADERBOARD_ROWS;k++){
                this._aLeaderboard[iTypeLeaderboard][k] = {userId: "-", rank: k, score: "0"};
            }
        }
    };
    
    refreshLeadeboard(iTypeLeaderboard){
        if(document.getElementById("leaderboardModal")){
            this._refreshLeaderboardTopPlayer(iTypeLeaderboard);
            this._refreshLeaderboardLastPlayer(iTypeLeaderboard);
        }else{
            this.__createLeaderboardDialog(iTypeLeaderboard,true);
        }
        
        this.deselectButtons();
        this._iCurLeaderboardToShow = iTypeLeaderboard;
        document.querySelector("#footer-btn-title-"+iTypeLeaderboard).classList.add('active');
        this.__removeLoadingModal();
    };
    
    onSelectLeaderboardGeneral(){
        this.__createLoadingModal();
        this.resetLeaderboard(this.LEADERBOARD_GENERAL);
  
        if( this._aPlayerPos[this.LEADERBOARD_GENERAL] === undefined || 
                this._aPlayerPos[this.LEADERBOARD_GENERAL].score !== this._aLeaderboard[this.LEADERBOARD_GENERAL][this._aPlayerPos[this.LEADERBOARD_GENERAL].leaderboard_index].score){
     
            this.getLeaderboardPlayerRanking(null,s_oNetworkManager.getPlayerNickname()).then(
                (oRet)=>{
                    if(oRet.length>0){
                        this._aPlayerPos[this.LEADERBOARD_GENERAL] = this.parseLeaderboardEntry(oRet[0]);
                        
                        this.getPlayerNeighbors(oRet[0].rank,this.LEADERBOARD_GENERAL).then(()=>{
                            this.refreshLeadeboard(this.LEADERBOARD_GENERAL); 
                        });
                    }else{
                        this.refreshLeadeboard(this.LEADERBOARD_GENERAL);
                    }
                }
            );  
        }else{
            this.refreshLeadeboard(this.LEADERBOARD_GENERAL);
        }
        

    };

    onSelectLeaderboardMonthly(){
        this.__createLoadingModal();
        this.resetLeaderboard(this.LEADERBOARD_MONTH);
        
        let oDate = new Date();
        var oDayDate = oDate.toISOString().split('T')[0];
        var aTmp = oDayDate.split("-");
        var oMonthDate = aTmp[0]+"-"+aTmp[1];

        //GET PLAYER MONTH POSITION
        if( this._aPlayerPos[this.LEADERBOARD_MONTH] === undefined || 
                this._aPlayerPos[this.LEADERBOARD_MONTH].score !== this._aLeaderboard[this.LEADERBOARD_MONTH][this._aPlayerPos[this.LEADERBOARD_MONTH].leaderboard_index].score){
            this.getLeaderboardPlayerRanking(oMonthDate,s_oNetworkManager.getPlayerNickname()).then(    
                    (oRet)=>{ 
                        if(oRet.length>0){
                            this._aPlayerPos[this.LEADERBOARD_MONTH] = this.parseLeaderboardEntry(oRet[0]);
                            this.getPlayerNeighbors(oRet[0].rank,this.LEADERBOARD_MONTH).then(()=>{
                                this.refreshLeadeboard(this.LEADERBOARD_MONTH);
                            });
                        }else{
                            this.refreshLeadeboard(this.LEADERBOARD_MONTH);
                        }
                    }
            );
        }else{
            this.refreshLeadeboard(this.LEADERBOARD_MONTH);
        }

    };

    onSelectLeaderboardDaily(){
        this.__createLoadingModal();
        
        this.resetLeaderboard(this.LEADERBOARD_DAY);
        
        let oDate = new Date();
        var oDayDate = oDate.toISOString().split('T')[0];

        
        //GET PLAYER DAILY POSITION
        if( this._aPlayerPos[this.LEADERBOARD_DAY] === undefined || 
                this._aPlayerPos[this.LEADERBOARD_DAY].score !== this._aLeaderboard[this.LEADERBOARD_DAY][this._aPlayerPos[this.LEADERBOARD_DAY].leaderboard_index].score){
            this.getLeaderboardPlayerRanking(oDayDate,s_oNetworkManager.getPlayerNickname()).then(
                    (oRet)=>{ 
                        if(oRet.length>0){
                            this._aPlayerPos[this.LEADERBOARD_DAY] = this.parseLeaderboardEntry(oRet[0]);
                            this.getPlayerNeighbors(oRet[0].rank,this.LEADERBOARD_DAY).then(()=>{ 
                                this.refreshLeadeboard(this.LEADERBOARD_DAY);
                            });

                        }else{
                            this.refreshLeadeboard(this.LEADERBOARD_DAY);
                        }
                    }
            ); 
        }else{
            this.refreshLeadeboard(this.LEADERBOARD_DAY);
        }
    };

    deselectButtons(){
        document.querySelector("#footer-btn-title-"+this.LEADERBOARD_DAY).classList.remove('active');
        document.querySelector("#footer-btn-title-"+this.LEADERBOARD_GENERAL).classList.remove('active');
        document.querySelector("#footer-btn-title-"+this.LEADERBOARD_MONTH).classList.remove('active');
    };

    parseLeaderboardEntry(oEntry){
        var iScore = 0;
        if(oEntry.score){
            iScore = oEntry.score;
        }

        //CALCULATE BADGE TYPE
        var iLevel = this.calculateBadgeLevelByRanking(iScore);

        return {userId: (oEntry.userId).split("simple")[1], rank: oEntry.rank, score: iScore,badge_index:iLevel};
    };
    
    
    //END#################LEADERBOARD

    getRanking(){
        return this._iPlayerRanking;
    };
    
    getWinMatches(){
        return this._iWins;
    };
    
    getLossMatches(){
        return this._iLosses;
    };
    
    getTotMatches(){
        return this._iTotMatches;
    };
    
    getBadgeLevel(){
        return this._iCurBadgeLevel;
    };
    
    getRoomAccess(){
        return this._oInfoAccessRoom;
    };
    
    getNumBadges(){
        return this._iAmountBadges;
    };
    
}