"use client"; // This is a client component 👈🏽
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NotificationMenu from "./notification/Notification";
import MainMenu from "./MainMenu";

import { User, Bell, MessageSquare } from "react-feather";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { UserType } from "../../types/user";

export default function Navbar(props) {
  const { navClass, topnavClass } = props;
  const [isOpen, setMenu] = useState(true);
  const [topNavbar, setTopNavBar] = useState(false);
  const [open, setOpen] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const userType = useSelector((state) => state.auth.userType);

  const [mainMenuAnchorEl, setMainMenuAnchorEl] = useState(null);
  const openMainMenu = Boolean(mainMenuAnchorEl);

  const handleMainMenuClick = (event) => {
    setMainMenuAnchorEl(event.currentTarget);
  };
  const handleMainMenuClose = () => {
    setMainMenuAnchorEl(null);
  };

  const toggleMenuNotification = () => {
    setOpen((prev) => !prev);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", windowScroll);
    }
    window.scrollTo(0, 0);
    activateMenu();
  }, []);

  function windowScroll() {
    setTopNavBar(window.scrollY >= 50);
  }

  const toggleMenu = () => {
    setMenu(!isOpen);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };

  const getClosest = (elem, selector) => {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
              s
            ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };
  const activateMenu = () => {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");

        var immediateParent = getClosest(matchingMenuItem, "li");

        if (immediateParent) {
          immediateParent.classList.add("active");
        }

        var parent = getClosest(immediateParent, ".child-menu-item");
        if (parent) {
          parent.classList.add("active");
        }

        var parent = getClosest(parent || immediateParent, ".parent-menu-item");

        if (parent) {
          parent.classList.add("active");

          var parentMenuitem = parent.querySelector(".menu-item");
          if (parentMenuitem) {
            parentMenuitem.classList.add("active");
          }

          var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        } else {
          var parentOfParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        }
      }
    }
  };

  // render() {
  // const toggleClass = this.state.isOpenMenu ? 'hidden' : 'block';

  return (
    <React.Fragment>
      <nav
        id="topnav"
        className={`${topNavbar ? "nav-sticky" : "nav-sticky"} ${
          topnavClass ? topnavClass : ""
        } defaultscroll is-sticky`}
      >
        <div
          className={`${
            topnavClass !== "" && topnavClass !== undefined
              ? "container-fluid md:px-8 px-3"
              : "container"
          }`}
        >
          {/* <!-- Logo container--> */}
          {navClass === "" || navClass === undefined ? (
            <Link className="logo" href="/">
              <Image
                src="/images/logo.png"
                className="inline-block dark:hidden"
                alt=""
                width={98}
                height={24}
              />
              <Image
                src="/images/logo.png"
                className="hidden dark:inline-block"
                alt=""
                width={98}
                height={24}
              />
            </Link>
          ) : (
            <Link className="logo" href="/">
              <span className="inline-block dark:hidden">
                <Image
                  src="/images/logo.png"
                  className="l-dark"
                  alt=""
                  width={98}
                  height={24}
                />
                <Image
                  src="/images/logo.png"
                  className="l-light"
                  alt=""
                  width={98}
                  height={24}
                />
              </span>
              <Image
                src="/images/logo-light.png"
                className="hidden dark:inline-block"
                alt=""
                width={98}
                height={24}
              />
            </Link>
          )}
          {/* <!-- End Logo container--> */}

          {/* <!-- Start Mobile Toggle --> */}
          <div className="menu-extras">
            <div className="menu-item">
              <Link
                href="#"
                className="navbar-toggle"
                id="isToggle"
                onClick={toggleMenu}
              >
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Link>
            </div>
          </div>
          {/* <!-- End Mobile Toggle --> */}

          {/* <!-- Login button Start --> */}
          <ul className="buy-button list-none mb-0">
            {accessToken && (
              <>
                <li className="inline mb-0 me-2">
                  <Link
                    href={`/chat`}
                    className="btn btn-icon bg-customGreen border-customGreen dark:border-green-600 text-white rounded-full"
                  >
                    <MessageSquare className="h-4 w-4 stroke-[3]"></MessageSquare>
                  </Link>
                </li>
                <li className="inline mb-0 me-2">
                  <Link
                    href="#"
                    onClick={toggleMenuNotification}
                    className="btn btn-icon rounded-full border border-customGreen bg-transparent text-customGreen"
                  >
                    <Bell className="h-4 w-4 stroke-[3] fill-current " />
                  </Link>
                </li>
              </>
            )}
            <MainMenu
              id="main-menu"
              anchorEl={mainMenuAnchorEl}
              open={openMainMenu}
              onClose={handleMainMenuClose}
              MenuListProps={{
                "aria-labelledby": "menu-button",
              }}
            />
            {!accessToken ? (
              <li className="sm:inline ps-1 mb-0 me-2 hidden">
                <Link
                  href="/auth-signup"
                  // className="btn bg-customGreen hover:bg-green-700 border-green-600 dark:border-green-600 text-white rounded-full"
                  className="btn bg-customGreen border-green-600 dark:border-green-600 text-white rounded-full"
                >
                  Signup
                </Link>
              </li>
            ) : (
              <li className="inline mb-0 me-2">
                <button
                  className="btn btn-icon bg-customGreen border-customGreen dark:border-green-600 text-white rounded-full"
                  onClick={handleMainMenuClick}
                >
                  {/* <Avatar
                  sx={{ width: 40, height: 40 }}
                  alt="Remy Sharp"
                  src="/images/client/01.jpg"
                /> */}
                  <User className="h-4 w-4 stroke-[3]"></User>
                </button>
              </li>
            )}
          </ul>

          {/* <!--Login button End--> */}

          <div
            id="navigation"
            className={`${isOpen === true ? "hidden" : "block"}`}
          >
            {/* <!-- Navigation Menu--> */}
            <ul
              className={`navigation-menu  ${
                navClass === "" || navClass === undefined ? "" : "nav-light"
              }   ${
                topnavClass !== "" && topnavClass !== undefined
                  ? "justify-center"
                  : ""
              }`}
            >
              {/* <li className="has-submenu parent-menu-item">
                <Link href="/">Home</Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link href="/" className="sub-menu-item">
                      Hero One
                    </Link>
                  </li>
                  <li>
                    <Link href="/index-two" className="sub-menu-item">
                      Hero Two
                    </Link>
                  </li>
                  <li>
                    <Link href="/index-three" className="sub-menu-item">
                      Hero Three
                    </Link>
                  </li>
                  <li>
                    <Link href="/index-four" className="sub-menu-item">
                      Hero Four
                    </Link>
                  </li>
                  <li>
                    <Link href="/index-five" className="sub-menu-item">
                      Hero Five{" "}
                    </Link>
                  </li>
                </ul>
              </li> */}

              <li>
                <Link
                  href={accessToken ? "/home" : "/"}
                  activeclassname="active"
                  className="sub-menu-item"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link href="/aboutus" className="sub-menu-item">
                  About us
                </Link>
              </li>

              <li>
                <Link href="/list" className="sub-menu-item">
                  IP Listing
                </Link>
              </li>

              {/* <li className="has-submenu parent-parent-menu-item">
                <Link href="#">Listing</Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li className="has-submenu parent-menu-item">
                    <Link href="#"> Grid View </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link href="/grid" className="sub-menu-item">
                          Grid Listing
                        </Link>
                      </li>
                      <li>
                        <Link href="/grid-sidebar" className="sub-menu-item">
                          Grid Sidebar{" "}
                        </Link>
                      </li>
                      <li>
                        <Link href="/grid-map" className="sub-menu-item">
                          Grid With Map
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <Link href="#"> List View </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link href="/list" className="sub-menu-item">
                          List Listing
                        </Link>
                      </li>
                      <li>
                        <Link href="/list-sidebar" className="sub-menu-item">
                          List Sidebar{" "}
                        </Link>
                      </li>
                      <li>
                        <Link href="/list-map" className="sub-menu-item">
                          List With Map
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <Link href="#"> Property Detail </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link
                          href="/property-detail/1"
                          className="sub-menu-item"
                        >
                          Property Detail
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}

              {/* <li className="has-submenu parent-parent-menu-item">
                <Link href="#">Pages</Link>
                <span className="menu-arrow"></span>
                <ul className="submenu">
                  <li>
                    <Link href="/aboutus" className="sub-menu-item">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/features" className="sub-menu-item">
                      Featues
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="sub-menu-item">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/faqs" className="sub-menu-item">
                      Faqs
                    </Link>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <Link href="#"> Auth Pages </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link href="/auth-login" className="sub-menu-item">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link href="/auth-signup" className="sub-menu-item">
                          Signup
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/auth-reset-password"
                          className="sub-menu-item"
                        >
                          Reset Password
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <Link href="#"> Utility </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link href="/terms" className="sub-menu-item">
                          Terms of Services
                        </Link>
                      </li>
                      <li>
                        <Link href="/privacy" className="sub-menu-item">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <Link href="#"> Blog </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link href="/blogs" className="sub-menu-item">
                          {" "}
                          Blogs
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-sidebar" className="sub-menu-item">
                          {" "}
                          Blog Sidebar
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog-detail/1" className="sub-menu-item">
                          {" "}
                          Blog Detail
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="has-submenu parent-menu-item">
                    <Link href="#"> Special </Link>
                    <span className="submenu-arrow"></span>
                    <ul className="submenu">
                      <li>
                        <Link href="/comingsoon" className="sub-menu-item">
                          Comingsoon
                        </Link>
                      </li>
                      <li>
                        <Link href="/maintenance" className="sub-menu-item">
                          Maintenance
                        </Link>
                      </li>
                      <li>
                        <Link href="/404" className="sub-menu-item">
                          404! Error
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}

              <li>
                <Link href="/pricing" className="sub-menu-item">
                  Pricing & Fees
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <NotificationMenu open={open} setOpen={setOpen} />
          </div>
        </div>
      </nav>
      {/* End Navbar  */}
    </React.Fragment>
  );
}
