import React, { useEffect, useState } from 'react';
import { Button, Icon, Image } from '@common';
import { styleRoot } from './GnbStyle';
import { useRouter } from 'next/router';
import {
  connectWallet,
  checkIsLogin,
  getAccount,
} from '@services/connectWallet';
import { registerUser } from '@apis/user';

interface Gnb {}

const Gnb = React.forwardRef((props: Gnb) => {
  const router = useRouter();
  const [account, setAccount] = useState<string | null>(null);
  const slice = (str: String) => str.slice(0, 5) + '...' + str.slice(-5);
  const hasBackBtn = router.pathname === '/' ? false : true;

  async function handleClick() {
    const response = await connectWallet();
    if (response.status === 400) {
      return alert(response.message);
    }
    setAccount(response);
    registerUser(response);
  }

  function clickLogo() {
    router.push('/');
  }

  function goBack() {
    router.back();
  }

  useEffect(() => {
    const isLogin = checkIsLogin();
    if (isLogin) setAccount(getAccount());
  });

  return (
    <div className={styleRoot}>
      {hasBackBtn ? (
        <Button size="small" _onClick={goBack}>
          <Icon name="arrowLeft" fill="var(--gray-500)" size={28}></Icon>
        </Button>
      ) : (
        <Button size="small" _onClick={clickLogo} noAmimation>
          <Image name="logo"></Image>
        </Button>
      )}

      {account ? (
        <Button>{slice(account) ?? ''}</Button>
      ) : (
        <Button _onClick={handleClick}>Connect Wallet</Button>
      )}
    </div>
  );
});

export default Gnb;
