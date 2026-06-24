import React, { useRef } from 'react';

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <div className="border-t-4 border-main-color px-10 py-7">
            <p className="mb-8 text-2xl md:text-xl">Login to access the full dashboard</p>

            <form className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-2">
                <label htmlFor="email" onClick={() => emailRef.current && emailRef.current.focus()}>
                    Email:
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailRef}
                    className="min-w-0 border border-gray-500 px-1 md:w-52"
                />

                <label htmlFor="password" onClick={() => passwordRef.current && passwordRef.current.focus()}>
                    Password:
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    role="textbox"
                    ref={passwordRef}
                    className="min-w-0 border border-gray-500 px-1 md:w-52"
                />

                <button type="submit" className="border border-gray-500 px-1">
                    OK
                </button>
            </form>
        </div>
    );
}

export default Login;
