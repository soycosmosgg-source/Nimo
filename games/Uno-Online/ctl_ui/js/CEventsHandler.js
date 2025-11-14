//V.1.2.1

class CEventsHandler{
    #_aCbToHandle;
    #_ID;
    constructor (){
        this.#_aCbToHandle = []; 
        this.#_ID = 0;
    }
    
    addEventListener(iEvent, cbCompleted, cbOwner, oParams, bOnce = false, bApply = false){    
        if(!Array.isArray(this.#_aCbToHandle[iEvent])){
           this.#_aCbToHandle[iEvent] = new Array(); 
        }

        let iID = this.__getID();
        
        this.#_aCbToHandle[iEvent].push(
            {
                toCall: cbCompleted,
                scope: cbOwner,
                params: oParams, 
                once: bOnce,
                apply: bApply,
                fired: false,
                id: iID
        });

        return {event:iEvent, id: iID};
    };
    
    triggerEvent(iEvent, oInternalData){
        if(!Array.isArray(this.#_aCbToHandle[iEvent])){
            return;
        }
        for(let i = 0; i < this.#_aCbToHandle[iEvent].length; i++){
            let oEvent = this.#_aCbToHandle[iEvent][i];
            if(oEvent.apply){
                if(oInternalData){
                    oEvent.toCall.apply(oEvent.scope, oInternalData.concat(oEvent.params));
                }else{
                    oEvent.toCall.apply(oEvent.scope, oEvent.params);
                }
            }else{
                oEvent.toCall.call(oEvent.scope, oInternalData, oEvent.params);
            }
            
            if(oEvent.once){
                this.__removeEventListener(this.#_aCbToHandle[iEvent], oEvent.id);
                i--;
            }
           
        }
    };
    
    removeAllEventListeners(iEvent){
        if(typeof iEvent === "undefined"){
            this.#_aCbToHandle = [];
        }else{
            this.#_aCbToHandle[iEvent] = [];
        }
    }
    
    removeEventListener(oIdentifier){
        this.__removeEventListener(oIdentifier.event, oIdentifier.id);
    }
    
    __removeEventListener(aEventListener, iID){
        for(let i = 0; i < aEventListener.length; i++){
            if(aEventListener[i].id === iID){
                aEventListener.splice(i, 1);
                break;
            }
        }
    };
    
    getEvents(){
        return this.#_aCbToHandle;
    }
    
    __getID(){
       return this.#_ID++;
    }
}