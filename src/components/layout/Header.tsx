import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';

import { useLoginContext } from '@/hooks/useLoginContext';
import useUserInfo from '@/hooks/useUserInfo';

import Button from '@/components/buttons/Button';
import { RankButton } from '@/components/buttons/RankButton';
import ThemeSwitch from '@/components/ThemeSwitch';

import { DEFAULT_AVATAR } from '@/utils/constants';

import LoginButton from '../buttons/LoginButton';
import PeriodicalButton from '../buttons/Periodical';
import SearchInput from '../search/SearchInput';

const AvatarWithDropdown = (props: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLoginContext();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    const handleDocumentClick = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div className={`${props.className} h-7 w-7`}>
      <Image
        className='relative overflow-hidden rounded-full'
        src={userInfo.avatar || DEFAULT_AVATAR}
        alt='头像'
        width={28}
        height={28}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      />
      <div
        className='w-26 absolute right-1 mt-2 cursor-pointer rounded border bg-white py-2 text-gray-500 shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400'
        hidden={!isOpen}
      >
        <div className='absolute -top-1.5 right-3 h-3 w-3 rotate-45 border-l border-t bg-white dark:border-gray-600 dark:bg-gray-800'></div>
        <div className='px-4 leading-8 active:bg-gray-100 dark:active:bg-gray-700'>
          <ThemeSwitch type='text'></ThemeSwitch>
        </div>
        <Link href={`/user/${userInfo.uid}`} className='block'>
          <div className='block px-4 leading-8 active:bg-gray-100 dark:active:bg-gray-700'>
            我的主页
          </div>
        </Link>

        <div
          className='px-4 leading-8 active:bg-gray-100 dark:active:bg-gray-700'
          onClick={logout}
        >
          退出
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const { isLogin } = useLoginContext();

  return (
    <div className='fixed z-10 h-14 w-full bg-white shadow-sm backdrop-blur dark:border dark:border-gray-50/[0.06] dark:bg-transparent'>
      <nav className='mx-auto flex max-w-5xl items-center justify-between p-2'>
        <span className='hidden md:block'>
          <Image
            className='h-8 cursor-pointer dark:invert'
            src='https://img.hellogithub.com/logo/logo.png'
            width='28'
            height='28'
            alt='hellogithub'
            onClick={() => {
              router.reload();
            }}
          />
        </span>
        <span className='block md:hidden'>
          <RankButton type='dropdown' />
        </span>
        <SearchInput />
        <ul className='text-md flex items-center space-x-2 font-medium text-gray-500 dark:text-gray-400'>
          <li className='hidden md:block'>
            <Button
              className='font-normal text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
              variant='ghost'
              onClick={() => {
                router.push('/');
              }}
            >
              <AiOutlineHome className='mr-0.5' />
              首页
            </Button>
          </li>
          <li className='hidden md:block'>
            <PeriodicalButton></PeriodicalButton>
          </li>
          <li className='hidden md:block'>
            <RankButton />
          </li>
          <li className='hidden md:block'>
            <ThemeSwitch />
          </li>
          <li className='block md:hidden'>
            {!isLogin ? <LoginButton /> : <AvatarWithDropdown />}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
