<template>
    <div class="waveContainer">
        <div :class="{ 'wave-static h-2': static, wave: !static }" class="wave1"></div>
        <div :class="{ 'wave-static h-6': static, wave: !static }" class="wave2"></div>
        <div :class="{ 'wave-static h-10': static, wave: !static }" class="wave3"></div>
        <div :class="{ 'wave-static h-5': static, wave: !static }" class="wave4"></div>
        <div :class="{ 'wave-static h-3': static, wave: !static }" class="wave5"></div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    static?: boolean
}>()
</script>
<style>
.waveContainer {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    height: 38px;
    --boxSize: 5px;
    --gutter: 4px;
    width: calc((var(--boxSize) + var(--gutter)) * 5);
    align-items: center;
}

.wave {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);

    width: var(--boxSize);
    -webkit-animation-duration: 0.8s;
    animation-duration: 0.8s;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    border-radius: 80px;
}
.wave-static {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    width: var(--boxSize);
    border-radius: 80px;
}
.wave1 {
    -webkit-animation-name: random1;
    animation-name: random1;
    background: #7c17d4;
}

.wave2 {
    -webkit-animation-name: random2;
    animation-name: random2;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    background: #18aae8;
}

.wave3 {
    -webkit-animation-name: random3;
    animation-name: random3;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
    background: #3a9284;
}

.wave4 {
    -webkit-animation-name: random4;
    animation-name: random4;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
    background: #ffd402;
}

.wave5 {
    -webkit-animation-name: random5;
    animation-name: random5;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
    background: #f3135b;
}

@-webkit-keyframes random1 {
    0% {
        height: 25%;
    }
    50% {
        height: 100%;
    }
    100% {
        height: 25%;
    }
}
@keyframes random1 {
    0% {
        height: 25%;
    }
    50% {
        height: 100%;
    }
    100% {
        height: 25%;
    }
}
@-webkit-keyframes random2 {
    0% {
        height: 22%;
    }
    50% {
        height: 65%;
    }
    100% {
        height: 22%;
    }
}
@keyframes random2 {
    0% {
        height: 22%;
    }
    50% {
        height: 65%;
    }
    100% {
        height: 22%;
    }
}
@-webkit-keyframes random3 {
    0% {
        height: 65%;
    }
    50% {
        height: 20%;
    }
    100% {
        height: 65%;
    }
}
@keyframes random3 {
    0% {
        height: 65%;
    }
    50% {
        height: 20%;
    }
    100% {
        height: 65%;
    }
}
@-webkit-keyframes random4 {
    0% {
        height: 20%;
    }
    50% {
        height: 80%;
    }
    100% {
        height: 20%;
    }
}
@keyframes random4 {
    0% {
        height: 20%;
    }
    50% {
        height: 80%;
    }
    100% {
        height: 20%;
    }
}
@-webkit-keyframes random5 {
    0% {
        height: 100%;
    }
    50% {
        height: 35%;
    }
    100% {
        height: 100%;
    }
}
@keyframes random5 {
    0% {
        height: 100%;
    }
    50% {
        height: 35%;
    }
    100% {
        height: 100%;
    }
}
</style>
