import React, { useRef } from 'react';

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <div className="border-t-4 border-main-color px-1 py-3 min-[520px]:py-4 md:px-10 md:py-7">
            <p className="mb-6 text-[1.1rem] min-[520px]:mb-7 min-[520px]:text-2xl md:mb-8 md:text-xl">
                Login to access the full dashboard
            </p>

            <form className="flex flex-col items-start gap-1 min-[520px]:gap-2 md:flex-row md:flex-wrap md:items-center md:gap-2">
                <label htmlFor="email" onClick={() => emailRef.current && emailRef.current.focus()}>
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailRef}
                    className="w-full max-w-[11.2rem] border border-gray-500 px-1 py-0.5 min-[520px]:max-w-xs md:w-52"
                />

                <label htmlFor="password" onClick={() => passwordRef.current && passwordRef.current.focus()}>
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    role="textbox"
                    ref={passwordRef}
                    className="w-full max-w-[11.2rem] border border-gray-500 px-1 py-0.5 min-[520px]:max-w-xs md:w-52"
                />

                <button type="submit" className="border border-gray-500 px-1 py-0.5">
                    OK
                </button>
            </form>
        </div>
    );
}

export default Login;
