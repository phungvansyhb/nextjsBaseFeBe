import { menuListMock } from '@/shared/constant/appMenu';
import { useAppSelector } from '@/shared/hooks/useRedux';
import useTrans from '@/shared/hooks/useTrans';
import { toggleExpandDrawer } from '@/shared/stores/appSlice';
import { Affix, Drawer, Layout, theme as antTheme } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HeaderComponent from './Header';
import MenuComponent from './Menu';
const { Sider, Content } = Layout;
const DashBoardLayout = ({
  children,
  breadcrumb,
  contentClass = 'bg-white',
}: {
  children: React.ReactNode;
  breadcrumb?: React.ReactNode;
  contentClass?: string;
}) => {
  const { lang } = useTrans();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = antTheme.useToken();

  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(router.pathname);

  const { isCollapseMenu: collapsed, isExpandDrawer: expandedDrawer } = useAppSelector(state => state.appSlice);

  useEffect(() => {
    if (!collapsed) {
      setOpenkey('/' + router.pathname.split('/')[1]);
    }
    // only get 2 level
    const first = router.pathname.split('/')[1];
    const second = router.pathname.split('/')[2];
    if (first === 'booking-management') {
      setSelectedKey('/' + first);
    } else if (second) {
      setSelectedKey('/' + first + '/' + second);
    } else {
      setSelectedKey('/' + first);
    }
  }, [router.pathname, router.locale, collapsed]);

  return (
    <>
      <Layout>
        <Drawer
          width='230'
          placement='left'
          className={'lg:hidden'}
          bodyStyle={{ padding: 0, height: '100%', overflowX: 'hidden' }}
          closable={false}
          onClose={() => {
            dispatch(toggleExpandDrawer(!expandedDrawer));
          }}
          open={expandedDrawer}
        >
          <div className='px-4 pt-4 text-xl font-bold'>Menu</div>
          <MenuComponent
            menuList={menuListMock}
            openKey={openKey}
            onChangeOpenKey={k => setOpenkey(k)}
            selectedKey={selectedKey}
          />
        </Drawer>

        <Affix offsetTop={0}>
          <Sider
            width={230}
            className='layout-page-sider hidden min-h-screen lg:block'
            trigger={null}
            collapsible
            style={{ backgroundColor: token.token.colorBgContainer }}
            collapsedWidth={80}
            collapsed={collapsed}
            breakpoint='md'
          >
            <div className='h-16 overflow-hidden' onClick={() => router.push('/')}>
              <Image
                src={collapsed ? '/shortLogo.png' : lang === 'vi' ? '/logo-vi.png' : '/logo-en.png'}
                alt='logo'
                className='relative h-14 w-full object-contain p-2'
                layout='fill'
              />
            </div>
            <MenuComponent
              menuList={menuListMock}
              openKey={openKey}
              onChangeOpenKey={k => setOpenkey(k)}
              selectedKey={selectedKey}
            />
          </Sider>
        </Affix>

        <Layout>
          <HeaderComponent />
          {breadcrumb}
          <Content className={`${contentClass} mobile:m-4 m-2 min-h-screen rounded-lg lg:m-6`}>
            <div className='p-2'>{children}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashBoardLayout;
