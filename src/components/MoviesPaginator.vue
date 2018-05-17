<template>
    <nav>
        <ul class="pagination">
            <li class="page-item" v-for="page in pages" :key="page">
                <a class="link" @click="selectPage(page)">{{ page }}</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'MoviesPaginator',
    props: {
        pages: {
            type: Number,
            required: true,
            default: 0
        },
        selectedPage: {
            type: Number,
            required: true,
            default: 1
        }
    },
    methods: {
        selectPage(page) {
            this.$emit('selected-page', page)
        }
    }

}
</script>

<style>

</style>
