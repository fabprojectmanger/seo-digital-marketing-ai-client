"use client";
import { headerNav } from "../../assets/data/navigation";
import Container from "../../components/container/container";
import NavHoz from "../../components/nav-horizontal/NavHoz";
import Wrapper from "../../components/wrapper/wrapper";
import Image from "next/image";
import Link from "next/link";
import SiteLogo from "../../assets/images/logo.png";
import LinkButton from "../../components/link/LinkButton";
import { useState } from "react";
import IconCloseModal from "../../../public/icons/IconCloseModal";
import IconHamburger from "../../../public/icons/IconHamburger";
import IconAccount from "../../../public/icons/IconAccount";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { useTheme } from "../../contexts/theme/ThemeProvider";
import ErrorNotification from "../../components/notification/error/ErrorNotification";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Text from "../../components/text/text";
const Header = () => {
  const router = useRouter();
  const [openNameMenu, setOpenNameMenu] = useState(false);
  const {
    setUserLoggedIn,
    setGoogleEmail,
    error,
    setError,
    googleEmail,
    setUserName,
    userName,
  } = useTheme();
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );

      const result = userInfo.data;
      const submitData = {
        email: result.email,
        googleToken: tokenResponse,
      };
      setUserName(userInfo.data?.name);
      try {
        const res = await axios.post("/apis/auth", {
          ...submitData,
        });

        if (res.status === 200) {
          setGoogleEmail(result.email);
          setUserLoggedIn(true);
        } else {
          setError({
            active: true,
            message: "Oops! Something is wrong. Try again later.",
          });
        }
      } catch (error) {
        setError({
          active: true,
          message: "Oops! Something is wrong. Try again later.",
        });
      }
    },
  });
  const logout = () => {
    googleLogout();
    setGoogleEmail("");
    Cookies.remove("google_email");
    router.push("/");
  };
  const [menu, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen((prev) => ({ ...prev, animate: false }));
    setTimeout(() => {
      setMenuOpen((prev) => ({ ...prev, show: false }));
    }, 500);
  };
  const openMenu = () => {
    setMenuOpen((prev) => ({ ...prev, show: true }));
    setTimeout(() => {
      setMenuOpen((prev) => ({ ...prev, animate: true }));
    }, 500);
  };
  const openDropDown = () => {
    setOpenNameMenu((prev) => !prev);
  };
  return (
    <header className="py-6 max-md-tab:py-8">
      <Container>
        <Wrapper className="flex items-center justify-between p-4 bg-white rounded-xl">
          <Wrapper className="hidden max-md-tab:block flex-1">
            <button onClick={() => openMenu()}>
              <IconHamburger className="w-8 h-8 fill-black" />
            </button>
          </Wrapper>
          <Wrapper className="min-w-[171px] max-lg:flex-1 max-md-tab:flex max-md-tab:justify-center">
            <Link href="/">
              <Image
                src={SiteLogo.src}
                alt="SEOGENIE"
                width={171}
                height={36}
              />
            </Link>
          </Wrapper>
          <Wrapper className="max-3xl:w-full max-md-tab:hidden">
            <NavHoz items={headerNav} />
          </Wrapper>
          <Wrapper className="hidden max-xs-tab:flex justify-end flex-1">
            <button onClick={() => login()}>
              <IconAccount className="w-8 h-8 fill-black" />
            </button>
          </Wrapper>
          <Wrapper className="flex gap-[17px] max-lg:flex-1 items-center max-md-tab:flex max-md-tab:justify-end max-xs-tab:hidden">
            {googleEmail ? (
              <Wrapper className=" relative">
                <button
                  onClick={() => openDropDown()}
                  className="flex items-center gap-1"
                >
                  <Wrapper className="w-7 h-7 flex items-center justify-center rounded-full bg-dark-100 uppercase text-center text-white text-base font-bold">
                    {userName.slice(0, 1)}
                  </Wrapper>
                  <Text className="text-base capitalize font-semibold tracking-normal">
                    {userName}
                  </Text>
                </button>
                {openNameMenu && (
                  <div
                    id="dropdown"
                    className="z-10 bg-white absolute top-[40px] border border-gray-300 right-0 divide-y divide-gray-100 rounded-lg shadow w-44 "
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 "
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <Link
                          onClick={() => logout()}
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                        >
                          Sign out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </Wrapper>
            ) : (
              <button
                onClick={() => login()}
                className=" pt-[7px] pb-2 px-[21px] text-center block text-base leading-[21.28px] font-normal rounded-[9px] border border-dark-100  transition-colors duration-300 whitespace-nowrap bg-dark-100 text-white hover:bg-transparent hover:text-dark-100"
              >
                Sign up / Log in with Google
              </button>
            )}
          </Wrapper>
          {menu?.show && (
            <Wrapper
              className={`fixed top-0 z-[99999999]  w-full backdrop-blur-xl h-full left bg-dark-100 bg-opacity-80  transition-all duration-700 ${
                menu?.animate ? " left-0" : "-left-full"
              }`}
            >
              <Wrapper>
                <button
                  className="!absolute top-3 right-3 z-30"
                  onClick={closeMenu}
                >
                  <IconCloseModal className="fill-white w-8 h-8" />
                </button>
                <Wrapper className="pt-16 px-6">
                  <ul className="mb-8 flex flex-col gap-6">
                    {headerNav.map((item, i) => (
                      <li key={i}>
                        <Link
                          key={i}
                          href={item.link}
                          className="text-xl text-lightblue-100  font-semibold"
                          onClick={closeMenu}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Wrapper>
              </Wrapper>
            </Wrapper>
          )}
          {error.active && (
            <ErrorNotification active={error.active} message={error.message} />
          )}
        </Wrapper>
      </Container>
    </header>
  );
};

export default Header;
