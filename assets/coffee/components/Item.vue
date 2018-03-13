<template lang="pug">
    .item
        input(type="text", placeholder="*Name", v-model="name")
        input(type="text", placeholder="*Price", v-model="price")

        span.item-delete(@click="remove") -
</template>

<script lang="coffee">

export default
    props: ['name', 'price', 'id']
    data: ->
        db: firebase.database()

    methods:
        update: ->
            item =
                name: @name
                price: @price


            @db.ref().onDisconnect().cancel =>
                console.log 'disconnected'
            @db.ref('items/' + @id).set item

        remove: ->
            @db.ref().onDisconnect().cancel =>
                console.log 'disconnected'
            @db.ref('items/' + @id).set null

    watch:
        name: -> do @update
        price: -> do @update

</script>

<style lang="stylus" scoped>

.item
    display flex
    align-items center

    input
        font-size 1rem
        margin-right 10px

    &-delete
        color red
        font-weight bold
        margin-left 5px
        font-size 1.5rem
        cursor pointer

</style>
