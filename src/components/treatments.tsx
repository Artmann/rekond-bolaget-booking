import React from 'react';
import styled from 'styled-components';

export interface Treatment {
  name: string;
  description: string;
  price: number;
}

interface TreatmentsProps {
  onSelectTreatment: (treatment: Treatment) => void;
  selectedTreatment: Treatment;
  treatments: Treatment[];
}
interface CardProps {
  isSelected: boolean;
  onSelect: (treatment: Treatment) => void;
  treatment: Treatment;
}
interface StyledCardProps {
  isSelected: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
  border: solid 1px ${ props => props.isSelected ? '#2F855A' : '#CBD5E0'};
  color: #4A5568;
  padding: 1rem;
  margin: 0 0 1.75rem ;
`;
const Header = styled.h2`
  font-size: 1.25rem;
  margin: 0;
`;
const Description = styled.p`
  font-size: 0.75rem;
`;
const Price = styled.div`
  font-weight: bold;
  text-align: right;
  width: 100%;
`;

function formatPrice(value: number): string {
  const formatter = new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: 'SEK',
  });

  return formatter.format(value);
}

function Card({ isSelected, onSelect, treatment }: CardProps) {
  return (
    <StyledCard isSelected={ isSelected } onClick={ () => onSelect(treatment) }>
      <Header>{ treatment.name }</Header>
      <Description>{ treatment.description }</Description>
      <Price>{ formatPrice(treatment.price) }</Price>
    </StyledCard>
  );
}

export default function Treatments({ onSelectTreatment, selectedTreatment, treatments }: TreatmentsProps) {
  return (
    <div>
      {
        treatments.map(t =>
          <Card
            isSelected={ selectedTreatment.name === t.name }
            key={ t.name }
            onSelect= { onSelectTreatment }
            treatment={ t }
            />
        )
      }
    </div>
  );
}
