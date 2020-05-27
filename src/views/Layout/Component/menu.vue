<template>
    <div id="menu-wrap">
        <el-menu 
        default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        :collapse="isCollapse"
        background-color="transparent"
        text-color="#fff"
        router>
            <template v-for="(item,indexRoutes) in routes">
                <el-submenu :index="indexRoutes+''" :key="item.id" v-if="!item.hidden">
                    <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <svg :class="'icon ' + item.meta.icon" aria-hidden="true">
                        <use :xlink:href="'#icon-' + item.meta.icon"></use>
                    </svg>

                    <span slot="title">{{item.meta.name}}</span>
                    </template>
                    <el-menu-item-group>
                    <template v-for="childItem in item.children">
                        <el-menu-item :index="childItem.path" :key="childItem.id">{{childItem.meta.name}}</el-menu-item>
                    </template>
                    </el-menu-item-group>
                    <!-- 三级菜单
                    <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu> -->
                </el-submenu>
            </template>
            </el-menu>
    </div>
</template>

<script>
import {reactive,ref,isRef, onMounted, computed} from '@vue/composition-api';

export default{
    name:"Menu",
    components:{

    },

    setup(props,context){
        /****************************************************************
         * 变量声明
         */
        const routes = reactive(context.root.$router.options.routes);


        /****************************************************************
         * 函数声明
         */
        //监听计算isCollapse
        const isCollapse = computed(() => context.root.$store.state.isCollapse);
        console.log(context.root.$store.state.app);

        /****************************************************************
         * 页面加载后
         */
        onMounted(()=>{
        // console.log(context.root.$router.options);

        });


        return {
            routes,
            isCollapse,
        }

    }
}

</script>

<style lang="scss" scoped>

#menu-wrap{
    position:fixed;
    left:0;
    top:0;
    height:100vh;
    background-color:#344a5f;
    @include webkit(transition, all 0.3s ease 0s);
}

.open{
    & #menu-wrap{
        width:$menuWidth;
    } 
}

.close{
    & #menu-wrap{
        width:$closeMenuWidth;
    } 
}

.icon {
       width: 1.2em; height: 1.2em;
       vertical-align: -0.15em;
       fill: currentColor;
       overflow: hidden;
       margin-right:0.6em;
       
    }

</style>

