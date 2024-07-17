import Navbar from "../componants/Navbar";
import Footer from "../componants/Footer";
import SignUpForm from "../../forms/SignUpForm/SignUpForm";
import "./style.css";

export default function Login() {
  return (
    <>
      <Navbar />
      <section className="my-28">
        <div className="container-login z-3">
          <h5 className="my-6 text-4xl text-center">Sign Up</h5>
          <SignUpForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
