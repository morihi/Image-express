<template>
    <transition v-on:enter="enter">
        <div class="wnd_outer"
             v-show="_visible"
             v-bind:style="{
                width: this._width,
                height: this._height,
                left: this._x,
                top: this._y,
                zIndex: this.zIndex,
             }"
        >
            <div class="caption" @mousedown.prevent="mousedown">
            </div>
            <div>
              <div class="title" v-if="!edit" v-text="title" placeholder ="title" v-on:click="edit = true"></div>
            <input class="inputtitle" v-if="edit" type="text" v-model="title" v-on:blur="editTitleStatus"
            placeholder="title" v-autofocus>
            </div>
            <div>
              <div v-if="!edittext" v-text="text" v-on:click="edittext = true"></div>
            <textarea rows = "3" cols = "25" v-if="edittext" type="text" v-model="text" v-on:blur="editTextStatus"
            placeholder="text" v-autofocus></textarea>
            </div>
            <div>
              <button class="close" type="button" @click="closeButtonClicked">
              <img class="image" src="./img/delete.png"/>
            </button>
          </div>
        </div>
    </transition>
</template>

<script>
/* eslint-disale */


export default {
    data: function () {
        return {
            wndID: 0,
            x: null,
            y: null,
            cursorOffset: {x: 0, y: 0},
            cursorStartPos: null,
            stateAtSizeChangeStarted: {width: 0, height: 0, cursorX: 0, cursorY: 0},
            width: this.initialWidth,
            height: this.initialHeight,
            text: '',
            title: '',
            edit: true,
            edittext: true
        }
    },
    props: {
        visible: {
            type: Boolean,
            default: true
        },
        caption: {
            type: String,
            default: ""
        },
        initialPosition: {
            type: Array,
            default: null,
        },
        sizeChangeEnable: {
            type: Boolean,
            default: true,
        },
        initialWidth: {
            type: Number,
            default: 0,
        },
        initialHeight: {
            type: Number,
            default: 0,
        }
    },
    computed: {
        _visible: function(){
            if( this.visible ){
                this.$emit('opened');
            } else {
                this.$emit('closed');
            }
            return this.visible;
        },
        _width: function() {
            return this.width ? `${this.width}px` : 'auto';
        },
        _height: function() {
            return this.height ? `${this.height}px` : 'auto';
        },
        _x: function() {
            return `${this.x}px`;
        },
        _y: function() {
            return `${this.y}px`;
        },
        zIndex: function() {
            return this.$store.state.wndStatuses[this.wndID].zIndex || 0;
        }
    },
    created: function(){
        this.wndID = this.$store.state.wndCount;
        this.$store.dispatch('setWndStatuses', {wndID: this.$store.state.wndCount});
    },
    mounted: function(){
        this.$emit('require-inner-item', el => {
            this.$refs.wndInner.appendChild(el);
            //（v-show=falseの時は要素の高さが取れないので初期化しない）
            if( this.visible && this.$el ){
                this.setInitialState();
            }
        });
    },
    updated: function () {
      this.$store.commit('setTextList',{wndID: this.wndID,
      title: this.title,
      text: this.text})
    },
    directives: {
      autofocus: {
        bind: function(el){
            el.focus()
        }
      }
    },
    methods: {

        //
        //  Initialize
        //

        enter: function() {
            this.setInitialState();
        },
        setInitialState: function() {
            this.width = this.initialWidth
            this.height = this.initialHeight + 22
            //初期化が済んでいれば処理を終了
            if( (this.x !== null) && (this.y !== null) ) return;
            if( this.initialPosition && this.initialPosition.length === 2 ){
                this.x = this.initialPosition[0];
                this.y = this.initialPosition[1];
            } else {
                this.x = (window.innerWidth / 2) - (this.$el.clientWidth / 2);
                this.y = (window.innerHeight / 2) - (this.$el.clientHeight / 2);
            }
        },

        //
        //  Change position
        //

        mousedown: function(e) {
            this.cursorOffset.x = e.pageX;
            this.cursorOffset.y = e.pageY;
            this.cursorStartPos = {x: this.x, y: this.y};
            document.addEventListener("mousemove", this.mousemove)
            document.addEventListener("mouseup", this.mouseup)
            this.$store.dispatch('moveWndToTop', {wndID: this.wndID});
        },
        mousemove: function(e) {
            this.x = this.cursorStartPos.x + (e.pageX - this.cursorOffset.x);
            this.y = this.cursorStartPos.y + (e.pageY - this.cursorOffset.y);
        },
        mouseup: function(e) {
            this.cursorStartPos = null;
            document.removeEventListener("mousemove", this.mousemove)
            document.removeEventListener("mouseup", this.mouseup)
        },

        //
        //  Resize window
        //

        startSizeChange: function(e) {
            let wndRect = this.$el.getBoundingClientRect()
            this.stateAtSizeChangeStarted = {
                width: wndRect.width,
                height: wndRect.height,
                cursorX: e.pageX,
                cursorY: e.pageY
            };
            document.addEventListener('mousemove', this.whileSizeChange, false);
            document.addEventListener('mouseup', this.endSizeChange, false);
        },
        whileSizeChange: function(e) {
            this.width = this.stateAtSizeChangeStarted.width + e.pageX - this.stateAtSizeChangeStarted.cursorX
            this.height = this.stateAtSizeChangeStarted.height + e.pageY - this.stateAtSizeChangeStarted.cursorY
        },
        endSizeChange: function(e) {
            document.removeEventListener('mousemove', this.whileSizeChange, false);
            document.removeEventListener('mouseup', this.endSizeChange, false);
        },

        //
        //  Buttons
        //
        closeButtonClicked: function() {
            this.$emit('child-event',this.wndID)
            this.$store.commit('deleteText',this.wndID)
            this.$emit('closed');
            this.$emit('update:visible', false)

        },
        editTextStatus: function () {
          if(this.text != ''){
            this.edittext = false
          }else{
            this.edittext = true
          }
        },
        editTitleStatus: function () {
          if(this.title != ''){
            this.edit = false
          }else{
            this.edit = true
          }
        }
    },
}
/* eslint-enable */
</script>

<style scoped>
.wnd_outer {
    position: fixed;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    border: solid 1px black;
    border-radius: 5px 5px 0 0;
    background-color: white;
    z-index: 1000;
}
.caption {
    width: 100%;
    height: 12px;
    background-color: black;
    padding: 0;
    box-sizing: border-box;
    color: white;
    font-size: 9pt;
    padding: 4px 0 4px 10px;
    position: relative;
}
.close {
    background-color: transparent;
    color: red;
    cursor: pointer;
    position: absolute;
    bottom: 0px;
    right: 0px;
}
textarea{
  resize: none;
  font-size: 15pt;
  height: 62pt;
}
.title{
  width: 180pt;
  color: black;
}
.inputtitle{
  width: 180pt;
}
.image{
  height: 20px;
  width: 20px;
}
</style>
