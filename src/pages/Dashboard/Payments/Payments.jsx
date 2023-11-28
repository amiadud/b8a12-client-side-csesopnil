import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payments = () => {

    const stripePromies = loadStripe('pk_test_51OEqHBIgkYh3kN7GkgvM0awg4hrcNWnS94OsHnSfyIQCg4G9jsb1ChaXCSXvdKbdQQUoy3DXI1piBnBVefNuVo7100rasrSYdV')
    return (
        <div>
            <h2 className="text-3xl my-5 dark:text-white">Donate Now</h2>
            <div>
                <Elements  stripe={stripePromies}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
};

export default Payments;