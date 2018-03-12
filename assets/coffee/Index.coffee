new Vue
    el: '#app'
    data:
        name: null
        price: null

    methods:
        send: ->
            console.log @name
            console.log @price
