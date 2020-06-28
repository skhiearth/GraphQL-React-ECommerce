'use strict';
const stripe = require('stripe')('sk_test_51GyxLcK031snNebIvIYW9w6BHTEjL2Zz1EuRJm9uWkcKqwC8Vjg0lc8MvmPyBLOep4bpYgGPpdqvCXWvSaO7pWpg00mkM5qc9e');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */


module.exports = {
    create: async(ctx) => {
        const {address, amount, brews, postalCode, token, city} = ctx.request.body;
        const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: 'inr',
            description: `Order ${new Date(Date.now())} - User ${ctx.state.user._id}`,
            source: token
        });
    
        // const order = await strapi.services.orders.add({
        //     user: ctx.state.user._id,
        //     address,
        //     amount,
        //     brews,
        //     postalCode,
        //     city
        // });
    
        const order = await strapi.api.orders.services.orders.create({
            user: ctx.state.user._id,
            address,
            amount,
            brews,
            postalCode,
            city
          });

        return order;
    },
};
