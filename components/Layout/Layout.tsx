import {FC} from "react";
import {Layout as AntdLayout} from 'antd';
import styled from "styled-components";

type LayoutProps = {
  type?: 'page' | 'form'
};

const Wrapper = styled.div`
  margin: 0 auto;
  overflow: hidden;
`;

const StyledLayout = styled(AntdLayout)<{
  type: 'page' | 'form'
}>`
  height: 100vh;
  overflow: hidden;
  padding: 20px;
  ${({type}) => type === 'page' && `
    ${Wrapper} {
      max-width: 1200px;
      width: 100%;
    }
  `}
  ${({type}) => type === 'form' && `
    display: flex;
    justify-content: center;
    align-items: center;
    ${Wrapper} {
      max-width: 500px;
    }`} 
`;

const Layout: FC<LayoutProps> = ({type = 'page', children}) => {
  return (
    <StyledLayout type={type}>
      <Wrapper>
        {children}
      </Wrapper>
    </StyledLayout>
    )
};

export default Layout;
