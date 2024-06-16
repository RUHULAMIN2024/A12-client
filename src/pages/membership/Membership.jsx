import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Helmet } from "react-helmet-async";
import CheckOutForm from "./CheckOutForm";
const Membership = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY);
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Membership</title>
      </Helmet>
      <section>
        <div className="lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
          <Elements stripe={stripePromise}>
            <CheckOutForm></CheckOutForm>
          </Elements>
        </div>
      </section>
    </>
  );
};

export default Membership;
