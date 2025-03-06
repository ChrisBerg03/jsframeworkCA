import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Contact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = () => {
        const formObj = {
            name: document.querySelector("#nameInput").value,
            subject: document.querySelector("#subjectInput").value,
            email: document.querySelector("#emailInput").value,
            message: document.querySelector("#messageInput").value,
        };
        console.log(formObj);

        toast.success("Form submitted successfully!", { autoClose: 1000 });
        setTimeout(() => navigate("/"), 1500);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">
                Contact Us
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1">Full Name</label>
                    <input
                        id="nameInput"
                        type="text"
                        placeholder="Full Name"
                        {...register("name", {
                            required: "Full Name is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters required",
                            },
                        })}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Subject</label>
                    <input
                        id="subjectInput"
                        type="text"
                        placeholder="Subject"
                        {...register("subject", {
                            required: "Subject is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters required",
                            },
                        })}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-sm">
                            {errors.subject.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Email</label>
                    <input
                        id="emailInput"
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                message: "Invalid email address",
                            },
                        })}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-1">Message</label>
                    <textarea
                        id="messageInput"
                        placeholder="Message"
                        {...register("message", {
                            required: "Message is required",
                            minLength: {
                                value: 3,
                                message: "Minimum 3 characters required",
                            },
                        })}
                        className="w-full p-2 border rounded-lg"
                    />
                    {errors.message && (
                        <p className="text-red-500 text-sm">
                            {errors.message.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-amber-400 text-white p-2 rounded-lg hover:bg-amber-600 transition"
                >
                    Submit
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Contact;
