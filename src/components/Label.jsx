'use client';

export default function Button({ styled, children }) {
    return (
        <label
            className={`block mb-2 text-[16px] text-left text-gray-900${styled}`}>
            {/* className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${styled}`}> */}
            {children}
        </label>
    )
}
