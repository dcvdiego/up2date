import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

import LogoImg from '../../../assets/images/logo.png';

interface ILogoProps {
  color?: 'white' | 'dark';
}

const LogoContainer = styled.div`
  ${tw`
    flex
    items-center
    `}
`;
const LogoText = styled.div`
  ${tw`
    text-xl
    md:text-2xl
    font-bold
    text-black
    m-1
    `};
  ${({ color }: any) => (color === 'white' ? tw`text-white` : tw`text-black`)}
`;
const Image = styled.div`
  width: auto;
  ${tw`h-6 md:h-9`}

  img {
    width: auto;
    height: 100%;
  }
`;
export function Logo(props: ILogoProps) {
  const { color } = props;

  return (
    <Link to="/">
      <LogoContainer>
        <Image>
          <img src={LogoImg} alt="up2date" />
        </Image>
        <LogoText color={color || 'dark'}>up2date</LogoText>
      </LogoContainer>
    </Link>
  );
}
