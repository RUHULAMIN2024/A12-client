import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "./../../hooks/useAuth";
import useAxiosPublic from "./../../hooks/useAxiosPublic";

function CheckOutForm() {
  const navigate = useNavigate();
  const [getClientSecret, setGetClientSecret] = useState("");

  const [processingPaymentUser, setProcessingPaymentUser] = useState(false);

  const [paymentSubmitErrorUser, setPaymentSubmitErrorUser] = useState(null);

  const axiosPublic = useAxiosPublic();

  const { userInfo } = useAuth();

  useEffect(() => {
    const getMemberShipIntent = async () => {
      const res = await axiosPublic.post("/create-membership-intent", {
        membershipfee: 50,
      });
      const resData = await res.data;
      setGetClientSecret(resData.clientSecret);
    };
    getMemberShipIntent();
  }, [axiosPublic]);

  const stripe = useStripe();
  const elements = useElements();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessingPaymentUser(true);
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentSubmitErrorUser(error.message);
      setProcessingPaymentUser(false);
      return;
    } else {
      setPaymentSubmitErrorUser(null);
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(getClientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userInfo?.displayName,
            email: userInfo?.email,
          },
        },
      });
    if (confirmError) {
      setPaymentSubmitErrorUser(confirmError.message);
      setProcessingPaymentUser(false);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const res = await axiosPublic.patch(`/get-gold-badge/${userInfo?.email}`);
      const resData = await res.data;
      if (resData.modifiedCount > 0) {
        Swal.fire({
          title: "Congratulations!",
          text: "You have successfully become a member",
          icon: "success",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
        navigate("/");
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong",
          icon: "error",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        });
      }
      setPaymentSubmitErrorUser(null);
      setProcessingPaymentUser(false);
    }
  };
  return (
    <>
      <div className="w-full flex justify-center items-center text-center">
        <div className="flex flex-col space-y-3 shadow-md p-8">
          <h1 className="font-bold text-xl">Become a Member</h1>
          <p>Pay $50 to become a member and receive the Gold badge.</p>
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#ff00d3",
                    "::placeholder": {
                      color: "#7986cv",
                    },
                  },
                  invalid: {
                    color: "#ff00d3",
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe || !getClientSecret || processingPaymentUser}
              className="btn btn-accent mx-auto"
            >
              Pay Now{" "}
              <ImSpinner9
                className={processingPaymentUser && "animate-spin"}
              ></ImSpinner9>
            </button>
          </form>
          {paymentSubmitErrorUser && (
            <span className="text-[18px] text-red-500 font-medium">
              {paymentSubmitErrorUser}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default CheckOutForm;
