require './firebase'

new Vue
    el: '#app'
    data:
        name: null
        price: null
        db: firebase.database()

    methods:
        send: ->
            key = @db.ref().child("items").push().key
            @db.ref('items/' + key).set
                name: @name
                price: @price
                
