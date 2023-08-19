import { useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { handleStripeToken } from "../store";
import { GoPlus } from "react-icons/go";

interface PaymentFormProps {
  smAbove?: boolean;
}

const PaymentForm = ({ smAbove }: PaymentFormProps) => {
  const dispatch = useDispatch<any>();

  const onReceiveToken = (token: any) => {
    dispatch(handleStripeToken(token));
    // note: token object contains various metadata. The actual token is under the "id" field of the object.
  };

  return (
    <StripeCheckout
      name="Mailer"
      description="$5 for 5 credits"
      amount={500}
      token={onReceiveToken}
      stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
    >
      <button className="btn btn-success">
        {smAbove ? "Add credits" : <GoPlus />}
      </button>
    </StripeCheckout>
  );
  // 1. User clicks on "Add credits" button, checkout form is shown, user enters payment details
  // 2. User clicks on "Pay" button, request with payment details is sent to Stripe API, along with Stripe publishable key that identifies our app to Stripe
  // 3. Stripe responds back with token representing the transaction, after which "onReceiveToken" callback is invoked and request is made to our Node backend server with the token for validation
};

export default PaymentForm;
