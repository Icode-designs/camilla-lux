"use client";

import styled from "styled-components";
import Link from "next/link";
import { FiShoppingBag, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  z-index: ${({ theme }) => theme.zIndex.sticky + 10};
  transition: all ${({ theme }) => theme.transitions.base};

  @supports (backdrop-filter: blur(10px)) {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }
`;

const NavContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font-family: ${({ theme }) => theme.typography.fonts.heading};
  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.black};
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  object-fit: contain;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 32px;
  }

  @media (max-width: 480px) {
    height: 28px;
  }
`;

const LogoText = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    position: fixed;
    top: 0;
    right: ${({ $isOpen }) => ($isOpen ? 0 : "-100%")};
    height: 100vh;
    width: 80%;
    max-width: 400px;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.colors.white};
    padding: ${({ theme }) => theme.spacing.xl};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transition: right ${({ theme }) => theme.transitions.base};
    z-index: ${({ theme }) => theme.zIndex.modal};
    gap: ${({ theme }) => theme.spacing.lg};
    overflow-y: auto;
  }
`;

const SidebarHeader = styled.div`
  display: none;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  transition: color ${({ theme }) => theme.transitions.fast};

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.gold};
    transition: width ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.gold};

    &::after {
      width: 100%;
    }
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 1;
    justify-content: flex-end;
  }

  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing.sm};
  }
`;

const IconButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.black};
  transition: all ${({ theme }) => theme.transitions.fast};
  border-radius: 50%;

  &:hover {
    color: ${({ theme }) => theme.colors.gold};
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const SearchContainer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme, $isOpen }) => ($isOpen ? theme.spacing.md : "0")}
    ${({ theme }) => theme.spacing.xl};
  height: ${({ $isOpen }) => ($isOpen ? "auto" : "0")};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme, $isOpen }) => ($isOpen ? theme.spacing.md : "0")}
      ${({ theme }) => theme.spacing.md};
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-family: ${({ theme }) => theme.typography.fonts.body};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  z-index: ${({ theme }) => theme.zIndex.sticky + 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    transition: all ${({ theme }) => theme.transitions.base};
    z-index: ${({ theme }) => theme.zIndex.overlay};
  }
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  display: none;
  z-index: ${({ theme }) => theme.zIndex.modal + 1};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

import { useCart } from "@/context/CartContext";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/collection?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <Nav>
        <NavContainer>
          <Logo
            href="/"
            onClick={() => {
              closeMenu();
              setIsSearchOpen(false);
            }}
          >
            <LogoImage src="/images/logo.png" alt="Camilla Logo" />
            <LogoText>Camilla</LogoText>
          </Logo>

          <NavLinks $isOpen={isMenuOpen}>
            <SidebarHeader>
              <IconButton
                onClick={closeMenu}
                style={{ background: "transparent" }}
              >
                <FiX />
              </IconButton>
            </SidebarHeader>
            <NavLink href="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink href="/collection" onClick={closeMenu}>
              Collection
            </NavLink>
            <NavLink href="/about" onClick={closeMenu}>
              About
            </NavLink>
            <NavLink href="/admin/dashboard" onClick={closeMenu}>
              Admin Portal
            </NavLink>
          </NavLinks>

          <NavActions>
            <IconButton
              aria-label="Search"
              title="Search"
              onClick={toggleSearch}
              style={{ color: isSearchOpen ? "var(--gold)" : "inherit" }}
            >
              {isSearchOpen ? <FiX /> : <FiSearch />}
            </IconButton>

            <Link href="/cart">
              <IconButton
                as="span"
                aria-label="Shopping Cart"
                title="Shopping Cart"
              >
                <FiShoppingBag />
                {totalItems > 0 && <CartBadge>{totalItems}</CartBadge>}
              </IconButton>
            </Link>
            <MobileMenuButton
              as="button"
              onClick={toggleMenu}
              aria-label="Menu"
              title="Menu"
            >
              <FiMenu />
            </MobileMenuButton>
          </NavActions>
        </NavContainer>

        <SearchContainer $isOpen={isSearchOpen}>
          <form
            onSubmit={handleSearch}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <FiSearch size={20} color="#999" />
            <SearchInput
              ref={searchInputRef}
              type="text"
              placeholder="Search our collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              type="submit"
              style={{ width: "auto", height: "auto", padding: "0.5rem" }}
            >
              <FiX
                onClick={() => setIsSearchOpen(false)}
                style={{ display: searchQuery ? "none" : "block" }}
              />
              {searchQuery && (
                <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                  GO
                </span>
              )}
            </IconButton>
          </form>
        </SearchContainer>
      </Nav>

      <MobileOverlay $isOpen={isMenuOpen} onClick={closeMenu} />
    </>
  );
}
