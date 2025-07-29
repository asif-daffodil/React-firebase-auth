import { getAuth } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";


const Settings = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [_user, _loading, _error] = useAuthState(auth);
    const [updateProfile] = useUpdateProfile(auth);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        updateProfile({ displayName: data.displayName }).then(() => {
            navigate("/");
        })
    }

    useEffect(() => {
        if (!_user) {
            navigate("/sign-in");
        }
    }, [_user, navigate]);

    return (
        <div className="max-w-screen-sm mx-auto p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 my-5">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                    <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your display name" {...register("displayName", { required: {
                        value: true,
                        message: "Display Name is required"
                    } })} />
                    {errors.displayName && <span className="text-red-500 text-sm">{errors.displayName.message}</span>}
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Update Display Name</button>
            </form>
        </div>
    );
};

export default Settings;