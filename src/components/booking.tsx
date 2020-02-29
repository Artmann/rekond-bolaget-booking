import React, { FormEvent, useRef, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useQueryParam, NumberParam } from 'use-query-params';

import Page from './page';
import Treatments, { Treatment } from './treatments';

const Label = styled.label`
  color: #4A5568;
  display: block;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;
const LicensePlateNumberInput = styled.input`
  color: #4A5568;
  letter-spacing: 0.05em;
  font-weight: 700;
  margin-bottom: 1.5rem;
  margin-left: 0.5rem;
  padding: 0.5rem;
  text-transform: uppercase;
`;
const Icon = styled.img`
    display: block;
  height: 5rem;
  width: 5rem;
`;
const FileField = styled.input`
  display: none;
`;
const Input = styled.input`
  display: block;
  font-size: 1rem;
  margin: 1.25rem 0.5rem;
  padding: 0.5rem;
`;
const PhotoPreview = styled.div`
  align-items: center;
  background: #CBD5E0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  display: flex;
  height: 24rem;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
`;
const PreviewImage = styled.img`
  height: 100%;
  width: 100%;
`;
const Radio = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: .5rem;
`;
const RadioContainer = styled.div`
  margin-bottom: 1rem;
`;
const RadioLabel = styled.label`
  font-size: 0.9rem;
  padding-left: 0.25rem;
`;
const SummaryValue = styled.div`
  font-size: 0.85rem;
  margin-bottom 1.25rem;
`;

const treatments: Treatment[] = [
  { name: 'Ceramic Pro Brons', price: 4375, 'description': 'Lorem ipsum dolor 123' },
  { name: 'Ceramic Pro Silver', price: 6000, 'description': 'Lorem ipsum dolor 123' },
  { name: 'Ceramic Pro Platinum', price: 16875, 'description': 'Lorem ipsum dolor 123' }
];
const varnishStates = [
  'Nyskick',
  'Små repor',
  'Stora repor'
];

export default function Booking() {
  const [ imageFile, setImageFile ] = useState<File | null>(null);
  const [ imageUrl, setImageUrl ] = useState<string | null>(null);
  const [ imageRatio, setImageRatio ] = useState(9 / 16);
  const [ licensePlateNumber, setLicensePlateNumber ] = useState('TFN-823');
  const [ treatment, setTreatment ] = useState(treatments[1]);
  const [ varnishState, setVarnishState ] = useState(varnishStates[0]);
  const [ name, setName ] = useState('');
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ email, setEmail ] = useState('');

  const [ page ] = useQueryParam('page', NumberParam);

  const fileFieldRef = useRef<HTMLInputElement>(null);
  const photoPreviewRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!photoPreviewRef.current) {
      return;
    }

    photoPreviewRef.current.style.width = imageRatio < 1 ? '95%' : '70%';

    const width = photoPreviewRef.current.clientWidth;
    const height = width * imageRatio;

    photoPreviewRef.current.style.height = `${ height }px`;
  }, [imageUrl, imageFile, imageRatio]);

  const fileHandler = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.files) {
      return;
    }

    const [ file ] = Array.from(event.currentTarget.files);
    const url = URL.createObjectURL(file);

    const tmpImage = new Image();

    tmpImage.onload = (event: any) => {
      const [ img ] = Array.from(event.path);

      setImageRatio(img.height / img.width);
    };

    tmpImage.src = url;

    setImageFile(file);
    setImageUrl(url);
  };
  const bookingHandler = () => {
    const bookingInfo = {
      email,
      imageFile,
      licensePlateNumber,
      name,
      phoneNumber,
      treatment,
      varnishState
    };
    const url = 'https://rekond-bolaget-bokning.netlify.com/.netlify/functions/booking';

    fetch(url, {
      body: JSON.stringify(bookingInfo),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'post'
    });

    console.log('Place booking.', bookingInfo);
  };
  const photoHandler = () => {
    fileFieldRef.current?.click();
  };
  const treatmentHandler = (t: Treatment) => {
    setTreatment(t);
  }

  return (
    <form>
      <Page number={ 1 } currentPage={ page } title="Din bil">
        <Label>Registreringsnummer</Label>
        <LicensePlateNumberInput
          defaultValue={ licensePlateNumber }
          onChange={ (event: FormEvent<HTMLInputElement>) => setLicensePlateNumber(event.currentTarget.value) }
          />

        <Label>Lackskick</Label>
        <RadioContainer>
           {
            varnishStates.map((state, i) =>
              <Radio onClick={ () => setVarnishState(state) } key={ i }>
                <input
                  type="radio"
                  checked={ state === varnishState }
                  onChange={ () => setVarnishState(state) }
                  />
                <RadioLabel>
                  { state }
                </RadioLabel>
              </Radio>
            )
           }
        </RadioContainer>

        <Label>Ladda upp ett foto</Label>
        <PhotoPreview
          onClick={ photoHandler }
          ref={ photoPreviewRef }
          >
          { imageUrl ? <PreviewImage src={ imageUrl } /> : <Icon src="/images/camera-icon.png" />}
        </PhotoPreview>
        <FileField accept="image/*" type="file" ref={ fileFieldRef } onChange={ fileHandler } />
      </Page>
      <Page number={ 2 } currentPage={ page } title="Välj behandling">
        <Treatments
          onSelectTreatment={ treatmentHandler }
          selectedTreatment={ treatment }
          treatments={treatments }
          />
      </Page>
      <Page number={ 3 } currentPage={ page } title="Tillval" >
        Something Something
      </Page>
      <Page number={ 4 } currentPage={ page } title="Dina Uppgifter" >
        <Label>Namn</Label>
        <Input type="text" defaultValue={ name } onChange={ (event: FormEvent<HTMLInputElement>) => setName(event.currentTarget.value) } />
        <Label>Epost</Label>
        <Input type="email" defaultValue={ email } onChange={ (event: FormEvent<HTMLInputElement>) => setEmail(event.currentTarget.value)  } />
        <Label>Telefonnumer</Label>
        <Input type="tel" defaultValue={ phoneNumber } onChange={ (event: FormEvent<HTMLInputElement>) => setPhoneNumber(event.currentTarget.value)  } />
      </Page>

      <Page number={ 5 } currentPage={ page } title="Boka" action={{ name: 'Boka', handler: bookingHandler }} >
        <div>
          <Label>Registreringsnummer</Label>
          <SummaryValue>{ licensePlateNumber }</SummaryValue>

          <Label>Lackskick</Label>
          <SummaryValue>{ varnishState }</SummaryValue>

          <Label>Behandling</Label>
          <SummaryValue>{ treatment.name }</SummaryValue>

          <Label>Namn</Label>
          <SummaryValue>{ name }</SummaryValue>

          <Label>Epost</Label>
          <SummaryValue>{ email }</SummaryValue>

          <Label>Telefonnumer</Label>
          <SummaryValue>{ phoneNumber }</SummaryValue>
        </div>
      </Page>
    </form>
  );
}
