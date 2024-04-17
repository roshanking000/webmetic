import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './node_modules/flowbite-react/lib/esm/**/*.js',
    ],
    theme: {
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }

            'md': '768px',
            // => @media (min-width: 768px) { ... }

            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }

            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }

            '2xl': '1536px',
            // => @media (min-width: 1536px) { ... }
        },
        extend: {
            colors: {
                green_dark: "#173206",
                green_medium: "#A7E580",
                green_light: "#DAFACA",
                gray_light: "#F6F7F6",
                landing_color: "#1F3832",
                'neutral-black-400': '#858D9D',
                'neutral-100': '#E0E2E7',
                'neutral-300': '#A2A8A0',
                'neutral-500': '#636A62',
                'neutral-600': '#4E544D',
                'secondary-base': '#80A7E5',
                'secondary-100': '#ECF1FB',
                'secondary-200': '#BBCDF0',
                'secondary-300': '#80A7E5',
                'secondary-400': '#5082C4',
                'secondary-500': '#395E90',
                'secondary-600': '#233C5F',
                'secondary-red-500': '#EC3131',
                'secondary-green-500': '#29CCB0',
                'primary-50': '#EBF5FF',
                'primary-100': '#DAFACA',
                'primary-200': '#A7E580',
                'primary-300': '#ECF1FB',
                'primary-400': '#699250',
                'primary-500': '#4D6C39',
                'primary-600': '#324824',
                'primary-800': '#005412',
                'slack': '#501651',
                'gripp': '#04BEEA',
                'hubspot': '#FF5C35',
                'table': '#FBFAFF',
                'danger-50': '#FFF0F0',
                'danger-100': '#fee2e2',
                'danger-400': '#FF635E',
                'greyscale-300': '#EEEFF2',
                'greyscale-600': '#718096',
                'neutral-black-700': '#333843',
            },
            backgroundColor: {
                'sidebar': '#173206',
                'sidebar-item': '#DAFAC6',
                'main': '#fff',
                'searchbar': '#F5F5FA',
                'tertiary-100': '#FAEBEF',
                'tertiary-400': '#CE4984',
                'neutral-50': '#E15739',
                'neutral-100': '#37A0EA',
                'neutral-700': '#EFFEE8',
                'green-200': '#DAFAC6',
                'grey-100': '#EFF2ED',
            },
            textColor: {
                'sidebar': '#DAFAC6',
                'main': '#64748B',
                'overview-title': '#173206',
                'overview-value': '#111827',
                'overview-positive-percentage': '#27A376',
                'overview-negative-percentage': '#E03137',
                'overview-description': '#687588',
                'grey-400': '#858883',
                'grey-600': '#414240',
                'greyscale': '#687588',
                'greyscale-400': '#737373',
                'greyscale-900': '#0A0A0A',
                'title': '#173206',
                'grayscale': '#374151',
                'table-th': '#021B3F',
                'table-td': '#2A1C43',
                'neutral-50': '#F6F7F6',
                'neutral-400': '#7E857C',
                'neutral-700': '#404540',
                'neutral-800': '#363936',
                'neutral-900': '#2F322F',
                'neutral-950': '#181B18',
            },
            borderColor: {
                'dashboard': '#E2E8EF',
                'input': '#A2A8A0',
                'gray-300': '#D1D5DB',
                'grey-100': '#EFF2ED',
            }
        },
    },
    plugins: [
        require('flowbite/plugin')({
            charts: true,
        }),
    ]
});