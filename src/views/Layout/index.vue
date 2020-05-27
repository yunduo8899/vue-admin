<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
        <Menu></Menu>
        <Nav></Nav>
        <Content></Content>
    </div>
</template>

<script>
import Menu from "@v/Layout/Component/menu.vue";
import Nav from "@v/Layout/Component/nav.vue";
import Content from "@v/Layout/Component/content.vue";
import {computed} from "@vue/composition-api";

export default{
    name:"Layout",
    components:{
        Menu,
        Nav,
        Content,
    },

    setup(props,context){
        const menuStatus = computed(()=> context.root.$store.state.app.isCollapse);

        return {
            menuStatus,
        }
    }
}

</script>

<style lang="scss" scoped>


</style>

