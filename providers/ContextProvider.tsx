"use client";
import React from 'react';
import { GlobalContextProvider } from '@/context/globalContext';

interface Props {
    children: React.ReactNode;
}

export function ContextProvider({ children }: Props) {
    return <GlobalContextProvider>
        {children}
    </GlobalContextProvider>;
}

