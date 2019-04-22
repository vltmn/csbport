<template>
    <section :class="['hero', 'is-fullheight', 'is-bold', color]" v>
        <div class="hero-body">
            <div class="container">
                <slot></slot>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props: {
        color: String
    }
}
</script>
