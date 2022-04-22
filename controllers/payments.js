const stripe = require("stripe")(
  "sk_test_51KWZiGCPhQu9FAfU5xUdp7u8rdyzGxn6YLzoE46wV8heAWVZR4bX9GEZ1uDCTn9fjBXobwo7qHrlQwSBx02JGeaV00Uy6HyDvO"
);
const YOUR_DOMAIN = "http://localhost:3000/myposts";

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
    success_url: `${YOUR_DOMAIN}?success=true&idPost=${id}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
};
