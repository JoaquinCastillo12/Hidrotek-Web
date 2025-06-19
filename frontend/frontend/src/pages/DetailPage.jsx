import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductoDetail from '../components/ProductDetail';

const DetailPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ProductoDetail />
      </main>
      <Footer />
    </div>
  );
};

export default DetailPage;
