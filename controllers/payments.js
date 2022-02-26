const config = require("../config/index");
const { YOUR_DOMAIN, STRIPE_KEY } = config;
const stripe = require("stripe")(STRIPE_KEY);
const DOMAIN = `${YOUR_DOMAIN}/myposts`;

exports.checkPayment = async (req, res, next) => {
  const id = req.params.id;
  const { body = {} } = req;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1KWrDPCPhQu9FAfUJZrabqDt",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${DOMAIN}?success=true&idPost=${id}`,
    cancel_url: `${DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
};
