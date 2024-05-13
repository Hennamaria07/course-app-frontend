import { ArrowRight } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { axiosInstance } from '../../utils/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const signupSchema = yup.object({
    firstName: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
})
const Signup = () => {
    const navigate = useNavigate();
    const [loading, setloading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(signupSchema) });
    const onSubmit = (data) => {
        console.log(data)
        setloading(true)
        axiosInstance.post('/api/v1/user/sign-up', data)
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
        <section className='h-screen w-screen'>
            <Toaster />
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="w-full h-full">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/user/signin"
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form action="#" method="POST" className="mt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-5 ">
                                <div className='grid sm:grid-cols-2 place-items-center gap-5' >
                                    <div className='w-full'>
                                        <label htmlFor="firstName" className="text-base font-medium text-gray-900">
                                            {' '}
                                            First Name{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="First Name"
                                                id="firstName"
                                                {...register('firstName')}
                                            ></input>
                                            {errors.firstName?.message && <p className='text-red-500'>{errors.firstName?.message}</p>}
                                        </div>
                                    </div>
                                    <div className='w-full'>
                                        <label htmlFor="lastName" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Last Name{' '}
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                placeholder="Last Name"
                                                id="lastName"
                                                {...register('lastName')}
                                            ></input>
                                            {errors.lastName?.message && <p className='text-red-500'>{errors.lastName?.message}</p>}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
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
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                            {...register('password')}
                                        ></input>
                                        {errors.password?.message && <p className='text-red-500'>{errors.password?.message}</p>}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        {loading ? (<>processing<span className='animate-pulse'>.</span><span className='animate-pulse'>.</span><span className='animate-pulse'>.</span></>) : "Create Account"}<ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="h-full w-full lg:inline hidden">
                    <img
                        className="mx-auto h-full w-full rounded-sm object-cover"
                        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                        alt=""
                    />
                </div>
            </div>
        </section>
    )
}

export default Signup



