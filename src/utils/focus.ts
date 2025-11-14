/**
 * Focus Management Utilities
 * Consistent focus styles and accessibility helpers
 */

import { cn } from './cn'

/**
 * Standard focus ring classes for interactive elements
 * Following WCAG 2.1 AAA contrast requirements
 */
export const focusRing = cn(
  // Remove default outline
  'outline-none',
  // Custom focus ring
  'focus-visible:ring-2',
  'focus-visible:ring-primary-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-neutral-900',
  // Smooth transition
  'transition-shadow duration-150'
)

/**
 * Focus ring for light backgrounds
 */
export const focusRingLight = cn(
  'outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-primary-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white',
  'transition-shadow duration-150'
)

/**
 * Focus ring for dark backgrounds (default)
 */
export const focusRingDark = focusRing

/**
 * Focus ring for inputs
 */
export const focusRingInput = cn(
  'outline-none',
  'focus:ring-2',
  'focus:ring-primary-500',
  'focus:ring-offset-0',
  'focus:border-primary-500',
  'transition-all duration-200'
)

/**
 * Focus ring for danger/error states
 */
export const focusRingDanger = cn(
  'outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-red-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-neutral-900',
  'transition-shadow duration-150'
)

/**
 * Focus ring for success states
 */
export const focusRingSuccess = cn(
  'outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-green-500',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-neutral-900',
  'transition-shadow duration-150'
)

/**
 * Skip link for keyboard navigation (accessibility)
 */
export const skipLink = cn(
  'sr-only',
  'focus:not-sr-only',
  'focus:absolute',
  'focus:top-4',
  'focus:left-4',
  'focus:z-50',
  'focus:px-4',
  'focus:py-2',
  'focus:bg-primary-500',
  'focus:text-white',
  'focus:rounded-md',
  focusRing
)

/**
 * Trap focus within an element (for modals, dialogs)
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0] as HTMLElement
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus()
        e.preventDefault()
      }
    }
  }

  element.addEventListener('keydown', handleTabKey)

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[]
}

/**
 * Focus first element in container
 */
export function focusFirst(container: HTMLElement) {
  const elements = getFocusableElements(container)
  if (elements.length > 0) {
    elements[0].focus()
  }
}

/**
 * Focus last element in container
 */
export function focusLast(container: HTMLElement) {
  const elements = getFocusableElements(container)
  if (elements.length > 0) {
    elements[elements.length - 1].focus()
  }
}
