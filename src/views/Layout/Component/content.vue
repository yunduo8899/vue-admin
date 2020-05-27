<template>
    <div id="content-wrap">
        <div id="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default{
    name:"Content",
    components:{

    },

    setup(props,context){

    }
}

</script>

<style lang="scss" scoped>
#content-wrap{
    position:fixed;
    bottom: 0;
    top:$navHeight;
    right:0;
    height:100vh - $navHeight;
    display:flex;
    background-color:#f7f7f7;
    justify-content: center;
    align-items: flex-end;
    @include webkit(transition, all .3s ease 0s);
}

//展开时内容宽度
.open{
    & #content-wrap{
        width:100vw - $menuWidth;
    }
}
//关闭时内容宽度
.close{
    & #content-wrap{
        width:100vw - $closeMenuWidth;
    }
}

#content{
    width:96%;
    background-color:#fff;
    height:96%;
}
</style>

