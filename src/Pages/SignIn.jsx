import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SignIn = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [_user, _loading, _error] = useAuthState(auth);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    useEffect(() => {
        if (_user) {
            navigate("/");
        }
    }, [_user, navigate]);

    const {register, handleSubmit, formState: { errors }} = useForm();
    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
        navigate("/");
    }
    return (
        <form className="max-w-screen-sm mx-auto p-16 border border-stone-300 rounded-md shadow-md my-16" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" {...register('email', {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address"
                    }
                })} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-6">
                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" {...register('password', {
                    required: {
                        value: true,
                        message: "Password is required"
                    },
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                })} />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3">Submit</button>
            <hr />
            {/* Sign in with google */}
            <button type="button" onClick={() => signInWithGoogle()} className="mt-4 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700">
                Sign in with Google
            </button>
        </form>

    );
};

export default SignIn;