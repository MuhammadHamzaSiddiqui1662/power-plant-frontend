"use client";
import { Row, Col} from 'antd';
import "./style.css";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret }) {
    const stripe = useStripe();
    const elements = useElements();

    const stripePaymentHandler = async (e) => {
        e.preventDefault();
        try {

            if (!stripe || !elements) {
                return;
            }

            const cardNumberElement = elements.getElement(CardNumberElement);
            const cardExpiryElement = elements.getElement(CardExpirylement);
            const cardCvcElement = elements.getElement(CardCvcElement);

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement
            });

            if (error) {
                console.log(error);
                return;
            }

            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                paymentMethod: paymentMethod.id,
            });

            if (confirmError) {
                console.log(confirmError)
            }
            else {
                console.log(`Payment Successfull ${paymentIntent}`)
            }
        } catch (error) {
            console.log("error: ", error);
        }
    };

    return (
        <>
            <form onSubmit={stripePaymentHandler}>
                <Row justify={"center"}>

                    <Col>
                        <label>Card Number: </label>
                        <CardNumberElement />
                    </Col >

                    <Col>
                        <label>Expiry Date: </label>
                        <CardExpiryElement />
                    </Col >

                    <Col>
                        <label>CVC: </label>
                        <CardCvcElement />
                    </Col >

                    <Col>
                        <button type="submit" disabled={!stripe}>
                            Pay Now
                        </button>
                    </Col>

                </Row >
            </form>
        </>
    );
}
