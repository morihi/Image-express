import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        wndStatuses: {},
        wndCount: 0,
        maxWndZIndex: 0,
        text_list: []
    },
    mutations: {
        setWndStatuses: (state, payload) => {
            if( !state.wndStatuses[payload.wndID] ) {
                Vue.set(state.wndStatuses, payload.wndID, {
                    zIndex: state.wndCount,
                });
                state.maxWndZIndex = state.wndCount;
                state.wndCount = state.wndCount+1;
            }
        },
        moveWndToTop: (state, payload) => {
            let oldZIndex = state.wndStatuses[payload.wndID].zIndex;
            state.wndStatuses[payload.wndID].zIndex = state.maxWndZIndex;
            for(let key in state.wndStatuses){
                if( (state.wndStatuses[key].zIndex > oldZIndex) && (key != payload.wndID) ) {
                    state.wndStatuses[key].zIndex -= 1;
                }
            }
        },
        setTextList: (state,payload) => {
          if(state.text_list.length==0){
            state.text_list.push(payload)
          }else{
            var id_list=[]
            for(var i=0; i<state.text_list.length; i++){
              id_list.push(state.text_list[i].wndID)
            }
            if(id_list.indexOf(payload.wndID)>=0){
              //送信されたIdが存在する
              state.text_list[id_list.indexOf(payload.wndID)].text = payload.text
              state.text_list[id_list.indexOf(payload.wndID)].title = payload.title
            }else{
              state.text_list.push(payload)
            }
          }
        },
        deleteText: (state,payload) =>{
          state.text_list = state.text_list.filter(value => value.wndID != payload)
        }
    },
    actions: {
        setWndStatuses(context, payload) {
            context.commit('setWndStatuses', payload);
        },
        moveWndToTop(context, payload) {
            context.commit('moveWndToTop', payload);
        }
    },
    getters: {
      textList(state) {
        return state.text_list
      }
    }
});
