<template>
    <div id='nav-wrap'>
        <div class="self-left" @click="toggle()">
            <svg class="icon icon-toggle" aria-hidden="true">
                <use xlink:href="#icon-toggle"></use>
            </svg>
        </div>
        <div class="self-center"></div>
        <div class="self-right">
            <!-- 图片 -->
            <div class="right-img">
                <img src="@/assets/lvye1.jpg" alt="">
            </div>
            <!-- 字体 -->
            <div class="right-desc">
                <p :title="username">{{username}}</p>
            </div>
            <!-- 关闭图标 -->
            <div class="right-icon">
                <svg class="icon icon-close" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "@vue/composition-api";

export default{
    name:"Nav",
    components:{

    },
    
    setup(props,{ root }){

        const toggle = ()=>{
            root.$store.commit("app/SET_COLLAPSE");
        };

        const username = computed(() => root.$store.state.login.user_name);

        return {
            toggle,
            username,
        }
    }
}

</script>

<style lang="scss" scoped>
//导航栏图标位置样式
@mixin iconPosition{
    width:$navHeight;
    height:$navHeight;
    display: flex;
    justify-content: center;
    align-items: center;
}
#nav-wrap{
    position:fixed;
    right:0;
    top:0;
    height:$navHeight;
    background-color:#fff;
    display: flex;
    justify-content:space-between;
    @include webkit(box-show,0 3px 16px 0 rgba(0,0,0,.1));
    @include webkit(transition, all 0.3s ease 0s);
}

//展开时内容宽度
.open{
    & #nav-wrap{
        width:100vw - $menuWidth;
    }
}
//关闭时内容宽度
.close{
    & #nav-wrap{
        width:100vw - $closeMenuWidth;
    }
}

.icon {
       width: 1em; height: 1em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
       color:#333;
        width:60%;
        height:60%;
    }

.self-left{
   @include iconPosition;
   cursor:pointer;

}

//右侧样式
.self-right{
    width:$navHeight*3.5;
    display: flex;
    justify-content: center;
    align-items: center;
    //右侧图片
    & .right-img{
        width:100%;
        height:100%;
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        // border:1px solid #42318a;
        img{
            width:60%;
            height:60%;
            // border:1px solid #42318a;
            border-radius:50%;
        }
    }
    //右侧字体样式
    & .right-desc{
        padding-left:0.5em;
        flex:1.5;
        font-size:0.8em;
    }
    //右侧图标按钮样式
    & .right-icon{
        flex:1;
        @include iconPosition;
        border-left:1px solid rgba(222,222,222,0.5);
    }
   

}


</style>

