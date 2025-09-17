import React from 'react';

// React.PropsWithChildren, component'in 'children' prop'unu alabilmesini sağlar.
const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      {/* Navbar component'i buraya gelecek */}
      <header>NAVBAR GELECEK</header> 
      
      <main>
        {/* Sayfaların asıl içeriği bu 'children' ile gösterilecek */}
        {children}
      </main>
      
      <footer>Footer Alanı</footer>
    </div>
  );
};

export default Layout;