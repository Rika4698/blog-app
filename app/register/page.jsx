'use client'

import React from 'react';
import { Suspense } from 'react';
import RegisterForm from './components/RegisterForm';
export const dynamic = 'force-dynamic';

const page = () => {
    return (
        <Suspense fallback={<div>Loading form...</div>}>
           <RegisterForm/> 
        </Suspense>
    );
};

export default page;