import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { axiosInstance } from '../../utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';

const signinSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})
const Signin = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(signinSchema) });
    const onSubmit = (data) => {
        console.log(data)
        setloading(true)
        axiosInstance.post('/api/v1/user/sign-in', data)
        .then((res) => {
            setloading(false)
            toast.success(res.data.message, {position: 'top-center', duration: 1000});
            setTimeout(() => {
                navigate('/')
            }, 1000)
        })
        .catch((err) => {
            setloading(false)
            toast.error(err.response.data.error)
        })
    }
    return (
        <section className="h-screen">
            <Toaster/>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="mx-auto w-full px-5 sm:px-20 lg:px-10">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                to="/user/signup"
                                title=""
                                className="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Create a free account
                            </Link>
                        </p>
                        <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-5">
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...register('email')}
                                    ></input>
                                    {errors.email?.message && <p className='text-red-500'>{errors.email?.message}</p>}
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-300">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <Link
                                            to="/"
                                            title=""
                                            className="text-sm font-semibold text-black hover:underline"
                                        >
                                            {' '}
                                            Forgot password?{' '}
                                        </Link>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            {...register('password')}
                                        />
                                        {errors.password?.message && <p className='text-red-500'>{errors.password?.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-gray-700 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-gray/80"
                                    >
                                        {loading ? (<>processing<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Get started"} <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="h-full w-full lg:inline hidden">
                    <img
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                        alt=""
                    />
                </div>
            </div>
        </section>
    )
}

export default Signin
