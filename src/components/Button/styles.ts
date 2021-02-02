import Styled from 'styled-components';
import { shade } from 'polished';

export const Container = Styled.button`
{
    background: #ff9000;
    height: 56px;
    border-radius: 0;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;

    &:hover {
        background: ${shade(0.2, '#ff9000')};
    }
}

`;
