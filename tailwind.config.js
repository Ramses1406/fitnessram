/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {

      screens: {
        'sm': '640px',
        'tablet': '700px',
        'Desktop': '1440px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      fontSize: {'base':'16px'},
      boxShadow: {

             'sharam' :'2px 21px 13px 1px hsl(240, 73%, 65%)'

      },
      backgroundPosition: {
      'ramram': ' -630px -350px',
      },
      backgroundImage: {
        'pattern': 'url("./images/bg-pattern-desktop.svg")',
        'pattern-mobile': 'url("./images/bg-pattern-mobile.svg")',
      },
      fontFamily: {
        'Barlow': ['Barlow', 'sans-serif'],
        'Fraunces': ['Fraunces', 'serif'],
      },
      colors: {
        primary: { 

          Softorange: 'hsl(35, 77%, 62%)',
          Softred: 'hsl(5, 85%, 63%)',
          Offwhite: 'hsl(36, 100%, 99%)',
          Grayishblue: 'hsl(233, 8%, 79%)',
          Darkgrayishblue: 'hsl(236, 13%, 42%)',
          Verydarkblue: 'hsl(240, 100%, 5%)',
        },
      },
    },
  },
  plugins: [],
}
  
          


      




      

      





 
      
      
    
     
    

