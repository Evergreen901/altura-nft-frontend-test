import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import GlobalState from './context/global/GlobalState';
import { Layout } from './components/layout';
import { LoadingBlocksWave } from './assets/loading';
import './App.scss';
import './global.scss';

const Home = lazy(() => import('./components/pages/Home'));

function App() {
    return (
        <BrowserRouter>
            <GlobalState>
                <Suspense
                    fallback={
                        <div className="w-screen h-screen flex items-center justify-center">
                            <LoadingBlocksWave width={48} height={48} />
                        </div>
                    }
                >
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<Home />} />
                            <Route path="/" element={<Home />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Route>
                    </Routes>
                </Suspense>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{
                        duration: 5000,
                        style: {
                            position: 'relative',
                            top: '4rem',
                            right: '1.5rem',
                            margin: '5px 0',
                            padding: '.7rem 1.5rem',
                            color: 'white',
                            fontSize: '16px',
                            borderRadius: '20px',
                            border: '2px solid #10172a',
                            boxShadow:
                                '0px 0px 0px 1.6px #1A2238, -4px -4px 8px rgba(255, 255, 255, 0.1), 4px 8px 8px rgba(1, 7, 19, 0.2)',
                            background: 'linear-gradient(135deg, #35405b 0%, #222c45 100%)',
                        },
                    }}
                />
            </GlobalState>
        </BrowserRouter>
    );
}

export default App;
