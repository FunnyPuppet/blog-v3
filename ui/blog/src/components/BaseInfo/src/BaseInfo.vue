<script setup>

</script>

<template>
    <div class="base_info_box">
        <div class="bg-box">

        </div>
        <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
            <div style="flex: 1; text-align: center;">
                <span class="base_info_box_title">2</span><br />
                <span class="base_info_box_title">文章</span>
            </div>
            <el-divider direction="vertical" />
            <div style="flex: 1; text-align: center;">
                <span class="base_info_box_title">0</span><br />
                <span class="base_info_box_title">说说</span>
            </div>
            <el-divider direction="vertical" />
            <div style="flex: 1; text-align: center;">
                <span class="base_info_box_title">0</span><br />
                <span class="base_info_box_title">留言</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.base_info_box {
    width: 100%;
    height: 18rem;
    background-color: var(--bg-color);
    border-radius: 5px;
    border: 1px solid var(--border-color);
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;

    &_title {
        font-size: 1.2rem;
        font-weight: bold;
        color: var(--font-color); 
    }
}

.bg-box {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    position:relative;
    background: url("@/assets/images/w9.png");
    background-size: auto 100%;
    border-radius: 5px 5px 0 0;
    background-position: 0px 0px;
    background-repeat: repeat-x;
    animation: abg 60s linear infinite;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, var(--bg-color) 100%);
    }
}

@keyframes abg {
    from {
        background-position: 0 0;
    }

    to {
        background-position: 100% 0;
    }
}
</style>