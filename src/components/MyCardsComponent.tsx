import React from 'react';
import { Card } from '../types';
import CardComponent from './CardComponent';

interface IMyCards {
  cards: Card[];
  onStep: (card: Card) => void;
}

const MyCardsComponent: React.FC<IMyCards> = ({ cards, onStep }) => {
  return (
    <div className='playerCards'>
      {cards.map((card) => (
        <CardComponent card={card} key={card.id} onClick={() => onStep(card)} />
      ))}
    </div>
  );
};

export default MyCardsComponent;
