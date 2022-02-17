import { useEffect, useRef } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useLocale } from '@/lib/locale'

const NavBar = () => {
  const locale = useLocale()
  const links = [
    { id: 0, name: locale.NAV.INDEX, to: BLOG.path || '/', show: true },
    { id: 1, name: locale.NAV.ABOUT, to: '/about', show: BLOG.showAbout },
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: true },
    { id: 3, name: locale.NAV.SEARCH, to: '/search', show: true }
  ]
  return (
    <div className="flex-shrink-0">
      <ul className="flex flex-row">
        {links.map(
          link =>
            link.show && (
              <li
                key={link.id}
                className="block ml-4 text-black dark:text-gray-50 nav"
              >
                <Link href={link.to}>
                  <a>{link.name}</a>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

const Header = ({ navBarTitle, fullWidth }) => {
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    /* eslint-disable-line */
  }, [sentinalRef])
  return (
    <>
      <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
      <div
        className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${
          !fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
        }`}
        id="sticky-nav"
        ref={navRef}
      >
        <div className="flex items-center">
          <Link href="/">
            <a aria-label={BLOG.title}>
              <div className="h-6">
                <img width={24} height={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAmVBMVEX//////9z/0w7/yQ7/
                25P/27nSuL5wkr5wpt/o/////7n/yWv/5dz/5UH/7d+Kkr6KyvT/3NT/9pP/7f//05Poysn/7Wv/
                yUH/9v/Sysmi3P//2w7o3NT//+qikr6i3PS6pr5wktTS///S3NT/9rm6uL5wksm67f+KyuqKyt+i
                3OpwuN//9tz///T/5ZPS7d9wuOqiuNSiuOrjGoQrAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAOwwAA
                DsMBx2+oZAAAAAd0SU1FB+YCEQw1N406r3gAAAFxSURBVFjD7ZXpUoNAEIQxCINoDBAgmgiC9xmP
                9384Z8ieWBaw/HS+qlQFCpqZnt5dz2MYhmEYhmFGcrTw+xzjrcB8JgRJdDIoGKPCqSV/tsSffuB8
                BZDQn7STTIYEM99f6yvUyvFOru8UhkY4RrA0uyuxWix5cyGLiy4Btlbv20FB+bZof71TJacQXdkl
                VfWwoAlqBUs1EHz7uoH2xnwinCQoDJQjKqC97XuWThFErc2dNhALjO7h4XFKixaUGDJQJgbj8tTv
                eBLCQJUYzMtzPSbJf1DaBnaCLzMEhYFGyOcJSgONkM9rmdJXWkuOli4KOg6FllymE9OBU35tHGND
                y/dtYe0xnvfeAK3kxEWQ0mcbuN/L7crFRGGgTgzOPOhKxGQ7lJgdDDQSEx8uqrr9WNkuFvA5qIeJ
                6RkYy2qrr2/qW+0HuLxHbA7CwNz4gLITNxdsXKjQWTBi6jSM3a9zypp3oc6oGXsPwzAMwzDMf+UH
                IW8XuwLEzeUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDItMTdUMDk6NTM6NTUrMDM6MDA5vwkx
                AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTAyLTE3VDA5OjUzOjU1KzAzOjAwSOKxjQAAAABJRU5E
                rkJggg==" />
              </div>
            </a>
          </Link>
          {navBarTitle
            ? (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {navBarTitle}
            </p>
              )
            : (
            <p className="ml-2 font-medium text-day dark:text-night header-name">
              {BLOG.title},{' '}
              <span className="font-normal">{BLOG.description}</span>
            </p>
              )}
        </div>
        <NavBar />
      </div>
    </>
  )
}

export default Header
