'use client'

import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import LegislationSummaryCard from './LegislationSummaryCard'

import styles from './SiteHeader.module.css'
import {
  primaryNavItems,
  utilityNavItems,
  type NavItem,
  type NavLinkItem,
  type NavGroup,
} from '../../config/navigation'

function matchesPath(
  pathname: string,
  item: Pick<NavLinkItem, 'href' | 'match'>,
): boolean {
  if (item.href === '/') {
    return pathname === '/'
  }

  if (item.match === 'exact') {
    return pathname === item.href
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

function groupHasActive(pathname: string, group: NavGroup): boolean {
  return group.items.some((item) => matchesPath(pathname, item))
}

function itemIsActive(pathname: string, item: NavItem): boolean {
  if (matchesPath(pathname, item)) {
    return true
  }

  if (item.children?.some((child) => matchesPath(pathname, child))) {
    return true
  }

  if (item.megaGroups?.some((group) => groupHasActive(pathname, group))) {
    return true
  }

  return false
}

function panelId(href: string): string {
  return `menu-${href.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

function UtilityNav({ pathname }: { pathname: string }) {
  return (
    <ul className={styles.utilityList}>
      {utilityNavItems.map((item) => {
        const active = matchesPath(pathname, item)

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${styles.utilityLink} ${active ? styles.utilityLinkActive : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

function SimpleDropdownItem({
  item,
  pathname,
  openMenu,
  setOpenMenu,
}: {
  item: NavItem
  pathname: string
  openMenu: string | null
  setOpenMenu: Dispatch<SetStateAction<string | null>>
}) {
  const active = itemIsActive(pathname, item)
  const expanded = openMenu === item.href
  const id = panelId(item.href)
  const parentExact = matchesPath(pathname, item)

  return (
    <li
      className={`${styles.primaryItem} ${styles.menuItem} ${
        expanded ? styles.menuItemOpen : ''
      }`}
    >
      <div className={styles.triggerRow}>
        <Link
          href={item.href}
          className={`${styles.primaryLink} ${active ? styles.primaryLinkActive : ''}`}
          aria-current={parentExact ? 'page' : undefined}
        >
          {item.label}
        </Link>

        <button
          type="button"
          className={`${styles.menuToggle} ${active ? styles.menuToggleActive : ''}`}
          aria-label={`Toggle ${item.label} submenu`}
          aria-controls={id}
          aria-expanded={expanded}
          onClick={() =>
            setOpenMenu((current) => (current === item.href ? null : item.href))
          }
        >
          <span
            className={`${styles.menuChevron} ${
              expanded ? styles.menuChevronOpen : ''
            }`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>
      </div>

      <div id={id} className={styles.dropdownPanel}>
        <ul className={styles.dropdownList}>
          {item.children?.map((child) => {
            const childActive = matchesPath(pathname, child)

            return (
              <li key={child.href}>
                <Link
                  href={child.href}
                  className={`${styles.dropdownLink} ${
                    childActive ? styles.dropdownLinkActive : ''
                  }`}
                  aria-current={childActive ? 'page' : undefined}
                >
                  {child.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

function MegaMenuItem({
  item,
  pathname,
  openMenu,
  setOpenMenu,
}: {
  item: NavItem
  pathname: string
  openMenu: string | null
  setOpenMenu: Dispatch<SetStateAction<string | null>>
}) {
  const active = itemIsActive(pathname, item)
  const expanded = openMenu === item.href
  const id = panelId(item.href)
  const parentExact = matchesPath(pathname, item)

  return (
    <li
      className={`${styles.primaryItem} ${styles.menuItem} ${styles.megaItem} ${
        expanded ? styles.menuItemOpen : ''
      }`}
    >
      <div className={styles.triggerRow}>
        <Link
          href={item.href}
          className={`${styles.primaryLink} ${active ? styles.primaryLinkActive : ''}`}
          aria-current={parentExact ? 'page' : undefined}
        >
          {item.label}
        </Link>

        <button
          type="button"
          className={`${styles.menuToggle} ${active ? styles.menuToggleActive : ''}`}
          aria-label={`Toggle ${item.label} menu`}
          aria-controls={id}
          aria-expanded={expanded}
          onClick={() =>
            setOpenMenu((current) => (current === item.href ? null : item.href))
          }
        >
          <span
            className={`${styles.menuChevron} ${
              expanded ? styles.menuChevronOpen : ''
            }`}
            aria-hidden="true"
          >
            ▾
          </span>
        </button>
      </div>

      <div id={id} className={styles.megaPanel}>
        <div className={styles.megaShell}>
          <div className={styles.megaIntro}>
            <LegislationSummaryCard overviewHref={item.href} />
          </div>

          <div className={styles.megaGrid}>
            {item.megaGroups?.map((group) => {
              const groupActive = groupHasActive(pathname, group)

              return (
                <section
                  key={group.heading}
                  className={`${styles.megaGroup} ${
                    groupActive ? styles.megaGroupActive : ''
                  }`}
                  aria-label={group.heading}
                >
                  <h3 className={styles.megaGroupHeading}>{group.heading}</h3>

                  <ul className={styles.megaList}>
                    {group.items.map((child) => {
                      const childActive = matchesPath(pathname, child)

                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`${styles.megaLink} ${
                              childActive ? styles.megaLinkActive : ''
                            }`}
                            aria-current={childActive ? 'page' : undefined}
                          >
                            <span className={styles.megaLinkLabel}>
                              {child.label}
                            </span>
                            {child.description ? (
                              <span className={styles.megaLinkDescription}>
                                {child.description}
                              </span>
                            ) : null}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </li>
  )
}

function PrimaryNav({
  pathname,
  mobileOpen,
  openMenu,
  setOpenMenu,
}: {
  pathname: string
  mobileOpen: boolean
  openMenu: string | null
  setOpenMenu: Dispatch<SetStateAction<string | null>>
}) {
  return (
    <nav
      id="primary-navigation"
      aria-label="Primary"
      className={`${styles.primaryNav} ${mobileOpen ? styles.primaryNavOpen : ''}`}
    >
      <ul className={styles.primaryList}>
        {primaryNavItems.map((item) => {
          if (item.megaGroups?.length) {
            return (
              <MegaMenuItem
                key={item.href}
                item={item}
                pathname={pathname}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            )
          }

          if (item.children?.length) {
            return (
              <SimpleDropdownItem
                key={item.href}
                item={item}
                pathname={pathname}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            )
          }

          const active = itemIsActive(pathname, item)

          return (
            <li key={item.href} className={styles.primaryItem}>
              <Link
                href={item.href}
                className={`${styles.primaryLink} ${active ? styles.primaryLinkActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  return (
    <header className={styles.header}>
      <div className={styles.utilityBar}>
        <div className={styles.utilityInner}>
          <Link href="/" className={styles.brand} aria-label="Ardtire Society home">
            <span className={styles.brandMark} aria-hidden="true">
              AS
            </span>
            <span className={styles.brandText}>Ardtire Society</span>
          </Link>

          <nav aria-label="Utility" className={styles.utilityNav}>
            <UtilityNav pathname={pathname} />
          </nav>
        </div>
      </div>

      <div className={styles.primaryBar}>
        <div className={styles.primaryInner}>
          <button
            type="button"
            className={styles.mobileToggle}
            aria-controls="primary-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close primary navigation' : 'Open primary navigation'}
            onClick={() => setMobileOpen((current) => !current)}
          >
            <span className={styles.mobileToggleLine} />
            <span className={styles.mobileToggleLine} />
            <span className={styles.mobileToggleLine} />
          </button>

          <PrimaryNav
            pathname={pathname}
            mobileOpen={mobileOpen}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>
      </div>
    </header>
  )
}