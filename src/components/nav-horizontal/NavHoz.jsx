"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import IconDownArrow from "../../../public/icons/IconDownArrow";
import Wrapper from "../wrapper/wrapper";
const NavHoz = ({ items }) => {
  const path = usePathname();
  return (
    <nav>
      <ul className="flex items-center flex-wrap gap-[50px] max-3xl:gap-x-[0px] max-3xl:justify-between max-3xl:px-[150px] max-lg:px-[50px] w-full justify-center">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              className={`${
                item?.children ? "flex items-center gap-2" : ""
              } text-base font-semibold leading-[21.28px] antialiased text-black`}
              href={item.link || '/'}
            >
              {item.label}
              {item?.children && <IconDownArrow size="19px" />}
            </Link>
            {item?.children && (
              <Wrapper>
                <ul>
                  {item?.children.map((child, i) => (
                    <li key={i}>
                      <Link
                        href={child.link || '/'}
                        className={`${
                          child?.children ? "flex items-center gap-2" : ""
                        } text-sm font-semibold leading-[19.07px] antialiased text-dark-100 ${
                          child.link === path ? "opacity-100" : "opacity-40"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Wrapper>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavHoz;
