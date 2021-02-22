import { useState, useRef, useEffect, RefCallback } from 'react'
import throttle from 'lodash.throttle'

type TestCurrent = (section: string) => boolean

export type ScrollspyProps = {
  defaultSection?: string
  offset?: number
  rateLimit?: number
}
export type ScrollspyObject = {
  register: RefCallback<HTMLElement>
  isCurrent: TestCurrent
  currentSection: string
}
export type ScrollspyHook = (props: ScrollspyProps) => ScrollspyObject

export const useScrollspy: ScrollspyHook = ({
  defaultSection = '',
  offset = 0,
  rateLimit = 100,
} = {}) => {
  const [currentSection, setCurrentSection] = useState<string>(defaultSection)
  const fieldsRef = useRef<{ [id: string]: HTMLElement }>({})

  const register: RefCallback<HTMLElement> = (el) => {
    if (!el || !(el instanceof HTMLElement)) return
    const key = el.id
    if (!key) return
    fieldsRef.current[key] = el
  }

  const isCurrent: TestCurrent = (section) => currentSection === section

  const handle = throttle(() => {
    let candidateId = currentSection
    let candidateTop = Number.NEGATIVE_INFINITY
    const fields = fieldsRef.current
    Object.keys(fields).forEach((id) => {
      const element = fields[id]
      const newTop = element.getBoundingClientRect().top
      if (newTop + offset < 0 && newTop > candidateTop) {
        candidateId = id
        candidateTop = newTop
      }
    })
    setCurrentSection(candidateId)
  }, rateLimit)

  useEffect(() => {
    window.addEventListener('scroll', handle)
    handle()
    return () => {
      window.removeEventListener('scroll', handle)
    }
  }, [fieldsRef.current, offset])

  return { register, currentSection, isCurrent }
}

export default useScrollspy
