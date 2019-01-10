new Vue({
    el: "#root",
    data:{
        title: "SimplexFood Restaurant Dashboard",
        orders:[
            {name:"Akin Toba", description:"Rice and Ofe-Akwu", address:"Ilupeju", telephone:"08133080861", open:true},
            {name:"Soji Tunde", description:"Rice and Chicken", address:"Gbagada", telephone:"08133080861", open:true}
        ]
    },
    created(){
        var pusher = new Pusher('80493e20ea0f59dafb82',{
            cluster:'mt1',
            encrypted:true
        })
        var channel = pusher.subscribe('orders')
        channel.bind('customerOrder', (data) => {
            //console.log(data)
            this.orders.push(data)
        })
    },
    methods:{
        // close completed order
        close(orderToClose){
            if ( confirm('Are you sure you want to close the order?') === true){
                this.orders = this.orders.map(order => {
                    if(order.name !== orderToClose.name && order.description !== orderToClose.description){
                        return order;
                    }
                    const change = {
                        open: !order.open
                    }
                    return change;
                })
            } 
        }
    }
})