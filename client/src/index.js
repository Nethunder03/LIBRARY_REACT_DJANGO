import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './style/Register.css';
import './style/bootstrap.min.css';
import './style/Books.css';
import './style/Loans.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Books.js
export const books = [
      {
        "name": "Pizza bolognaise",
        "price": 4592,
        "description": "Pizza bolognaise avec tomate et autres",
        "image": "/images/f4.png",
        "category": "Dinner",
        "availability": "active",
        "id": "1"
      },
      {
        "id": "2",
        "name": "Omelette au fromage",
        "description": "Omelette moelleuse au gruyère et fines herbes",
        "price": 5871,
        "image": "/images/f3.png",
        "category": "Breakfast",
        "availability": "active"
      },
      {
        "id": "3",
        "name": "Tartine avocat-saumon",
        "description": "Pain grillé avec avocat écrasé et saumon fumé",
        "price": 6888,
        "image": "/images/f5.png",
        "category": "Breakfast",
        "availability": "active"
      },
      {
        "id": "4",
        "name": "Salade Niçoise",
        "description": "Salade composée avec thon, œufs, olives et anchois",
        "price": 8469,
        "image": "/images/lunch-1.jpg",
        "availability": "active",
        "category": "Lunch"
      },
      {
        "id": "5",
        "name": "Quiche Lorraine",
        "description": "Tarte salée aux lardons et fromage",
        "price": 6233,
        "image": "/images/lunch-2.jpg",
        "availability": "active",
        "category": "Lunch"
      },
      {
        "id": "6",
        "name": "Croque-Monsieur",
        "description": "Sandwich chaud au jambon et fromage gratiné",
        "price": 5199,
        "image": "/images/lunch-3.jpg",
        "availability": "active",
        "category": "Lunch"
      },
      {
        "id": "7",
        "name": "Coq au vin",
        "description": "Poulet mijoté au vin rouge avec champignons et lardons",
        "price": 12349,
        "image": "/images/dinner-1.jpg",
        "availability": "active",
        "category": "Dinner"
      },
      {
        "id": "8",
        "name": "Bœuf Bourguignon",
        "description": "Ragoût de bœuf au vin rouge et légumes",
        "price": 14049,
        "image": "/images/dinner-2.jpg",
        "availability": "active",
        "category": "Dinner"
      },
      {
        "id": "9",
        "name": "Ratatouille",
        "description": "Plat végétarien de légumes du sud mijotés",
        "price": 9779,
        "image": "/images/dinner-3.jpg",
        "availability": "active",
        "category": "Dinner"
      },
      {
        "id": "10",
        "name": "Crème brûlée",
        "description": "Crème vanille avec une croûte de sucre caramélisé",
        "price": 4569,
        "image": "/images/dessert-1.jpg",
        "availability": "active",
        "category": "Desserts"
      },
      {
        "id": "11",
        "name": "Tarte Tatin",
        "description": "Tarte aux pommes caramélisées renversée",
        "price": 4889,
        "image": "/images/dessert-2.jpg",
        "availability": "active",
        "category": "Desserts"
      },
      {
        "id": "12",
        "name": "Profiteroles",
        "description": "Choux fourrés à la crème et nappés de chocolat",
        "price": 5871,
        "image": "/images/dessert-3.jpg",
        "availability": "active",
        "category": "Desserts"
      },
      {
        "id": "13",
        "name": "Château Margaux 2015",
        "description": "Vin rouge de Bordeaux, corsé et élégant",
        "price": 78400,
        "image": "/images/wine-1.jpg",
        "availability": "active",
        "category": "Wine List"
      },
      {
        "id": "14",
        "name": "Chablis Premier Cru 2018",
        "description": "Vin blanc sec de Bourgogne, minéral et frais",
        "price": 29549,
        "image": "/images/wine-2.jpg",
        "availability": "active",
        "category": "Wine List"
      },
      {
        "id": "15",
        "name": "Champagne Dom Pérignon 2010",
        "description": "Champagne prestigieux, complexe et raffiné",
        "price": 117800,
        "image": "/images/wine-3.jpg",
        "availability": "active",
        "category": "Wine List"
      },
      {
        "id": "16",
        "name": "Café Gourmand",
        "description": "Expresso servi avec une sélection de mignardises",
        "price": 5579,
        "image": "/images/drink-4.jpg",
        "availability": "active",
        "category": "Drinks and Teas"
      },
      {
        "id": "17",
        "name": "Thé Vert à la Menthe",
        "description": "Thé vert parfumé à la menthe fraîche",
        "price": 3239,
        "image": "/images/drink-5.jpg",
        "availability": "active",
        "category": "Drinks and Teas"
      },
      {
        "id": "18",
        "name": "Chocolat Chaud Viennois",
        "description": "Chocolat chaud crémeux surmonté de chantilly",
        "price": 3599,
        "image": "/images/drink.png",
        "availability": "active",
        "category": "Drinks and Teas"
      },
      {
        "id": "19",
        "name": "efrefrf",
        "price": 7840,
        "description": "ththth hy jyj",
        "image": "/images/f2.png",
        "category": "Dinner",
        "availability": "active"
      },
      {
        "id": "baf5",
        "name": "Pizza bolognaise",
        "price": 4592,
        "description": "Pizza bolognaise avec tomate et autres",
        "image": "/images/f4.png",
        "category": "Dinner",
        "availability": "active"
      },
      {
        "name": "Beurger Vegetarien",
        "price": 7840,
        "description": "Beurger sans vande",
        "image": "/images/f8.png",
        "category": "Dessert",
        "availability": "active",
        "id": "c3b7"
      }
    
];

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
