import Item from './components/Item'

new Vue
    el: '#app'
    data:
        name: null
        price: null
        db: firebase.database().ref()
        items: []

    components:
        item: Item

    methods:
        add: ->
            creationObject = {}
            creationObject['items/' + @db.child("items").push().key] =
                name: ''
                price: ''

            @db.update creationObject

    mounted: ->

        @db.onDisconnect().cancel =>
            console.log 'disconnected'
            
        @db.child('items').on 'value', (snapshot) =>
            console.log 'connected'
            @items = snapshot.val()


    computed:
        average: ->
            sum = 0
            n = 0

            for id, item of @items
                sum+= +item.price
                n++

            if n
                (sum / n).toFixed 2
            else
                "There are no items to show the average price"
