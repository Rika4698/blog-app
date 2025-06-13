'use client'
import React from 'react';
import { Suspense } from 'react';
import LoginForm from './components/LoginForm';
export const dynamic = 'force-dynamic';
const page = () => {
    
    return (
        <Suspense fallback={<div>Loading login form...</div>}>
            <LoginForm/>
        </Suspense>
    );
};

export default page;