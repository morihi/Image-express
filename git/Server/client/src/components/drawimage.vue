<template>
    <div class="wnd-area">
      <button @click="addnew">
        add cards
      </button>
      <button @click="getText">
        get Text
      </button>
      <wnd-component v-for = "caption in items" v-bind = "caption" v-bind:key = "caption.caption" @child-event = "deleteItem"></wnd-component>
      <!--window1
        <wnd-component caption="Window1"
                       :visible.sync="isVisibleWindow"
                       @require-inner-item="window1RequireInnerItem"
                       ></wnd-component>
        <div ref="window1Inner" class="window-first-inner">
        </div>-->
    </div>
</template>

<script>
import store from "./store.js"
import wndComponent from "./wnd.vue"

export default {
    components: {
        wndComponent
    },
    data: function () {
        return {
            //isVisibleWindow: true,
            items: [],
            count: 0,
            position_x: 30,
            position_y: 30
        }
    },
    store,
    methods: {
      /*
        window1RequireInnerItem: function(callback){
            //ウインドウ1に内包すべき要素を設定
            callback(this.$refs.window1Inner);
        },*/
        addnew: function () {
          this.items.push({
            caption: "Card No."+this.count,
            visible: true,
            initialHeight: 128,
            initialWidth: 246,
            initialPosition: [this.position_x,this.position_y]
          })
          this.count += 1
          this.position_x += 30
          this.position_y += 30
        },
        deleteItem: function (id) {
          this.items = this.items.filter(value => value.caption != "Card No."+id)
        },
        getText: function () {
          console.log(this.$store.getters.textList)
        }
    },
}
</script>

<style scoped>
.wnd-area {
    width: 100%;
    height: 100%;
    position: absolute;
    user-select: none;
}
</style>
