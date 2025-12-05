import localFont from 'next/font/local';

export const vazirmatn = localFont({
    src: [
        {
            path: '../../public/fonts/Vazir-Light-FD-WOL.woff2',
            weight: '300',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Vazir-FD-WOL.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Vazir-Medium-FD-WOL.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../../public/fonts/Vazir-Bold-FD-WOL.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-vazirmatn',
    display: 'swap',
});