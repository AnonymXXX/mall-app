<template>
    <div class="home">
        <router-view></router-view>
        <TabBar />
    </div>
</template>

<script>
import TabBar from "../components/TabBar";
export default {
    components: {
        TabBar,
    },
};
</script>

<style></style>
