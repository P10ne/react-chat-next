import {FC} from "react";
import {Layout as AntdLayout} from 'antd';
// import './Layout.module.scss';
import block from "bem-cn";

type LayoutProps = {
  type?: 'page' | 'form'
};

const cn = block('Layout');

const Layout: FC<LayoutProps> = ({type, children}) => {
  return (
    <AntdLayout className={cn({type}).toString()}>
      <div className={cn('wrapper')}>
        {children}
      </div>
    </AntdLayout>
    )
};
Layout.defaultProps = {
  type: 'page'
};

export default Layout;
