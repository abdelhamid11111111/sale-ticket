"use client";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import FirstForm from "./FirstForm";
import SecondForm from "./SecondForm";
import SuccessModal from "./Successful";
import FailedModal from "./Failed";

interface Props {
  price: string;
  title: string;
  image?: string;
  eventDate: string;
  cityId: string;
  eventId: string;
}

const Form = ({ price, title, image, eventDate, cityId, eventId }: Props) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);

  const subtotal = Number(price) * quantity;

  useEffect(() => {
    let session = localStorage.getItem("sessionId");
    if (!session) {
      session = crypto.randomUUID();
      localStorage.setItem("sessionId", session);
    }
    const load = () => {
      setSessionId(session);
    };
    load();
  }, []);

  const handleSubmit = async () => {
    try {
      const buyerRes = await fetch("/api/usrUI/buyers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });

      if (!buyerRes) {
        setFailed(true);
        return;
      }
      const { buyerId } = await buyerRes.json();

      const ticketRes = await fetch("/api/usrUI/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId,
          sessionId,
          quantity,
          totalPrice: subtotal,
          cityId,
          eventId,
        }),
      });

      if (ticketRes.ok) {
        setSuccess(true);
      } else {
        setFailed(true);
      }
    } catch (error) {
      console.error("Error ", error);
      setFailed(true);
    }
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleNext = () => {
    if (!form.username || !form.email || !form.phone) {
      setError("fields are required");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email");
      return;
    }
    if (isNaN(Number(form.phone))) {
      setError("Phone must be number");
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
    setStep(1);
    setForm({ username: "", email: "", phone: "" });
    setQuantity(1);
    setSuccess(false);
    setFailed(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full text-white font-bold py-4 px-6 bg-slate-900 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 group"
      >
        <span>Book Now</span>
        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto"
          style={{ background: "rgba(0,0,0,0.3)" }}
        >
          {/* Background blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
              style={{ background: "rgba(19,91,236,0.05)" }}
            />
            <div
              className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]"
              style={{ background: "rgba(19,91,236,0.1)" }}
            />
          </div>

          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-lg mx-auto my-auto">
            <div
              className="rounded-4xl overflow-hidden border relative"
              style={{
                background: "#ffffff",
                borderColor: "#f1f5f9",
                boxShadow: "0 20px 40px -10px rgba(19,91,236,0.1)",
              }}
            >
              {/* Progress Header */}
              {success === false && failed === false && (
                <div className="px-4 sm:px-8 pt-4 sm:pt-8 pb-3 sm:pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold tracking-wider uppercase text-slate-900">
                      Step {step} of 2
                    </span>
                  </div>
                  <div
                    className="h-2 w-full rounded-full overflow-hidden"
                    style={{ background: "#f1f5f9" }}
                  >
                    <div
                      className="h-full rounded-full bg-slate-900 transition-all duration-300"
                      style={{
                        width: `${step * 50}%`,
                        boxShadow: "0 0 10px rgba(19,91,236,0.5)",
                      }}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="px-4 sm:px-8 pb-2">
                  <div className="w-full rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-3">
                    {error}
                  </div>
                </div>
              )}

              {success === false && failed === false && (
                <>
                  {step === 1 && (
                    <FirstForm
                      price={price}
                      eventDate={eventDate}
                      title={title}
                      image={image}
                      form={form}
                      setForm={setForm}
                    />
                  )}
                  {step === 2 && (
                    <SecondForm
                      quantity={quantity}
                      eventDate={eventDate}
                      title={title}
                      image={image}
                      subtotal={subtotal}
                      price={price}
                      setQuantity={setQuantity}
                    />
                  )}
                </>
              )}

              {success && <SuccessModal />}
              {failed && <FailedModal handleClose={handleClose} />}

              {/* Actions */}
              {success === false && failed === false && (
                <div className="pt-2 px-4 sm:px-8 pb-4 sm:pb-6 flex items-center justify-end gap-2 sm:gap-3">
                  {step === 1 ? (
                    <>
                      <button
                        onClick={handleClose}
                        className="font-bold py-2 sm:py-4 px-4 sm:px-6 rounded-full transition-colors text-xs sm:text-sm"
                        style={{
                          border: "1px solid #e2e8f0",
                          color: "#475569",
                        }}
                        type="button"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleNext}
                        className="flex text-white font-bold py-2 sm:py-4 px-5 sm:px-8 rounded-full bg-slate-900 shadow-lg transition-all active:scale-[0.98] items-center justify-center gap-2 group text-xs sm:text-base"
                        type="button"
                      >
                        Next
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setStep(step - 1)}
                        className="font-bold py-2 sm:py-4 px-4 sm:px-6 rounded-full transition-colors text-xs sm:text-sm"
                        style={{
                          border: "1px solid #e2e8f0",
                          color: "#475569",
                        }}
                        type="button"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex text-white font-bold py-2 sm:py-4 px-5 sm:px-8 rounded-full bg-slate-900 shadow-lg transition-all active:scale-[0.98] items-center gap-2 group text-xs sm:text-base"
                        type="button"
                      >
                        Buy
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;